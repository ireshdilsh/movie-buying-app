# Movie Management Application - Frontend

A modern, full-featured movie management platform built with React, TypeScript, and Vite. This application provides separate interfaces for users and administrators to manage, purchase, and interact with movies.

## 🚀 Features

### User Features
- **Movie Discovery**: Browse and search through available movies
- **Purchase Movies**: Buy movies and add them to your collection
- **Favorites**: Mark movies as favorites for quick access
- **My Movies**: View your purchased movie collection
- **Movie Details**: View detailed information about each movie
- **Google OAuth**: Secure authentication with Google sign-in

### Admin Features
- **Dashboard**: Overview of platform statistics and activity
- **Add Movies**: Add new movies to the platform
- **Manage Movies**: Edit and delete existing movies
- **Sales Tracking**: Monitor movie purchases and transactions
- **Protected Routes**: Role-based access control

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.11.0
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: 
  - Headless UI 2.2.9
  - Hero Icons 2.2.0
- **Authentication**: React OAuth Google 0.13.4
- **HTTP Client**: Axios 1.13.2
- **JWT Handling**: jwt-decode 4.0.0

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- A backend API server running (this is a frontend-only application)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd ai_blogging_app
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (create a `.env` file):
```env
VITE_API_URL=<your-backend-api-url>
VITE_GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173` (default Vite port)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
ai_blogging_app/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── component/         # Reusable components
│   │   ├── AdminNavbar.tsx
│   │   ├── UserNavbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── interfaces/        # TypeScript interfaces
│   │   ├── comments.ts
│   │   ├── genre.ts
│   │   └── movie.ts
│   ├── pages/             # Page components
│   │   ├── LandingPage.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AddMovies.tsx
│   │   ├── ManageMovies.tsx
│   │   ├── GetMovieById.tsx
│   │   ├── UserMovieByID.tsx
│   │   ├── FavouriteMovies.tsx
│   │   ├── MyMovies.tsx
│   │   ├── BuyingMovies.tsx
│   │   └── AdminBuyingMovies.tsx
│   ├── App.tsx            # Main app component
│   ├── NavigateRoutes.tsx # Route configuration
│   └── main.tsx           # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔐 Authentication & Authorization

The application uses Google OAuth for authentication and implements role-based access control:

- **User Role**: Access to user dashboard, movie browsing, purchasing, and favorites
- **Admin Role**: Full access including movie management and sales tracking
- **Protected Routes**: Unauthorized access is automatically redirected

## 🎨 UI/UX

- Built with **Tailwind CSS** for modern, responsive design
- **Headless UI** components for accessible, customizable UI elements
- **Hero Icons** for consistent iconography
- Mobile-responsive design
- Dark mode support (if implemented)

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.0 | UI framework |
| typescript | 5.9.3 | Type safety |
| vite | 7.2.4 | Build tool |
| react-router-dom | 7.11.0 | Routing |
| tailwindcss | 4.1.18 | Styling |
| axios | 1.13.2 | API requests |
| @react-oauth/google | 0.13.4 | Google authentication |

## 🌐 API Integration

This frontend application communicates with a backend API. Make sure to:

1. Set the correct API URL in your environment variables
2. Ensure the backend server is running
3. Configure CORS on the backend to allow requests from the frontend

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `vite.config.ts`
2. **API connection errors**: Verify backend is running and VITE_API_URL is correct
3. **OAuth errors**: Check Google Client ID configuration

## 📝 Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write clean, maintainable code
- Follow the existing project structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

Your Name - Your Email

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters of this project

---

**Note**: This is the frontend application. Make sure to set up and run the backend API server separately.
