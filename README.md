# Musician for Hire - Social Platform for Musicians and Artists

## Overview
Musician for Hire is a dynamic social platform and SaaS designed to foster connections within the music and arts community. It enables musicians and artists to showcase their talent and collaborate, while providing a streamlined booking experience for various clients, including individual organizers, event planners, and bands seeking freelance artists. The platform supports live performances, recording sessions, creative services, and integrated music distribution.

## Features
- **Talent Listing & Filtering:** Browse and filter musicians/artists by genre, instrument, location, service type, user type (individual/band), band size, and instrument needed.
- **Talent Detail Pages:** View detailed profiles, including bios, rates, availability (via calendar), and media samples.
- **Booking System:** Clients (individuals, organizers, bands) can submit booking requests for talent. Talent can manage (accept/decline) bookings.
- **Review System:** Clients can submit ratings and comments for talent.
- **In-platform Messaging:** Users can communicate directly with talent.
- **Music Distribution (Simulated):** Musicians can upload tracks and initiate simulated distribution to streaming platforms.
- **Music Analytics (Simulated):** View simulated analytics for distributed music.
- **Availability Management:** Talent can manage their availability using a calendar interface.

## Tech Stack
- **Frontend:** React.js, React Router, CSS
- **Backend:** Node.js, Express.js
- **Database (Simulated):** In-memory data storage (for this prototype)
- **Other:** CORS

## Setup and Running the Project

### Prerequisites
- Node.js (LTS version recommended)
- npm (Node Package Manager)

### 1. Clone the Repository
```bash
git clone git@github.com:smile-plzz/MusicianForHire.git
cd MusicianForHire
```

### 2. Backend Setup
Navigate to the `backend` directory, install dependencies, and start the server.
```bash
cd backend
npm install
node index.js &
```

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the development server.
```bash
cd frontend
npm install
npm start
```

### 4. Access the Application
Once both servers are running, open your web browser and navigate to `http://localhost:3000` (or the address provided by the React development server).

## Development Log
For a detailed history of development progress, refer to `development.log`.
