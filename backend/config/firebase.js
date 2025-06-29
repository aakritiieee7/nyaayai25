import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { logger } from '../utils/logger.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
let db;
let auth;
let storage;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);

  // Connect to Firestore emulator in development
  if (process.env.NODE_ENV === 'development' && process.env.USE_FIREBASE_EMULATOR === 'true') {
    connectFirestoreEmulator(db, 'localhost', 8080);
    logger.info('🔥 Connected to Firestore Emulator');
  }

  logger.info('🔥 Firebase initialized successfully');
} catch (error) {
  logger.error('Firebase initialization failed:', error);
}

export { app, db, auth, storage };

// Firebase service functions
export const firebaseServices = {
  // User management
  createUser: async (userData) => {
    try {
      const { addDoc, collection } = await import('firebase/firestore');
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      logger.info(`User created in Firebase: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      logger.error('Error creating user in Firebase:', error);
      throw error;
    }
  },

  // Case management
  createCase: async (caseData) => {
    try {
      const { addDoc, collection } = await import('firebase/firestore');
      const docRef = await addDoc(collection(db, 'cases'), {
        ...caseData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      logger.info(`Case created in Firebase: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      logger.error('Error creating case in Firebase:', error);
      throw error;
    }
  },

  // Get user cases
  getUserCases: async (userId) => {
    try {
      const { getDocs, collection, query, where } = await import('firebase/firestore');
      const q = query(collection(db, 'cases'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const cases = [];
      querySnapshot.forEach((doc) => {
        cases.push({ id: doc.id, ...doc.data() });
      });
      return cases;
    } catch (error) {
      logger.error('Error getting user cases from Firebase:', error);
      throw error;
    }
  },

  // Update case
  updateCase: async (caseId, updateData) => {
    try {
      const { updateDoc, doc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'cases', caseId), {
        ...updateData,
        updatedAt: new Date()
      });
      logger.info(`Case updated in Firebase: ${caseId}`);
    } catch (error) {
      logger.error('Error updating case in Firebase:', error);
      throw error;
    }
  },

  // File upload to Firebase Storage
  uploadFile: async (file, path) => {
    try {
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      logger.info(`File uploaded to Firebase Storage: ${path}`);
      return downloadURL;
    } catch (error) {
      logger.error('Error uploading file to Firebase Storage:', error);
      throw error;
    }
  }
};