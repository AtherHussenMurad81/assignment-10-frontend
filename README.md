# Online Learning Platform

A full-stack online learning platform where users can explore courses, enroll in them, and manage their learning activities. This platform emphasizes smooth interaction, intuitive UI, and efficient data management.

---

## Features

- **User Authentication:** Users can register and log in using Email/Password or Google authentication.
- **Course Management:** Instructors can perform CRUD operations (Create, Read, Update, Delete) on courses.
- **Enrollment System:** Users can enroll in courses and view their enrolled courses in a personalized dashboard.
- **Responsive UI:** Fully responsive design with consistent layouts, buttons, and typography using Tailwind CSS.
- **Interactive Home Page:** Includes Hero/Banner, Popular Courses, Why Choose Us, and Top Instructors sections with animations (Framer Motion/AOS).
- **Dynamic Pages:** View single course details, enroll, and interact with instructor info dynamically fetched from MongoDB.
- **Toast Notifications:** Friendly alerts for errors, successes, and informational messages.
- **Loading Spinners & 404 Page:** Visual feedback when fetching data and a custom 404 page for invalid routes.

---

## Pages & Functionality

1. **Home Page**

   - Hero/Banner section
   - Popular Courses (6 featured courses)
   - ‘Why Choose Us’ and ‘Top Instructors’ sections
   - Animations for smooth UI experience

2. **Authentication**

   - Login and Registration with validation
   - Google Social Login
   - Password validation (uppercase, lowercase, min. 6 characters)

3. **Courses**

   - All Courses Page with filtering by category
   - Single Course Details Page (Private Route) with “Enroll Now” button
   - Add, Update, Delete Course functionalities for instructors
   - My Courses and My Enrolled Courses dashboard pages

4. **Other Features**
   - Auto-filled instructor info in course creation
   - Dark/Light theme toggle (optional)
   - Advanced filtering and animations

---

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Framer Motion, AOS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Firebase Authentication (Email/Password & Google)
- **Image Upload:** imgbb API

---

## How to Run

1. **Clone the repository**

   ```bash

   ```
