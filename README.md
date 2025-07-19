# my-multi-work-calendar
This is meant to be a Calendar App that adapts to the different sort of work schedules I or anyone may have in their lives. 

# Progress

- [x] Started an React app using CRA.
- [x] Getting the first Calendar page started. Good homepage.
- [ ] Will try to create an React app using Vite.
- [ ] Making events and pointing it on Calendar.

---

🔙 Backend: Python.

✅ Framework: FastAPI.

    FastAPI:

    ➤ Fast, modern, async-ready, perfect for building high-performance APIs.
    ➤ Automatically generates Swagger UI docs.

🗃️ Database

- PostgreSQL (relational, perfect for calendar/event data)

- ORM: SQLModel (from FastAPI's creator, combines SQLAlchemy + Pydantic)

- OR use Tortoise ORM (if you want async support)

- OR SQLAlchemy (standard and flexible)

🗂️ API Structure

    /events — Create, read, update, delete events

    /notes — Create/read/update/delete notes

    /calendar — Fetch calendar views (by day, week, month)

🔐 Authentication (Optional)

    OAuth2 + JWT using FastAPI’s built-in tools

    OR plug in Authlib for social login (Google, GitHub)

🌐 Frontend Options

If you want to stay Pythonic:

    Streamlit or Anvil: For rapid UI development (but not as customizable as React)

If you're okay with using JS for the frontend:

    React.js or Svelte + Tailwind CSS
    ➤ These pair well with FastAPI and give you full control.

🗄️ Alternative Full-Stack Option

If you prefer a one-stop shop:
🌟 Django + Django REST Framework

    Full-stack Python web framework

    Comes with built-in admin panel, auth, and ORM

    Use Django REST Framework to expose APIs

    Calendar UI can be built with Django Templates, or you can add React for the frontend

🧰 Supporting Libraries & Tools
Feature	| Library
Database	| PostgreSQL + SQLModel / SQLAlchemy
Event time handling	| pendulum (better datetime library)
Background tasks	| Celery with Redis (for reminders/notifications)
Email reminders	| smtplib or SendGrid API
Real-time sync	| WebSockets via FastAPI WebSockets or Socket.IO
Deployment	| Docker, Gunicorn, Nginx
Hosting	| Railway, Render, Fly.io, or Heroku

---

# 🍱 Community Food Map - Architecture Sketch (FastAPI + OpenAI + Mapbox)

# --- Core Architecture ---
# [User Frontend] --> [FastAPI (HTML/JS + API)] --> [OpenAI GPT] + [PostgreSQL DB] + [Mapbox API]

# --- Tech Stack ---
# - Backend: FastAPI (Python)
# - AI/NLP: OpenAI GPT-4o (via API)
# - Maps: Mapbox (for location visualization)
# - Frontend: HTML + JS + Leaflet/Mapbox GL JS
# - DB: PostgreSQL or SQLite (for food data)


# --- Folder Structure ---

project/
├── app/
│   ├── main.py                  # FastAPI app entrypoint
│   ├── gpt_utils.py             # Handles ChatGPT interactions
│   ├── db.py                    # DB connection and models
│   ├── map_utils.py             # Handles Mapbox calls/geocoding
│   └── templates/               # Jinja2 HTML templates
│       └── index.html
├── static/                      # CSS, JS, Images
├── .env                         # Environment variables
└── requirements.txt

