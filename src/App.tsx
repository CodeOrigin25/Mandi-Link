import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TraderDashboard from './pages/trader/TraderDashboard';
import ProducerDashboard from './pages/producer/ProducerDashboard';
import ConsumerDashboard from './pages/consumer/ConsumerDashboard';
import AuctionPage from './pages/trader/AuctionPage';
import ApmcCityPage from './pages/ApmcCityPage';
import TraderProfilePage from './pages/TraderProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import APMCMarketsPage from './pages/APMCMarkets';  


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/apmc-markets" element={<APMCMarketsPage />} /> {/* ✅ New route */}

          {/* Protected Routes */}
          <Route 
            path="/trader/dashboard" 
            element={
              <ProtectedRoute userType="trader">
                <TraderDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trader/auction" 
            element={
              <ProtectedRoute userType="trader">
                <AuctionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/producer/dashboard" 
            element={
              <ProtectedRoute userType="producer">
                <ProducerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/consumer/dashboard" 
            element={
              <ProtectedRoute userType="consumer">
                <ConsumerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/apmc/:cityId" element={<ApmcCityPage />} />
          <Route path="/trader/:traderId" element={<TraderProfilePage />} />
          
          {/* Not Found Route */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;