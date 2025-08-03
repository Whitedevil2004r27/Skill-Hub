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

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c463c460-ba1a-4de8-b7fe-143afc685b28) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
