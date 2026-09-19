# CashFlow

A modern personal finance tracker for managing wallets, categories, transactions, and financial reports — with a dedicated owner/admin dashboard for system oversight.

Built with **React 19**, **Express 5**, **Prisma**, and **MySQL**, styled with **Tailwind CSS 4**, and animated with **Framer Motion**. Fully bilingual (English / Indonesian) with a dark mode that follows your system preference.

## Features

- **Wallets** — track balances across cash, bank accounts, and e-wallets
- **Categories** — organize income and expenses by custom categories
- **Transactions** — full CRUD with automatic wallet balance updates
- **Reports** — income vs. expense trends, spending by category, monthly breakdowns
- **Owner dashboard** — user management and a system-wide overview, reusing the same wallet/category/transaction/report experience as regular users
- **Auth** — JWT-based login/register with role-based access (`USER` / `OWNER`)
- **i18n** — every screen switches instantly between English and Indonesian
- **Dark mode**, responsive layout, and accessible, animated UI (keyboard navigation, focus management, reduced-motion support)

## Tech Stack

| Layer      | Stack                                                                 |
| ---------- | ---------------------------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS 4, Framer Motion, React Router, TanStack Query, Zustand, React Hook Form, Zod, Recharts |
| Backend    | Node.js, Express 5, Prisma ORM, JWT, bcrypt                          |
| Database   | MySQL                                                                 |

## Project Structure

```
cashflow/
├── backend/                 # Express API
│   ├── prisma/               # Schema & migrations
│   └── src/
│       ├── controllers/      # Request handlers
│       ├── services/         # Business logic / Prisma queries
│       ├── routes/           # Express routers
│       ├── middleware/       # Auth & role guards
│       └── validators/       # Request validation
│
└── frontend/                 # React SPA
    └── src/
        ├── modules/           # Feature modules (auth, wallet, category, transaction, reports, owner, settings)
        ├── layouts/           # Dashboard / Owner / Auth layouts
        ├── components/        # Shared UI primitives
        ├── contexts/          # Auth, Theme, Language providers
        └── routes/            # Router configuration
```

## Prerequisites

- Node.js 18+
- MySQL 8+ (running locally or reachable remotely)

## Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/Mustafa071006/cashflow.git
cd cashflow

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your own database credentials and a strong `JWT_SECRET` (see [Environment Variables](#environment-variables) below).

### 3. Set up the database

```bash
cd backend
npx prisma migrate dev
node src/seed/owner.js   # optional: hashes the default owner's password
```

The seed sets the password for `owner@gmail.com` to `123456`. **Change this password immediately after your first login** if you seed it, or create your own `OWNER` user directly in the database instead.

### 4. Run the app

In two separate terminals:

```bash
# Terminal 1 — API on http://localhost:5000
cd backend
npm run dev

# Terminal 2 — App on http://localhost:5173
cd frontend
npm run dev
```

## Environment Variables

Set these in `backend/.env` (see `backend/.env.example` for a template):

| Variable         | Description                                      |
| ---------------- | ------------------------------------------------- |
| `PORT`           | Port the API server listens on (default `5000`)   |
| `DATABASE_URL`   | MySQL connection string used by Prisma            |
| `JWT_SECRET`     | Secret used to sign auth tokens — use a long, random value |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`)                        |

Never commit `.env` — it's already excluded via `.gitignore`.

## Available Scripts

**Backend** (`cashflow/backend`)

| Command       | Description                          |
| ------------- | ------------------------------------- |
| `npm run dev` | Start the API with nodemon (auto-reload) |
| `npm start`   | Start the API in production mode      |

**Frontend** (`cashflow/frontend`)

| Command           | Description                     |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the Vite dev server        |
| `npm run build`   | Type-check-free production build |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint                       |

## License

MIT — see [LICENSE](LICENSE).
