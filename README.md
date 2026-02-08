🏥 Hospital Appointment Booking System

A full-stack web application that allows patients to book doctor appointments online while enabling doctors and administrators to manage schedules efficiently.

This system simplifies appointment scheduling, reduces manual work, and improves communication between patients, doctors, and administrators.

✨ Features
👤 Patient

Register & login

View available doctors

Book appointments

View appointment status

🩺 Doctor

View assigned appointments

Accept or cancel bookings

Manage schedule

🛠 Admin

Add/manage doctors

View all appointments

Dashboard overview

🔐 Authentication

Secure login/logout

Role-based access (patient / doctor / admin)

🧱 Tech Stack
Frontend

React.js

Tailwind CSS

React Router

Backend

Node.js

Express.js

Database

MongoDB (Mongoose)

Authentication

Cookie/session-based auth

📁 Project Structure
hospital-appointment-system/
│
├── frontend/          # React frontend
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/           # Node + Express backend
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── middleware/
│
└── README.md

⚙ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/hospital-appointment-system.git
cd hospital-appointment-system

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=3000
MONGO_URI=your_mongodb_connection


Run backend:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔄 API Endpoints (Sample)
Method	Endpoint	Description
POST	/auth/register	User registration
POST	/auth/login	Login
GET	/appointments	Fetch appointments
POST	/appointments	Book appointment
🚀 Future Improvements

Online payments

Email/SMS reminders

Doctor availability calendar

Admin analytics dashboard

Real-time notifications

📸 Screenshots (Optional)

Add screenshots here:

/screenshots/dashboard.png
/screenshots/booking.png

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a feature branch

Commit changes

Open a pull request

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Akhil Chand PS
Full Stack Developer
MERN Stack Enthusiast
