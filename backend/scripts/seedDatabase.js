import dotenv from 'dotenv';
import { connectMongoDB } from '../config/database.js';
import { firebaseServices } from '../config/firebase.js';
import User from '../models/User.js';
import Case from '../models/Case.js';
import Lawyer from '../models/Lawyer.js';
import NGO from '../models/NGO.js';
import { logger } from '../utils/logger.js';

dotenv.config();

const seedData = {
  users: [
    {
      username: 'priya_sharma',
      email: 'priya@example.com',
      password: 'password123',
      profile: {
        firstName: 'Priya',
        lastName: 'Sharma',
        phone: '+91 98765 43210',
        address: {
          street: 'Sector 15',
          city: 'Noida',
          state: 'Uttar Pradesh',
          pincode: '201301',
          country: 'India'
        },
        languages: ['hindi', 'english'],
        preferredLanguage: 'hindi'
      },
      role: 'user'
    },
    {
      username: 'rajesh_kumar',
      email: 'rajesh@example.com',
      password: 'password123',
      profile: {
        firstName: 'Rajesh',
        lastName: 'Kumar',
        phone: '+91 87654 32109',
        address: {
          street: 'MG Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          country: 'India'
        },
        languages: ['hindi', 'english', 'marathi'],
        preferredLanguage: 'hindi'
      },
      role: 'user'
    }
  ],

  lawyers: [
    {
      barCouncilId: 'BAR/DL/2015/001234',
      specializations: ['women_rights', 'domestic_violence', 'family_law'],
      experience: {
        years: 8,
        description: 'Specialized in women rights and domestic violence cases'
      },
      location: {
        state: 'Delhi',
        city: 'New Delhi',
        address: 'Connaught Place, New Delhi'
      },
      languages: ['hindi', 'english', 'punjabi'],
      verification: {
        isVerified: true,
        verifiedAt: new Date()
      },
      rating: {
        average: 4.9,
        count: 127
      }
    }
  ],

  ngos: [
    {
      name: 'Women\'s Legal Aid Society Delhi',
      registrationNumber: 'NGO/DL/2010/001',
      registrationType: 'society',
      description: 'Providing free legal aid to women in distress',
      focusAreas: ['women_rights', 'legal_aid', 'human_rights'],
      location: {
        headquarters: {
          state: 'Delhi',
          city: 'New Delhi',
          address: 'Lajpat Nagar, New Delhi'
        }
      },
      contact: {
        phone: '+91 11 2234 5678',
        email: 'info@wlasd.org'
      },
      verification: {
        isVerified: true,
        verifiedAt: new Date()
      }
    }
  ]
};

async function seedDatabase() {
  try {
    logger.info('🌱 Starting database seeding...');

    // Connect to MongoDB
    if (process.env.USE_MONGODB === 'true') {
      await connectMongoDB();
      
      // Clear existing data
      await User.deleteMany({});
      await Case.deleteMany({});
      await Lawyer.deleteMany({});
      await NGO.deleteMany({});
      
      logger.info('📊 Cleared existing MongoDB data');
    }

    // Seed Users
    const createdUsers = [];
    for (const userData of seedData.users) {
      if (process.env.USE_MONGODB === 'true') {
        const user = await User.create(userData);
        createdUsers.push(user);
        logger.info(`👤 Created user: ${user.username}`);
      }

      if (process.env.USE_FIREBASE === 'true') {
        await firebaseServices.createUser(userData);
        logger.info(`🔥 Synced user to Firebase: ${userData.username}`);
      }
    }

    // Seed Lawyers
    for (const lawyerData of seedData.lawyers) {
      if (process.env.USE_MONGODB === 'true' && createdUsers.length > 0) {
        const lawyer = await Lawyer.create({
          ...lawyerData,
          user: createdUsers[0]._id
        });
        logger.info(`⚖️ Created lawyer: ${lawyer.barCouncilId}`);
      }
    }

    // Seed NGOs
    for (const ngoData of seedData.ngos) {
      if (process.env.USE_MONGODB === 'true') {
        const ngo = await NGO.create(ngoData);
        logger.info(`🏢 Created NGO: ${ngo.name}`);
      }
    }

    // Seed Sample Cases
    if (process.env.USE_MONGODB === 'true' && createdUsers.length > 0) {
      const sampleCase = {
        user: createdUsers[0]._id,
        title: 'Domestic Violence Complaint',
        description: 'पति द्वारा मारपीट और दहेज की मांग के खिलाफ शिकायत',
        originalQuery: 'मेरे पति मुझे मारते हैं और दहेज मांगते हैं। मैं क्या कर सकती हूं?',
        language: 'hindi',
        category: 'domestic_violence',
        aiAnalysis: {
          detectedIssues: ['Domestic Violence', 'Dowry Harassment'],
          suggestedLaws: [
            {
              section: 'IPC Section 498A',
              description: 'Husband or relative of husband subjecting woman to cruelty',
              relevance: '95%'
            }
          ],
          biasDetection: {
            detected: true,
            type: 'Gender',
            confidence: '92%',
            explanation: 'Gender-based violence detected'
          },
          confidence: '85%',
          recommendedActions: [
            'File FIR at local police station',
            'Contact women helpline',
            'Seek legal counsel'
          ]
        }
      };

      const case_ = await Case.create(sampleCase);
      logger.info(`📋 Created sample case: ${case_.title}`);

      if (process.env.USE_FIREBASE === 'true') {
        await firebaseServices.createCase(sampleCase);
        logger.info(`🔥 Synced case to Firebase: ${case_.title}`);
      }
    }

    logger.info('✅ Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    logger.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();