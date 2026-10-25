# IMovies Cinema

IMovies Cinema is a full-stack movie ticket booking application developed using React, Vite, Express.js, and MongoDB. The application allows users to browse movies, search and filter movies, sign in, select show dates and showtimes, choose seats, calculate ticket prices with GST, complete a simulated payment process, and receive a digital E-Ticket with a QR Code.

The application also provides booking history and allows users to reopen and print their previously generated E-Tickets.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Application URLs](#application-urls)
- [Demo Account](#demo-account)
- [Application Workflow](#application-workflow)
- [Movie Search and Filtering](#movie-search-and-filtering)
- [Authentication](#authentication)
- [Movie Ticket Booking](#movie-ticket-booking)
- [Seat Selection](#seat-selection)
- [Pricing and GST Calculation](#pricing-and-gst-calculation)
- [Payment](#payment)
- [Digital E-Ticket](#digital-e-ticket)
- [Booking History](#booking-history)
- [MongoDB Configuration](#mongodb-configuration)
- [Environment Variables](#environment-variables)
- [API](#api)
- [Testing Checklist](#testing-checklist)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Project Purpose](#project-purpose)
- [License](#license)

---

## Project Overview

IMovies Cinema is designed to provide a complete online movie ticket booking experience.

The application contains two major parts:

1. Frontend
   - Built using React and Vite
   - Provides the user interface and interactive booking experience
   - Runs on port `3002`

2. Backend
   - Built using Node.js and Express.js
   - Provides REST API services
   - Connects the application with MongoDB
   - Runs on port `5000`

The complete application flow is:

```text
Movie Discovery
      |
      v
Search and Filtering
      |
      v
User Sign In
      |
      v
Movie Selection
      |
      v
Show Date and Showtime
      |
      v
Seat Selection
      |
      v
Price + 18% GST
      |
      v
Payment Selection
      |
      v
Booking Confirmation
      |
      v
Digital E-Ticket
      |
      v
Booking History
```

---

## Features

### Movie Discovery

- Movie listing
- Movie cards
- Movie details
- Search functionality
- Genre filtering
- Director-based search
- Multiple movie categories

### Authentication

- User sign-in
- Demo account
- Quick Demo Account Fill
- Authentication-based booking flow

### Ticket Booking

- Movie selection
- Show date selection
- Showtime selection
- Interactive seat matrix
- VIP Recliner seats
- Standard Classic seats
- Dynamic ticket calculation
- Automatic 18% GST calculation

### Payment

The application supports multiple payment options:

- UPI
- Card
- Net Banking

### E-Ticket

After successful booking, users receive a digital E-Ticket containing:

- Movie name
- Theatre information
- Show date
- Showtime
- Selected seats
- Ticket price
- GST
- Grand total
- Booking information
- QR Code

### Booking History

Users can:

- View confirmed bookings
- View previous booking information
- Reopen digital E-Tickets
- Print or save E-Tickets as PDF

### Additional Features

- Live Indian Standard Time clock
- Responsive user interface
- Real-time billing updates
- Interactive seat selection
- QR Code generation
- Print-friendly E-Ticket layout

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | Frontend UI development |
| Vite | Development server and build tool |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| REST API | Client-server communication |
| MongoDB | Database |
| Mongoose | MongoDB object modeling, if configured |

### Other Technologies

| Technology | Purpose |
|---|---|
| QR Code | Digital ticket verification |
| Browser Print API | Print / Save PDF functionality |
| npm | Package management |

---

## Project Structure

```text
IMovies/
|
|-- client/
|   |
|   |-- public/
|   |
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- assets/
|   |   |-- services/
|   |   |-- App.*
|   |   `-- main.*
|   |
|   |-- package.json
|   `-- ...
|
|-- server/
|   |
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- middleware/
|   |-- config/
|   |-- server.*
|   |
|   |-- package.json
|   `-- ...
|
|-- package.json
`-- README.md
```

The exact folder names may vary depending on the current implementation of the project.

---

## Prerequisites

Before running the project, make sure the following software is installed:

- Node.js
- npm
- MongoDB
- Git

Check Node.js:

```powershell
node --version
```

Check npm:

```powershell
npm --version
```

Check MongoDB according to your MongoDB installation.

---

## Installation

Clone or download the project and open the project directory.

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies
```

### Install Backend Dependencies

Navigate to the server directory:

```powershell
cd server
```

Install dependencies:

```powershell
npm install
```

### Install Frontend Dependencies

Open another terminal and navigate to the client directory:

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\client
```

Install dependencies:

```powershell
npm install
```

---

# Running the Application

The application requires both the backend server and frontend development server to be running.

## Terminal 1 — Start Backend Server

Open PowerShell and navigate to the server directory:

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\server
```

Start the backend:

```powershell
npm start
```

The backend server runs on:

```text
http://localhost:5000
```

API base URL:

```text
http://localhost:5000/api
```

Expected output:

```text
IMovies Cinema Server running on port 5000
API Base URL: http://localhost:5000/api
```

---

## Terminal 2 — Start Frontend Client

Open a second PowerShell terminal.

Navigate to the client directory:

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\client
```

Start the Vite development server:

```powershell
npm run dev
```

The frontend application runs on:

```text
http://localhost:3002/
```

Open this URL in your browser:

```text
http://localhost:3002/
```

---

## Running from the Root Directory

If the root `package.json` contains the required scripts, the backend and frontend can also be started from the root directory.

Navigate to:

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies
```

### Terminal 1

```powershell
npm run server
```

### Terminal 2

```powershell
npm run client
```

After both servers are running, open:

```text
http://localhost:3002/
```

---

# Application URLs

| Application | URL |
|---|---|
| Frontend | http://localhost:3002/ |
| Backend | http://localhost:5000 |
| API Base URL | http://localhost:5000/api |

---

# Demo Account

The project provides a demo account for testing the authentication and booking functionality.

```text
Email: rajesh@example.com
Password: password123
```

Users can also use the Quick Demo Account Fill option available on the Sign In page.

After filling the credentials, select:

```text
Sign In & Continue
```

---

# Application Workflow

## Step 1 — Open the Application

Open the frontend application:

```text
http://localhost:3002/
```

The home page displays the available movies.

The navigation bar provides access to major application features.

---

## Step 2 — Check the Live IST Clock

The navigation bar displays a live Indian Standard Time clock.

The clock continuously updates according to Indian Standard Time.

---

## Step 3 — Search for Movies

Use the search bar to search for movies.

Example searches:

```text
Kalki
Nolan
Action
```

The movie list updates according to the search query.

---

## Step 4 — Filter Movies

Users can filter movies using available genre buttons.

Example genres include:

```text
Sci-Fi
Action
Drama
```

Selecting a genre displays movies matching the selected category.

---

## Step 5 — Sign In

Click:

```text
Sign In
```

in the navigation bar.

Use the demo account:

```text
Email: rajesh@example.com
Password: password123
```

Alternatively, use:

```text
Quick Demo Account Fill
```

and then click:

```text
Sign In & Continue
```

---

# Movie Ticket Booking

## Step 1 — Select a Movie

Choose any available movie.

For example:

```text
Kalki 2898 AD
```

Click:

```text
Book Tickets
```

---

## Step 2 — Select Show Date

Select the required show date from the available dates.

---

## Step 3 — Select Showtime

Select the desired showtime.

The application then displays the available seat matrix.

---

# Seat Selection

The cinema provides two major seating categories.

## VIP Recliners

```text
Rows: A, B
Price: ₹450 per seat
```

VIP Recliner seats provide premium seating.

---

## Standard Classic

```text
Rows: C, D, E
Price: ₹250 per seat
```

Standard Classic seats provide regular cinema seating.

---

## Interactive Seat Matrix

The seat matrix provides visual feedback for seat availability.

Users can:

- Select available seats
- Deselect selected seats
- View selected seats
- View ticket quantity
- View updated pricing

The booking summary updates whenever the seat selection changes.

---

# Pricing and GST Calculation

The application dynamically calculates the ticket amount.

The calculation consists of:

```text
Subtotal
+
18% GST
=
Grand Total
```

### Pricing

| Seat Category | Rows | Price |
|---|---|---:|
| VIP Recliners | A, B | ₹450 |
| Standard Classic | C, D, E | ₹250 |

### Calculation Formula

```text
Subtotal = Total price of selected seats

GST = Subtotal × 18 / 100

Grand Total = Subtotal + GST
```

Example:

```text
Selected VIP Seat = ₹450

Subtotal = ₹450

GST = ₹450 × 18%
     = ₹81

Grand Total = ₹450 + ₹81
            = ₹531
```

The actual total changes automatically based on the number and type of seats selected.

---

# Payment

After selecting the seats and reviewing the total amount, users can select their preferred payment method.

Available options:

```text
UPI
Card
Net Banking
```

Select:

```text
Confirm & Pay
```

to complete the booking flow.

The payment process in the project represents the application booking workflow and can be integrated with a real payment gateway for production use.

---

# Booking Confirmation

After successful booking, the application displays a confirmation message:

```text
Congratulations! Your ticket has been booked.
```

The application then generates the user's digital E-Ticket.

---

# Digital E-Ticket

The E-Ticket provides a digital representation of the confirmed movie booking.

It includes:

- Movie name
- Show date
- Showtime
- Theatre information
- Selected seats
- Ticket category
- Ticket quantity
- Subtotal
- GST
- Grand total
- Booking details
- QR Code

The E-Ticket uses a ticket-style layout with a perforated ticket border design.

---

# QR Code

A QR Code is generated for the digital E-Ticket.

The QR Code can be scanned to represent the booking verification information.

This feature can be extended in a production environment to support server-side ticket verification.

---

# Print / Save PDF

The E-Ticket includes:

```text
Print / Save PDF
```

Users can select this option to open the browser's print interface.

From the browser print dialog, users can:

- Print the ticket
- Save the ticket as a PDF

This provides a paperless way to store the movie ticket.

---

# Booking History

Users can access:

```text
My Bookings
```

from the navigation bar.

The booking history displays confirmed tickets.

Users can:

- View previous bookings
- Open previous E-Tickets
- Review movie information
- Review show date and time
- Review selected seats
- Review payment information
- Print or save the E-Ticket

---

# MongoDB Configuration

The backend uses MongoDB for storing application data.

Make sure MongoDB is running before starting the backend server.

The MongoDB connection should be configured using environment variables.

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace the placeholder MongoDB connection string with your actual database connection string.

Do not expose database credentials in source code or commit private credentials to a public repository.

---

# Environment Variables

If the backend uses environment variables, create a `.env` file inside the server directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Depending on the implementation, additional environment variables may be required.

Do not upload the `.env` file to a public GitHub repository if it contains private credentials.

A `.gitignore` file should include:

```text
.env
node_modules/
dist/
```

---

# API

The backend API is available at:

```text
http://localhost:5000/api
```

The React frontend communicates with the Express backend through REST API requests.

The backend manages application operations such as:

- User authentication
- Movie data
- Booking data
- Ticket information
- Database operations

The exact API endpoints depend on the backend implementation.

---

# Testing Checklist

The following checklist can be used to test the complete application.

## Application

- [ ] Frontend starts successfully
- [ ] Backend starts successfully
- [ ] Home page loads correctly
- [ ] Navigation bar works correctly
- [ ] Live IST clock works correctly

## Movie Discovery

- [ ] Movies are displayed
- [ ] Movie cards load correctly
- [ ] Search works
- [ ] Genre filters work
- [ ] Movie selection works

## Authentication

- [ ] Sign In page opens
- [ ] Demo Account Fill works
- [ ] Demo credentials work
- [ ] Sign In & Continue works
- [ ] User can access booking functionality

## Seat Booking

- [ ] Book Tickets button works
- [ ] Show date selection works
- [ ] Showtime selection works
- [ ] Seat matrix is displayed
- [ ] VIP Recliner seats can be selected
- [ ] Standard Classic seats can be selected
- [ ] Seats can be deselected
- [ ] Selected seats are displayed correctly

## Billing

- [ ] Subtotal updates correctly
- [ ] 18% GST is calculated correctly
- [ ] Grand Total updates correctly
- [ ] Different seat categories calculate correctly

## Payment

- [ ] UPI option is available
- [ ] Card option is available
- [ ] Net Banking option is available
- [ ] Confirm & Pay works
- [ ] Booking confirmation appears

## E-Ticket

- [ ] E-Ticket is generated
- [ ] Movie information is correct
- [ ] Show date is correct
- [ ] Showtime is correct
- [ ] Selected seats are correct
- [ ] Ticket price is correct
- [ ] GST is correct
- [ ] Grand Total is correct
- [ ] QR Code is displayed
- [ ] Print / Save PDF works

## Booking History

- [ ] My Bookings page opens
- [ ] Confirmed bookings are displayed
- [ ] Previous E-Tickets can be reopened
- [ ] Previous tickets can be printed or saved

---

# Troubleshooting

## Backend Does Not Start

Navigate to the server directory:

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\server
```

Install dependencies:

```powershell
npm install
```

Start the server:

```powershell
npm start
```

Also verify that MongoDB is running.

---

## Frontend Does Not Start

Navigate to the client directory:

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\client
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Then open:

```text
http://localhost:3002/
```

---

## Frontend Cannot Connect to Backend

If the frontend cannot communicate with the backend, verify:

1. Backend server is running.
2. Backend is running on port `5000`.
3. Frontend is running on port `3002`.
4. API base URL is configured correctly.
5. MongoDB is running.
6. Required environment variables are configured.
7. No firewall or port conflict is blocking the application.

---

## Port 3002 Is Already in Use

If port `3002` is already being used by another process, stop the existing process or configure Vite to use another available port.

If the port is changed, update the frontend URL accordingly.

---

## Port 5000 Is Already in Use

If port `5000` is already being used, stop the existing backend process or configure the backend to use another available port.

If the backend port is changed, make sure the frontend API configuration is also updated.

---

# Development Commands

## Install Backend Dependencies

```powershell
cd server
npm install
```

## Install Frontend Dependencies

```powershell
cd client
npm install
```

## Start Backend

```powershell
cd server
npm start
```

## Start Frontend

```powershell
cd client
npm run dev
```

## Frontend URL

```text
http://localhost:3002/
```

## Backend URL

```text
http://localhost:5000
```

---

# Future Improvements

The following features can be added in future versions:

- Admin dashboard
- Admin authentication
- Movie management
- Theatre management
- Screen management
- Showtime management
- Real payment gateway integration
- Email ticket confirmation
- SMS booking notifications
- User profile management
- Password reset
- Movie reviews
- Movie ratings
- Favourite movies
- Watchlist
- Advanced movie sorting
- Multiple theatre locations
- Real-time seat locking
- Booking cancellation
- Refund management
- Online ticket verification
- Production deployment
- Cloud database integration
- Cloud storage for ticket documents
- Analytics dashboard

---

# Production Considerations

Before deploying the application to production, the following improvements are recommended:

- Use secure environment variables
- Enable HTTPS
- Use production MongoDB
- Add proper authentication and authorization
- Hash and securely manage passwords
- Implement server-side validation
- Add API rate limiting
- Configure CORS securely
- Add proper error handling
- Implement real payment gateway verification
- Implement server-side ticket verification
- Add logging and monitoring
- Use production builds for the frontend
- Deploy backend and frontend using appropriate hosting services

---

# Project Purpose

The purpose of IMovies Cinema is to demonstrate a complete full-stack movie ticket booking workflow.

The project demonstrates practical concepts including:

- React application development
- Vite configuration
- Express.js backend development
- REST API integration
- MongoDB database integration
- User authentication
- Search and filtering
- Interactive seat selection
- Dynamic price calculation
- GST calculation
- Payment workflow
- Digital ticket generation
- QR Code integration
- Booking history
- Browser-based PDF generation

The project can be used as an academic project, portfolio project, or foundation for developing a production-ready cinema booking platform.

---

# User Flow

```text
Open IMovies
     |
     v
Browse Movies
     |
     v
Search / Filter
     |
     v
Sign In
     |
     v
Select Movie
     |
     v
Select Date
     |
     v
Select Showtime
     |
     v
Select Seats
     |
     v
Review Subtotal
     |
     v
Calculate 18% GST
     |
     v
Review Grand Total
     |
     v
Select Payment Method
     |
     v
Confirm & Pay
     |
     v
Booking Confirmation
     |
     v
Generate E-Ticket
     |
     v
View QR Code
     |
     v
Print / Save PDF
     |
     v
My Bookings
```

---

# Quick Start

For a quick setup, use the following commands.

### Terminal 1

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\server
npm install
npm start
```

### Terminal 2

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\client
npm install
npm run dev
```

Then open:

```text
http://localhost:3002/
```

Backend API:

```text
http://localhost:5000/api
```

---

# Demo Credentials

```text
Email: rajesh@example.com
Password: password123
```

---

# License

This project is developed for educational, demonstration, and portfolio purposes.

If the project is distributed publicly, an appropriate open-source license can be added based on the project's intended usage.

---

# Author

IMovies Cinema

A full-stack movie ticket booking application demonstrating modern web development using React, Vite, Express.js, and MongoDB.
