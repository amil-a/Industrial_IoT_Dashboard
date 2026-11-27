# PlantMonitor – Industrial IoT Machine Monitoring Dashboard

A full-stack **MERN-style** (Node.js + Express + React) Industrial IoT monitoring dashboard built as a machine-test assessment. The system provides a professional, SCADA-inspired control-room interface for tracking and managing industrial machine statuses in real time.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Project Architecture](#project-architecture)
6. [Folder Structure](#folder-structure)
7. [Prerequisites](#prerequisites)
8. [Backend Setup](#backend-setup)
9. [Frontend Setup](#frontend-setup)
10. [Running the Application](#running-the-application)
11. [API Endpoint Documentation](#api-endpoint-documentation)
12. [Redux Toolkit Architecture](#redux-toolkit-architecture)
13. [Machine Status and Fault Acknowledgement Workflow](#machine-status-and-fault-acknowledgement-workflow)
14. [Error Handling](#error-handling)
15. [Future Improvements](#future-improvements)

---

## Project Overview

**PlantMonitor** is an Industrial IoT Machine Monitoring Dashboard that enables operators to monitor the operational status of industrial machines on a plant floor. The dashboard displays live machine telemetry (temperature, vibration, status) fetched from a REST API, allows operators to filter and search machines, inspect individual machine details, and acknowledge faults to restore normal monitoring workflows.

---

## Problem Statement

Industrial facilities operate dozens of machines simultaneously. Without a centralised monitoring interface, operators must physically inspect each machine or rely on disconnected systems. PlantMonitor solves this by:

- Aggregating machine status and telemetry data from a backend API.
- Presenting all machine information in a single, scannable control-room dashboard.
- Enabling operators to identify and acknowledge machine faults without leaving the interface.
- Persisting status changes so they survive backend restarts.

---

## Features

| Feature | Description |
|---|---|
| **Machine Dashboard** | Dark-navy SCADA-inspired overview of all plant machines |
| **Summary Cards** | Dynamic counts of Total, Running, Idle and Fault machines |
| **Machine Cards** | Individual cards with ID, name, status badge, temperature and vibration |
| **Search** | Real-time filter by machine name |
| **Status Filter** | Dropdown to filter by All, Running, Idle or Fault |
| **Machine Detail Panel** | Slide-over panel with full telemetry, status and timestamp |
| **Acknowledge Fault** | PATCH API call to change a faulty machine to idle; persists to `machines.json` |
| **Redux State Updates** | UI reflects backend response immediately without full page reload |
| **Loading / Error States** | Skeleton cards during load; error banner with Retry on API failure |
| **Empty State** | Friendly message when no machines match the current search/filter |
| **Collapsible Sidebar** | Desktop sidebar collapses to icon-only view with tooltips |
| **Functional Navigation** | Dashboard scrolls to top; Machines scrolls to machine section |
| **API Status Indicator** | Sidebar footer shows green/red based on last API error state |
| **Responsive Layout** | Desktop 4-column, tablet 2-column, mobile 1-column; drawer on mobile |

---

## Technology Stack

### Backend
| Package | Version | Purpose |
|---|---|---|
| Node.js | v24.21.0 | JavaScript runtime |
| Express | ^5.3.0 | HTTP server and routing |
| cors | ^2.8.6 | Cross-origin resource sharing |
| `fs/promises` | built-in | Persistent JSON file read/write |

### Frontend
| Package | Version | Purpose |
|---|---|---|
| React | ^19.0.0 | UI library |
| React DOM | ^19.0.0 | DOM rendering |
| Vite | ^6.0.11 | Build tool and dev server |
| @reduxjs/toolkit | ^2.5.0 | State management |
| react-redux | ^9.2.0 | React bindings for Redux |
| Axios | ^1.7.9 | HTTP client |
| Tailwind CSS | ^4.0.0 | Utility-first styling |
| @tailwindcss/vite | ^4.0.0 | Tailwind CSS Vite plugin |
| lucide-react | ^0.469.0 | Icon library |

---

## Project Architecture

```
Browser (React + Redux)
       │
       │  HTTP (Axios)
       ▼
Express REST API (Node.js)
       │
       │  fs/promises
       ▼
  machines.json (persistent data store)
```

- The **frontend** dispatches Redux async thunks that call Axios functions.
- Axios sends HTTP requests to the **Express backend** on port `5000`.
- The backend reads from and writes to **`machines.json`** using Node.js `fs/promises`.
- On a successful API response, Redux updates the in-memory store; React re-renders automatically.

---

## Folder Structure

```
Industrial_IoT_Dashboard/
│
├── backend/
│   ├── data/
│   │   └── machines.json         # Persistent machine data (4 records)
│   ├── routes/
│   │   └── machineRoutes.js      # GET + PATCH route handlers
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Express app, CORS, middleware, error handler
│
└── frontend/
    ├── index.html                # Vite HTML entry point
    ├── package.json              # Frontend dependencies and scripts
    ├── vite.config.js            # Vite + Tailwind CSS plugin config
    └── src/
        ├── api/
        │   └── machineApi.js     # Axios instance + API functions
        ├── app/
        │   └── store.js          # Redux configureStore()
        ├── components/
        │   ├── FilterBar.jsx     # Search input + status dropdown + clear
        │   ├── Header.jsx        # Top bar with title, date, system status
        │   ├── MachineCard.jsx   # Individual machine card (clickable)
        │   ├── MachineDetailPanel.jsx  # Slide-over detail + Acknowledge Fault
        │   ├── MachineGrid.jsx   # Responsive grid + loading/error/empty states
        │   ├── Sidebar.jsx       # Collapsible desktop + mobile drawer
        │   └── SummaryCards.jsx  # Dynamic count cards (Total/Running/Idle/Fault)
        ├── features/
        │   └── machines/
        │       └── machinesSlice.js  # createSlice + 3 createAsyncThunk actions
        ├── pages/
        │   └── Dashboard.jsx     # Main page; wires all components and Redux
        ├── App.jsx               # Root component (renders Dashboard)
        ├── index.css             # Tailwind import + custom keyframe animation
        └── main.jsx              # ReactDOM.createRoot + Redux Provider
```

---

## Prerequisites

- **Node.js** v18 or higher (tested on v24.21.0)
- **npm** v9 or higher (tested on v11.19.0)

> No external database is required. All data is stored in `backend/data/machines.json`.

---

## Backend Setup

```powershell
# From the project root
cd backend
npm install
```

**Installed packages:** `express`, `cors`

---

## Frontend Setup

```powershell
# From the project root
cd frontend
npm install
```

**Installed packages:** `react`, `react-dom`, `@reduxjs/toolkit`, `react-redux`, `axios`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`, `vite`, `@vitejs/plugin-react`

---

## Running the Application

You need **two terminal windows** running simultaneously.

### Terminal 1 – Start the Backend

```powershell
cd backend
npm start
```

Expected output:
```
Industrial IoT backend listening on http://localhost:5000
```

> Development mode with auto-restart: `npm run dev` (uses `node --watch`)

### Terminal 2 – Start the Frontend

```powershell
cd frontend
npm run dev
```

Expected output:
```
  VITE v6.x.x  ready in ...ms
  ➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173** in your browser.

> Production build: `npm run build` (outputs to `frontend/dist/`)
> Preview production build: `npm run preview`

---

## API Endpoint Documentation

**Base URL:** `http://localhost:5000/api`

All responses are `application/json`. All error responses follow the shape `{ "error": "<message>" }`.

---

### `GET /api/machines`

Returns the full list of all machines.

**Response `200 OK`:**
```json
[
  {
    "id": "M-101",
    "name": "CNC Lathe 1",
    "status": "running",
    "temperature": 68,
    "vibration": 2.1,
    "lastUpdated": "2026-07-23T09:00:00Z"
  }
]
```

---

### `GET /api/machines/:id`

Returns a single machine by its ID.

**Response `200 OK`:**
```json
{
  "id": "M-101",
  "name": "CNC Lathe 1",
  "status": "running",
  "temperature": 68,
  "vibration": 2.1,
  "lastUpdated": "2026-07-23T09:00:00Z"
}
```

**Response `404 Not Found`:**
```json
{ "error": "Machine with id 'M-999' not found." }
```

---

### `PATCH /api/machines/:id/status`

Updates the operational status of a machine and persists the change to `machines.json`.

**Request body:**
```json
{ "status": "idle" }
```

Allowed values for `status`: `"running"`, `"idle"`, `"fault"`

**Response `200 OK`** – returns the updated machine object with a refreshed `lastUpdated` timestamp:
```json
{
  "id": "M-102",
  "name": "Hydraulic Press",
  "status": "idle",
  "temperature": 92,
  "vibration": 6.8,
  "lastUpdated": "2026-11-27T07:36:00.000Z"
}
```

**Response `400 Bad Request`** – invalid or missing status:
```json
{ "error": "Invalid status. Allowed values are: running, idle, fault." }
```

**Response `404 Not Found`** – machine ID does not exist:
```json
{ "error": "Machine with id 'M-999' not found." }
```

---

## Redux Toolkit Architecture

### Store (`src/app/store.js`)

Configured with `configureStore()`. The single reducer key `machines` holds all machine-related state.

### Slice (`src/features/machines/machinesSlice.js`)

**State shape:**

```js
{
  machines: [],          // Array of all machine objects from the API
  selectedMachine: null, // Machine currently shown in the detail panel
  loading: false,        // True while fetchMachines is in-flight
  error: null,           // Error message from fetchMachines failure
  updating: false,       // True while updateMachineStatus is in-flight
  updateError: null,     // Error message from updateMachineStatus failure
}
```

**Synchronous actions (reducers):**

| Action | Purpose |
|---|---|
| `selectMachine(machine)` | Sets `selectedMachine` and clears `updateError` |
| `clearSelectedMachine()` | Clears `selectedMachine` and `updateError` when panel is closed |
| `clearUpdateError()` | Clears `updateError` without touching the selected machine |

**Async thunks (`createAsyncThunk`):**

| Thunk | HTTP call | Pending state | Fulfilled state | Rejected state |
|---|---|---|---|---|
| `fetchMachines` | `GET /api/machines` | `loading = true` | `machines = payload` | `error = message` |
| `fetchMachineById` | `GET /api/machines/:id` | `loading = true` | `selectedMachine = payload` | `error = message` |
| `updateMachineStatus` | `PATCH /api/machines/:id/status` | `updating = true` | Updates `machines[]` and `selectedMachine` | `updateError = message` |

### API Client (`src/api/machineApi.js`)

An Axios instance with `baseURL: "http://localhost:5000/api"` exports three plain async functions:

- `getMachines()` – fetches all machines
- `getMachineById(id)` – fetches one machine
- `updateMachineStatus(id, status)` – sends the PATCH request

---

## Machine Status and Fault Acknowledgement Workflow

```
Operator clicks Hydraulic Press card
        │
        ▼
selectMachine(machine) dispatched → selectedMachine set in Redux
        │
        ▼
MachineDetailPanel opens (slide-in animation)
        │
        ▼
"Acknowledge Fault" button visible (only when status === "fault")
        │
Operator clicks "Acknowledge Fault"
        │
        ▼
updateMachineStatus({ id: "M-102", status: "idle" }) dispatched
        │
  ┌─────┴──────┐
  │  pending   │  Button disabled + spinner shown
  └─────┬──────┘
        │
  PATCH /api/machines/M-102/status → { "status": "idle" }
        │
  ┌─────┴──────┐
  │ fulfilled  │  machines[index] updated in Redux
  │            │  selectedMachine updated in Redux
  │            │  Summary Fault count: 1 → 0, Idle: 1 → 2
  │            │  Success notification shown in panel
  │            │  "Acknowledge Fault" button hidden
  └────────────┘
        │
  Reload browser → GET /api/machines → M-102 persisted as "idle"
```

If the PATCH request fails:

- `updating = false`, `updateError` is populated
- Machine remains in `"fault"` status in both Redux and `machines.json`
- Error notification shown in panel; operator can retry

---

## Error Handling

### Backend

| Scenario | HTTP Status | Response |
|---|---|---|
| Machine not found | `404` | `{ "error": "Machine with id '...' not found." }` |
| Invalid status value | `400` | `{ "error": "Invalid status. Allowed values are: ..." }` |
| Malformed JSON body | `400` | `{ "error": "Invalid JSON payload." }` |
| Unknown route | `404` | `{ "error": "Route not found." }` |
| Unexpected server/file error | `500` | `{ "error": "Internal server error." }` |

### Frontend

| Scenario | UI Behaviour |
|---|---|
| `fetchMachines` fails | Error banner with message and "Retry" button in machine grid |
| `updateMachineStatus` fails | Red error alert in `MachineDetailPanel`; machine remains in fault |
| No machines match filter | Empty state with "No machines found" and "Reset Filters" button |
| Loading in progress | Skeleton card placeholders in machine grid |
| Backend offline | Summary counts show 0; API status indicator turns red in sidebar |

---

## Future Improvements

- **WebSockets for real-time updates:** Replace manual refresh with a WebSocket (e.g., Socket.IO) connection so sensor telemetry and status changes push to all connected dashboards instantly.
- **Historical sensor data and analytics:** Persist temperature and vibration readings over time and display trend charts (e.g., Recharts) for predictive maintenance analysis.
- **Database persistence:** Migrate from `machines.json` to MongoDB or PostgreSQL for scalable, concurrent, and query-efficient data storage.
- **Authentication and role-based access control:** Add JWT-based login so operators can view data while supervisors can acknowledge faults and administrators can manage machine records.
- **Alerting and notifications:** Send email or push notifications when a machine transitions to fault status, reducing detection latency for unattended plant floors.
