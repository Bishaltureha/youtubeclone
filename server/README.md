# YouTube ID API

A Node.js application that fetches YouTube IDs from MongoDB and serves them via REST API.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Make sure MongoDB is running locally or update the MONGODB_URI in your .env file

4. Start the server:

```bash
npm start
```

## API Endpoints

- `GET /api/youtube-ids` - Get all YouTube IDs with pagination
- `GET /api/youtube-ids/:id` - Get specific YouTube video by ID
- `GET /health` - Health check endpoint

## Database Schema

The application expects a MongoDB collection named `youtube_videos` with documents containing:

- `videoId` (required, unique): YouTube video ID
