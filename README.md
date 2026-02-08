# 🏥 Hospital Appointment Booking System

A full-stack web application that allows patients to book doctor appointments online while enabling doctors and administrators to manage schedules efficiently.

This system simplifies appointment scheduling, reduces manual work, and improves communication between patients, doctors, and administrators.

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

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |
| POST | /auth/logout | Logout user |
| GET | /auth/authCheck | Auth status |

---

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /appointments | Fetch appointments |
| POST | /appointments | Book appointment |
| PUT | /appointments/:id | Update appointment |
| DELETE | /appointments/:id | Cancel appointment |

---

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /doctors | Fetch doctors |
| POST | /doctors | Add doctor |
| PUT | /doctors/:id | Update doctor |
| DELETE | /doctors/:id | Remove doctor |

---

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

## 🌟 Future Improvements

- Online payment integration
- Email/SMS reminders
- Doctor availability calendar
- Admin analytics dashboard
- Real-time notifications
- Patient medical history
- Video consultation feature

---

## 🤝 Contributing

1. Fork repository  
2. Create feature branch  
3. Commit changes  
4. Push branch  
5. Open Pull Request  

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Akhil Chand P S**

- Portfolio: https://akhilchand-portfolio-new02.netlify.app/
- LinkedIn: https://www.linkedin.com/in/akhil-chand-ps-489a9622b/
- GitHub: https://github.com/akhilchandps
- Email: akhilchandps@gmail.com

---

## 🙏 Acknowledgments

- Built with MERN stack
- Inspired by modern healthcare systems

---

⭐ If you like this project, give it a star!
