import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Favorite } from '../models/favorite.model';
import { Purchase } from '../models/purchase.model';
import { Movie } from '../models/movie.model';

const generateToken = (id: string, name: string, email: string, role: string): string => {
  const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(
    { id, name, email, role },
    jwtSecret,
    { expiresIn } as SignOptions
  );
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
      return;
    }

    // Create user (password will be hashed by pre-save middleware)
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user', // Default to 'user' if not specified
    });

    // Generate token
    const token = generateToken(user._id.toString(), user.name, user.email, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
      return;
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Generate token with role, name, and email
    const token = generateToken(user._id.toString(), user.name, user.email, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

export const addToFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, movieId } = req.body;

    if (!email || !movieId) {
      res.status(400).json({
        success: false,
        message: 'Email and movieId are required',
      });
      return;
    }

    // Normalize email to lowercase for consistent lookup
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({ 
      email: normalizedEmail, 
      movieId 
    });

    if (existingFavorite) {
      res.status(400).json({
        success: false,
        message: 'Movie already in favorites',
      });
      return;
    }

    // Create new favorite
    const favorite = await Favorite.create({
      email: normalizedEmail,
      movieId,
    });

    res.status(200).json({
      success: true,
      message: 'Movie added to favorites',
      favorite,
    });
  } catch (error: any) {
    console.error('Add to favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to favorites',
      error: error.message,
    });
  }
};

export const removeFromFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, movieId } = req.body;

    if (!email || !movieId) {
      res.status(400).json({
        success: false,
        message: 'Email and movieId are required',
      });
      return;
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    const deletedFavorite = await Favorite.findOneAndDelete({
      email: normalizedEmail,
      movieId,
    });

    if (!deletedFavorite) {
      res.status(404).json({
        success: false,
        message: 'Favorite not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Movie removed from favorites',
    });
  } catch (error: any) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing from favorites',
      error: error.message,
    });
  }
};

export const getFavoriteMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Email is required',
      });
      return;
    }

    // Normalize email to lowercase
    const normalizedEmail = (email as string).toLowerCase().trim();

    const favorites = await Favorite.find({ email: normalizedEmail })
      .populate('movieId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      favorites: favorites.map(fav => fav.movieId),
      count: favorites.length,
    });
  } catch (error: any) {
    console.error('Get favorite movies error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching favorite movies',
      error: error.message,
    });
  }
};

export const buyMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, movieId } = req.body;

    if (!email || !movieId) {
      res.status(400).json({
        success: false,
        message: 'Email and movieId are required',
      });
      return;
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Check if already purchased
    const existingPurchase = await Purchase.findOne({
      email: normalizedEmail,
      movieId,
    });

    if (existingPurchase) {
      res.status(400).json({
        success: false,
        message: 'Movie already purchased',
      });
      return;
    }

    // Get movie details to store price
    const movie = await Movie.findById(movieId);
    if (!movie) {
      res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
      return;
    }

    // Create new purchase
    const purchase = await Purchase.create({
      email: normalizedEmail,
      movieId,
      price: movie.price,
    });

    res.status(200).json({
      success: true,
      message: 'Movie purchased successfully',
      purchase,
    });
  } catch (error: any) {
    console.error('Buy movie error:', error);
    res.status(500).json({
      success: false,
      message: 'Error purchasing movie',
      error: error.message,
    });
  }
};

export const getPurchasedMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Email is required',
      });
      return;
    }

    // Normalize email to lowercase
    const normalizedEmail = (email as string).toLowerCase().trim();

    const purchases = await Purchase.find({ email: normalizedEmail })
      .populate('movieId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      purchases: purchases.map(purchase => ({
        movie: purchase.movieId,
        price: purchase.price,
        purchaseDate: purchase.purchaseDate,
      })),
      count: purchases.length,
    });
  } catch (error: any) {
    console.error('Get purchased movies error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching purchased movies',
      error: error.message,
    });
  }
};

// Admin: Get all purchases across all users
export const getAllPurchases = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchases = await Purchase.find()
      .populate('movieId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      purchases: purchases.map(purchase => ({
        email: purchase.email,
        movie: purchase.movieId,
        price: purchase.price,
        purchaseDate: purchase.purchaseDate,
        createdAt: purchase.createdAt,
      })),
      count: purchases.length,
    });
  } catch (error: any) {
    console.error('Get all purchases error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching all purchases',
      error: error.message,
    });
  }
};
