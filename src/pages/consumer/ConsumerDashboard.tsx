import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { MapPin, Search, ArrowRight, Package, Activity, Clock, ShoppingBag } from 'lucide-react';

// Mock data for demonstration
const mockAPMCs = [
  { id: 1, name: 'Vashi APMC', city: 'Navi Mumbai', state: 'Maharashtra', traderCount: 120 },
  { id: 2, name: 'Azadpur Mandi', city: 'Delhi', state: 'Delhi', traderCount: 187 }
];

const mockCommodities = [
  { id: 1, name: 'Rice', variety: 'Basmati', price: '₹55 - ₹65/kg', trend: 'up', change: '+5%' },
  { id: 2, name: 'Wheat', variety: 'Sharbati', price: '₹28 - ₹35/kg', trend: 'down', change: '-2%' },
  { id: 3, name: 'Pulses', variety: 'Yellow Lentils', price: '₹85 - ₹95/kg', trend: 'up', change: '+8%' },
  { id: 4, name: 'Sugar', variety: 'M-30', price: '₹38 - ₹42/kg', trend: 'neutral', change: '0%' }
];

const mockRecentPurchases = [
  { id: 1, commodity: 'Rice', variety: 'Basmati', quantity: '50 kg', price: '₹3,250', date: '2 days ago', trader: 'AgriVentures' },
  { id: 2, commodity: 'Wheat', variety: 'Lokwan', quantity: '100 kg', price: '₹3,100', date: '1 week ago', trader: 'GreenField Corp' }
];

const ConsumerDashboard: React.FC = () => {
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
              Find quality agricultural commodities from verified APMC traders.
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
                      placeholder="Search for commodities or traders..."
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
                      <option>All Locations</option>
                      <option>Navi Mumbai</option>
                      <option>Delhi</option>
                      <option>Bengaluru</option>
                      <option>Pune</option>
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
              { title: 'Total Purchases', value: '12', icon: <ShoppingBag className="h-6 w-6 text-blue-600" />, color: 'bg-blue-50 text-blue-700' },
              { title: 'Saved Traders', value: '8', icon: <Package className="h-6 w-6 text-green-600" />, color: 'bg-green-50 text-green-700' },
              { title: 'Commodities Tracked', value: '6', icon: <Activity className="h-6 w-6 text-purple-600" />, color: 'bg-purple-50 text-purple-700' }
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAPMCs.map((apmc) => (
                <Card key={apmc.id} className="hover:shadow-md transition-all border border-gray-200">
                  <CardContent className="p-0">
                    <div className="h-28 bg-gradient-to-r from-green-600 to-green-400 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg')] bg-cover bg-center opacity-20"></div>
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
                          <Clock size={14} className="mr-1" />
                          <span>Open today</span>
                        </div>
                      </div>
                      <Link to={`/apmc/${apmc.id}`}>
                        <Button variant="outline" fullWidth>
                          Browse Commodities
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Commodities Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Price Trends</h2>
              <Link to="/commodities" className="text-green-600 hover:text-green-800 flex items-center text-sm">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <Card className="overflow-hidden border-none shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commodity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variety
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price Range
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCommodities.map((commodity) => (
                    <tr key={commodity.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {commodity.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {commodity.variety}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {commodity.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {commodity.trend === 'up' && (
                            <span className="text-green-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                              </svg>
                              {commodity.change}
                            </span>
                          )}
                          {commodity.trend === 'down' && (
                            <span className="text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                              {commodity.change}
                            </span>
                          )}
                          {commodity.trend === 'neutral' && (
                            <span className="text-gray-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path>
                              </svg>
                              {commodity.change}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Find Traders</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
          
          {/* Recent Purchases */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Purchases</h2>
              <Link to="/purchases" className="text-green-600 hover:text-green-800 flex items-center text-sm">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRecentPurchases.map((purchase) => (
                <Card key={purchase.id} className="hover:shadow-md transition-all border border-gray-200">
                  <CardHeader className="p-4 border-b">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">
                        {purchase.commodity} ({purchase.variety})
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{purchase.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-medium">{purchase.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Price</p>
                        <p className="font-medium">{purchase.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Trader</p>
                        <p className="font-medium">{purchase.trader}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium text-green-600">Completed</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="ml-2">
                        Buy Again
                      </Button>
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

export default ConsumerDashboard;