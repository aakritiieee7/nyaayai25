import OpenAI from 'openai';
import { logger } from '../utils/logger.js';

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async cleanQuery(query, language) {
    try {
      const prompt = `
        Clean and standardize this legal query in ${language}. 
        Remove unnecessary words, correct spelling, and make it clear and concise.
        Preserve the original meaning and legal context.
        
        Query: "${query}"
        
        Return only the cleaned query without any additional text.
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.3
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      logger.error('Error cleaning query:', error);
      return query; // Return original if cleaning fails
    }
  }

  async analyzeLegalIssues(query, language) {
    try {
      const prompt = `
        Analyze this legal query and provide a structured response in JSON format:
        
        Query: "${query}"
        Language: ${language}
        
        Analyze for Indian legal context and return JSON with:
        {
          "detectedIssues": ["issue1", "issue2"],
          "category": "primary_category",
          "subcategory": "specific_subcategory",
          "urgencyLevel": 1-10,
          "suggestedTitle": "Brief case title",
          "keyTerms": ["term1", "term2"]
        }
        
        Categories: domestic_violence, women_rights, labor_rights, property_dispute, 
        consumer_protection, criminal_law, family_law, constitutional_rights, 
        caste_discrimination, other
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        temperature: 0.2
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      logger.error('Error analyzing legal issues:', error);
      // Return default analysis if AI fails
      return {
        detectedIssues: ["General Legal Issue"],
        category: "other",
        subcategory: "general",
        urgencyLevel: 5,
        suggestedTitle: "Legal Query",
        keyTerms: []
      };
    }
  }

  async generateRecommendations(legalAnalysis, relevantLaws, biasAnalysis) {
    try {
      const prompt = `
        Based on this legal analysis, generate specific actionable recommendations:
        
        Issues: ${legalAnalysis.detectedIssues.join(', ')}
        Category: ${legalAnalysis.category}
        Relevant Laws: ${relevantLaws.map(law => law.section).join(', ')}
        Bias Detected: ${biasAnalysis.detected ? 'Yes' : 'No'}
        
        Provide 4-6 specific, actionable recommendations for Indian legal context.
        Focus on immediate steps the person can take.
        
        Return as JSON array: ["recommendation1", "recommendation2", ...]
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600,
        temperature: 0.4
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      logger.error('Error generating recommendations:', error);
      return [
        "Consult with a qualified lawyer",
        "Gather all relevant documents",
        "File a complaint with appropriate authorities",
        "Seek legal aid if needed"
      ];
    }
  }

  async generateDocument(type, data, caseId) {
    try {
      const templates = {
        fir: this.generateFIRTemplate,
        rti: this.generateRTITemplate,
        notice: this.generateNoticeTemplate,
        complaint: this.generateComplaintTemplate
      };

      const generator = templates[type];
      if (!generator) {
        throw new Error(`Unknown document type: ${type}`);
      }

      return await generator.call(this, data);
    } catch (error) {
      logger.error('Error generating document:', error);
      throw error;
    }
  }

  async generateFIRTemplate(data) {
    const template = `
To,
The Officer In-Charge,
${data.policeStation || '[Police Station Name]'}

Subject: First Information Report

Sir/Madam,

I, ${data.name || '[Your Name]'}, son/daughter of ${data.fatherName || '[Father\'s Name]'}, 
resident of ${data.address || '[Your Address]'}, would like to lodge a complaint regarding 
the following incident:

Date of Incident: ${data.date || '[Date]'}
Location: ${data.location || '[Location of Incident]'}

Details of the Complaint:
${data.description || '[Describe the incident in detail]'}

I request you to register an FIR and take necessary action as per law.

Yours sincerely,
${data.name || '[Your Name]'}
Contact: ${data.phone || '[Phone Number]'}
Email: ${data.email || '[Email Address]'}
Date: ${new Date().toLocaleDateString()}
    `;

    return template.trim();
  }

  async generateRTITemplate(data) {
    const template = `
To,
The Public Information Officer,
${data.department || '[Department Name]'}
${data.address || '[Department Address]'}

Subject: Application under Right to Information Act, 2005

Sir/Madam,

Under the Right to Information Act, 2005, I ${data.name || '[Your Name]'}, 
request the following information:

1. ${data.description || '[Specify the information you need]'}

2. Please provide certified copies of relevant documents.

3. If the information sought is held by another public authority, kindly transfer 
   this application under Section 6(3) of the RTI Act.

I am enclosing the application fee of Rs. 10/- by way of ${data.paymentMethod || '[payment method]'}.

Contact Details:
Name: ${data.name || '[Your Name]'}
Address: ${data.address || '[Your Address]'}
Phone: ${data.phone || '[Phone Number]'}
Email: ${data.email || '[Email Address]'}

Date: ${new Date().toLocaleDateString()}

Yours sincerely,
${data.name || '[Your Name]'}
    `;

    return template.trim();
  }

  async generateNoticeTemplate(data) {
    const template = `
LEGAL NOTICE

TO:
${data.recipientName || '[Recipient Name]'}
${data.recipientAddress || '[Recipient Address]'}

FROM:
${data.name || '[Your Name]'}
${data.address || '[Your Address]'}

SUBJECT: Legal Notice under ${data.applicableLaw || '[Applicable Law]'}

Sir/Madam,

TAKE NOTICE that you are hereby called upon to ${data.description || '[specify the demand/action required]'} 
within 15 days from the receipt of this notice, failing which my client will be constrained to 
initiate appropriate legal proceedings against you for the recovery of the said amount along with 
interest and costs.

TAKE FURTHER NOTICE that if you fail to comply with the above, my client will be compelled to 
file a suit for specific performance and/or damages which will be at your risk as to costs.

Dated: ${new Date().toLocaleDateString()}

${data.name || '[Your Name]'}
Contact: ${data.phone || '[Phone Number]'}
    `;

    return template.trim();
  }

  async generateComplaintTemplate(data) {
    const template = `
CONSUMER COMPLAINT

Before the District Consumer Disputes Redressal Forum
${data.district || '[District Name]'}

BETWEEN:

${data.name || '[Your Name]'}
Son/Daughter of ${data.fatherName || '[Father\'s Name]'}
Resident of ${data.address || '[Your Address]'}
Contact: ${data.phone || '[Phone Number]'}
Email: ${data.email || '[Email Address]'}

... COMPLAINANT

VERSUS

${data.oppositeParty || '[Name of opposite party]'}
${data.oppositePartyAddress || '[Address of opposite party]'}

... OPPOSITE PARTY

COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019

FACTS OF THE CASE:

1. That the complainant purchased goods/services from the opposite party on ${data.date || '[Date]'}.

2. ${data.description || '[Describe the deficiency in service or defect in goods]'}

3. That the act of the opposite party amounts to deficiency in service/defective goods 
   under the Consumer Protection Act, 2019.

RELIEFS SOUGHT:

a) Direct the opposite party to replace/repair the defective goods/service
b) Refund the amount paid
c) Compensation for mental agony and harassment
d) Cost of litigation

