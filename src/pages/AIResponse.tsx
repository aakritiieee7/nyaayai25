import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, Users, AlertTriangle, Scale, CheckCircle, Info, Brain, 
  Sparkles, Shield, Target, Zap, ArrowLeft, LogOut, User 
} from 'lucide-react';

const AIResponse = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, language } = location.state || {};
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const mockResponse = {
    cleanedQuery: query || "User query will appear here after AI processing",
    detectedIssues: [
      "Domestic Violence",
      "Women's Rights Violation"
    ],
    suggestedLaws: [
      {
        section: "IPC Section 498A",
        description: "Husband or relative of husband of a woman subjecting her to cruelty",
        relevance: "95%"
      },
      {
        section: "Protection of Women from Domestic Violence Act, 2005",
        description: "Comprehensive law to protect women from domestic violence",
        relevance: "92%"
      }
    ],
    biasDetection: {
      detected: true,
      type: "Gender",
      confidence: "92%",
      explanation: "Potential gender bias detected in the query context"
    },
    confidence: "85%",
    recommendedActions: [
      "File a complaint with local police station",
      "Approach Protection Officer under DV Act",
      "Contact local women's helpline",
      "Seek legal counsel from women's rights organization"
    ]
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <nav className="nav relative z-20">
        <div className="container-professional py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">
                न्याय AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/generate-draft')}
                className="btn-primary"
              >
                <FileText className="h-4 w-4" />
                <span>Generate Document</span>
              </button>
              <button
                onClick={() => navigate('/connect-help')}
                className="btn-accent"
              >
                <Users className="h-4 w-4" />
                <span>Connect Help</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-700">{user.username}</p>
                </div>
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-neutral-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-dark-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container-professional py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>

        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-dark-blue-100 rounded-full text-dark-blue-700 text-sm font-medium mb-6 animate-pulse">
            <Brain className="h-4 w-4 mr-2" />
            <span>AI Analysis Complete</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-dark-blue-600 mb-4">
            Legal Analysis Result
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            AI-powered analysis of your legal query with bias detection and recommendations
          </p>
        </div>

        <div className={`card-lg p-8 mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
            <Info className="h-6 w-6 mr-3 text-dark-blue-600" />
            Your Query Analysis
          </h2>
          <div className="bg-dark-blue-50 rounded-2xl p-6 border-l-4 border-dark-blue-500">
            <p className="text-neutral-800 text-lg leading-relaxed mb-4">{mockResponse.cleanedQuery}</p>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-dark-blue-500 rounded-full mr-2"></span>
                Language: {language || 'Hindi'}
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Confidence: {mockResponse.confidence}
              </div>
            </div>
          </div>
        </div>

        {mockResponse.biasDetection.detected && (
          <div className={`bg-red-50 border-2 border-red-200 rounded-3xl p-8 mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-600 animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 mb-2">Bias Detected</h3>
                <p className="text-red-800 mb-3">
                  {mockResponse.biasDetection.type} bias detected with {mockResponse.biasDetection.confidence} confidence.
                </p>
                <p className="text-red-700 text-sm bg-red-100 rounded-lg p-3">{mockResponse.biasDetection.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className={`card-lg p-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
              <Scale className="h-6 w-6 mr-3 text-orange-600" />
              Detected Legal Issues
            </h2>
            <div className="space-y-3">
              {mockResponse.detectedIssues.map((issue, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <span className="font-medium text-orange-900">{issue}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`card-lg p-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Analysis Confidence</h2>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray={`${parseInt(mockResponse.confidence)}, 100`}
                    className="animate-pulse"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-neutral-900">{mockResponse.confidence}</span>
                </div>
              </div>
              <p className="text-neutral-600">Analysis Accuracy</p>
            </div>
          </div>
        </div>

        <div className={`card-lg p-8 mb-8 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Applicable Laws & Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockResponse.suggestedLaws.map((law, index) => (
              <div key={index} className="bg-dark-blue-50 border border-dark-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-dark-blue-900 text-lg">{law.section}</h3>
                  <span className="px-3 py-1 bg-dark-blue-100 text-dark-blue-700 text-sm rounded-full font-medium">
                    {law.relevance}
                  </span>
                </div>
                <p className="text-dark-blue-800 leading-relaxed">{law.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`card-lg p-8 mb-8 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockResponse.recommendedActions.map((action, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-green-800 font-medium">{action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`card-lg p-8 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => navigate('/generate-draft', { state: { response: mockResponse } })}
              className="group flex items-center justify-center space-x-3 bg-orange-600 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FileText className="h-6 w-6 group-hover:animate-bounce" />
              <span>Generate Legal Draft</span>
              <Sparkles className="h-5 w-5 group-hover:animate-spin" />
            </button>
            <button
              onClick={() => navigate('/connect-help')}
              className="group flex items-center justify-center space-x-3 bg-dark-blue-600 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-dark-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Users className="h-6 w-6 group-hover:animate-bounce" />
              <span>Connect to Help</span>
              <Zap className="h-5 w-5 group-hover:animate-pulse" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResponse;