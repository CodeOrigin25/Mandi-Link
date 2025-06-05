{/* Providing the complete file content with the escaped apostrophe */}
import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About APMC Traders
            </h1>
            <p className="text-xl text-green-50 mb-8">
              We're digitizing agricultural markets to connect traders, producers, and consumers
              in a seamless and transparent ecosystem.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-2 translate-y-8"></div>
      </section>
      
      {/* Content with Sidebar */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  {['Our Mission', 'What We Do', 'Our Values', 'Our Team', 'Contact Us'].map((item, index) => (
                    <a
                      key={index}
                      href={`#section-${index + 1}`}
                      className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === index 
                          ? 'bg-green-50 text-green-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(`section-${index + 1}`)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Our Mission */}
              <section id="section-1" className="scroll-section mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <p className="text-lg text-gray-700 mb-4">
                    At APMC Traders, our mission is to revolutionize the agricultural marketplace by digitizing
                    traditional APMC markets and creating a transparent, efficient ecosystem for all stakeholders.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    We aim to bridge the gap between traders, producers, and consumers by providing a digital platform
                    that streamlines transactions, provides market insights, and creates new opportunities for growth.
                  </p>
                  <p className="text-lg text-gray-700">
                    Through technological innovation, we're committed to enhancing agricultural commerce and supporting
                    the development of a sustainable agricultural economy in India.
                  </p>
                </div>
                <div className="relative rounded-lg overflow-hidden h-64 md:h-96">
                  <img 
                    src="https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg" 
                    alt="APMC Market" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </section>
              
              {/* What We Do */}
              <section id="section-2" className="scroll-section mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Do</h2>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <p className="text-lg text-gray-700 mb-6">
                    Our platform provides a comprehensive suite of tools and services designed to digitize and enhance
                    the traditional APMC market experience:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {[
                      {
                        title: 'For Traders',
                        items: [
                          'Digital commodity listings and management',
                          'Auction platform for competitive pricing',
                          'Access to a wide network of producers and consumers',
                          'Market insights and analytics'
                        ]
                      },
                      {
                        title: 'For Producers',
                        items: [
                          'APMC market discovery and navigation',
                          'Direct access to verified traders',
                          'Transparent pricing information',
                          'Streamlined selling process'
                        ]
                      },
                      {
                        title: 'For Consumers',
                        items: [
                          'Quality commodities from verified sources',
                          'Search and filter commodities by location',
                          'Transparent pricing and purchase history',
                          'Direct trader connections'
                        ]
                      },
                      {
                        title: 'Platform Features',
                        items: [
                          'User-friendly dashboards for each role',
                          'Secure authentication and transactions',
                          'Real-time price updates and trends',
                          'Feedback and rating system'
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
                        <ul className="space-y-2">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2 mt-1 text-green-600">
                                <CheckCircle2 size={16} />
                              </span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              
              {/* Our Values */}
              <section id="section-3" className="scroll-section mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {[
                    {
                      title: 'Transparency',
                      description: 'We believe in complete transparency in all market operations, pricing, and transactions.',
                      color: 'bg-green-50 border-green-500'
                    },
                    {
                      title: 'Innovation',
                      description: 'We continuously innovate to improve the agricultural marketplace experience for all stakeholders.',
                      color: 'bg-blue-50 border-blue-500'
                    },
                    {
                      title: 'Integrity',
                      description: 'We uphold the highest standards of integrity in all our business practices and relationships.',
                      color: 'bg-amber-50 border-amber-500'
                    },
                    {
                      title: 'Community',
                      description: 'We\'re building a community of traders, producers, and consumers united by shared goals.',
                      color: 'bg-purple-50 border-purple-500'
                    },
                    {
                      title: 'Efficiency',
                      description: 'We strive to make agricultural trade more efficient, reducing waste and increasing value.',
                      color: 'bg-teal-50 border-teal-500'
                    },
                    {
                      title: 'Sustainability',
                      description: 'We support sustainable agricultural practices and economic development for future generations.',
                      color: 'bg-red-50 border-red-500'
                    },
                  ].map((value, index) => (
                    <div key={index} className={`border-l-4 rounded-r-lg p-4 ${value.color}`}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-700">{value.description}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Ready to join our community?</h3>
                      <p className="text-gray-700 mt-1">
                        Sign up today and experience the future of agricultural trade.
                      </p>
                    </div>
                    <Link to="/signup">
                      <Button 
                        variant="primary"
                        rightIcon={<ArrowRight size={16} />}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
              
              {/* Our Team */}
              <section id="section-4" className="scroll-section mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Pavan Kumar S',
                      position: 'Founder & CEO',
                      bio: 'Just an average student',
                      image: '/images/profile-pic.jpg'  // leading slash means from public root
                    }

                  ].map((member, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-green-600 text-sm mb-2">{member.position}</p>
                        <p className="text-gray-700 text-sm flex-1">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Contact Us */}
              <section id="section-5" className="scroll-section">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                    <p className="text-gray-700 mb-6">
                      Have questions or feedback? We'd love to hear from you. 
                      Fill out the form, and our team will get back to you as soon as possible.
                    </p>
                    
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="How can we help you?"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Your message here..."
                        ></textarea>
                      </div>
                      
                      <Button type="submit" variant="primary">
                        Send Message
                      </Button>
                    </form>
                  </div>
                  
                  <div>
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Phone className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-900">+91 123 456 7890</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Mail className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-900">info@apmctraders.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <MapPin className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="text-gray-900">
                              APMC Market, Sector 19<br />
                              Vashi, Navi Mumbai<br />
                              Maharashtra, 400703
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-200 rounded-lg overflow-hidden h-64">
                      {/* This would be a map in a real implementation */}
                      <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-600">
                        Map location would be displayed here
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
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

export default AboutPage;