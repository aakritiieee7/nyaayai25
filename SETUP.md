# 🚀 NYAAYAI Setup Guide

## Step-by-Step Installation

### 1. **Check Your Current Location**
```bash
pwd
# You should be in the project directory (not /Users/aakritirajhans/Downloads/esya)
```

### 2. **Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. **Environment Setup**
```bash
# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
```

### 4. **Edit Environment Variables**

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_PROJECT_ID=nyaayai-project
```

**Backend (backend/.env):**
```env
# Basic setup for development
PORT=5000
NODE_ENV=development
USE_MONGODB=true
USE_FIREBASE=false
MONGODB_URI=mongodb://localhost:27017/nyaayai
JWT_SECRET=your_super_secret_jwt_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### 5. **Start Development Servers**

**Option A: Start Both Together**
```bash
npm run start:full
```

**Option B: Start Separately**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run backend:dev
```

### 6. **Access Application**
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## Quick Commands

```bash
# Setup everything at once
npm run setup

# Start both frontend and backend
npm run start:full

# Install backend dependencies
npm run backend:install

# Seed database with sample data
npm run db:seed
```

## Troubleshooting

### If you're in wrong directory:
```bash
# Check where you are
pwd

# If you're in /Users/aakritirajhans/Downloads/esya
# You need to navigate to the correct project directory
```

### MongoDB not installed:
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### Firebase setup (optional):
1. Go to https://console.firebase.google.com
2. Create new project
3. Get config and add to .env files

## Development Workflow

1. **Frontend only**: `npm run dev`
2. **Backend only**: `npm run backend:dev`
3. **Both together**: `npm run start:full`
4. **Database seeding**: `npm run db:seed`

---

**Happy Coding! 🇮🇳⚖️**