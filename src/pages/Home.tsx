import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, MicOff, Send, Globe, Sparkles, Shield, Users, Scale, 
  Brain, Heart, Star, Award, CheckCircle, ArrowRight, FileText, MessageCircle,
  LogOut, User, Phone, Mail, MapPin, BarChart3
} from 'lucide-react';

const Home = ({ user, onLogout }) => {
  const [query, setQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    
    return () => clearInterval(quoteInterval);
  }, []);

  const quotes = [
    {
      text: "न्याय देर से मिले तो चलेगा, लेकिन मिलना जरूरी है।",
      author: "महात्मा गांधी",
      translation: "Justice delayed is acceptable, but justice must be served."
    },
    {
      text: "कानून सबके लिए समान है, चाहे वो राजा हो या रंक।",
      author: "डॉ. ए.पी.जे. अब्दुल कलाम",
      translation: "Law is equal for all, whether king or pauper."
    },
    {
      text: "अधिकार मांगने से नहीं, जानने से मिलते हैं।",
      author: "चाणक्य",
      translation: "Rights are not gained by demanding, but by knowing."
    }
  ];

  const languages = [
    { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'english', label: 'English', flag: '🇬🇧' },
    { value: 'hinglish', label: 'Hinglish', flag: '🇮🇳' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/ai-response', { state: { query, language: selectedLanguage } });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <nav className="nav relative z-20">
        <div className="container-professional py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Scale className="h-10 w-10 text-orange-600" />
              <span className="text-3xl font-display font-black bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                न्याय AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 px-4 py-2 bg-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-700 transition-colors"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/generate-draft')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span>Generate Document</span>
              </button>
              <button
                onClick={() => navigate('/connect-help')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>Connect with Lawyers/NGOs</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-700">Welcome, {user.username}</p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-professional">
                  <span className="text-white font-bold text-lg">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-neutral-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container-professional py-8">
        <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Scale className="h-24 w-24 text-orange-600 mx-auto mb-6 animate-float" />
          
          <div className="relative mb-6">
            <h1 className="heading-xl font-hindi bg-gradient-to-r from-navy-800 via-royal-600 to-navy-700 bg-clip-text text-transparent mb-6 relative">
              न्याय AI
            </h1>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-40"></div>
          </div>
          
          <div className="relative mb-6">
            <h2 className="heading-md mb-6 bg-gradient-to-r from-navy-800 to-royal-600 bg-clip-text text-transparent font-display font-bold relative">
              NYAAYAI
            </h2>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-2 h-2 border border-orange-400 rotate-45 opacity-30"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 flex space-x-1">
              <div className="w-1 h-1 bg-orange-500 rounded-full opacity-50"></div>
              <div className="w-1 h-1 bg-orange-400 rounded-full opacity-40"></div>
              <div className="w-1 h-1 bg-orange-500 rounded-full opacity-50"></div>
            </div>
          </div>
          
          <p className="text-body-lg mb-8 max-w-4xl mx-auto">
            AI-powered legal guidance platform for India. Get instant help in your language.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full shadow-professional">
              <Shield className="h-5 w-5 text-navy-600" />
              <span className="text-caption font-medium text-neutral-700">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full shadow-professional">
              <Globe className="h-5 w-5 text-neutral-600" />
              <span className="text-caption font-medium text-neutral-700">Multi-language</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full shadow-professional">
              <Heart className="h-5 w-5 text-orange-600" />
              <span className="text-caption font-medium text-neutral-700">Free Legal Aid</span>
            </div>
          </div>
        </div>

        <div className={`mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="md:col-span-2">
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-professional-xl hover-lift">
                <img
                  src="/130622-hqpgpkgejz-1573302845 (1).jpg"
                  alt="Justice and Legal Rights"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-800/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-display font-bold font-hindi text-white mb-2 drop-shadow-lg">न्याय सबका अधिकार है</h3>
                  <p className="text-lg text-white/95 font-medium drop-shadow-md">Justice is everyone's right</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative h-28 rounded-2xl overflow-hidden shadow-professional hover-lift">
                <img
                  src="https://media.licdn.com/dms/image/v2/C5612AQGhFnwz7yDVCg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1619062253866?e=2147483647&v=beta&t=-7AN0-DA-1XplFNtS_CNf2H6pP11V0vPpXTydGuFjpk"
                  alt="Legal System India"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-800/20 to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <p className="text-sm font-bold font-hindi text-white drop-shadow-lg">न्यायपालिका</p>
                  <p className="text-xs text-white/90 drop-shadow-md">Judiciary</p>
                </div>
              </div>

              <div className="relative h-28 rounded-2xl overflow-hidden shadow-professional hover-lift">
                <img
                  src="https://swatantrasamay.com/wp-content/uploads/2023/03/Untitled-design-4.jpg"
                  alt="Indian Constitution"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-800/20 to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <p className="text-sm font-bold font-hindi text-white drop-shadow-lg">संविधान</p>
                  <p className="text-xs text-white/90 drop-shadow-md">Constitution</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`card-lg p-10 mb-16 max-w-5xl mx-auto transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentQuote * 100}%)` }}
            >
              {quotes.map((quote, index) => (
                <div key={index} className="w-full flex-shrink-0 px-6">
                  <blockquote className="heading-sm font-hindi text-neutral-800 mb-6 italic leading-relaxed">
                    "{quote.text}"
                  </blockquote>
                  <p className="text-orange-600 font-bold text-lg mb-3">— {quote.author}</p>
                  <p className="text-body text-neutral-600">{quote.translation}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-3 mt-8">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentQuote === index 
                      ? 'bg-orange-500 scale-125 shadow-professional' 
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`card p-6 mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-6 w-6 text-orange-600" />
              <span className="text-lg font-semibold text-neutral-800">Select Language:</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setSelectedLanguage(lang.value)}
                  className={`relative px-6 py-3 rounded-xl border-2 transition-all duration-300 hover-lift ${
                    selectedLanguage === lang.value
                      ? 'border-orange-500 bg-orange-50 text-orange-700 scale-105 shadow-professional'
                      : 'border-neutral-200 hover:border-orange-300 bg-white text-neutral-700 hover:shadow-professional'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </div>
                  {selectedLanguage === lang.value && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-professional">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`card-lg p-10 mb-12 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-10">
            <MessageCircle className="h-16 w-16 text-navy-600 mx-auto mb-6" />
            <h3 className="heading-md text-navy-600 mb-6">
              Ask Your Legal Question
            </h3>
            <p className="text-body mb-8 max-w-3xl mx-auto">
              Describe your legal issue in Hindi, English, or Hinglish. Our AI will understand and help you.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={8}
                  className="form-textarea text-lg"
                  placeholder="Type your legal question here...

Example (Hindi): मेरे पति मुझे मारते हैं और दहेज मांगते हैं। मैं क्या कर सकती हूं?

Example (English): My employer is not paying minimum wages. What can I do?

Example (Hinglish): Mera landlord ne bina notice ke rent badha diya hai. Kya main kuch kar sakta hun?

Example (Hindi): कंपनी ने मुझे जाति के आधार पर प्रमोशन नहीं दिया।

Example (English): My neighbor is playing loud music at night. What legal action can I take?"
                />
                <div className="absolute bottom-8 right-8 flex items-center space-x-4">
                  <span className="text-caption font-medium">{query.length}/1000</span>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`group flex items-center space-x-4 px-10 py-5 rounded-3xl font-bold transition-all duration-300 hover-lift shadow-professional-lg ${
                    isRecording
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse'
                      : 'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700 hover:from-neutral-200 hover:to-neutral-300 hover:text-neutral-800'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-7 w-7" />
                      <span className="text-lg">Stop Recording</span>
                      <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                    </>
                  ) : (
                    <>
                      <Mic className="h-7 w-7 group-hover:animate-bounce" />
                      <span className="text-lg">Voice Input</span>
                      <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                    </>
                  )}
                </button>

                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="group flex items-center space-x-4 px-12 py-5 bg-gradient-to-r from-navy-800 to-royal-600 text-white rounded-3xl font-bold hover:from-navy-900 hover:to-navy-800 disabled:from-neutral-300 disabled:to-neutral-400 disabled:cursor-not-allowed transition-all duration-300 hover-lift shadow-professional-xl"
                >
                  <Brain className="h-7 w-7 group-hover:animate-pulse" />
                  <span className="text-lg">Get Legal Advice</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className={`bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-3xl p-10 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <h3 className="heading-md text-orange-900 mb-6">Need Immediate Help?</h3>
            <p className="text-body text-orange-800 mb-10 max-w-3xl mx-auto">
              If you're in immediate danger or need urgent legal assistance, reach out to authorities or emergency services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-lg p-8 text-center hover-lift">
                <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h4 className="font-display font-bold text-xl text-neutral-800 mb-3">Emergency</h4>
                <p className="text-4xl font-display font-black text-red-600 mb-2">100</p>
                <p className="text-body text-neutral-600">Police Emergency</p>
              </div>
              
              <div className="card-lg p-8 text-center hover-lift">
                <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h4 className="font-display font-bold text-xl text-neutral-800 mb-3">Women Helpline</h4>
                <p className="text-4xl font-display font-black text-pink-600 mb-2">1091</p>
                <p className="text-body text-neutral-600">24/7 Support</p>
              </div>
              
              <div className="card-lg p-8 text-center hover-lift">
                <Scale className="h-12 w-12 text-navy-600 mx-auto mb-4" />
                <h4 className="font-display font-bold text-xl text-neutral-800 mb-3">Legal Aid</h4>
                <p className="text-4xl font-display font-black text-navy-600 mb-2">15100</p>
                <p className="text-body text-neutral-600">Free Legal Help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;