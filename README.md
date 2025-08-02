# Frontend Setup

This README will help you get the Next.js frontend up and running locally.

---

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (v8 or later)
- A running backend server (see its own README)

---

## 1. Clone the repository

```bash
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Environment variables

Create a file called `.env.local` in the project root (this file is git-ignored by default) and add:

```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:4000   # or your backend URL
```

- `NEXT_PUBLIC_SERVER_URL` tells the frontend where to send API requests.

---

## 4. Running in development

Start the Next.js dev server:

```bash
npm run dev
```

- The frontend will be available at `http://localhost:3000/` by default.
- The server supports hot reload for rapid development.

---

