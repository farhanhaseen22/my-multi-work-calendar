# my-multi-work-calendar
Stupid name I know but that's the working title for now.

This is meant to be a Calendar App that will adapt to the different sort of work schedules I or anyone may have in their lives.

# Progress

- [x] Started an React app using CRA.
- [x] Getting the first Calendar page started. Good homepage.
- [ ] Adding various features.
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
```text
    React.js or Svelte + Tailwind CSS
    ➤ These pair well with FastAPI and give you full control.
```

---

Core Calendar Functionality & Navigation:
1. Display Current Day Highlight: (Already implemented, but worth noting as a core feature).

Go to Today Button: A quick way to jump back to the current month and day.

Year Navigation: Ability to jump to specific years or navigate year by year.

Week View / Day View: Alternate display modes in addition to the current month view.

5. Mini-Calendar for Quick Navigation: A smaller, always-visible calendar for quick month/year selection.

Event Management:
6.Add Events:

    Click on a day to open a modal/form to add a new event.

    Input fields for event title, description, date, time (start/end).

    Option for all-day events.

Display Events:

    Show small indicators (e.g., a dot, a short text snippet) on days with events.

    Display a list of events for the selected day/week/month.

Edit/Delete Events:

    Click on an existing event to edit its details or delete it.

Event Reminders/Notifications: (Client-side or integrated with a backend).

Event Categories/Colors: Allow users to categorize events (e.g., "Work," "Personal," "Holiday") and assign different colors.

11. Recurring Events: Set events to repeat daily, weekly, monthly, or annually.

User Interface (UI) & User Experience (UX) Enhancements:
12. Responsive Design Improvements: Ensure optimal layout on various screen sizes (already using Tailwind, but fine-tuning might be needed).

Loading Indicators: Show a spinner or message when data is being fetched or saved.

Confirmation Dialogs: For actions like deleting an event.

Dark Mode Toggle: Allow users to switch between light and dark themes.

Animations & Transitions: Smooth transitions for month changes or event modals.

Tooltips: Show event details on hover for days with events.

Data Persistence & Backend Integration:
18. Local Storage/Session Storage: (Simple, client-side persistence for events).

Firestore (Firebase): (Recommended for robust, real-time, multi-user data storage).

    Save, retrieve, update, and delete events from a cloud database.

    Real-time updates across devices.

    User authentication (anonymous or authenticated users) for private events.

Other Backend APIs: Integration with custom backend APIs or other third-party calendar services (e.g., Google Calendar API, Outlook Calendar API).

Advanced Features:
Search Functionality: Search for events by title or description.

Export/Import Events: (e.g., iCal format).

User Accounts & Authentication: (If not using Firebase Auth directly).

Sharing Calendars/Events: (For multi-user scenarios).

