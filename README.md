# 🌍 Vista – Travel Listing Platform

Vista is a full-stack travel listing web application designed to allow users to explore, create, and review travel destinations. The platform implements secure authentication, RESTful routing, and cloud-based image storage.

The goal of this project was to build a production-style web application following MVC architecture and best backend practices.

---

## 🏗 Architecture Overview

Vista follows the MVC (Model-View-Controller) pattern:

- Models → MongoDB schemas (Listings, Users, Reviews)
- Views → EJS templates
- Controllers → Business logic
- Routes → RESTful API structure

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS Templates
- Passport.js (Authentication)
- Cloudinary (Image Upload)
- Bootstrap

---

## 🔐 Core Features

- Secure user authentication (Login / Register)
- Authorization (Owner-only edit/delete access)
- CRUD operations for travel listings
- Review system with relational referencing
- Cloud-based image uploads
- Flash messaging system
- RESTful routing structure

---

## 📦 Installation

1. Clone the repository:
   git clone https://github.com/srujana-manda/<repo-name>.git

2. Install dependencies:
   npm install

3. Configure environment variables:
   - MONGO_URL
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_KEY
   - CLOUDINARY_SECRET

4. Start server:
   node app.js

---

## 🌟 Key Learning Outcomes

- Implemented secure authentication & session management
- Designed scalable backend structure
- Practiced clean code separation using MVC
- Integrated third-party cloud storage service
- Built production-style REST APIs

---

## 📌 Future Enhancements

- Pagination & advanced filtering
- API versioning
- Unit testing
- Migration to React frontend
- Deployment on AWS / Render

---

## 👩‍💻 Author

Srujana Manda  
Full-Stack Web Developer  
GitHub: https://github.com/srujana-manda
