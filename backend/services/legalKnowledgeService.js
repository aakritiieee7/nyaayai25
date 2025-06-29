import { logger } from '../utils/logger.js';

class LegalKnowledgeService {
  constructor() {
    // Indian legal knowledge base
    this.legalDatabase = {
      domestic_violence: [
        {
          section: "IPC Section 498A",
          description: "Husband or relative of husband of a woman subjecting her to cruelty",
          relevance: "95%",
          details: "Punishment for subjecting a married woman to cruelty"
        },
        {
          section: "Protection of Women from Domestic Violence Act, 2005",
          description: "Comprehensive law to protect women from domestic violence",
          relevance: "92%",
          details: "Provides for more effective protection of the rights of women"
        },
        {
          section: "IPC Section 354",
          description: "Assault or criminal force to woman with intent to outrage her modesty",
          relevance: "85%",
          details: "Covers physical assault and molestation"
        }
      ],
      women_rights: [
        {
          section: "IPC Section 354A",
          description: "Sexual harassment and punishment for sexual harassment",
          relevance: "90%",
          details: "Covers workplace and other forms of sexual harassment"
        },
        {
          section: "Sexual Harassment of Women at Workplace Act, 2013",
          description: "Prevention, prohibition and redressal of sexual harassment of women at workplace",
          relevance: "95%",
          details: "Mandatory for all workplaces with 10 or more employees"
        },
        {
          section: "Dowry Prohibition Act, 1961",
          description: "Prohibition of dowry",
          relevance: "88%",
          details: "Makes giving and taking of dowry a criminal offense"
        }
      ],
      labor_rights: [
        {
          section: "Minimum Wages Act, 1948",
          description: "Provides for fixing minimum rates of wages",
          relevance: "95%",
          details: "Ensures minimum wage payment to workers"
        },
        {
          section: "Payment of Wages Act, 1936",
          description: "Regulates payment of wages to certain classes of persons",
          relevance: "90%",
          details: "Prevents unauthorized deductions from wages"
        },
        {
          section: "Industrial Disputes Act, 1947",
          description: "Investigation and settlement of industrial disputes",
          relevance: "85%",
          details: "Covers wrongful termination and labor disputes"
        }
      ],
      property_dispute: [
        {
          section: "Transfer of Property Act, 1882",
          description: "Transfer of property by act of parties",
          relevance: "90%",
          details: "Governs transfer of immovable property"
        },
        {
          section: "Registration Act, 1908",
          description: "Registration of documents",
          relevance: "85%",
          details: "Mandatory registration of property documents"
        },
        {
          section: "Indian Succession Act, 1925",
          description: "Succession and inheritance laws",
          relevance: "80%",
          details: "Covers inheritance and succession rights"
        }
      ],
      consumer_protection: [
        {
          section: "Consumer Protection Act, 2019",
          description: "Protection of interests of consumers",
          relevance: "95%",
          details: "Comprehensive consumer protection law"
        },
        {
          section: "Sale of Goods Act, 1930",
          description: "Sale of goods and related matters",
          relevance: "85%",
          details: "Covers defective goods and warranty issues"
        }
      ],
      criminal_law: [
        {
          section: "IPC Section 420",
          description: "Cheating and dishonestly inducing delivery of property",
          relevance: "90%",
          details: "Covers fraud and cheating cases"
        },
        {
          section: "IPC Section 379",
          description: "Punishment for theft",
          relevance: "85%",
          details: "Basic theft provisions"
        },
        {
          section: "IPC Section 506",
          description: "Punishment for criminal intimidation",
          relevance: "80%",
          details: "Covers threats and intimidation"
        }
      ],
      caste_discrimination: [
        {
          section: "Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989",
          description: "Prevention of atrocities against SCs and STs",
          relevance: "95%",
          details: "Comprehensive law against caste-based discrimination"
        },
        {
          section: "Article 15 of Constitution",
          description: "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
          relevance: "90%",
          details: "Constitutional protection against discrimination"
        },
        {
          section: "Article 17 of Constitution",
          description: "Abolition of untouchability",
          relevance: "88%",
          details: "Constitutional abolition of untouchability"
        }
      ],
      constitutional_rights: [
        {
          section: "Article 21 of Constitution",
          description: "Protection of life and personal liberty",
          relevance: "95%",
          details: "Fundamental right to life and liberty"
        },
        {
          section: "Article 14 of Constitution",
          description: "Equality before law",
          relevance: "90%",
          details: "Right to equality and equal protection of laws"
        },
        {
          section: "Article 19 of Constitution",
          description: "Protection of certain rights regarding freedom of speech etc.",
          relevance: "85%",
          details: "Fundamental freedoms including speech and expression"
        }
      ]
    };

    this.legalCategories = [
      {
        id: 'domestic_violence',
        name: 'Domestic Violence',
        description: 'Violence within domestic relationships',
        keywords: ['domestic', 'violence', 'husband', 'wife', 'family', 'abuse']
      },
      {
        id: 'women_rights',
        name: 'Women Rights',
        description: 'Rights and protection for women',
        keywords: ['women', 'harassment', 'dowry', 'workplace', 'sexual']
      },
      {
        id: 'labor_rights',
        name: 'Labor Rights',
        description: 'Workers and employment rights',
        keywords: ['worker', 'employee', 'wages', 'salary', 'job', 'termination']
      },
      {
        id: 'property_dispute',
        name: 'Property Dispute',
        description: 'Property and land related disputes',
        keywords: ['property', 'land', 'house', 'inheritance', 'ownership']
      },
      {
        id: 'consumer_protection',
        name: 'Consumer Protection',
        description: 'Consumer rights and protection',
        keywords: ['consumer', 'product', 'service', 'defective', 'warranty']
      },
      {
        id: 'criminal_law',
        name: 'Criminal Law',
        description: 'Criminal offenses and procedures',
        keywords: ['theft', 'fraud', 'cheating', 'criminal', 'police']
      },
      {
        id: 'caste_discrimination',
        name: 'Caste Discrimination',
        description: 'Caste-based discrimination and atrocities',
        keywords: ['caste', 'dalit', 'scheduled', 'discrimination', 'atrocity']
      },
      {
        id: 'constitutional_rights',
        name: 'Constitutional Rights',
        description: 'Fundamental rights and constitutional matters',
        keywords: ['fundamental', 'rights', 'constitution', 'freedom', 'equality']
      }
    ];
  }

