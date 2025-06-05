import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Plus, DollarSign, BarChart4, ListFilter, ShoppingBag, Package, Gavel, ExternalLink } from 'lucide-react';

// Mock data for demonstration
const mockCommodities = [
  { id: 1, name: 'Rice', variety: 'Basmati', quantity: '500 kg', price: '₹55/kg', status: 'Available' },
  { id: 2, name: 'Wheat', variety: 'Sharbati', quantity: '1000 kg', price: '₹32/kg', status: 'Available' },
  { id: 3, name: 'Maize', variety: 'Yellow', quantity: '750 kg', price: '₹25/kg', status: 'Available' },
  { id: 4, name: 'Pulses', variety: 'Yellow Lentils', quantity: '300 kg', price: '₹85/kg', status: 'Low Stock' },
];

const mockAuctions = [
  { id: 1, commodity: 'Rice', variety: 'Basmati', quantity: '2000 kg', startingPrice: '₹50/kg', currentBid: '₹54/kg', bidCount: 12, endsIn: '2 days' },
  { id: 2, commodity: 'Wheat', variety: 'Lokwan', quantity: '1500 kg', startingPrice: '₹28/kg', currentBid: '₹31/kg', bidCount: 8, endsIn: '5 hours' },
];

const TraderDashboard: React.FC = () => {
  const { user } = useAuth();
  const [view, setView] = useState<'commodities' | 'auctions'>('commodities');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome and Overview */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.username}!
            </h1>
            <p className="text-gray-600">
              Manage your commodities and auctions from your trader dashboard.
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Commodities Listed', value: '12', icon: <Package className="h-6 w-6 text-green-600" />, color: 'bg-green-50 text-green-700' },
              { title: 'Active Auctions', value: '3', icon: <Gavel className="h-6 w-6 text-amber-600" />, color: 'bg-amber-50 text-amber-700' },
              { title: 'Sales This Month', value: '₹45,230', icon: <DollarSign className="h-6 w-6 text-blue-600" />, color: 'bg-blue-50 text-blue-700' },
              { title: 'Interested Buyers', value: '24', icon: <ShoppingBag className="h-6 w-6 text-purple-600" />, color: 'bg-purple-50 text-purple-700' }
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
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                view === 'commodities' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setView('commodities')}
            >
              <div className="flex items-center space-x-2">
                <Package size={16} />
                <span>My Commodities</span>
              </div>
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                view === 'auctions' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setView('auctions')}
            >
              <div className="flex items-center space-x-2">
                <Gavel size={16} />
                <span>My Auctions</span>
              </div>
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
            >
              {view === 'commodities' ? 'Add Commodity' : 'Create Auction'}
            </Button>
            
            <Button
              variant="outline"
              leftIcon={<BarChart4 size={16} />}
            >
              View Market Prices
            </Button>
            
            <Button
              variant="ghost"
              leftIcon={<ListFilter size={16} />}
            >
              Filter
            </Button>
          </div>
          
          {/* Content based on selected view */}
          {view === 'commodities' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
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
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
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
                          {commodity.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {commodity.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            commodity.status === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {commodity.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                          <button className="text-amber-600 hover:text-amber-900">Auction</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {view === 'auctions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAuctions.map((auction) => (
                <Card key={auction.id} className="border border-gray-200 hover:shadow-md transition-all">
                  <CardHeader className="bg-amber-50">
                    <CardTitle className="text-amber-800 flex justify-between items-center">
                      <span>Auction #{auction.id}</span>
                      <span className="text-sm font-normal bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        Ends in {auction.endsIn}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Commodity</p>
                          <p className="font-medium">{auction.commodity} ({auction.variety})</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="font-medium">{auction.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Starting Price</p>
                          <p className="font-medium">{auction.startingPrice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Current Bid</p>
                          <p className="font-medium text-green-600">{auction.currentBid}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-gray-500">Total Bids:</span>
                          <span className="font-medium ml-2">{auction.bidCount}</span>
                        </div>
                        <Link to={`/auction/${auction.id}`} className="text-green-600 hover:text-green-800 flex items-center">
                          <span className="mr-1">View Details</span>
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 py-3 px-6 flex justify-between">
                    <Button variant="outline" size="sm">
                      Edit Auction
                    </Button>
                    <Button variant="primary" size="sm">
                      View Bids
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* New Auction Card */}
              <Card className="border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Auction</h3>
                  <p className="text-gray-500 mb-4">Set up an auction for your commodities</p>
                  <Button variant="primary">Start New Auction</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraderDashboard;