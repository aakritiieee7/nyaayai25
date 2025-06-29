import express from 'express';
import { query, validationResult } from 'express-validator';
import { optionalAuth } from '../middleware/auth.js';
import NGO from '../models/NGO.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// @route   GET /api/ngos
// @desc    Get NGOs with filters
// @access  Public/Private
router.get('/', optionalAuth, [
  query('state').optional().isString(),
  query('city').optional().isString(),
  query('focusArea').optional().isString(),
  query('verified').optional().isBoolean(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      state,
      city,
      focusArea,
      verified,
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (state) query['location.headquarters.state'] = new RegExp(state, 'i');
    if (city) query['location.headquarters.city'] = new RegExp(city, 'i');
    if (focusArea) query.focusAreas = focusArea;
    if (verified !== undefined) query['verification.isVerified'] = verified === 'true';

    // Execute query
    const ngos = await NGO.find(query)
      .select('-reviews') // Exclude reviews for list view
      .sort({ 'rating.average': -1, 'verification.isVerified': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await NGO.countDocuments(query);

    res.json({
      success: true,
      ngos,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    logger.error('Get NGOs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching NGOs'
    });
  }
});

// @route   GET /api/ngos/:id
// @desc    Get single NGO details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id)
      .populate('lawyers.lawyer', 'user specializations rating')
      .populate('reviews.user', 'username');

    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    res.json({
      success: true,
      ngo
    });

  } catch (error) {
    logger.error('Get NGO error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching NGO details'
    });
  }
});

// @route   GET /api/ngos/search/focus-areas
// @desc    Get available focus areas
// @access  Public
router.get('/search/focus-areas', async (req, res) => {
  try {
    const focusAreas = await NGO.distinct('focusAreas');

    res.json({
      success: true,
      focusAreas
    });

  } catch (error) {
    logger.error('Get focus areas error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching focus areas'
    });
  }
});

export default router;