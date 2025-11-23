# 🙏BibleVerse App

A Bible browsing and reading web application built with **Next.js , TypeScript, TailwindCSS and Supabase as Database and Authentication. with Scripture data by [API.Bible](https://api.bible/api-reference)**
Users can explore books and chapters, search across all verses, and save notes for each chapter to support depper study.

**Visit Here:** [https://m-antoni-bibleverse.vercel.app](https://m-antoni-bibleverse.vercel.app)

![image](docs/bible1.png)

## Technology

| Technology                                                                        | Description                                  |
| --------------------------------------------------------------------------------- | -------------------------------------------- |
| Next.js                                                                           | React framework for web apps.                |
| TypeScript                                                                        | Typed JavaScript for reliability.            |
| Supabase (BaaS)                                                                   | Backend As A Service with auth and database. |
| TailwindCSS                                                                       | Utility-first CSS framework.                 |
| [Argon Dashboard](https://www.creative-tim.com/product/argon-dashboard-tailwind#) | Tailwind UI dashboard components.            |
| [API.Bible](https://api.bible/api-reference)                                      | Bible data (books, chapters, verses).        |

### Features

- Supabase Authentication
  - Email Password
  - Google OAuth
- View all **Books** and **Chapters**
- Read chapte verses using the API.Bible data
- Save, update, delete notes per chapter of the book
- Notes tied to authenticated user with RLS of Supabase
- Search Page - Search keywords across **All verses**
- **Developer Utilities**
  - Supabase RLS Policies for secure, user-scoped data access
  - Supabase **Migration** included as SQL files for version-controlled schema changes
  - Supabase **Seeders** to populate initial data and improve navigation experience
  - `npm run route-list` to view all registered API routes

<br/>

### Folder Overview

- `/app/api` — API route handlers for server-side logic and data fetching
- `/app/(auth)` — Route group for authentication pages (sign-in, sign-up)
- `/app/(private)` — Route group for protected pages (dashboard, read-bible, search)
- `/app/components` — Reusable UI components used across the application
- `/app/constants` — Centralized constants (paths, config values, etc.)
- `/app/lib/services` — Service layer for business logic and API interactions
- `/app/lib/supabase` — Supabase utilities: `server.ts`, `client.ts`, `auth.ts`
- `/app/lib/helpers` — Utility functions and shared helpers
- `/app/lib/types` — TypeScript type definitions and interfaces
- `/supabase/migrations` — Database migration SQL files and seeders
- `/public` — Static assets such as images, icons, and manifest files

<br/>

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/m-antoni/bible-verse.git

cd bible-verse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file and add the following:

```
# API Website: https://scripture.api.bible (get your api-key and request endpoint)
BIBLE_API_ENDPOINT=
BIBLE_API_KEY=
BIBLE_API_ID=

# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Applying Supabase Migrations (db push)

If you modify SQL migrations or want to sync schema:

```bash
npx supabase db push
```

This will apply your local migration files directly to your Supabase project.

### 6. Route List (optional)

```bash
npm run route-list
```

<br/>

## License

This project is open-source and available under the MIT License.

## Author

**Michael B. Antoni**  
LinkedIn: [https://linkedin.com/in/m-antoni](https://linkedin.com/in/m-antoni)  
Email: michaelantoni.tech@gmail.com
