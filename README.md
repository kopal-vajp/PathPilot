# PathPilot

PathPilot is an AI-powered career assistant designed to help students and job seekers streamline their career preparation journey. It combines resume building, AI-generated cover letters, interview preparation, industry insights, and skill gap analysis into a single platform.

🌐 **Live Demo:** https://pathpilot-vert.vercel.app/

## Features

- AI-powered Resume Builder
- AI Cover Letter Generator
- Interview Preparation Quiz
- Industry Insights Dashboard
- Skill Gap Analysis
- Personalized User Onboarding
- Secure Authentication with Clerk

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React
- Tailwind CSS
- Shadcn/UI

### Backend
- Next.js Server Actions
- Prisma ORM
- Neon PostgreSQL

### Authentication
- Clerk

### AI Integration
- Google Gemini API

### Deployment
- Vercel


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kopal-vajp/PathPilot.git
cd PathPilot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

DATABASE_URL=your_neon_database_url

GEMINI_API_KEY=your_gemini_api_key
```

### 4. Initialize the Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```
