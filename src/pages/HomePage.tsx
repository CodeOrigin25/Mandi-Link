import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, BarChart4, Users, Store, ShoppingBasket } from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2894544/pexels-photo-2894544.jpeg')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Digitizing Agricultural Markets
            </h1>
            <p 
              className={`text-xl text-green-50 mb-8 transition-all duration-700 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              APMC Traders platform connects traders, producers, and consumers 
              in a simplified digital marketplace for agricultural commodities.
            </p>
            <div 
              className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <Link to="/signup">
                <Button 
                  variant="secondary" 
                  size="lg"
                  rightIcon={<ArrowRight size={16} />}
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div 
          className={`absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-2 translate-y-8 transition-transform duration-700 ${
            isVisible ? 'translate-y-8' : 'translate-y-32'
          }`}
        ></div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simplifying Agricultural Trade
            </h2>
            <p className="text-lg text-gray-600">
              Our platform digitizes the traditional APMC market system, 
              bringing efficiency and transparency to agricultural trade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Store className="h-10 w-10 text-green-600" />,
                title: 'For Traders',
                description: 'List your commodities, conduct auctions, and reach more buyers across the network.',
                link: '/signup'
              },
              {
                icon: <Truck className="h-10 w-10 text-amber-500" />,
                title: 'For Producers',
                description: 'Find the best APMC traders to sell your produce at competitive prices.',
                link: '/signup'
              },
              {
                icon: <ShoppingBasket className="h-10 w-10 text-blue-500" />,
                title: 'For Consumers',
                description: 'Purchase quality agricultural commodities directly from trusted APMC traders.',
                link: '/signup'
              }
            ].map((feature, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <Link to={feature.link}>
                    <Button 
                      variant="ghost" 
                      rightIcon={<ArrowRight size={16} />}
                    >
                      Join Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-gray-600">
              We're transforming traditional agricultural markets with technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
                title: 'Trusted Network',
                description: 'Verified traders and producers for secure transactions'
              },
              {
                icon: <BarChart4 className="h-8 w-8 text-green-600" />,
                title: 'Market Insights',
                description: 'Real-time price data and market trends'
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                title: 'Direct Connections',
                description: 'Connect directly with traders by their unique username'
              },
              {
                icon: <Store className="h-8 w-8 text-green-600" />,
                title: 'City Navigation',
                description: 'Find APMC markets in your preferred location'
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4 p-2 bg-green-50 rounded-full inline-block">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-green-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to transform your agricultural trade?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of traders, producers, and consumers on our platform
            </p>
            <Link to="/signup">
              <Button 
                variant="secondary" 
                size="lg" 
                className="shadow-lg"
              >
                Create an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-200">
                  <Store className="h-6 w-6 text-green-700" />
                </div>
                <span className="text-xl font-bold">APMC Traders</span>
              </div>
              <p className="text-gray-400">
                Digitizing agricultural markets to connect traders, producers, and consumers.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/apmc" className="text-gray-400 hover:text-white transition-colors">APMC Markets</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Users</h3>
              <ul className="space-y-2">
                <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Traders</Link></li>
                <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Producers</Link></li>
                <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Consumers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@apmctraders.com</li>
                <li>+91 123 456 7890</li>
                <li>APMC Market, Sector 19, Vashi, Navi Mumbai, Maharashtra</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} APMC Traders. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;