  async findRelevantLaws(detectedIssues, category) {
    try {
      let relevantLaws = [];

      // Get laws for the primary category
      if (this.legalDatabase[category]) {
        relevantLaws = [...this.legalDatabase[category]];
      }

      // Search for additional relevant laws based on detected issues
      for (const issue of detectedIssues) {
        const issueLower = issue.toLowerCase();
        
        // Search across all categories for relevant laws
        for (const [cat, laws] of Object.entries(this.legalDatabase)) {
          for (const law of laws) {
            const isRelevant = 
              law.section.toLowerCase().includes(issueLower) ||
              law.description.toLowerCase().includes(issueLower) ||
              law.details.toLowerCase().includes(issueLower);

            if (isRelevant && !relevantLaws.find(l => l.section === law.section)) {
              relevantLaws.push({
                ...law,
                relevance: this.calculateRelevance(issue, law)
              });
            }
          }
        }
      }

      // Sort by relevance and return top results
      return relevantLaws
        .sort((a, b) => parseFloat(b.relevance) - parseFloat(a.relevance))
        .slice(0, 5);

    } catch (error) {
      logger.error('Error finding relevant laws:', error);
      return [];
    }
  }

  calculateRelevance(issue, law) {
    let relevance = 50; // Base relevance

    const issueLower = issue.toLowerCase();
    const lawText = `${law.section} ${law.description} ${law.details}`.toLowerCase();

    // Exact keyword matches
    const issueWords = issueLower.split(' ');
    const matchingWords = issueWords.filter(word => 
      word.length > 3 && lawText.includes(word)
    );

    relevance += matchingWords.length * 10;

    // Boost for section number matches
    if (lawText.includes(issueLower)) {
      relevance += 20;
    }

    // Cap at 95%
    return Math.min(relevance, 95) + '%';
  }