Date: ${new Date().toLocaleDateString()}

${data.name || '[Your Name]'}
(Complainant)
    `;

    return template.trim();
  }

  async translateText(text, from, to) {
    try {
      const prompt = `
        Translate the following text from ${from} to ${to}.
        Maintain legal terminology accuracy and cultural context.
        
        Text: "${text}"
        
        Return only the translation without any additional text.
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.2
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      logger.error('Error translating text:', error);
      throw error;
    }
  }

  calculateConfidence(legalAnalysis, relevantLaws, biasAnalysis) {
    let confidence = 50; // Base confidence

    // Increase confidence based on detected issues
    if (legalAnalysis.detectedIssues.length > 0) {
      confidence += 20;
    }

    // Increase confidence based on relevant laws found
    if (relevantLaws.length > 0) {
      confidence += 15;
    }

    // Adjust based on category specificity
    if (legalAnalysis.category !== 'other') {
      confidence += 10;
    }

    // Adjust based on bias detection confidence
    if (biasAnalysis.detected && biasAnalysis.confidence) {
      const biasConfidence = parseInt(biasAnalysis.confidence.replace('%', ''));
      confidence += Math.min(biasConfidence / 10, 5);
    }

    return Math.min(confidence, 95) + '%'; // Cap at 95%
  }
}

export const aiService = new AIService();