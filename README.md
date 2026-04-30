# PathPilot

PathPilot is an AI career assistant I built to help students figure out what to do with their careers. It combines resume building, cover letters, and interview prep in one place.

## Why I built this

Applying for jobs as a student is pretty stressful. I found myself jumping between different tools to write my resume, generate cover letters, and search for interview questions. I wanted to build something that put all of this into a single platform. It was also a good excuse for me to learn Next.js and how to work with the Gemini API.

## Features

- Resume Builder: A markdown-based editor where you can write and save your resume. It has an AI button to help improve your phrasing.
- Cover Letter Generator: You paste in a job description and it writes a tailored cover letter for that specific role.
- Interview Prep: Generates a short quiz with role-based questions to test your knowledge before an interview.
- Industry Insights: A dashboard that shows current trends, growth rates, and demand levels for your specific industry.
- Skill Gap Analysis: A basic feature that compares your current skills with what the industry is asking for so you know what to learn next.

## How it works

When you sign up, you enter your basic details and the industry you want to work in. The app uses the Gemini API to pull current data about that industry. From there, you can navigate to different tools. For example, if you go to the resume builder, it saves your progress to a Postgres database so you can come back to it later. The interview quiz generates questions based on your profile and tracks how many you get right.

## Tech Stack

- Next.js (App Router)
- Prisma
- Neon PostgreSQL
- Clerk (for auth)
- Google Gemini API
- Tailwind CSS

## Setup Instructions

If you want to run this locally, follow these steps:

1. Clone the repository
```bash
git clone https://github.com/yourusername/pathpilot.git
cd pathpilot
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root folder and add your keys. You will need keys for Clerk, a Neon database URL, and a Gemini API key.

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
DATABASE_URL=your_postgres_url
GEMINI_API_KEY=your_gemini_key
```

4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

5. Run the dev server
```bash
npm run dev
```

## Challenges faced

I ran into a lot of issues while building this. Setting up Clerk with Next.js App Router was confusing at first because of how server components handle auth. I also had problems with Prisma connections dropping when the server restarted during development, which I had to fix by setting up a global Prisma client.

Working with the Gemini API was tricky because it does not always return JSON exactly how you ask for it. I had to write a retry wrapper and clean up the text output before parsing it to prevent the app from crashing. Also, exporting the markdown resume to a PDF was causing crashes when image tags had empty source attributes, which took me a while to debug.

## What I learned

This project taught me a lot about handling state in Next.js and when to use server versus client components. I got much better at writing robust API calls that expect things to fail. I also learned how to use Neon for serverless Postgres, which was much easier to set up than I expected.

## Future improvements

- Add a way to export the resume directly to PDF without formatting issues
- Make the skill gap analysis more detailed
- Let users save multiple versions of their resume for different jobs
- Add a history page to save past cover letters
