# Movie App Backend

A RESTful API backend for a movie application built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Movie Management**: Create, read, update, and delete movies with image upload support
- **Genre Management**: Organize movies by genres
- **User Authentication**: Secure user registration and login with JWT
- **Comments**: Users can comment on movies
- **Favorites & Purchases**: Track user favorites and movie purchases
- **Image Upload**: Cloudinary integration for movie poster uploads
- **Search**: Search functionality for movies

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **File Upload**: Multer + Cloudinary
- **Development**: ts-node-dev for hot reload

## Project Structure

```
src/
├── server.ts              # Application entry point
├── config/
│   ├── cloudinary.ts      # Cloudinary configuration
│   └── dbConfig.ts        # MongoDB connection
├── controllers/
│   ├── comment.controller.ts
│   ├── genre.controller.ts
│   ├── movie.controller.ts
│   └── user.controller.ts
├── middlewares/
│   ├── auth.ts            # JWT authentication middleware
│   └── upload.ts          # Multer file upload middleware
├── models/
│   ├── comment.model.ts
│   ├── favorite.model.ts
│   ├── genre.model.ts
│   ├── movie.model.ts
│   ├── purchase.model.ts
│   └── user.model.ts
└── routes/
    ├── comment.route.ts
    ├── genre.route.ts
    ├── movie.route.ts
    └── user.route.ts
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie_app_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=5000
```

## Scripts

- **Development**: `npm run dev` - Run the server with hot reload
- **Build**: `npm run build` - Compile TypeScript to JavaScript
- **Production**: `npm start` - Run the compiled production build

## API Endpoints

### Movies
- `POST /api/movies/post/new/movie` - Create a new movie (with image upload)
- `GET /api/movies/get/movies` - Get all movies
- `GET /api/movies/search` - Search movies
- `GET /api/movies/get/movie/:id` - Get a specific movie by ID
- `DELETE /api/movies/delete/movie/:id` - Delete a movie

### Genres
- Available at `/api/genres`

### Comments
- Available at `/api/comments`

### Users
- Available at `/api/users`

## Development

1. Start the development server:
```bash
npm run dev
```

2. The server will run on `http://localhost:5000`

3. Make changes to the TypeScript files in the `src/` directory. The server will automatically restart on file changes.

## Building for Production

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

The compiled JavaScript files will be in the `dist/` directory.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## File Uploads

Movie posters are uploaded using Multer and stored on Cloudinary. The upload middleware handles single image uploads with the field name `image`.

## Database Models

- **User**: User accounts with authentication
- **Movie**: Movie information with posters
- **Genre**: Movie categories
- **Comment**: User comments on movies
- **Favorite**: User favorite movies
- **Purchase**: Movie purchase records

## Error Handling

The API includes error handling middleware for:
- Authentication errors
- Validation errors
- Database errors
- File upload errors

## CORS

CORS is enabled for all origins. Configure it in [server.ts](src/server.ts#L11) for production use.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Contact

For questions or support, please open an issue in the repository.
