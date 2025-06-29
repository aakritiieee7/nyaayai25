import { logger } from '../utils/logger.js';

class BiasDetectionService {
  constructor() {
    // Bias detection patterns for Indian context
    this.biasPatterns = {
      gender: [
        'औरत', 'महिला', 'लड़की', 'बहू', 'पत्नी', 'woman', 'girl', 'wife', 'female',
        'मर्द', 'आदमी', 'लड़का', 'पति', 'man', 'male', 'husband', 'boy'
      ],
      caste: [
        'जाति', 'दलित', 'ब्राह्मण', 'क्षत्रिय', 'वैश्य', 'शूद्र', 'अनुसूचित',
        'caste', 'dalit', 'brahmin', 'kshatriya', 'vaishya', 'shudra', 'scheduled'
      ],
      religion: [
        'हिंदू', 'मुस्लिम', 'सिख', 'ईसाई', 'बौद्ध', 'जैन',
        'hindu', 'muslim', 'sikh', 'christian', 'buddhist', 'jain'
      ],
      economic: [
        'गरीब', 'अमीर', 'पैसा', 'धन', 'संपत्ति', 'poor', 'rich', 'money', 'wealth', 'property'
      ],
      regional: [
        'उत्तर', 'दक्षिण', 'पूर्व', 'पश्चिम', 'गांव', 'शहर',
        'north', 'south', 'east', 'west', 'village', 'city', 'rural', 'urban'
      ]
    };

    this.discriminationKeywords = [
      'भेदभाव', 'अन्याय', 'अत्याचार', 'उत्पीड़न', 'शोषण',
      'discrimination', 'injustice', 'oppression', 'harassment', 'exploitation',
      'unfair', 'biased', 'prejudice', 'stereotype'
    ];
  }

  async detectBias(query, language) {
    try {
      const detectedBiases = [];
      const queryLower = query.toLowerCase();

      // Check for different types of bias
      for (const [biasType, patterns] of Object.entries(this.biasPatterns)) {
        const foundPatterns = patterns.filter(pattern => 
          queryLower.includes(pattern.toLowerCase())
        );

        if (foundPatterns.length > 0) {
          detectedBiases.push({
            type: biasType,
            patterns: foundPatterns,
            severity: this.calculateSeverity(foundPatterns, queryLower)
          });
        }
      }

      // Check for discrimination keywords
      const discriminationFound = this.discriminationKeywords.filter(keyword =>
        queryLower.includes(keyword.toLowerCase())
      );

      const hasBias = detectedBiases.length > 0 || discriminationFound.length > 0;
      
      if (!hasBias) {
        return {
          detected: false,
          type: null,
          confidence: '0%',
          explanation: 'No bias patterns detected in the query.'
        };
      }

      // Determine primary bias type
      const primaryBias = detectedBiases.length > 0 
        ? detectedBiases.reduce((prev, current) => 
            prev.severity > current.severity ? prev : current
          )
        : { type: 'general', severity: 0.5 };

      const confidence = this.calculateConfidence(detectedBiases, discriminationFound);
      const explanation = this.generateExplanation(detectedBiases, discriminationFound, language);

      logger.info(`Bias detected: ${primaryBias.type} with ${confidence} confidence`);

      return {
        detected: true,
        type: this.formatBiasType(primaryBias.type),
        confidence: confidence + '%',
        explanation,
        details: {
          biasTypes: detectedBiases.map(b => b.type),
          discriminationKeywords: discriminationFound,
          severity: primaryBias.severity
        }
      };

    } catch (error) {
      logger.error('Error in bias detection:', error);
      return {
        detected: false,
        type: null,
        confidence: '0%',
        explanation: 'Unable to analyze bias due to technical error.'
      };
    }
  }

  calculateSeverity(patterns, query) {
    let severity = patterns.length * 0.2; // Base severity based on pattern count
    
    // Increase severity if multiple patterns of same type found
    if (patterns.length > 2) {
      severity += 0.3;
    }

    // Check context for severity indicators
    const severityIndicators = [
      'मारना', 'पीटना', 'हिंसा', 'धमकी', 'beating', 'violence', 'threat', 'abuse'
    ];

    const foundIndicators = severityIndicators.filter(indicator =>
      query.toLowerCase().includes(indicator.toLowerCase())
    );

    severity += foundIndicators.length * 0.2;

    return Math.min(severity, 1.0); // Cap at 1.0
  }

