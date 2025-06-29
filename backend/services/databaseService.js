import { logger } from '../utils/logger.js';
import { firebaseServices } from '../config/firebase.js';
import User from '../models/User.js';
import Case from '../models/Case.js';

class DatabaseService {
  constructor() {
    this.useFirebase = process.env.USE_FIREBASE === 'true';
    this.useMongoDB = process.env.USE_MONGODB === 'true';
  }

  // Dual database write - MongoDB primary, Firebase backup
  async createUser(userData) {
    try {
      let mongoUser = null;
      let firebaseUserId = null;

      // Create in MongoDB (Primary)
      if (this.useMongoDB) {
        mongoUser = await User.create(userData);
        logger.info(`User created in MongoDB: ${mongoUser._id}`);
      }

      // Sync to Firebase (Backup/Real-time)
      if (this.useFirebase) {
        const firebaseData = {
          ...userData,
          mongoId: mongoUser?._id?.toString(),
          source: 'mongodb'
        };
        firebaseUserId = await firebaseServices.createUser(firebaseData);
      }

      return {
        mongoUser,
        firebaseUserId,
        success: true
      };
    } catch (error) {
      logger.error('Error in dual database user creation:', error);
      throw error;
    }
  }

  async createCase(caseData) {
    try {
      let mongoCase = null;
      let firebaseCaseId = null;

      // Create in MongoDB (Primary)
      if (this.useMongoDB) {
        mongoCase = await Case.create(caseData);
        logger.info(`Case created in MongoDB: ${mongoCase._id}`);
      }

      // Sync to Firebase (Real-time updates)
      if (this.useFirebase) {
        const firebaseData = {
          ...caseData,
          mongoId: mongoCase?._id?.toString(),
          source: 'mongodb'
        };
        firebaseCaseId = await firebaseServices.createCase(firebaseData);
      }

      return {
        mongoCase,
        firebaseCaseId,
        success: true
      };
    } catch (error) {
      logger.error('Error in dual database case creation:', error);
      throw error;
    }
  }

  async getUserCases(userId) {
    try {
      let cases = [];

      // Primary: Get from MongoDB
      if (this.useMongoDB) {
        cases = await Case.find({ user: userId })
          .populate('assignedLawyer', 'user specializations rating')
          .populate('assignedNGO', 'name focusAreas rating')
          .sort({ createdAt: -1 });
      }

      // Fallback: Get from Firebase if MongoDB fails
      if ((!cases || cases.length === 0) && this.useFirebase) {
        cases = await firebaseServices.getUserCases(userId);
      }

      return cases;
    } catch (error) {
      logger.error('Error getting user cases:', error);
      
      // Fallback to Firebase if MongoDB fails
      if (this.useFirebase) {
        try {
          return await firebaseServices.getUserCases(userId);
        } catch (firebaseError) {
          logger.error('Firebase fallback also failed:', firebaseError);
        }
      }
      
      throw error;
    }
  }

  async updateCase(caseId, updateData) {
    try {
      let mongoResult = null;

      // Update in MongoDB
      if (this.useMongoDB) {
        mongoResult = await Case.findByIdAndUpdate(
          caseId,
          updateData,
          { new: true, runValidators: true }
        );
      }

      // Sync to Firebase
      if (this.useFirebase) {
        await firebaseServices.updateCase(caseId, updateData);
      }

      return mongoResult;
    } catch (error) {
      logger.error('Error updating case:', error);
      throw error;
    }
  }

  // Real-time sync function
  async syncToFirebase(collection, mongoDoc) {
    if (!this.useFirebase) return;

    try {
      const firebaseData = {
        ...mongoDoc.toObject(),
        mongoId: mongoDoc._id.toString(),
        source: 'mongodb',
        syncedAt: new Date()
      };

      if (collection === 'users') {
        await firebaseServices.createUser(firebaseData);
      } else if (collection === 'cases') {
        await firebaseServices.createCase(firebaseData);
      }

      logger.info(`Synced ${collection} to Firebase: ${mongoDoc._id}`);
    } catch (error) {
      logger.error(`Error syncing ${collection} to Firebase:`, error);
    }
  }

  // Health check for both databases
  async healthCheck() {
    const health = {
      mongodb: false,
      firebase: false,
      timestamp: new Date()
    };

    // Check MongoDB
    if (this.useMongoDB) {
      try {
        await User.findOne().limit(1);
        health.mongodb = true;
      } catch (error) {
        logger.error('MongoDB health check failed:', error);
      }
    }

    // Check Firebase
    if (this.useFirebase) {
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const { db } = await import('../config/firebase.js');
        await getDoc(doc(db, 'health', 'check'));
        health.firebase = true;
      } catch (error) {
        logger.error('Firebase health check failed:', error);
      }
    }

    return health;
  }
}

export const databaseService = new DatabaseService();