  async getLegalCategories() {
    return this.legalCategories;
  }

  async searchLaws(query, category = null) {
    try {
      const queryLower = query.toLowerCase();
      let searchResults = [];

      const categoriesToSearch = category 
        ? [category] 
        : Object.keys(this.legalDatabase);

      for (const cat of categoriesToSearch) {
        if (this.legalDatabase[cat]) {
          for (const law of this.legalDatabase[cat]) {
            const lawText = `${law.section} ${law.description} ${law.details}`.toLowerCase();
            
            if (lawText.includes(queryLower)) {
              searchResults.push({
                ...law,
                category: cat,
                relevance: this.calculateSearchRelevance(query, law)
              });
            }
          }
        }
      }

      return searchResults
        .sort((a, b) => parseFloat(b.relevance) - parseFloat(a.relevance))
        .slice(0, 10);

    } catch (error) {
      logger.error('Error searching laws:', error);
      return [];
    }
  }

  calculateSearchRelevance(query, law) {
    const queryLower = query.toLowerCase();
    const lawText = `${law.section} ${law.description}`.toLowerCase();

    let score = 0;

    // Exact phrase match
    if (lawText.includes(queryLower)) {
      score += 50;
    }

    // Word matches
    const queryWords = queryLower.split(' ').filter(word => word.length > 2);
    const matchingWords = queryWords.filter(word => lawText.includes(word));
    score += (matchingWords.length / queryWords.length) * 30;

    // Section number boost
    if (law.section.toLowerCase().includes(queryLower)) {
      score += 20;
    }

    return Math.min(score, 95) + '%';
  }

  // Get emergency contact information
  getEmergencyContacts() {
    return {
      police: {
        number: '100',
        description: 'Police Emergency'
      },
      womenHelpline: {
        number: '1091',
        description: 'Women Helpline (24x7)'
      },
      childHelpline: {
        number: '1098',
        description: 'Child Helpline'
      },
      legalAid: {
        number: '15100',
        description: 'National Legal Services Authority'
      },
      elderlyHelpline: {
        number: '14567',
        description: 'Elder Line (Toll Free)'
      },
      mentalHealth: {
        number: '9152987821',
        description: 'COOJ Mental Health Foundation'
      }
    };
  }

  // Get legal aid information by state
  getLegalAidInfo(state) {
    const legalAidContacts = {
      'delhi': {
        authority: 'Delhi State Legal Services Authority',
        address: 'Delhi High Court Complex, New Delhi',
        phone: '011-23385010',
        email: 'dslsa@delhicourts.nic.in'
      },
      'mumbai': {
        authority: 'Maharashtra State Legal Services Authority',
        address: 'Bombay High Court, Mumbai',
        phone: '022-22621681',
        email: 'mslsa@bombayhighcourt.nic.in'
      },
      'bangalore': {
        authority: 'Karnataka State Legal Services Authority',
        address: 'High Court of Karnataka, Bangalore',
        phone: '080-22212926',
        email: 'kslsa@karnatakajudiciary.kar.nic.in'
      }
      // Add more states as needed
    };

    return legalAidContacts[state.toLowerCase()] || {
      authority: 'National Legal Services Authority',
      address: 'Supreme Court of India, New Delhi',
      phone: '011-23388922',
      email: 'nalsa@nic.in'
    };
  }
}

export const legalKnowledgeService = new LegalKnowledgeService();