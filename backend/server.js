import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import database configurations
import { connectMongoDB, closeMongoDB } from './config/database.js';
import './config/firebase.js'; // Initialize Firebase

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import caseRoutes from './routes/cases.js';
import aiRoutes from './routes/ai.js';
import documentRoutes from './routes/documents.js';
import lawyerRoutes from './routes/lawyers.js';
import ngoRoutes from './routes/ngos.js';
import databaseRoutes from './routes/database.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { databaseHealthCheck } from './middleware/database.js';
import { logger } from './utils/logger.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: 15 * 60 * 1000
  }
});

app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Database health check middleware
app.use(databaseHealthCheck);

// Static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Health check endpoint with database status
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'NYAAYAI Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    databases: req.databaseHealth || { mongodb: false, firebase: false }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/database', databaseRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

// Database connections and server startup
const startServer = async () => {
  try {
    // Connect to MongoDB if enabled
    if (process.env.USE_MONGODB === 'true') {
      await connectMongoDB();
    }

    // Firebase is already initialized in config/firebase.js
    if (process.env.USE_FIREBASE === 'true') {
      logger.info('🔥 Firebase services ready');
    }
    
    app.listen(PORT, () => {
      logger.info(`🚀 NYAAYAI Backend Server running on port ${PORT}`);
      logger.info(`📱 Environment: ${process.env.NODE_ENV}`);
      logger.info(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
      logger.info(`📊 MongoDB: ${process.env.USE_MONGODB === 'true' ? 'Enabled' : 'Disabled'}`);
      logger.info(`🔥 Firebase: ${process.env.USE_FIREBASE === 'true' ? 'Enabled' : 'Disabled'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  
  // Close database connections
  if (process.env.USE_MONGODB === 'true') {
    await closeMongoDB();
  }
  
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  
  // Close database connections
  if (process.env.USE_MONGODB === 'true') {
    await closeMongoDB();
  }
  
  process.exit(0);
});

startServer();