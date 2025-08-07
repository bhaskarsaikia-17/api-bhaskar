# Bhaskar API Service

This is the API service for my.bhaskar.lol, designed to be easily deployed to Vercel.

## Features

- Profile data management
- Social links management
- File uploads for tracks
- JSON-based database storage

## API Endpoints

### Profile Data
- `GET /api/profile` - Get profile data
- `POST /api/profile` - Update profile data
- `PATCH /api/profile` - Update specific profile field

### Social Links
- `GET /api/social-links` - Get all social links
- `POST /api/social-links` - Add/update a social link
- `PUT /api/social-links` - Update all social links
- `DELETE /api/social-links/:platform` - Delete a social link

### Other
- `POST /api/upload-track` - Upload a track file
- `GET /api/health` - Health check endpoint

## Deployment to Vercel

### Prerequisites
- A Vercel account
- Vercel CLI installed (`npm i -g vercel`)

### Steps to Deploy

1. Login to Vercel CLI:
   ```
   vercel login
   ```

2. Navigate to the api-service directory:
   ```
   cd api-service
   ```

3. Deploy to Vercel:
   ```
   vercel
   ```

4. For production deployment:
   ```
   vercel --prod
   ```

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. The API will be available at http://localhost:3001

## Environment Variables

- `PORT` - Port number for local development (default: 3001)
- `NODE_ENV` - Environment ('development' or 'production')

## Data Storage

The API uses JSON files for data storage:
- `db/profile_data.json` - Profile information
- `db/social_links.json` - Social media links

Crafted With <3 By Bhaskar 