import { databaseService } from '../services/databaseService.js';
import { logger } from '../utils/logger.js';

// Middleware to sync MongoDB changes to Firebase
export const syncToFirebase = (collection) => {
  return async (req, res, next) => {
    // Store original res.json
    const originalJson = res.json;

    // Override res.json to capture response
    res.json = function(data) {
      // Call original res.json
      originalJson.call(this, data);

      // Sync to Firebase if operation was successful
      if (data.success && req.method === 'POST' && data[collection.slice(0, -1)]) {
        setImmediate(async () => {
          try {
            await databaseService.syncToFirebase(collection, data[collection.slice(0, -1)]);
          } catch (error) {
            logger.error(`Failed to sync ${collection} to Firebase:`, error);
          }
        });
      }
    };

    next();
  };
};

// Database health check middleware
export const databaseHealthCheck = async (req, res, next) => {
  try {
    const health = await databaseService.healthCheck();
    req.databaseHealth = health;
    next();
  } catch (error) {
    logger.error('Database health check middleware error:', error);
    req.databaseHealth = { mongodb: false, firebase: false, error: error.message };
    next();
  }
};