# 🐳 Pomodoro Timer App

A simple Pomodoro timer and task manager web app, built as a hands-on project for learning Docker and containerized deployments.

---

## Features

- **Timer** — Focus, short break, and long break modes with Classic, Deep, and Sprint duration presets
- **Tasks** — Add, complete, and remove tasks; completed tasks persist via local storage
- **Round tracking** — Tracks completed focus rounds, persisted across sessions
  
---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | CSS |
| Containerization | Docker (multi-stage build) |
| Web Server | Nginx |
| Orchestration | Docker Compose |

---

## Getting Started

### Run with Docker Compose

```bash
git clone https://github.com/KRC00112/Pomodoro.git
cd Pomodoro
docker compose up --build
```

Then open your browser at [http://localhost](http://localhost).

---

## Docker Setup

This project uses a **multi-stage Docker build** to keep the final image small:

1. **Build stage** — Uses a Node.js Alpine image to install dependencies and compile the Vite/React app
2. **Serve stage** — Copies only the compiled `dist/` output into a minimal Nginx image

The Docker Compose file adds a health check that pings `http://localhost` every 30 seconds to confirm the container is serving correctly.

---

## Project Structure

```
├── src/               # React source code
│   ├── App.jsx        # Main app component (timer, tasks logic)
│   └── App.css        # Styles
├── public/            # Static assets
├── Dockerfile         # Multi-stage Docker build
├── docker-compose.yml # Compose config with health check
├── vite.config.js     # Vite configuration
└── index.html         # HTML entry point
```

---

## Purpose

This project was built to practice and learn:

- Writing a **multi-stage Dockerfile** to separate build and runtime environments
- Serving a static frontend with **Nginx inside Docker**
- Using **Docker Compose** for container orchestration and health checks
- Publishing images to **Docker Hub**

---

## Docker Hub

The image is available on Docker Hub:

```bash
docker pull krcdocker2138/pomodoro-todo-webapp
```
