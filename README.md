# TaskFlow — Kanban Board Project Manager

## Overview
TaskFlow is a Kanban board app for managing projects and tasks with drag-and-drop, user authentication, and project organization.

## Setup
1. Clone the repo and enter the folder.
2. Run `npm install`.
3. Add a `.env.local` file with your DB and JWT settings.
4. Run `npx sequelize-cli db:migrate` (if needed).
5. Start with `npm run dev` and open [http://localhost:3000](http://localhost:3000).

## Technologies
- Next.js, React, TypeScript, Tailwind CSS
- Sequelize, PostgreSQL
- JWT authentication

## Notes
- Tradeoffs: Basic error handling, no role-based access.
- Stretch goals: Real-time updates, roles, comments.
- Known bugs: Some UI glitches,