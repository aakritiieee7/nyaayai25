import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth.js';
import { aiService } from '../services/aiService.js';
import { biasDetectionService } from '../services/biasDetectionService.js';
import { legalKnowledgeService } from '../services/legalKnowledgeService.js';
import { logger } from '../utils/logger.js';
import Case from '../models/Case.js';

const router = express.Router();

// @route   POST /api/ai/analyze
// @desc    Analyze legal query with AI
// @access  Private
router.post('/analyze', auth, [
  body('query')
    .notEmpty()
    .withMessage('Query is required')
    .isLength({ max: 5000 })
    .withMessage('Query cannot exceed 5000 characters'),
  body('language')
    .isIn(['hindi', 'english', 'hinglish'])
    .withMessage('Language must be hindi, english, or hinglish')
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

    const { query, language } = req.body;
    const userId = req.user.id;

    logger.info(`AI analysis requested by user ${userId} in ${language}`);

    // Step 1: Clean and process the query
    const cleanedQuery = await aiService.cleanQuery(query, language);

    // Step 2: Detect legal issues and categorize
    const legalAnalysis = await aiService.analyzeLegalIssues(cleanedQuery, language);

    // Step 3: Bias detection
    const biasAnalysis = await biasDetectionService.detectBias(cleanedQuery, language);

    // Step 4: Find relevant laws and sections
    const relevantLaws = await legalKnowledgeService.findRelevantLaws(
      legalAnalysis.detectedIssues,
      legalAnalysis.category
    );

    // Step 5: Generate recommendations
    const recommendations = await aiService.generateRecommendations(
      legalAnalysis,
      relevantLaws,
      biasAnalysis
    );

    // Step 6: Calculate confidence score
    const confidence = aiService.calculateConfidence(
      legalAnalysis,
      relevantLaws,
      biasAnalysis
    );

    const analysisResult = {
      cleanedQuery,
      originalQuery: query,
      language,
      detectedIssues: legalAnalysis.detectedIssues,
      category: legalAnalysis.category,
      subcategory: legalAnalysis.subcategory,
      suggestedLaws: relevantLaws,
      biasDetection: biasAnalysis,
      recommendedActions: recommendations,
      confidence,
      processedAt: new Date()
    };

    // Save analysis to database (optional - for tracking)
    const caseData = {
      user: userId,
      title: legalAnalysis.suggestedTitle || 'Legal Query',
      description: cleanedQuery,
      originalQuery: query,
      language,
      category: legalAnalysis.category,
      subcategory: legalAnalysis.subcategory,
      aiAnalysis: analysisResult,
      status: 'draft'
    };

    const savedCase = await Case.create(caseData);

    logger.info(`AI analysis completed for user ${userId}, case ${savedCase._id}`);

    res.json({
      success: true,
      message: 'Legal analysis completed',
      analysis: analysisResult,
      caseId: savedCase._id
    });

  } catch (error) {
    logger.error('AI analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing legal analysis',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/ai/generate-document
// @desc    Generate legal document
// @access  Private
router.post('/generate-document', auth, [
  body('type')
    .isIn(['fir', 'rti', 'notice', 'complaint'])
    .withMessage('Document type must be fir, rti, notice, or complaint'),
  body('data')
    .isObject()
    .withMessage('Document data is required')
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

    const { type, data, caseId } = req.body;
    const userId = req.user.id;

    logger.info(`Document generation requested: ${type} by user ${userId}`);

    // Generate document content
    const documentContent = await aiService.generateDocument(type, data, caseId);

    // If caseId is provided, update the case with the generated document
    if (caseId) {
      await Case.findByIdAndUpdate(caseId, {
        $push: {
          documents: {
            name: `${type.toUpperCase()}_${Date.now()}.txt`,
            type: 'generated',
            content: documentContent,
            uploadedAt: new Date()
          }
        }
      });
    }

    res.json({
      success: true,
      message: 'Document generated successfully',
      document: {
        type,
        content: documentContent,
        generatedAt: new Date()
      }
    });

  } catch (error) {
    logger.error('Document generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating document',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/ai/translate
// @desc    Translate text between languages
// @access  Private
router.post('/translate', auth, [
  body('text')
    .notEmpty()
    .withMessage('Text is required'),
  body('from')
    .isIn(['hindi', 'english', 'auto'])
    .withMessage('Source language must be hindi, english, or auto'),
  body('to')
    .isIn(['hindi', 'english'])
    .withMessage('Target language must be hindi or english')
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

    const { text, from, to } = req.body;

    const translatedText = await aiService.translateText(text, from, to);

    res.json({
      success: true,
      translation: {
        original: text,
        translated: translatedText,
        from,
        to
      }
    });

  } catch (error) {
    logger.error('Translation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error translating text',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/ai/legal-categories
// @desc    Get available legal categories
// @access  Private
router.get('/legal-categories', auth, async (req, res) => {
  try {
    const categories = await legalKnowledgeService.getLegalCategories();

    res.json({
      success: true,
      categories
    });

  } catch (error) {
    logger.error('Get legal categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching legal categories'
    });
  }
});

export default router;