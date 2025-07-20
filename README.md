**Mikes's Hotel**

A modern hotel reservation application built as a monorepo using PostgreSQL and Node.js for backend services, and React.js for the frontend. The live project is deployed at: [https://mikes-hotel-revised.vercel.app/](https://mikes-hotel-revised.vercel.app/).

---

## Table of Contents

1. [Features](#features)
2. [Monorepo Structure](#monorepo-structure)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Environment Variables](#environment-variables)
   * [Database Setup](#database-setup)
   * [Running the Application](#running-the-application)
5. [Scripts](#scripts)
6. [API Routes](#api-routes)
7. [Frontend Routes & Pages](#frontend-routes--pages)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

* **User Authentication**: Secure login and registration flow.
* **Hotel Booking**: Search availability, create new bookings, and view existing reservations.
* **Reservation Management**: Redirects to a reservations page showing booking details and reference numbers.
* **PDF Export & QR Code**: Download booking confirmations as PDFs and generate QR codes for easy mobile check-in.
* **Cancel Booking**: Cancel reservations via the UI which triggers the delete booking API.
* **Responsive Design**: Works on mobile and desktop.

---

## Monorepo Structure

```
├── package.json              # Root workspace config
├── packages/
│   ├── backend/              # Backend services
│   │   ├── src/
│   │   ├── .env.example       # Backend env variables template
│   │   ├── package.json      
│   │   └── README.md
│   └── frontend/             # React.js frontend
│       ├── public/
│       ├── src/
│       ├── .env.example      # Frontend env variables template
│       ├── package.json
│       └── README.md
└── README.md                 # Monorepo README (this file)
```

---

## Tech Stack

* **PostgreSQL**: Relational database for storing users, bookings, and hotel data.
* **Node.js & Express**: RESTful API server for handling routes and business logic.
* **React.js**: Frontend UI built with Create React App (or Next.js) for booking workflows.
* **jsPDF**: Library to generate downloadable PDF confirmations.
* **qrcode**: QR code generation for booking references.
* **Vercel**: Deployment platform for the live site.

---

## Getting Started

### Prerequisites

* Node.js v14+
* Yarn or npm
* PostgreSQL v12+
* Git

### Installation

1. **Clone the repo**:

   ```bash
   git clone https://github.com/your-username/mikes-hotel.git
   cd mikes-hotel
   ```

2. **Install dependencies** (from the monorepo root):

   ```bash
   yarn install
   # or npm install
   ```

### Database Setup

**Create the database**:

   ```bash
   createdb mikes_hotel_db
   ```


### Running the Application

From the root folder:

```bash
# Start backend server (port 5000)
cd server workspace, run "npm start"

# In a separate terminal, start frontend dev server (port 3000)
cd frontend workspace, run "npm start"
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Scripts

| Workspace  | Script      | Description                             |
| ---------- | ----------- | --------------------------------------- |
| `backend`  | `server.js` | Run Node.js server in development mode  |
| `backend`  | `initDB.js` | Run database migrations                 |
| `frontend` | `start`    | Launch React development server          |
| `frontend` | `build`    | Create production build                  |

---

## API Routes

| Method | Route                      | Description                            |
| ------ | -------------------------- | -------------------------------------- |
| GET    | `/api/bookings`            | Fetch all bookings or search by ref    |
| POST   | `/api/bookings`            | Create a new booking                   |
| GET    | `/api/bookings/:reference` | Fetch booking by ID                    |
| DELETE | `/api/bookings/:id`        | Cancel (delete) a booking              |
| GET    | `/api/qr/:reference`       | Generate QR code for booking reference |

---

## Frontend Routes & Pages

* `/` — Home and booking form
* `/reservation?ref=<reference>` — Reservation detail page: displays booking details, PDF download button, QR code, and cancel option.

---

## Contributing

Contributions are welcome! Please fork the repo and open a pull request:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add some feature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
