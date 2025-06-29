import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, LogOut, FileText, Users, Calendar, Clock, Eye, Download, 
  Trash2, Plus, Filter, Search, AlertCircle, CheckCircle, XCircle,
  BarChart3, TrendingUp, User, Phone, Mail, MapPin, Edit3, Gavel,
  Shield, BookOpen, Award
} from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock user data - this would come from a database
  const userData = {
    totalCases: 12,
    activeCases: 4,
    resolvedCases: 7,
    pendingCases: 1,
    joinDate: '2024-01-15',
    lastLogin: '2024-12-20',
    profile: {
      name: user.username,
      email: user.email,
      phone: '+91 98765 43210',
      address: 'Sector 15, Noida, Uttar Pradesh',
      occupation: 'Software Engineer',
      languages: ['Hindi', 'English']
    }
  };

  // Mock cases data with real Indian legal problems
  const userCases = [
    {
      id: 1,
      title: 'Domestic Violence Complaint',
      description: 'पति द्वारा मारपीट और दहेज की मांग के खिलाफ शिकायत',
      type: 'FIR',
      status: 'active',
      date: '2024-12-15',
      lastUpdate: '2024-12-18',
      priority: 'high',
      assignedLawyer: 'Advocate Priya Sharma',
      documents: ['FIR_Copy.pdf', 'Medical_Report.pdf'],
      nextHearing: '2024-12-25',
      caseNumber: 'FIR/2024/001234'
    },
    {
      id: 2,
      title: 'Property Dispute',
      description: 'जमीन के कागजात में फर्जीवाड़ा और कब्जे की समस्या',
      type: 'Civil',
      status: 'pending',
      date: '2024-11-20',
      lastUpdate: '2024-12-10',
      priority: 'medium',
      assignedLawyer: 'Advocate Rajesh Kumar',
      documents: ['Property_Papers.pdf', 'Survey_Report.pdf'],
      nextHearing: '2024-12-30',
      caseNumber: 'CIVIL/2024/005678'
    },
    {
      id: 3,
      title: 'Workplace Harassment',
      description: 'कार्यक्षेत्र में यौन उत्पीड़न और भेदभाव की शिकायत',
      type: 'Complaint',
      status: 'resolved',
      date: '2024-10-05',
      lastUpdate: '2024-11-15',
      priority: 'high',
      assignedLawyer: 'Advocate Meera Patel',
      documents: ['Complaint_Letter.pdf', 'Evidence.pdf', 'Settlement.pdf'],
      resolution: 'Settled out of court with compensation',
      caseNumber: 'WPC/2024/009876'
    },
    {
      id: 4,
      title: 'Consumer Rights Violation',
      description: 'दोषपूर्ण उत्पाद और वापसी में देरी की समस्या',
      type: 'Consumer',
      status: 'active',
      date: '2024-12-01',
      lastUpdate: '2024-12-19',
      priority: 'low',
      assignedLawyer: 'Advocate Suresh Gupta',
      documents: ['Purchase_Receipt.pdf', 'Complaint_Form.pdf'],
      nextHearing: '2024-12-28',
      caseNumber: 'CC/2024/001122'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-info';
      case 'pending': return 'status-warning';
      case 'resolved': return 'status-success';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'status-error';
      case 'medium': return 'status-warning';
      case 'low': return 'status-success';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const filteredCases = userCases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation Bar */}
      <nav className="nav relative z-20">
        <div className="container-professional py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Scale className="h-10 w-10 text-primary-600" />
              <span className="text-3xl font-display font-black bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                न्याय AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="btn-outline"
              >
                <span>Home</span>
              </button>
              <button
                onClick={() => navigate('/generate-draft')}
                className="btn-primary"
              >
                <FileText className="h-5 w-5" />
                <span>New Case</span>
              </button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-700">{user.username}</p>
                  <p className="text-xs text-neutral-500">Dashboard</p>
                </div>
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-professional">
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
        {/* Header */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center space-x-4 mb-4">
            <Gavel className="h-12 w-12 text-primary-600" />
            <div>
              <h1 className="heading-lg text-neutral-800">Legal Dashboard</h1>
              <p className="text-body text-neutral-600">Track your cases, documents, and legal progress</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="card card-hover p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption font-medium text-neutral-500">Total Cases</p>
                <p className="text-3xl font-display font-bold text-neutral-800">{userData.totalCases}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card card-hover p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption font-medium text-neutral-500">Active Cases</p>
                <p className="text-3xl font-display font-bold text-blue-600">{userData.activeCases}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card card-hover p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption font-medium text-neutral-500">Resolved</p>
                <p className="text-3xl font-display font-bold text-green-600">{userData.resolvedCases}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card card-hover p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption font-medium text-neutral-500">Pending</p>
                <p className="text-3xl font-display font-bold text-yellow-600">{userData.pendingCases}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`card-lg mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Cases Overview', icon: BarChart3 },
                { id: 'cases', label: 'My Cases', icon: FileText },
                { id: 'profile', label: 'Profile', icon: User }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="heading-sm text-neutral-800">Recent Activity</h3>
                <div className="space-y-4">
                  {userCases.slice(0, 3).map((case_, index) => (
                    <div key={case_.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Gavel className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-800">{case_.title}</h4>
                        <p className="text-caption text-neutral-600">Last updated: {case_.lastUpdate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                        {case_.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cases' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search cases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-input pl-10"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                {/* Cases List */}
                <div className="space-y-4">
                  {filteredCases.map((case_) => (
                    <div key={case_.id} className="card p-6 hover:shadow-professional-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-neutral-800">{case_.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                              {case_.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                              {case_.priority}
                            </span>
                          </div>
                          <p className="text-body text-neutral-600 mb-3">{case_.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-caption text-neutral-600">
                            <div>
                              <span className="font-medium">Case No:</span> {case_.caseNumber}
                            </div>
                            <div>
                              <span className="font-medium">Type:</span> {case_.type}
                            </div>
                            <div>
                              <span className="font-medium">Filed:</span> {case_.date}
                            </div>
                            <div>
                              <span className="font-medium">Lawyer:</span> {case_.assignedLawyer}
                            </div>
                          </div>
                          {case_.nextHearing && (
                            <div className="mt-2 text-caption">
                              <span className="font-medium text-blue-600">Next Hearing:</span> {case_.nextHearing}
                            </div>
                          )}
                          {case_.resolution && (
                            <div className="mt-2 text-caption">
                              <span className="font-medium text-green-600">Resolution:</span> {case_.resolution}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-neutral-400 hover:text-blue-600 transition-colors">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-neutral-400 hover:text-green-600 transition-colors">
                            <Download className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-neutral-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Documents */}
                      <div className="border-t border-neutral-200 pt-4">
                        <h4 className="font-medium text-neutral-800 mb-2">Documents ({case_.documents.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {case_.documents.map((doc, index) => (
                            <span key={index} className="badge-primary">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="heading-sm text-neutral-800">Profile Information</h3>
                  <button className="btn-primary">
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-caption font-medium text-neutral-700 mb-1">Full Name</label>
                      <div className="flex items-center space-x-2 p-3 bg-neutral-50 rounded-lg">
                        <User className="h-5 w-5 text-neutral-400" />
                        <span className="text-neutral-800">{userData.profile.name}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-caption font-medium text-neutral-700 mb-1">Email</label>
                      <div className="flex items-center space-x-2 p-3 bg-neutral-50 rounded-lg">
                        <Mail className="h-5 w-5 text-neutral-400" />
                        <span className="text-neutral-800">{userData.profile.email}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-caption font-medium text-neutral-700 mb-1">Phone</label>
                      <div className="flex items-center space-x-2 p-3 bg-neutral-50 rounded-lg">
                        <Phone className="h-5 w-5 text-neutral-400" />
                        <span className="text-neutral-800">{userData.profile.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-caption font-medium text-neutral-700 mb-1">Address</label>
                      <div className="flex items-start space-x-2 p-3 bg-neutral-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-neutral-400 mt-0.5" />
                        <span className="text-neutral-800">{userData.profile.address}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-caption font-medium text-neutral-700 mb-1">Occupation</label>
                      <div className="p-3 bg-neutral-50 rounded-lg">
                        <span className="text-neutral-800">{userData.profile.occupation}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-caption font-medium text-neutral-700 mb-1">Languages</label>
                      <div className="flex flex-wrap gap-2">
                        {userData.profile.languages.map((lang, index) => (
                          <span key={index} className="badge-primary">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-6">
                  <h4 className="font-medium text-neutral-800 mb-4">Account Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-caption text-neutral-600">
                    <div>
                      <span className="font-medium">Member Since:</span> {userData.joinDate}
                    </div>
                    <div>
                      <span className="font-medium">Last Login:</span> {userData.lastLogin}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`card-lg p-6 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="heading-sm text-neutral-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/generate-draft')}
              className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <Plus className="h-6 w-6 text-blue-600" />
              <span className="font-medium text-blue-900">File New Case</span>
            </button>
            
            <button
              onClick={() => navigate('/connect-help')}
              className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <Users className="h-6 w-6 text-green-600" />
              <span className="font-medium text-green-900">Find Legal Help</span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
            >
              <Scale className="h-6 w-6 text-primary-600" />
              <span className="font-medium text-primary-900">Ask AI Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;