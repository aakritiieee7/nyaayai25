import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'NGO name is required'],
    trim: true,
    maxlength: [200, 'Name cannot exceed 200 characters']
  },
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true
  },
  registrationType: {
    type: String,
    enum: ['society', 'trust', 'section8', 'ngo', 'foundation'],
    required: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  mission: String,
  vision: String,
  focusAreas: [{
    type: String,
    enum: [
      'women_rights',
      'child_rights',
      'labor_rights',
      'human_rights',
      'legal_aid',
      'education',
      'health',
      'environment',
      'poverty_alleviation',
      'disability_rights',
      'lgbtq_rights',
      'tribal_rights',
      'dalit_rights',
      'minority_rights'
    ]
  }],
  services: [{
    name: String,
    description: String,
    isFree: { type: Boolean, default: true },
    cost: Number,
    eligibility: String
  }],
  location: {
    headquarters: {
      state: { type: String, required: true },
      district: String,
      city: { type: String, required: true },
      address: { type: String, required: true },
      pincode: String
    },
    operatingStates: [String],
    operatingDistricts: [String]
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String
    }
  },
  team: [{
    name: String,
    position: String,
    qualification: String,
    experience: String,
    specialization: [String]
  }],
  lawyers: [{
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lawyer'
    },
    role: String,
    isVolunteer: { type: Boolean, default: true },
    joinedAt: { type: Date, default: Date.now }
  }],
  verification: {
    isVerified: { type: Boolean, default: false },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date,
    documents: [{
      type: String,
      name: String,
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
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    serviceUsed: String,
    createdAt: { type: Date, default: Date.now }
  }],
  statistics: {
    casesHandled: { type: Number, default: 0 },
    peopleHelped: { type: Number, default: 0 },
    successfulCases: { type: Number, default: 0 },
    ongoingCases: { type: Number, default: 0 }
  },
  funding: {
    sources: [String],
    annualBudget: Number,
    transparencyScore: { type: Number, min: 0, max: 100 }
  },
  achievements: [{
    title: String,
    description: String,
    year: Number,
    awardedBy: String
  }],
  partnerships: [{
    organization: String,
    type: String,
    description: String,
    startDate: Date
  }],
  availability: {
    workingHours: {
      monday: { start: String, end: String },
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String }
    },
    emergencyContact: {
      available: { type: Boolean, default: false },
      phone: String,
      hours: String
    }
  },
  languages: [{
    type: String,
    enum: ['hindi', 'english', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati', 'kannada', 'malayalam', 'punjabi', 'odia', 'assamese']
  }],
  isActive: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for success rate
ngoSchema.virtual('successRate').get(function() {
  return this.statistics.casesHandled > 0 
    ? Math.round((this.statistics.successfulCases / this.statistics.casesHandled) * 100)
    : 0;
});

// Index for better performance
ngoSchema.index({ 'location.headquarters.state': 1, 'location.headquarters.city': 1 });
ngoSchema.index({ focusAreas: 1 });
ngoSchema.index({ 'rating.average': -1 });
ngoSchema.index({ 'verification.isVerified': 1 });
ngoSchema.index({ isActive: 1 });

export default mongoose.model('NGO', ngoSchema);