# Build-a-Workout

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## Table of Contents

- [About the Project](#about-the-project)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Usage / Demo](#usage--demo)  
- [Future Scope](#future-scope)  
- [License](#license)  

---

## About the Project

**Build-a-Workout** is a full-stack web application designed to help you create and organize your own custom workout routines.  

It’s a portfolio project, but it’s also fully usable — I personally use it to plan my workouts! Users can add exercises, group them into routines, and manage their personal collection of workouts.  

The app emphasizes a clean, beginner-friendly UI and includes authentication to ensure each user only sees their own exercises and routines.

---

## Features

- User authentication with JWT — each account has private exercises and routines.  
- Add, view, and delete exercises with title, sets, reps, and load.  
- Build custom routines by selecting from your exercises.  
- Interactive tutorial “Getting Started” page with GIF demos for onboarding.  
- Fully responsive layout for desktop and mobile.  

---

## Tech Stack

- **Frontend:** React, HTML, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JSON Web Tokens (JWT)  

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/) (or a MongoDB Atlas account)  

### Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/build-a-workout.git
cd build-a-workout
```

2. Install dependencies for both frontend and backend:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Create a `.env` file in the `backend` folder with the following variables:
```bash
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
PORT=5000
```

4. Run the backend and frontend:
```bash
# In one terminal (backend)
cd backend
npm run dev

# In another terminal (frontend)
cd frontend
npm start
```
The app should now be running locally at `http://localhost:3000`.

---

## Usage / Demo

Once logged in, you can:
1. Add exercises:
2. Build routines from your exercises:

**Tip**: A full Getting Started guide is available on the home page after you create an account.

---

## Future Scope
Planned improvements and features for future versions:
* Edit functionality for exercises and routines.
* Ability to download routines (PDF or Notes app format).
* Add a to-do list style feature for exercises to check off sets in real time.
* Enhance animations and interactive UI feedback.
* Option to share routines with other users.

---

## License

This project is licensed under the MIT License
