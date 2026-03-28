# 💼 Job Solution — Job Portal Frontend

> A modern, full-featured job portal web application built with React + Vite, enabling seamless job discovery and application for candidates, and streamlined job posting for recruiters.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Backend Integration](#backend-integration)

---

## Overview

**Job Solution** is a responsive, single-page web application that connects job seekers with employers. Built on a modern React + Vite stack, it communicates with a dedicated REST API backend deployed on Render. The UI leverages Ant Design for polished, consistent components and Tailwind CSS for rapid layout and styling.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 |
| **Build Tool** | Vite 7 |
| **UI Library** | Ant Design 5 + Ant Design Icons |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router DOM 7 |
| **HTTP Client** | Axios |
| **Linting** | ESLint 9 |
| **Formatting** | Prettier |
| **Language** | JavaScript (ES Modules) |

---

## ✨ Features

- 🔐 **Authentication** — Secure login and registration for both job seekers and recruiters
- 🔍 **Job Search & Discovery** — Browse and filter job listings by role, location, and category
- 📄 **Job Applications** — Apply for jobs directly through the platform
- 📝 **Job Posting** — Recruiters can create and manage job listings
- 📊 **Dashboard** — Role-based dashboards for candidates and employers
- 📱 **Responsive Design** — Fully mobile-friendly layout using Tailwind CSS and Ant Design
- ⚡ **Fast Loading** — Powered by Vite's lightning-fast HMR and optimised build pipeline

---

## 📁 Project Structure

```
Job-Portal-Frontend/
├── public/               # Static assets (favicon, images)
├── src/                  # Application source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-level page components
│   ├── services/         # Axios API service functions
│   ├── context/          # React context / state providers
│   ├── utils/            # Helper utilities
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables
├── .gitignore
├── .prettierrc           # Prettier formatting config
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML shell (title: "Job Solution")
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18+ (LTS recommended)
- **npm** v9+ or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KamatchiKarthi/Job-Portal-Frontend.git
   cd Job-Portal-Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)):

   ```bash
   cp .env.example .env
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variable:

```env
VITE_APP_TOKEN_KEY=<your_backend_api_base_url>
```

| Variable | Description | Example |
|---|---|---|
| `VITE_APP_TOKEN_KEY` | Base URL for the backend REST API | `https://job-portal-backend-1-2v48.onrender.com` |

---

## 📜 Available Scripts

Run these commands from the project root:

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the app for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## 🔗 Backend Integration

This frontend connects to a Node.js/Express REST API backend hosted on Render:

- **Backend Repo:** `https://github.com/KamatchiKarthi/Job-Portal-backend`
- **Live API:** `https://job-portal-backend-1-2v48.onrender.com`

All HTTP requests are made using **Axios**, with the base URL configured via the `VITE_APP_TOKEN_KEY` environment variable. Axios interceptors handle auth token injection and global error responses.

> **Note:** The backend is deployed on Render's free tier. The first request after inactivity may take 30–60 seconds to wake up the server.

---
