#  Wanderlust – Airbnb Clone (Full-Stack Web App)

Wanderlust is a full-stack Airbnb clone built using Node.js, Express, MongoDB, and EJS.  
It allows users to browse property listings, add listings, and view details. The app includes server-side and client-side validation, dynamic templating, and secure data handling.

---

##  Project Overview

Wanderlust is designed to simulate an Airbnb-like experience where users can:
- View property listings
- Add and manage listings
- See property details and images
- Search properties

The project follows the MVC architecture with clean routing and modular components.

---

##  Tech Stack

### Frontend
- EJS (Embedded JavaScript templates)
- HTML, CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication & Validation
- Client-side validation
- Server-side validation

### Other Tools
- Cloudinary for image storage (if configured)
- Environment variables support using dotenv

---

##  Features

- Property listing creation
- Dynamic templates with EJS
- Client and server validation
- MVC-based architecture
- Responsive UI
- CRUD operations for listings

---

##  How to Use This Project

If you want to **use, extend, or contribute to this project**, follow these steps:

1. **Fork the repository** to your own GitHub account.
2. **Clone the forked repository** to your local machine.
3. **Install dependencies** for both backend and frontend parts (if your project has a frontend folder).
4. **Configure environment variables** such as MongoDB URI, session secret, and Cloudinary keys.
5. **Modify or extend features** like search filters, reviews, authentication, etc.
6. **Deploy** to a hosting platform like Render, Heroku, Vercel, or any cloud server.

 Make sure to **add API keys and secrets** (such as database connection and Cloudinary) in a `.env` file and **do not commit them** to GitHub.

---

##  Project Structure
Wanderlust/
│
├── controllers/ # Backend logic and route handlers
├── models/ # Database models
├── routes/ # Express routes
├── views/ # EJS templates for frontend
├── public/ # Static assets (CSS, images, etc.)
├── utils/ # Utility functions
├── app.js # Main application file
├── cloudConfig.js # Cloudinary configuration
├── middleware.js # Custom middlewares
├── schema.js # Validation schemas
├── package.json
└── README.md
