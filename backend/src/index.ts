import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { MentorService } from './services/mentorService';
import { CourseService } from './services/courseService';
import { ProfileService } from './services/profileService';
import { EnrollmentService } from './services/enrollmentService';
import { SessionService } from './services/sessionService';
import { MessageService } from './services/messageService';
import { LessonService } from './services/lessonService';
import { ReviewService } from './services/reviewService';
import { AdminService } from './services/adminService';
import { verifyJWT, verifyAdmin } from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mentors Routes
app.get('/api/mentors', async (req: Request, res: Response) => {
  try {
    const mentors = await MentorService.getAllMentors();
    res.json(mentors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mentors/:id', async (req: Request, res: Response) => {
  try {
    const mentor = await MentorService.getMentorById(req.params.id as string);
    res.json(mentor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Courses Routes
app.get('/api/courses', async (req: Request, res: Response) => {
  try {
    const courses = await CourseService.getAllCourses();
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/courses/:id/content', async (req: Request, res: Response) => {
  try {
    const content = await CourseService.getCourseContent(req.params.id as string);
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Profile Routes (Protected)
app.get('/api/profiles/:id', verifyJWT, async (req: Request, res: Response) => {
  try {
    // Ensure user can only access their own profile (or add admin logic)
    const authenticatedUser = (req as any).user;
    if (authenticatedUser.sub !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const profile = await ProfileService.getProfile(req.params.id as string);
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/profiles/:id', verifyJWT, async (req: Request, res: Response) => {
  try {
    const authenticatedUser = (req as any).user;
    if (authenticatedUser.sub !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedProfile = await ProfileService.updateProfile(req.params.id as string, req.body);
    res.json(updatedProfile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Enrollment Routes
app.get('/api/enrollments/:userId', verifyJWT, async (req: Request, res: Response) => {
  try {
    const enrollments = await EnrollmentService.getEnrollmentsByUserId(req.params.userId as string);
    res.json(enrollments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/enrollments', verifyJWT, async (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.body;
    const enrollment = await EnrollmentService.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Session Routes
app.get('/api/sessions/:userId', verifyJWT, async (req: Request, res: Response) => {
  try {
    const sessions = await SessionService.getUpcomingSessions(req.params.userId as string);
    res.json(sessions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/sessions', verifyJWT, async (req: Request, res: Response) => {
  try {
    const session = await SessionService.createSession(req.body);
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/sessions/:id/link', verifyJWT, async (req: Request, res: Response) => {
  try {
    const { meetingLink } = req.body;
    const session = await SessionService.updateMeetingLink(req.params.id as string, meetingLink);
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/sessions/:id/status', verifyJWT, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const session = await SessionService.updateStatus(req.params.id as string, status);
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Message Routes
app.get('/api/messages/unread', verifyJWT, async (req: Request, res: Response) => {
  try {
    const authenticatedUser = (req as any).user;
    const count = await MessageService.getUnreadCount(authenticatedUser.sub);
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages/conversation/:otherUserId', verifyJWT, async (req: Request, res: Response) => {
  try {
    const authenticatedUser = (req as any).user;
    const messages = await MessageService.getConversation(
      authenticatedUser.sub, 
      req.params.otherUserId as string
    );
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', verifyJWT, async (req: Request, res: Response) => {
  try {
    const authenticatedUser = (req as any).user;
    const message = await MessageService.sendMessage({
      ...req.body,
      sender_id: authenticatedUser.sub
    });
    res.json(message);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/messages/read', verifyJWT, async (req: Request, res: Response) => {
  try {
    const authenticatedUser = (req as any).user;
    const { messageIds } = req.body;
    const result = await MessageService.markAsRead(messageIds, authenticatedUser.sub);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Lesson & Review routes
app.post('/api/lessons/:id/progress', verifyJWT, async (req: Request, res: Response) => {
  try {
    const authenticatedUser = (req as any).user;
    const { completed, lastWatched } = req.body;
    const progress = await LessonService.updateProgress(
      authenticatedUser.sub,
      req.params.id as string,
      completed,
      lastWatched
    );
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/lessons/:courseId/progress', verifyJWT, async (req: Request, res: Response) => {
  try {
    const authenticatedUser = (req as any).user;
    const progress = await LessonService.getCourseProgress(
      authenticatedUser.sub,
      req.params.courseId as string
    );
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reviews', verifyJWT, async (req: Request, res: Response) => {
  try {
    const authenticatedUser = (req as any).user;
    const { mentorId, sessionId, rating, comment } = req.body;
    const review = await ReviewService.createReview(
      mentorId,
      authenticatedUser.sub,
      sessionId,
      rating,
      comment
    );
    res.json(review);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reviews/mentor/:mentorId', async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewService.getMentorReviews(req.params.mentorId as string);
    const performance = await ReviewService.getMentorPerformance(req.params.mentorId as string);
    res.json({ reviews, performance });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Routes
app.get('/api/admin/stats', verifyJWT, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const stats = await AdminService.getPlatformStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/users', verifyJWT, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/users/:id/status', verifyJWT, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const updatedUser = await AdminService.updateUserStatus(req.params.id as string, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/courses', verifyJWT, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const course = await CourseService.createCourse(req.body);
    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/courses/:id', verifyJWT, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const course = await CourseService.updateCourse(req.params.id as string, req.body);
    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/courses/:id', verifyJWT, verifyAdmin, async (req: Request, res: Response) => {
  try {
    await CourseService.deleteCourse(req.params.id as string);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/courses/:courseId/modules', verifyJWT, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const module = await CourseService.upsertModule({
      ...req.body,
      course_id: req.params.courseId
    });
    res.json(module);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/modules/:moduleId/lessons', verifyJWT, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const lesson = await CourseService.upsertLesson({
      ...req.body,
      module_id: req.params.moduleId
    });
    res.json(lesson);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend service listening at http://localhost:${port}`);
});
