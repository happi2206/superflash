# SuperFlash – Web Development Flashcard App

## Overview

SuperFlash is a full-stack flashcard learning application designed to help users study and retain web development concepts such as React, APIs, and databases. The app provides a focused, interactive study experience through timed sessions, smooth transitions, and a clean modern interface.

This application behaves as a single-page application (SPA), dynamically updating content without page reloads.

---

## Problem

Learning technical concepts can be repetitive and inefficient without structured tools. Many learners struggle to stay focused or retain information when studying large amounts of material.

SuperFlash solves this by providing an intuitive flashcard system with timed study sessions, categorized content, and a distraction-free interface that encourages active recall.

---

## Features

* Create, edit, and delete flashcards (Full CRUD functionality)
* Study mode with one-card-at-a-time focus
* Timer per card with visual countdown
* Smooth card transitions and animations
* Category filtering (React, APIs, Databases)
* Difficulty tagging (easy, medium, hard)
* Session-based learning flow
* Responsive design for mobile and desktop
* Clean dark-themed UI for better readability

---

## Tech Stack

**Frontend**

* React
* Tailwind CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB (MongoDB Atlas)

---

## Folder Structure

```text
superflash/
├── client/          # React frontend
├── server/          # Express backend and API
├── database/        # Exported MongoDB data
│   └── cards.json
├── README.md
```

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd superflash
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5050
```

Start the backend server:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

The application will open in your browser.

---

## 🔐 Database Setup

To run this project, you will need a MongoDB database.

### Option 1: MongoDB Atlas (Recommended)

1. Create a free cluster at https://www.mongodb.com/atlas
2. Create a database user (username and password)
3. Go to Network Access and allow:

```
0.0.0.0/0
```

4. Copy your connection string
5. Paste it into your `.env` file as `MONGO_URI`

---

### Option 2: Use Provided Dataset

A sample dataset is included in:

```
/database/cards.json
```

You can import this into your MongoDB database to quickly populate the app.

---

## Challenges Faced

* Designing a smooth and intuitive study flow without unnecessary steps
* Managing state transitions between flashcards and animations
* Implementing a timer that integrates naturally into the user experience
* Ensuring consistent responsiveness across different screen sizes
* Connecting the frontend and backend cleanly using REST APIs

---

## Notes

* This application is designed to behave as a seamless SPA with dynamic updates.
* Backend integration ensures all flashcard data is persisted in a database.
* The UI prioritizes clarity, responsiveness, and smooth interaction.

---

## Author

Happiness
