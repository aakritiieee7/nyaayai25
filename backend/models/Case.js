import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Case title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Case description is required'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  originalQuery: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['hindi', 'english', 'hinglish'],
    required: true
  },
  category: {
    type: String,
    enum: [
      'domestic_violence',
      'women_rights',
      'labor_rights',
      'property_dispute',
      'consumer_protection',
      'criminal_law',
      'family_law',
      'constitutional_rights',
      'caste_discrimination',
      'other'
    ],
    required: true
  },
  subcategory: String,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'pending', 'resolved', 'closed', 'archived'],
    default: 'active'
  },
  aiAnalysis: {
    detectedIssues: [String],
    suggestedLaws: [{
      section: String,
      description: String,
      relevance: String
    }],
    biasDetection: {
      detected: Boolean,
      type: String,
      confidence: String,
      explanation: String
    },
    confidence: String,
    recommendedActions: [String],
    processedAt: Date
  },
  assignedLawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer'
  },
  assignedNGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO'
  },
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now },
    size: Number
  }],
  timeline: [{
    event: String,
    description: String,
    date: { type: Date, default: Date.now },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  hearings: [{
    date: Date,
    time: String,
    court: String,
    judge: String,
    outcome: String,
    nextHearing: Date,
    notes: String
  }],
  location: {
    state: String,
    district: String,
    city: String,
    pincode: String
  },
  urgencyLevel: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  tags: [String],
  isPublic: {
    type: Boolean,
    default: false
  },
  resolution: {
    outcome: String,
    description: String,
    resolvedAt: Date,
    satisfaction: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  costs: {
    lawyerFees: Number,
    courtFees: Number,
    otherExpenses: Number,
    total: Number
  },
  notes: [{
    content: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: { type: Date, default: Date.now },
    isPrivate: { type: Boolean, default: false }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for case age
caseSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for next hearing
caseSchema.virtual('nextHearing').get(function() {
  const upcomingHearings = this.hearings
    .filter(hearing => hearing.date > new Date())
    .sort((a, b) => a.date - b.date);
  return upcomingHearings.length > 0 ? upcomingHearings[0] : null;
});

// Index for better performance
caseSchema.index({ user: 1, status: 1 });
caseSchema.index({ category: 1, status: 1 });
caseSchema.index({ createdAt: -1 });
caseSchema.index({ 'location.state': 1, 'location.district': 1 });

// Pre-save middleware to update timeline
caseSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.timeline.push({
      event: 'Status Changed',
      description: `Case status changed to ${this.status}`,
      date: new Date()
    });
  }
  next();
});

export default mongoose.model('Case', caseSchema);