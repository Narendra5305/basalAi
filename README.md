
This is a Job Portal project built using MERN stack.

Tech Used:
- React (Frontend)
- Node.js + Express (Backend)
- MongoDB (Database)
- Socket.io (For real-time features)

Main Feature:
When a candidate sends an interview request, the company user gets a real-time sound notification using socket.io.

Pages:
- Signup Page
- Signin Page
- Candidate Page
- Company Page
- Request Page (for company to see interview requests)

How Real-Time Works:
- When a candidate sends a request, a socket event `newInterViewRequestCreated` is emitted.
- Backend receives the event and broadcasts it to all clients.
- Frontend listens to the event and plays a sound notification.

Folder Structure:

Frontend:
- components/ – Navbar, PrivateRoute
- pages/ – SignupPage, SigninPage, CandidatePage, CompanyPage, RequestPage
- context/ – Context API for managing user and token state
- App.jsx – Contains all route handling using react-router

Backend:
- routes/ – userRoute.js, openingRoute.js, application.js
- config/ – MongoDB connection logic
- server.js – Main backend entry point with Express, Socket.io, and route setup



Example .env:
MONGO_URL=your_mongo_connection_string
JWT_SECRET=jwt_secret_key 




Port:
- Backend runs on: http://localhost:8080/
- Frontend runs on: http://localhost:5173/

Done.
