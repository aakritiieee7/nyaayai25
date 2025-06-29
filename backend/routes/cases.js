import express from 'express';
import { body, validationResult, query } from 'express-validator';
import { auth, authorize } from '../middleware/auth.js';
import Case from '../models/Case.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// @route   GET /api/cases
// @desc    Get user's cases
// @access  Private
router.get('/', auth, [
  query('status').optional().isIn(['draft', 'active', 'pending', 'resolved', 'closed', 'archived']),
  query('category').optional().isString(),
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

    const { status, category, page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    // Build query
    const query = { user: userId };
    if (status) query.status = status;
    if (category) query.category = category;

    // Execute query with pagination
    const cases = await Case.find(query)
      .populate('assignedLawyer', 'user specializations rating')
      .populate('assignedNGO', 'name focusAreas rating')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Case.countDocuments(query);

    res.json({
      success: true,
      cases,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    logger.error('Get cases error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cases'
    });
  }
});

// @route   GET /api/cases/:id
// @desc    Get single case
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id)
      .populate('user', 'username email profile')
      .populate('assignedLawyer')
      .populate('assignedNGO');

    if (!case_) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    // Check if user owns the case or is authorized to view it
    if (case_.user._id.toString() !== req.user.id && req.user.role === 'user') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      case: case_
    });

  } catch (error) {
    logger.error('Get case error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching case'
    });
  }
});

// @route   POST /api/cases
// @desc    Create new case
// @access  Private
router.post('/', auth, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').isIn([
    'domestic_violence', 'women_rights', 'labor_rights', 'property_dispute',
    'consumer_protection', 'criminal_law', 'family_law', 'constitutional_rights',
    'caste_discrimination', 'other'
  ]).withMessage('Invalid category'),
  body('language').isIn(['hindi', 'english', 'hinglish']).withMessage('Invalid language')
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

    const caseData = {
      ...req.body,
      user: req.user.id
    };

    const case_ = await Case.create(caseData);

    logger.info(`New case created: ${case_._id} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      case: case_
    });

  } catch (error) {
    logger.error('Create case error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating case'
    });
  }
});

// @route   PUT /api/cases/:id
// @desc    Update case
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id);

    if (!case_) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    // Check ownership
    if (case_.user.toString() !== req.user.id && req.user.role === 'user') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Case updated successfully',
      case: updatedCase
    });

  } catch (error) {
    logger.error('Update case error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating case'
    });
  }
});

// @route   DELETE /api/cases/:id
// @desc    Delete case
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id);

    if (!case_) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    // Check ownership
    if (case_.user.toString() !== req.user.id && req.user.role === 'user') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Case.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Case deleted successfully'
    });

  } catch (error) {
    logger.error('Delete case error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting case'
    });
  }
});

// @route   POST /api/cases/:id/notes
// @desc    Add note to case
// @access  Private
router.post('/:id/notes', auth, [
  body('content').notEmpty().withMessage('Note content is required')
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

    const case_ = await Case.findById(req.params.id);

    if (!case_) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    const note = {
      content: req.body.content,
      addedBy: req.user.id,
      isPrivate: req.body.isPrivate || false
    };

    case_.notes.push(note);
    await case_.save();

    res.json({
      success: true,
      message: 'Note added successfully',
      note: case_.notes[case_.notes.length - 1]
    });

  } catch (error) {
    logger.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding note'
    });
  }
});

export default router;