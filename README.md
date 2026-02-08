# 🏥 Hospital Appointment Booking System

A full-stack web application that allows patients to book doctor appointments online while enabling doctors and administrators to manage schedules efficiently.

This system simplifies appointment scheduling, reduces manual work, and improves communication between patients, doctors, and administrators.


## 🌐 Live Demo
👉 Try the app here:  
https://hospital-booking-appointment.netlify.app
---

## 🔐 Demo Login Credentials

Use these accounts to explore each role in the system.

### 🛠 Admin
- **Email:** chand@gmail.com  
- **Password:** 123  

### 🩺 Doctor
- **Email:** tony@gmail.com  
- **Password:** 123  

### 👤 Patient
- **Email:** anu  
- **Password:** 123  

---

## ✨ Features

### 👤 Patient
- Register & login
- View available doctors
- Book appointments
- View appointment status

### 🩺 Doctor
- View assigned appointments
- Accept or cancel bookings
- Manage schedule

### 🛠 Admin
- Add/manage doctors
- View all appointments
- Dashboard overview

### 🔐 Authentication
- Secure login/logout
- Role-based access (patient / doctor / admin)
- Cookie-based session management

---

## 🧱 Tech Stack

### Frontend
- React.js — UI Library
- Tailwind CSS — Styling
- React Router — Navigation

### Backend
- Node.js — Runtime environment
- Express.js — Web framework

### Database
- MongoDB — NoSQL database
- Mongoose — ODM

### Authentication
- Cookie/session-based authentication

---

## 📁 Project Structure

```
hospital-appointment-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── controllers/
│   │   ├── routes/
│   ├── middleware/
│   ├── DB/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

---

### 1️⃣ Clone repository

```bash
git clone https://github.com/akhilchandps/hospital-appointment-system.git
cd hospital-appointment-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

Backend runs at:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```
VITE_API_URL=http://localhost:3000
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔄 API Endpoints

All protected routes require authentication via cookies.

---

### 🔐 Authentication Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login user |
| GET | `/auth/authCheck` | Protected | Verify logged-in user |
| POST | `/auth/logout` | Protected | Logout user |

---

### 📅 Appointment Routes

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/appointments/` | Patient | Book an appointment |
| GET | `/appointments/myappo` | Patient | Get patient appointments |
| GET | `/appointments/doctor` | Doctor | Get doctor appointments |
| GET | `/appointments/admin` | Admin | Get all appointments |
| PATCH | `/appointments/:id/status` | Doctor | Update appointment status |
| DELETE | `/appointments/:id/delete` | Patient | Cancel appointment |

---

### 🩺 Doctor Routes

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/doctors/` | Admin | Add new doctor |
| GET | `/doctors/` | Authenticated | Fetch doctors |

---

## 🔐 Access Control

- **Patient** → Book & manage appointments  
- **Doctor** → View & update appointment status  
- **Admin** → Manage doctors & view all appointments  

Authentication is handled via secure cookie sessions.


## 🚀 Deployment

### Frontend

```bash
npm run build
```

Deploy the `dist` folder to Netlify.

---

### Backend

- Push code to GitHub
- Connect to Render/Heroku
- Add environment variables
- Deploy

---

## 👨‍💻 Author

**Akhil Chand P S**

- Portfolio: https://akhilchand-portfolio-new02.netlify.app/
- LinkedIn: https://www.linkedin.com/in/akhil-chand-ps-489a9622b/
- GitHub: https://github.com/akhilchandps
- Email: akhilchandps@gmail.com

---
