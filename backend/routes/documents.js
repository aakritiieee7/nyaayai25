import express from 'express';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth.js';
import Case from '../models/Case.js';
import { logger } from '../utils/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/documents'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only specific file types
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images, PDFs, and documents are allowed'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter
});

// @route   POST /api/documents/upload/:caseId
// @desc    Upload document to case
// @access  Private
router.post('/upload/:caseId', auth, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const caseId = req.params.caseId;
    const case_ = await Case.findById(caseId);

    if (!case_) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    // Check if user owns the case
    if (case_.user.toString() !== req.user.id && req.user.role === 'user') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const document = {
      name: req.file.originalname,
      type: req.file.mimetype,
      url: `/uploads/documents/${req.file.filename}`,
      size: req.file.size,
      uploadedAt: new Date()
    };

    case_.documents.push(document);
    await case_.save();

    logger.info(`Document uploaded to case ${caseId} by user ${req.user.id}`);

    res.json({
      success: true,
      message: 'Document uploaded successfully',
      document: case_.documents[case_.documents.length - 1]
    });

  } catch (error) {
    logger.error('Document upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading document'
    });
  }
});

// @route   GET /api/documents/:caseId
// @desc    Get documents for a case
// @access  Private
router.get('/:caseId', auth, async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.caseId);

    if (!case_) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    // Check access
    if (case_.user.toString() !== req.user.id && req.user.role === 'user') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      documents: case_.documents
    });

  } catch (error) {
    logger.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching documents'
    });
  }
});

// @route   DELETE /api/documents/:caseId/:documentId
// @desc    Delete document from case
// @access  Private
router.delete('/:caseId/:documentId', auth, async (req, res) => {
  try {
    const { caseId, documentId } = req.params;
    const case_ = await Case.findById(caseId);

    if (!case_) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    // Check access
    if (case_.user.toString() !== req.user.id && req.user.role === 'user') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Remove document from array
    case_.documents = case_.documents.filter(
      doc => doc._id.toString() !== documentId
    );

    await case_.save();

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });

  } catch (error) {
    logger.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting document'
    });
  }
});

export default router;