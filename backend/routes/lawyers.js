import express from 'express';
import { query, validationResult } from 'express-validator';
import { auth, optionalAuth } from '../middleware/auth.js';
import Lawyer from '../models/Lawyer.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// @route   GET /api/lawyers
// @desc    Get lawyers with filters
// @access  Public/Private
router.get('/', optionalAuth, [
  query('state').optional().isString(),
  query('city').optional().isString(),
  query('specialization').optional().isString(),
  query('verified').optional().isBoolean(),
  query('available').optional().isBoolean(),
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
      specialization,
      verified,
      available,
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (state) query['location.state'] = new RegExp(state, 'i');
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (specialization) query.specializations = specialization;
    if (verified !== undefined) query['verification.isVerified'] = verified === 'true';
    if (available !== undefined) query['availability.isAvailable'] = available === 'true';

    // Execute query
    const lawyers = await Lawyer.find(query)
      .populate('user', 'username email profile')
      .select('-reviews') // Exclude reviews for list view
      .sort({ 'rating.average': -1, 'verification.isVerified': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Lawyer.countDocuments(query);

    res.json({
      success: true,
      lawyers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    logger.error('Get lawyers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching lawyers'
    });
  }
});

// @route   GET /api/lawyers/:id
// @desc    Get single lawyer details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id)
      .populate('user', 'username email profile')
      .populate('reviews.user', 'username');

    if (!lawyer) {
      return res.status(404).json({
        success: false,
        message: 'Lawyer not found'
      });
    }

    res.json({
      success: true,
      lawyer
    });

  } catch (error) {
    logger.error('Get lawyer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching lawyer details'
    });
  }
});

// @route   GET /api/lawyers/search/specializations
// @desc    Get available specializations
// @access  Public
router.get('/search/specializations', async (req, res) => {
  try {
    const specializations = await Lawyer.distinct('specializations');

    res.json({
      success: true,
      specializations
    });

  } catch (error) {
    logger.error('Get specializations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching specializations'
    });
  }
});

// @route   GET /api/lawyers/search/locations
// @desc    Get available locations
// @access  Public
router.get('/search/locations', async (req, res) => {
  try {
    const states = await Lawyer.distinct('location.state');
    const cities = await Lawyer.distinct('location.city');

    res.json({
      success: true,
      locations: {
        states,
        cities
      }
    });

  } catch (error) {
    logger.error('Get locations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching locations'
    });
  }
});

export default router;