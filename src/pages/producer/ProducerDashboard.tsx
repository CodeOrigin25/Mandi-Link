import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { MapPin, Search, Calendar, ArrowRight, Building, Users, ShoppingCart } from 'lucide-react';

// Mock data for demonstration
const mockAPMCs = [
  { id: 1, name: 'Vashi APMC', city: 'Navi Mumbai', state: 'Maharashtra', traderCount: 120 },
  { id: 2, name: 'Azadpur Mandi', city: 'Delhi', state: 'Delhi', traderCount: 187 },
  { id: 3, name: 'Bengaluru APMC', city: 'Bengaluru', state: 'Karnataka', traderCount: 95 },
  { id: 4, name: 'Pune Market Yard', city: 'Pune', state: 'Maharashtra', traderCount: 78 }
];

const mockRecentTraders = [
  { id: 1, name: 'AgriVentures Traders', commodities: ['Rice', 'Wheat'], rating: 4.8 },
  { id: 2, name: 'GreenField Corp', commodities: ['Pulses', 'Oilseeds'], rating: 4.6 },
  { id: 3, name: 'Harvest Solutions', commodities: ['Fruits', 'Vegetables'], rating: 4.5 },
];

const ProducerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.username}!
            </h1>
            <p className="text-gray-600">
              Find the best APMC markets and traders to sell your produce.
            </p>
          </div>
          
          {/* Search Section */}
          <Card className="mb-8 border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search for APMC market or trader..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option>All States</option>
                      <option>Maharashtra</option>
                      <option>Gujarat</option>
                      <option>Punjab</option>
                      <option>Karnataka</option>
                    </select>
                  </div>
                  
                  <Button variant="primary">
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'APMC Markets', value: '320+', icon: <Building className="h-6 w-6 text-green-600" />, color: 'bg-green-50 text-green-700' },
              { title: 'Active Traders', value: '8,450+', icon: <Users className="h-6 w-6 text-blue-600" />, color: 'bg-blue-50 text-blue-700' },
              { title: 'Recent Sales', value: '₹75,230', icon: <ShoppingCart className="h-6 w-6 text-amber-600" />, color: 'bg-amber-50 text-amber-700' }
            ].map((stat, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* APMC Markets Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Nearby APMC Markets</h2>
              <Link to="/apmc" className="text-green-600 hover:text-green-800 flex items-center text-sm">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockAPMCs.map((apmc) => (
                <Card key={apmc.id} className="hover:shadow-md transition-all border border-gray-200">
                  <CardContent className="p-0">
                    <div className="h-28 bg-gradient-to-r from-green-600 to-green-400 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/175428/pexels-photo-175428.jpeg')] bg-cover bg-center opacity-20"></div>
                      <div className="p-4 relative z-10">
                        <h3 className="text-lg font-semibold text-white">{apmc.name}</h3>
                        <div className="flex items-center text-green-50 text-sm mt-1">
                          <MapPin size={14} className="mr-1" />
                          <span>{apmc.city}, {apmc.state}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center text-sm mb-3">
                        <div className="text-gray-500">
                          <span className="font-medium text-gray-900">{apmc.traderCount}</span> traders
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>Open today</span>
                        </div>
                      </div>
                      <Link to={`/apmc/${apmc.id}`}>
                        <Button variant="outline" fullWidth>
                          View Traders
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Recent Traders Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Popular Traders</h2>
              <Link to="/traders" className="text-green-600 hover:text-green-800 flex items-center text-sm">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRecentTraders.map((trader) => (
                <Card key={trader.id} className="hover:shadow-md transition-all border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{trader.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Commodities</span>
                        <div className="flex flex-wrap gap-1">
                          {trader.commodities.map((commodity, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                            >
                              {commodity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Rating</span>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(trader.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-gray-700 font-medium">{trader.rating}</span>
                        </div>
                      </div>
                      
                      <Link to={`/trader/${trader.id}`}>
                        <Button variant="ghost" fullWidth>
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;