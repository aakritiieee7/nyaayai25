# न्याय AI (NYAAYAI) 🏛️⚖️

## A Bias-Aware AI Legal Assistant for India

**Empowering marginalized communities with accessible legal guidance in their own language**

---

## 🚀 **Quick Setup Guide**

### **Prerequisites**
- Node.js 18+ and npm
- Git

### **Complete Installation**

```bash
# 1. Clone or navigate to project directory
cd nyaayai-project

# 2. Install all dependencies (frontend + backend)
npm run setup

# 3. Setup environment variables
cp .env.example .env
cp backend/.env.example backend/.env

# 4. Edit environment files with your credentials
# Edit .env and backend/.env files

# 5. Start both frontend and backend
npm run start:full

# OR start individually:
# Frontend: npm run dev
# Backend: npm run backend:dev
```

### **Firebase Setup (Optional)**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init

# Start emulators (optional)
npm run firebase:emulators
```

### **Database Seeding**
```bash
# Seed sample data
npm run db:seed
```

---

## 🛠️ **Project Structure**

```
nyaayai/
├── src/                    # Frontend React app
│   ├── pages/             # React pages
│   ├── components/        # Reusable components
│   └── ...
├── backend/               # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── config/           # Database configs
│   └── ...
├── public/               # Static assets
└── package.json          # Root package.json
```

---

## 🌟 **Features**

### **🌍 Multilingual Support**
- **Hindi, English, Hinglish** - Understands emotional speech patterns
- **Voice & Text Input** - Works for low-literacy users
- **Cultural Context** - Trained on Indian social dynamics

### **⚖️ AI Legal Analysis**
- Converts unstructured queries → structured legal categories
- Maps to relevant **Indian laws and sections**
- **Built-in Bias Detection** for caste, gender, economic discrimination

### **📄 Document Generation**
- **FIR (First Information Report)**
- **RTI Applications**
- **Legal Notices**
- **Consumer Complaints**

### **🤝 Professional Network**
- **Verified Lawyers** - Background-checked legal professionals
- **NGOs & Legal Aid** - Free legal assistance organizations
- **Real-time Availability**

---

## 🔥 **Database Architecture**

### **Dual Database Setup**
- **MongoDB** - Primary database for complex queries
- **Firebase** - Real-time updates, backup, mobile sync
- **Automatic Sync** - MongoDB changes auto-sync to Firebase
- **Smart Fallback** - Firebase backup if MongoDB fails

---

## 📱 **Available Scripts**

```bash
# Development
npm run dev                 # Start frontend
npm run backend:dev         # Start backend
npm run start:full         # Start both frontend & backend

# Setup
npm run setup              # Install all dependencies
npm run backend:install    # Install backend dependencies only

# Database
npm run db:seed           # Seed sample data
npm run firebase:emulators # Start Firebase emulators

# Build & Deploy
npm run build             # Build frontend
npm run preview           # Preview build
```

---

## 🌐 **API Endpoints**

### **Authentication**
```
POST /api/auth/register     - Register new user
POST /api/auth/login        - Login user
GET  /api/auth/me          - Get current user
```

### **AI Services**
```
POST /api/ai/analyze           - Analyze legal query
POST /api/ai/generate-document - Generate legal document
POST /api/ai/translate         - Translate text
```

### **Cases**
```
GET    /api/cases           - Get user cases
POST   /api/cases           - Create new case
PUT    /api/cases/:id       - Update case
DELETE /api/cases/:id       - Delete case
```

### **Database Management**
```
GET  /api/database/health     - Check database health
POST /api/database/sync/:collection - Manual sync to Firebase
GET  /api/database/stats      - Get database statistics
```

---

## 🔧 **Environment Variables**

### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=nyaayai-project
```

### **Backend (backend/.env)**
```env
# Database
USE_MONGODB=true
USE_FIREBASE=true
MONGODB_URI=mongodb://localhost:27017/nyaayai

# Firebase
FIREBASE_PROJECT_ID=nyaayai-project
FIREBASE_API_KEY=your_firebase_api_key

# AI
OPENAI_API_KEY=your_openai_api_key
```

---

## 🚨 **Emergency Contacts**

- **Police Emergency**: 100
- **Women Helpline**: 1091
- **Legal Aid**: 15100

---

## 👩‍💻 **Team - Code Divas**

| Name | Role |
|------|------|
| **Aakriti Rajhans** | Lead Developer |
| **Kanishka** | AI/ML Engineer |
| **Ishita Yadav** | Frontend Developer |
| **Anupriya** | Backend Developer |

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

---

**"न्याय देर से मिले तो चलेगा, लेकिन मिलना जरूरी है।"**  
*"Justice delayed is acceptable, but justice must be served."*

**Building bias-free justice technology for every Indian voice** 🇮🇳⚖️