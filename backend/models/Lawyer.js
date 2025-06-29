import mongoose from 'mongoose';

const lawyerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barCouncilId: {
    type: String,
    required: [true, 'Bar Council ID is required'],
    unique: true
  },
  specializations: [{
    type: String,
    enum: [
      'women_rights',
      'domestic_violence',
      'labor_rights',
      'property_law',
      'consumer_protection',
      'criminal_law',
      'family_law',
      'constitutional_law',
      'caste_discrimination',
      'corporate_law',
      'tax_law',
      'immigration_law'
    ]
  }],
  experience: {
    years: {
      type: Number,
      required: true,
      min: 0
    },
    description: String
  },
  education: [{
    degree: String,
    institution: String,
    year: Number,
    specialization: String
  }],
  courts: [{
    name: String,
    type: {
      type: String,
      enum: ['district', 'high', 'supreme', 'tribunal', 'consumer']
    },
    location: String
  }],
  languages: [{
    type: String,
    enum: ['hindi', 'english', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati', 'kannada', 'malayalam', 'punjabi', 'odia', 'assamese']
  }],
  location: {
    state: { type: String, required: true },
    district: String,
    city: { type: String, required: true },
    address: String,
    pincode: String
  },
  contact: {
    office: {
      phone: String,
      email: String,
      address: String
    },
    chambers: {
      court: String,
      chamber: String,
      phone: String
    }
  },
  fees: {
    consultation: {
      amount: Number,
      currency: { type: String, default: 'INR' },
      duration: { type: String, default: '30 minutes' }
    },
    representation: {
      type: String,
      enum: ['fixed', 'hourly', 'case_based'],
      amount: Number,
      currency: { type: String, default: 'INR' }
    },
    freeConsultation: {
      available: { type: Boolean, default: false },
      duration: String,
      conditions: String
    }
  },
  availability: {
    schedule: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      },
      startTime: String,
      endTime: String,
      location: String
    }],
    isAvailable: { type: Boolean, default: true },
    nextAvailable: Date
  },
  verification: {
    isVerified: { type: Boolean, default: false },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date,
    documents: [{
      type: String,
      url: String,
      verifiedAt: Date
    }]
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    case: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Case'
    },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  statistics: {
    casesHandled: { type: Number, default: 0 },
    casesWon: { type: Number, default: 0 },
    casesLost: { type: Number, default: 0 },
    casesPending: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 }
  },
  achievements: [{
    title: String,
    description: String,
    year: Number,
    organization: String
  }],
  publications: [{
    title: String,
    journal: String,
    year: Number,
    url: String
  }],
  socialCauses: [{
    cause: String,
    description: String,
    involvement: String
  }],
  proBonoWork: {
    available: { type: Boolean, default: false },
    criteria: String,
    hoursPerMonth: Number,
    causes: [String]
  },
  isActive: { type: Boolean, default: true },
  lastActive: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for success rate calculation
lawyerSchema.virtual('calculatedSuccessRate').get(function() {
  const totalCases = this.statistics.casesWon + this.statistics.casesLost;
  return totalCases > 0 ? Math.round((this.statistics.casesWon / totalCases) * 100) : 0;
});

// Index for better performance
lawyerSchema.index({ 'location.state': 1, 'location.city': 1 });
lawyerSchema.index({ specializations: 1 });
lawyerSchema.index({ 'rating.average': -1 });
lawyerSchema.index({ 'verification.isVerified': 1 });
lawyerSchema.index({ isActive: 1 });

// Pre-save middleware to update success rate
lawyerSchema.pre('save', function(next) {
  if (this.isModified('statistics')) {
    this.statistics.successRate = this.calculatedSuccessRate;
  }
  next();
});

export default mongoose.model('Lawyer', lawyerSchema);