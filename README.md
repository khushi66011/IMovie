# IMovies Cinema

IMovies Cinema is a full-stack movie ticket booking application built using React, Vite, Express.js, and MongoDB.

## Features

- Browse and search movies
- Filter movies by genre
- User authentication
- Demo account login
- Interactive seat selection
- VIP and Standard seating
- Dynamic ticket pricing
- 18% GST calculation
- UPI, Card, and Net Banking payment options
- Digital E-Ticket generation
- QR Code on tickets
- Print / Save PDF
- Booking history
- Live IST clock

## Tech Stack

- React
- Vite
- JavaScript
- Node.js
- Express.js
- MongoDB
- REST API

## Project Structure

```text
IMovies/
├── client/
├── server/
├── package.json
└── README.md
```

## Installation

### Backend

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\server
npm install
npm start
```

Backend:

```text
http://localhost:5000
```

API:

```text
http://localhost:5000/api
```

### Frontend

Open another terminal:

```powershell
cd C:\Users\Lenovo\.gemini\antigravity\scratch\IMovies\client
npm install
npm run dev
```

Frontend:

```text
http://localhost:3002/
```

## Demo Account

```text
Email: rajesh@example.com
Password: password123
```

## Seat Pricing

| Seat Type | Rows | Price |
|---|---|---:|
| VIP Recliner | A, B | ₹450 |
| Standard Classic | C, D, E | ₹250 |

An additional **18% GST** is calculated automatically.

## Booking Flow

```text
Browse Movies
→ Sign In
→ Select Movie
→ Select Date & Showtime
→ Select Seats
→ Review Price + GST
→ Select Payment
→ Confirm Booking
→ Generate E-Ticket
→ View Booking History
```

## Testing

1. Open `http://localhost:3002/`
2. Sign in using the demo account.
3. Select a movie and click `Book Tickets`.
4. Select date, showtime, and seats.
5. Verify subtotal, GST, and grand total.
6. Select payment method and confirm booking.
7. Verify the E-Ticket and QR Code.
8. Test `Print / Save PDF`.
9. Check `My Bookings`.

## Project Purpose

IMovies Cinema demonstrates a complete movie booking workflow with frontend, backend, database integration, authentication, seat selection, billing, digital tickets, and booking history.

## License

This project is created for educational and portfolio purposes.
