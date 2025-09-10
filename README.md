# Clinify Backend 🛠️

## Project Overview
**Clinify** is a web and mobile platform designed to digitize and streamline clinic services.  
It manages patients, doctors, assistants, and consultations while providing patients with notifications for appointments, medication reminders, and personalized health tips.  

This backend handles all server-side logic, authentication, and database interactions.

---

## Features 
- Patient management (registration, history, notifications)  
- Doctor and assistant management  
- Scheduling and consultation management  
- Medication reminders for patients  
- Health tips tailored to patient profiles  
- Web and mobile accessibility via RESTful API

---

## Technology Stack 
<p align="left">
  <a href="https://nodejs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js" width="60" height="60"/> </a>
  <a href="https://expressjs.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="Express" width="60" height="60"/> </a>
  <a href="https://www.mysql.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" width="60" height="60"/> </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="HTML" width="60" height="60"/> </a>
  <a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="60" height="60"/> </a>
</p>

---

## Architecture 
The platform uses a **microservices architecture**, ensuring scalability and maintainability.  
Backend services communicate with the database and provide RESTful APIs to the frontend and mobile app.

---

## Setup and Installation 

### Prerequisites
- Node.js  
- Angular CLI (for frontend integration)  
- MySQL  
- Android Studio (for mobile app development)

### Steps to Run the Backend
1. **Clone the repository**  
   ```bash
   git clone https://github.com/AyachyIbtyssem/Clinify/
2. Install dependencies: npm install
3. Configure database:
   Create a MySQL database for Clinify
   Update .env file with your credentials:
   
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=clinify
3. Run the server: npm start
