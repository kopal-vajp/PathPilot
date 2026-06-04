# PathPilot

PathPilot is an AI-powered career assistant designed to help students and job seekers streamline their career preparation journey. It combines resume building, AI-generated cover letters, interview preparation, industry insights, and skill gap analysis into a single platform.

🌐 **Live Demo:** https://pathpilot-vert.vercel.app/

## Overview

Finding internships and jobs often requires using multiple tools for resumes, cover letters, interview preparation, and industry research. PathPilot brings all of these features together in one place while providing personalized recommendations powered by AI.

This project was built to explore modern full-stack development using Next.js, Clerk Authentication, Prisma, Neon PostgreSQL, and Google's Gemini API.

---

## Features

### Resume Builder
- Markdown-based resume editor
- Save resumes to the database
- AI-powered resume improvement suggestions
- Persistent resume storage

### AI Cover Letter Generator
- Generate tailored cover letters from job descriptions
- Personalized content based on user profile and career interests
- Fast AI-powered content generation using Gemini

### Interview Preparation
- Role-specific interview quizzes
- Multiple-choice questions generated dynamically
- Score tracking and performance feedback

### Industry Insights Dashboard
- Industry growth trends
- Demand analysis
- Salary and market outlook information
- AI-generated career insights

### Skill Gap Analysis
- Compare current skills against industry expectations
- Identify missing skills
- Receive learning recommendations

### User Onboarding
- Personalized profile creation
- Industry and career preference collection
- Customized recommendations across the platform

---

## Live Application

Production Deployment:

https://pathpilot-vert.vercel.app/

---

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
- Clerk Authentication

### AI Integration
- Google Gemini API

### Deployment
- Vercel

---

## Project Architecture

```text
User
  ↓
Clerk Authentication
  ↓
Next.js App Router
  ↓
Server Actions
  ↓
Prisma ORM
  ↓
Neon PostgreSQL

AI Features
  ↓
Google Gemini API
```

---

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

### 5. Start Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Challenges Faced

### Authentication with Server Components

Integrating Clerk Authentication with the Next.js App Router required understanding how authentication behaves in Server Components and handling protected routes correctly.

### Database Management

Managing Prisma connections during development caused connection issues due to frequent hot reloads. This was resolved by implementing a singleton Prisma client.

### Gemini API Responses

AI responses were occasionally inconsistent in format. Additional validation and parsing logic were added to improve reliability and prevent runtime failures.

### Resume Export Handling

Rendering markdown content while handling malformed image tags and edge cases required additional validation to avoid application crashes.

---

## What I Learned

- Building full-stack applications using Next.js App Router
- Working with Server Components and Server Actions
- Authentication using Clerk
- Database management with Prisma and Neon PostgreSQL
- AI integration using Google's Gemini API
- Production deployment using Vercel
- Error handling and defensive programming practices

---

## Future Improvements

- Resume PDF export with improved formatting
- Multiple resume versions for different job roles
- Resume templates and themes
- Cover letter history and management
- More advanced skill gap analysis
- Personalized learning roadmaps
- Interview analytics dashboard
- Application tracking system

---

## Screenshots

_Add screenshots of the dashboard, resume builder, cover letter generator, and interview preparation module here._

---

## Author

**Kopal Vajpayee**

Computer Science Engineering Student

GitHub: https://github.com/kopal-vajp

---

## License

This project is intended for educational and portfolio purposes.