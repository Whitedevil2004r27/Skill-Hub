# 🧠 Mentor Nexus AI

Mentor Nexus AI is a smart mentorship matchmaking platform that connects learners with verified mentors using role-based authentication. It leverages Supabase Auth with Google OAuth, shadcn/ui components, and a sleek dark UI powered by Vite, React, and Tailwind CSS.

> 🎯 **Built with scalability, speed, and elegant design in mind.**

---

## 🌐 Live Project

🔗 [Visit Mentor Nexus AI on Lovable](https://lovable.dev/projects/c463c460-ba1a-4de8-b7fe-143afc685b28)

---

## 📌 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Supabase Auth Setup](#-supabase-auth-setup)
- [🎨 UI Design System](#-ui-design-system)
- [📦 Deployment](#-deployment)
- [🙋 About the Author](#-about-the-author)
- [📄 License](#-license)

---

## ✨ Features

- 🔐 Google OAuth Login via Supabase
- 🎯 Role-based redirection: `/join-learner` or `/become-mentor`
- ✅ Protected routes using `ProtectedRoute`
- 📦 Centralized Auth context via React Context API
- 💬 Toast notifications via custom hook
- 🎨 Full dark mode interface using Tailwind and shadcn/ui
- ⚡ Fast and optimized with Vite + React + TypeScript
- 💡 Modular structure for easy scalability

---

## 🛠️ Tech Stack

| Technology         | Description                                  |
|--------------------|----------------------------------------------|
| Vite               | Fast build tool for modern React apps        |
| React + TypeScript | Frontend UI and typed components             |
| Supabase           | Backend as a service with OAuth & database   |
| Tailwind CSS       | Utility-first CSS framework                  |
| shadcn/ui          | Accessible, customizable component library   |
| React Query        | Powerful data-fetching + state management    |
| React Router       | Dynamic client-side routing                  |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ProtectedRoute.tsx         # Auth route guard
├── hooks/
│   └── useAuth.tsx                # Auth context logic
├── integrations/
│   └── supabase/
│       └── client.ts              # Supabase client setup
├── pages/
│   ├── Index.tsx                  # Home page
│   ├── Login.tsx                  # Sign-in with Google
│   ├── Register.tsx               # Register (optional)
│   ├── AuthCallback.tsx           # OAuth redirect handler
│   ├── JoinLearner.tsx            # Learner dashboard
│   ├── BecomeMentor.tsx           # Mentor dashboard
│   └── NotFound.tsx               # 404 fallback
└── App.tsx                        # Root app with all routes/providers
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm (use [nvm](https://github.com/nvm-sh/nvm) to install)
- A Supabase project + Google OAuth enabled

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mentor-nexus-ai.git
cd mentor-nexus-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` or use direct config (already in `client.ts`)

```ts
// src/integrations/supabase/client.ts
export const supabase = createClient(
  "https://<your-project>.supabase.co",
  "public-anon-key"
);
```

### 4. Run the development server

```bash
npm run dev
```

The app will be running on `http://localhost:3000`.

---

## 🔐 Supabase Auth Setup

- Create a Supabase project
- Enable **Google OAuth Provider** under **Authentication > Providers**
- Set redirect URL:
  ```
  http://localhost:3000/
  ```

- Your `supabase.auth.signInWithOAuth` will handle redirection automatically
- After login, users will be redirected to the correct page based on stored role in Supabase

---

## 🎨 UI Design System

**Palette**:
- `#010030` – Ultra dark background
- `#160078` – Indigo primary
- `#7226FF` – Vibrant violet accent

**Typography**:
- Inter font (Google Fonts)
- Clean hierarchy with Tailwind utility classes

**Component Library**:
- shadcn/ui
- React Icons
- Animations via Framer Motion (optional)

---

## 📦 Deployment

### Lovable (Recommended)

Visit [https://lovable.dev/projects/c463c460-ba1a-4de8-b7fe-143afc685b28](https://lovable.dev/projects/c463c460-ba1a-4de8-b7fe-143afc685b28) and click:

```
→ Share → Publish
```

### Vercel / Netlify / Render

1. Push repo to GitHub
2. Connect GitHub repo to Vercel or Netlify
3. Set environment variables (if moved from client.ts to .env)
4. Deploy

---

## 🙋 About the Author

**Ravi Kumar J**  
Frontend Developer | UI/UX Designer

- 💼 [Portfolio](https://rk-portfolio-orpin.vercel.app/)
- 🔗 [LinkedIn](https://www.linkedin.com/in/ravikumarj27)
- 💻 [GitHub](https://github.com/Whitedevil2004r27)
- 📬 [Email](mailto:ravikumarofficial227@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, distribute, and modify this project with proper attribution.

---

> Designed with precision, built with passion. 💻✨
