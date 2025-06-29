import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import { databaseService } from '../services/databaseService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// @route   GET /api/database/health
// @desc    Check database health
// @access  Private (Admin only)
router.get('/health', auth, authorize('admin'), async (req, res) => {
  try {
    const health = await databaseService.healthCheck();
    
    res.json({
      success: true,
      health,
      message: 'Database health check completed'
    });
  } catch (error) {
    logger.error('Database health check error:', error);
    res.status(500).json({
      success: false,
      message: 'Database health check failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/database/sync/:collection
// @desc    Manual sync to Firebase
// @access  Private (Admin only)
router.post('/sync/:collection', auth, authorize('admin'), async (req, res) => {
  try {
    const { collection } = req.params;
    const { mongoId } = req.body;

    if (!['users', 'cases'].includes(collection)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid collection name'
      });
    }

    // Get document from MongoDB
    let mongoDoc;
    if (collection === 'users') {
      const User = (await import('../models/User.js')).default;
      mongoDoc = await User.findById(mongoId);
    } else if (collection === 'cases') {
      const Case = (await import('../models/Case.js')).default;
      mongoDoc = await Case.findById(mongoId);
    }

    if (!mongoDoc) {
      return res.status(404).json({
        success: false,
        message: 'Document not found in MongoDB'
      });
    }

    // Sync to Firebase
    await databaseService.syncToFirebase(collection, mongoDoc);

    res.json({
      success: true,
      message: `${collection} synced to Firebase successfully`,
      mongoId
    });
  } catch (error) {
    logger.error('Manual sync error:', error);
    res.status(500).json({
      success: false,
      message: 'Manual sync failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/database/stats
// @desc    Get database statistics
// @access  Private (Admin only)
router.get('/stats', auth, authorize('admin'), async (req, res) => {
  try {
    const stats = {
      mongodb: {},
      firebase: {},
      timestamp: new Date()
    };

    // MongoDB stats
    if (process.env.USE_MONGODB === 'true') {
      const User = (await import('../models/User.js')).default;
      const Case = (await import('../models/Case.js')).default;
      
      stats.mongodb = {
        users: await User.countDocuments(),
        cases: await Case.countDocuments(),
        activeCases: await Case.countDocuments({ status: 'active' }),
        resolvedCases: await Case.countDocuments({ status: 'resolved' })
      };
    }

    // Firebase stats (if needed)
    if (process.env.USE_FIREBASE === 'true') {
      stats.firebase = {
        status: 'connected',
        lastSync: new Date()
      };
    }

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    logger.error('Database stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get database stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;