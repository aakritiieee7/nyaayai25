# NYAAYAI Backend API with Firebase & MongoDB

## Overview
Backend API for NYAAYAI - A bias-aware AI legal assistant platform for India with dual database support.

## Database Architecture

### 🔥 **Firebase + MongoDB Dual Setup**
- **MongoDB** - Primary database for complex queries and relationships
- **Firebase** - Real-time updates, backup, and mobile sync
- **Automatic Sync** - Changes in MongoDB automatically sync to Firebase
- **Fallback System** - Firebase serves as backup if MongoDB fails

### 📊 **Database Features**
- **Dual Write** - All data written to both databases
- **Smart Fallback** - Automatic failover to Firebase if MongoDB unavailable
- **Real-time Sync** - Live updates via Firebase for mobile apps
- **Health Monitoring** - Continuous database health checks
- **Manual Sync** - Admin tools for manual synchronization

## Installation

### Prerequisites
- Node.js 18+
- MongoDB 4.4+
- Firebase Project
- OpenAI API Key

### Setup
```bash
# Clone repository
git clone https://github.com/code-divas/nyaayai.git
cd nyaayai/backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Create directories
mkdir -p uploads/documents logs

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables
```env
# Database Configuration
USE_MONGODB=true
USE_FIREBASE=true
MONGODB_URI=mongodb://localhost:27017/nyaayai

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=nyaayai-project.firebaseapp.com
FIREBASE_PROJECT_ID=nyaayai-project
FIREBASE_STORAGE_BUCKET=nyaayai-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

# Other configurations...
```

## Firebase Setup

### 1. Create Firebase Project
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init
```

### 2. Configure Firestore
- Enable Firestore Database
- Set up security rules (already provided in firestore.rules)
- Configure indexes (firestore.indexes.json)

### 3. Configure Storage
- Enable Firebase Storage
- Set up storage rules (storage.rules)

### 4. Get Configuration
- Go to Project Settings → General → Your apps
- Copy Firebase config object
- Add to .env file

## API Endpoints

### Database Management
```
GET  /api/database/health     - Check database health
POST /api/database/sync/:collection - Manual sync to Firebase
GET  /api/database/stats      - Get database statistics
```

### Standard Endpoints
```
# Authentication
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

# Cases (with dual database support)
GET    /api/cases
POST   /api/cases
PUT    /api/cases/:id
DELETE /api/cases/:id

# AI Services
POST /api/ai/analyze
POST /api/ai/generate-document

# Users, Lawyers, NGOs...
```

## Database Service Usage

### Creating Data
```javascript
import { databaseService } from './services/databaseService.js';

// Creates in both MongoDB and Firebase
const result = await databaseService.createUser(userData);
const case = await databaseService.createCase(caseData);
```

### Reading Data
```javascript
// Reads from MongoDB first, falls back to Firebase
const cases = await databaseService.getUserCases(userId);
```

### Health Check
```javascript
const health = await databaseService.healthCheck();
// Returns: { mongodb: true, firebase: true, timestamp: Date }
```

## Firebase Features

### Real-time Updates
```javascript
// Listen to case updates in real-time
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from './config/firebase.js';

onSnapshot(collection(db, 'cases'), (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      console.log('New case: ', change.doc.data());
    }
  });
});
```

### File Storage
```javascript
// Upload files to Firebase Storage
const downloadURL = await firebaseServices.uploadFile(file, 'cases/documents/file.pdf');
```

### Offline Support
Firebase provides automatic offline support for mobile apps.

## MongoDB Features

### Complex Queries
```javascript
// Advanced aggregation pipelines
const stats = await Case.aggregate([
  { $match: { user: userId } },
  { $group: { _id: '$status', count: { $sum: 1 } } }
]);
```

### Relationships
```javascript
// Populate related data
const cases = await Case.find({ user: userId })
  .populate('assignedLawyer')
  .populate('assignedNGO');
```

## Monitoring & Health

### Database Health Endpoint
```bash
GET /api/database/health
```

Response:
```json
{
  "success": true,
  "health": {
    "mongodb": true,
    "firebase": true,
    "timestamp": "2024-12-20T10:30:00.000Z"
  }
}
```

### Manual Sync
```bash
POST /api/database/sync/cases
{
  "mongoId": "507f1f77bcf86cd799439011"
}
```

### Database Statistics
```bash
GET /api/database/stats
```

## Development Tools

### Firebase Emulators
```bash
# Start Firebase emulators
npm run firebase:emulators

# Access Emulator UI
http://localhost:4000
```

### Database Seeding
```bash
# Seed both databases with sample data
npm run db:seed
```

## Production Deployment

### Environment Setup
```bash
# Production environment variables
NODE_ENV=production
USE_MONGODB=true
USE_FIREBASE=true

# MongoDB Atlas connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nyaayai

# Firebase production config
FIREBASE_PROJECT_ID=nyaayai-production
```

### Security Considerations
- Enable Firebase Security Rules
- Use MongoDB Atlas with authentication
- Implement proper CORS settings
- Use environment variables for all secrets
- Enable rate limiting
- Set up monitoring and alerts

## Backup Strategy

### Automatic Backup
- MongoDB → Firebase (real-time sync)
- Firebase → MongoDB (periodic sync)
- File storage in Firebase Storage

### Manual Backup
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/nyaayai"

# Firebase backup
firebase firestore:export gs://your-bucket/backups/
```

## Troubleshooting

### Common Issues

1. **Firebase Connection Failed**
   ```bash
   # Check Firebase config
   firebase projects:list
   ```

2. **MongoDB Connection Failed**
   ```bash
   # Check MongoDB status
   mongosh --eval "db.adminCommand('ismaster')"
   ```

3. **Sync Issues**
   ```bash
   # Manual sync
   curl -X POST http://localhost:5000/api/database/sync/cases
   ```

### Logs
```bash
# Check application logs
tail -f logs/combined.log

# Check error logs
tail -f logs/error.log
```

## Contributing
1. Fork the repository
2. Create feature branch
3. Test with both databases
4. Submit pull request

---

**Building bias-free justice technology with robust dual database architecture** 🇮🇳⚖️🔥📊