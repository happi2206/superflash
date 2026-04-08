# SuperFlash – Web Development Flashcard Learning App

## 1. Project Overview

SuperFlash is a full-stack flashcard learning application designed to help users study and retain key web development concepts such as React, APIs, and databases. The app provides a focused and interactive study experience through timed sessions, categorized flashcards, and a clean, distraction-free interface.

---

## 2. Problem Statement

Learning technical concepts can be repetitive and inefficient without structured tools. Many learners struggle to stay focused or retain information when studying large volumes of material.

SuperFlash addresses this problem by providing an interactive flashcard system that encourages active recall, supports structured learning through categories and difficulty levels, and improves focus using timed study sessions.

---

## 3. Technical Stack

**Frontend**

* React (Single Page Application)
* Tailwind CSS (styling and layout)

**Backend**

* Node.js
* Express.js (REST API)

**Database**

* MongoDB (MongoDB Atlas)

**Routing & Architecture**

* SPA architecture using React component-based rendering
* RESTful API communication between frontend and backend

**Deployment**

* Designed for local development and can be deployed using platforms such as Vercel (frontend) and Render (backend)

---

## 4. Features

* Full CRUD functionality (Create, Read, Update, Delete flashcards)
* Study Mode with one-card-at-a-time learning
* Timer per card with visual countdown
* Category filtering (React, APIs, Databases)
* Difficulty tagging (easy, medium, hard)
* Smooth transitions and card animations
* Responsive mobile-friendly design
* Clean dark-mode UI
* Session-based learning flow with restart functionality

---

## 5. Folder Structure

```text
superflash/
├── client/          # React frontend
├── server/          # Express backend and API
├── database/        # Exported MongoDB data
│   └── cards.json
├── README.md
```

---

## 6. How to Run the Project

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the server:

```bash
node server.js
```

---

### Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 7. Database Setup

To run this project, you need a MongoDB database.

### Option 1: MongoDB Atlas

1. Create a free cluster at https://www.mongodb.com/atlas
2. Create a database user
3. Allow access from:

```
0.0.0.0/0
```

4. Add your connection string to `.env`

---

### Option 2: Use Provided Dataset

A sample dataset is included:

```
/database/cards.json
```

This can be imported into MongoDB to populate the application.

---

## 8. Challenges and Solutions

One of the main challenges was designing a smooth and intuitive study flow without introducing unnecessary steps or complexity. Managing state transitions between flashcards while maintaining a responsive UI required careful handling of React state and component updates. Implementing the timer feature in a way that felt natural and not disruptive to the user experience was also challenging. Additionally, ensuring consistent responsiveness across different screen sizes required multiple layout refinements. Finally, integrating the frontend with the backend API while maintaining clean and readable code structure required thoughtful separation of concerns.

---

## 9. Notes

* The application behaves as a Single Page Application (SPA)
* All flashcard data is stored and managed through a backend database
* The UI is designed to prioritize clarity, responsiveness, and usability

---

## Author

Happiness