  calculateConfidence(detectedBiases, discriminationFound) {
    let confidence = 30; // Base confidence

    // Add confidence based on bias patterns found
    confidence += detectedBiases.length * 15;

    // Add confidence based on discrimination keywords
    confidence += discriminationFound.length * 10;

    // Boost confidence if multiple bias types detected
    if (detectedBiases.length > 1) {
      confidence += 20;
    }

    // Boost confidence if explicit discrimination keywords found
    if (discriminationFound.length > 0) {
      confidence += 15;
    }

    return Math.min(confidence, 95); // Cap at 95%
  }

  generateExplanation(detectedBiases, discriminationFound, language) {
    const explanations = {
      hindi: {
        gender: 'लिंग आधारित भेदभाव की संभावना का पता चला है।',
        caste: 'जाति आधारित भेदभाव की संभावना का पता चला है।',
        religion: 'धर्म आधारित भेदभाव की संभावना का पता चला है।',
        economic: 'आर्थिक स्थिति के आधार पर भेदभाव की संभावना है।',
        regional: 'क्षेत्रीय या भाषाई भेदभाव की संभावना है।',
        general: 'सामान्य भेदभाव की संभावना का पता चला है।'
      },
      english: {
        gender: 'Potential gender-based discrimination detected.',
        caste: 'Potential caste-based discrimination detected.',
        religion: 'Potential religion-based discrimination detected.',
        economic: 'Potential economic status-based discrimination detected.',
        regional: 'Potential regional or linguistic discrimination detected.',
        general: 'General discrimination patterns detected.'
      }
    };

    const lang = language === 'hindi' ? 'hindi' : 'english';
    
    if (detectedBiases.length > 0) {
      const primaryBias = detectedBiases[0].type;
      return explanations[lang][primaryBias] || explanations[lang].general;
    }

    if (discriminationFound.length > 0) {
      return lang === 'hindi' 
        ? 'भेदभाव संबंधी शब्दों का उपयोग मिला है।'
        : 'Discrimination-related keywords found in the query.';
    }

    return lang === 'hindi'
      ? 'संभावित पूर्वाग्रह का पता चला है।'
      : 'Potential bias patterns detected in the query.';
  }

  formatBiasType(type) {
    const typeMap = {
      gender: 'Gender',
      caste: 'Caste',
      religion: 'Religion',
      economic: 'Economic',
      regional: 'Regional',
      general: 'General'
    };

    return typeMap[type] || 'General';
  }

  // Method to get bias prevention suggestions
  getBiasPreventionSuggestions(biasType, language = 'english') {
    const suggestions = {
      english: {
        gender: [
          'Ensure equal treatment regardless of gender',
          'Document any gender-based discrimination',
          'Contact women\'s rights organizations',
          'File complaint under relevant women protection laws'
        ],
        caste: [
          'Document caste-based discrimination incidents',
          'File complaint under SC/ST Prevention of Atrocities Act',
          'Contact Dalit rights organizations',
          'Seek legal aid for caste discrimination cases'
        ],
        religion: [
          'Document religious discrimination',
          'Contact minority rights organizations',
          'File complaint under relevant constitutional provisions',
          'Seek legal counsel for religious freedom cases'
        ],
        economic: [
          'Document economic discrimination',
          'Seek legal aid services',
          'Contact poverty alleviation programs',
          'File complaint with appropriate authorities'
        ],
        regional: [
          'Document linguistic or regional discrimination',
          'Contact regional rights organizations',
          'File complaint under language rights provisions',
          'Seek local community support'
        ]
      },
      hindi: {
        gender: [
          'लिंग के आधार पर समान व्यवहार सुनिश्चित करें',
          'लिंग आधारित भेदभाव का दस्तावेजीकरण करें',
          'महिला अधिकार संगठनों से संपर्क करें',
          'महिला सुरक्षा कानूनों के तहत शिकायत दर्ज करें'
        ],
        caste: [
          'जाति आधारित भेदभाव की घटनाओं का दस्तावेजीकरण करें',
          'अनुसूचित जाति/जनजाति अत्याचार निवारण अधिनियम के तहत शिकायत दर्ज करें',
          'दलित अधिकार संगठनों से संपर्क करें',
          'जाति भेदभाव के मामलों के लिए कानूनी सहायता लें'
        ],
        religion: [
          'धार्मिक भेदभाव का दस्तावेजीकरण करें',
          'अल्पसंख्यक अधिकार संगठनों से संपर्क करें',
          'संबंधित संवैधानिक प्रावधानों के तहत शिकायत दर्ज करें',
          'धार्मिक स्वतंत्रता के मामलों के लिए कानूनी सलाह लें'
        ]
      }
    };

    const lang = language === 'hindi' ? 'hindi' : 'english';
    return suggestions[lang][biasType] || suggestions[lang].gender;
  }
}

export const biasDetectionService = new BiasDetectionService();