import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Phone, Mail, Star, Filter, Users, Globe, Award,
  CheckCircle, Heart, MessageCircle, Clock, Briefcase, Scale, 
  ArrowLeft, LogOut, User, Gavel, Shield
} from 'lucide-react';

const ConnectHelp = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const locations = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  const specialties = [
    'Women Rights', 'Domestic Violence', 'Land Disputes', 'Labor Rights',
    'Caste Discrimination', 'Consumer Protection', 'Criminal Law',
    'Family Law', 'Property Law', 'Constitutional Law'
  ];

  // Updated with more realistic Indian names and problems
  const partners = [
    {
      id: 1,
      name: 'Advocate Priya Sharma',
      organization: 'Women\'s Legal Aid Society Delhi',
      type: 'lawyer',
      specialties: ['Women Rights', 'Domestic Violence', 'Family Law'],
      location: 'Delhi',
      experience: '8 years',
      languages: ['Hindi', 'English', 'Punjabi'],
      rating: 4.9,
      reviews: 127,
      phone: '+91 98765 43210',
      email: 'priya.sharma@wlas.org',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      available: true,
      description: 'विशेषज्ञता: घरेलू हिंसा, दहेज उत्पीड़न, तलाक के मामले। 8+ वर्षों से महिलाओं को निःशुल्क कानूनी सहायता प्रदान कर रही हूं।',
      successRate: '94%',
      casesHandled: 340,
      recentCases: ['दहेज उत्पीड़न', 'घरेलू हिंसा', 'बाल हिरासत']
    },
    {
      id: 2,
      name: 'Advocate Rajesh Kumar Gupta',
      organization: 'Legal Aid Foundation Mumbai',
      type: 'ngo',
      specialties: ['Land Disputes', 'Property Law', 'Consumer Protection'],
      location: 'Mumbai',
      experience: '12 years',
      languages: ['Hindi', 'English', 'Marathi'],
      rating: 4.7,
      reviews: 89,
      phone: '+91 87654 32109',
      email: 'rajesh@laf.org',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      available: false,
      description: 'भूमि विवाद, संपत्ति के मामले, और उपभोक्ता संरक्षण में विशेषज्ञता। गरीब किसानों के लिए निःशुल्क सेवा।',
      successRate: '89%',
      casesHandled: 520,
      recentCases: ['भूमि अधिग्रहण', 'संपत्ति धोखाधड़ी', 'किसान ऋण माफी']
    },
    {
      id: 3,
      name: 'Dr. Meera Patel',
      organization: 'Dalit Rights Collective Gujarat',
      type: 'activist',
      specialties: ['Caste Discrimination', 'Constitutional Law', 'Criminal Law'],
      location: 'Ahmedabad',
      experience: '15 years',
      languages: ['Hindi', 'English', 'Gujarati'],
      rating: 5.0,
      reviews: 203,
      phone: '+91 76543 21098',
      email: 'meera@drc.org',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      available: true,
      description: 'जाति आधारित भेदभाव, अत्याचार निवारण अधिनियम, और संवैधानिक अधिकारों में विशेषज्ञता। दलित समुदाय के लिए न्याय की लड़ाई।',
      successRate: '96%',
      casesHandled: 180,
      recentCases: ['जाति आधारित हिंसा', 'रोजगार में भेदभाव', 'शिक्षा में भेदभाव']
    },
    {
      id: 4,
      name: 'Advocate Suresh Reddy',
      organization: 'Labor Rights Forum Hyderabad',
      type: 'lawyer',
      specialties: ['Labor Rights', 'Criminal Law', 'Constitutional Law'],
      location: 'Hyderabad',
      experience: '10 years',
      languages: ['Hindi', 'English', 'Telugu'],
      rating: 4.8,
      reviews: 156,
      phone: '+91 98765 12345',
      email: 'suresh@lrf.org',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      available: true,
      description: 'श्रमिक अधिकार, न्यूनतम मजदूरी, कार्यक्षेत्र सुरक्षा में विशेषज्ञता। मजदूरों और कर्मचारियों के लिए निःशुल्क कानूनी सहायता।',
      successRate: '91%',
      casesHandled: 275,
      recentCases: ['न्यूनतम मजदूरी', 'कार्यक्षेत्र दुर्घटना', 'अनुचित बर्खास्तगी']
    },
    {
      id: 5,
      name: 'Advocate Fatima Khan',
      organization: 'Minority Rights Legal Cell',
      type: 'ngo',
      specialties: ['Constitutional Law', 'Criminal Law', 'Family Law'],
      location: 'Lucknow',
      experience: '9 years',
      languages: ['Hindi', 'English', 'Urdu'],
      rating: 4.6,
      reviews: 98,
      phone: '+91 87654 98765',
      email: 'fatima@mrlc.org',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      available: true,
      description: 'अल्पसंख्यक अधिकार, धार्मिक स्वतंत्रता, और पारिवारिक कानून में विशेषज्ञता। मुस्लिम समुदाय के लिए विशेष सेवाएं।',
      successRate: '88%',
      casesHandled: 195,
      recentCases: ['धार्मिक भेदभाव', 'निकाह विवाद', 'हलाला मामले']
    }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !selectedLocation || partner.location === selectedLocation;
    const matchesSpecialty = !selectedSpecialty || partner.specialties.includes(selectedSpecialty);
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesSpecialty && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lawyer':
        return <Gavel className="h-4 w-4" />;
      case 'ngo':
        return <Heart className="h-4 w-4" />;
      case 'activist':
        return <Shield className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'lawyer':
        return 'badge-secondary';
      case 'ngo':
        return 'badge-accent';
      case 'activist':
        return 'badge-primary';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation Bar */}
      <nav className="nav relative z-20">
        <div className="container-professional py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-display font-black bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                न्याय AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="btn-outline"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => navigate('/generate-draft')}
                className="btn-primary"
              >
                <User className="h-4 w-4" />
                <span>Generate Document</span>
              </button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-700">{user.username}</p>
                </div>
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
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

      <div className="relative z-10 container-professional py-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Users className="h-16 w-16 text-accent-600" />
            <div>
              <h1 className="heading-lg text-accent-600">Connect with Legal Help</h1>
              <p className="text-body text-neutral-600">Find verified lawyers, NGOs, and legal aid organizations near you</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6 text-caption text-neutral-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Verified Partners</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4 text-blue-600" />
              <span>Multi-language Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4 text-red-600" />
              <span>Free Legal Aid Available</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`card-lg p-8 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by name, organization, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>
            
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="form-select"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="form-select"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="form-select"
              >
                <option value="all">All Types</option>
                <option value="lawyer">Lawyers</option>
                <option value="ngo">NGOs</option>
                <option value="activist">Activists</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className={`flex items-center justify-between mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-body text-neutral-600">
            Found <span className="font-bold text-accent-600">{filteredPartners.length}</span> legal partners
          </p>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-neutral-400" />
            <span className="text-caption text-neutral-500">Sort by: Relevance</span>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {filteredPartners.map((partner, index) => (
            <div 
              key={partner.id} 
              className={`card-lg hover-lift transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-professional"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-display font-bold text-neutral-800">{partner.name}</h3>
                      {partner.verified && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-body text-neutral-600 mb-2">{partner.organization}</p>
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(partner.type)}`}>
                        {getTypeIcon(partner.type)}
                        <span className="capitalize">{partner.type}</span>
                      </div>
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                        partner.available ? 'status-success' : 'status-error'
                      }`}>
                        <Clock className="h-3 w-3" />
                        <span>{partner.available ? 'Available' : 'Busy'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-body text-neutral-600 mb-6 leading-relaxed">{partner.description}</p>

                {/* Recent Cases */}
                <div className="mb-6">
                  <h4 className="text-caption font-medium text-neutral-700 mb-2">Recent Cases:</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.recentCases.map((case_, index) => (
                      <span
                        key={index}
                        className="badge-primary"
                      >
                        {case_}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-lg font-display font-bold text-neutral-800">{partner.successRate}</div>
                    <div className="text-caption text-neutral-500">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-lg font-display font-bold text-neutral-800">{partner.casesHandled}</div>
                    <div className="text-caption text-neutral-500">Cases Handled</div>
                  </div>
                  <div className="text-center p-4 bg-primary-50 rounded-xl">
                    <div className="text-lg font-display font-bold text-neutral-800">{partner.experience}</div>
                    <div className="text-caption text-neutral-500">Experience</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{partner.rating}</span>
                  </div>
                  <span className="text-caption text-neutral-500">({partner.reviews} reviews)</span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-caption font-medium text-neutral-700 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="badge-secondary"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <h4 className="text-caption font-medium text-neutral-700 mb-2">Languages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.languages.map((language, index) => (
                      <span
                        key={index}
                        className="badge bg-neutral-100 text-neutral-700"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t border-neutral-200 pt-4 space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-caption text-neutral-600">
                    <MapPin className="h-4 w-4" />
                    <span>{partner.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-caption text-neutral-600">
                    <Phone className="h-4 w-4" />
                    <span>{partner.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-caption text-neutral-600">
                    <Mail className="h-4 w-4" />
                    <span>{partner.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    className={`flex-1 btn ${
                      partner.available
                        ? 'btn-accent'
                        : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    }`}
                    disabled={!partner.available}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors">
                    <Award className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-800 mb-2">No partners found</h3>
            <p className="text-body text-neutral-600">Try adjusting your search criteria or location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectHelp;