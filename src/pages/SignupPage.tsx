import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserType } from '../contexts/AuthContext';
import RoleSelection from '../components/auth/RoleSelection';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(1);
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains an uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains a lowercase letter', met: /[a-z]/.test(password) },
  ];

  const nextStep = () => {
    if (userType) setStep(2);
    else alert('Please select a role');
  };

  const previousStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) return alert('Please select a role');
    if (password !== confirmPassword) return alert('Passwords do not match');
    if (!passwordRequirements.every(req => req.met)) return;

    try {
      await signup(username, email, password, userType);
      navigate(`/${userType}/dashboard`);
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
                <p className="text-gray-600 mt-2">Join the APMC Traders platform</p>
              </div>

              {/* Step Indicator */}
              <div className="mb-8">
                <div className="flex items-center">
                  <div className={`flex-1 border-t-2 ${step >= 1 ? 'border-green-500' : 'border-gray-200'}`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 border-t-2 ${step >= 2 ? 'border-green-500' : 'border-gray-200'}`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <div className="flex-1 border-t-2 border-gray-200" />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-green-600 font-medium">Select Role</span>
                  <span className={step >= 2 ? 'text-green-600 font-medium' : 'text-gray-500'}>Account Details</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <RoleSelection selectedRole={userType} onRoleSelect={setUserType} />
                    <Button type="button" variant="primary" fullWidth onClick={nextStep} disabled={!userType}>
                      Next
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:outline-none focus:border-transparent"
                        placeholder="johndoe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:outline-none focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:outline-none focus:border-transparent"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <div className="mt-2 space-y-2">
                        {passwordRequirements.map((req, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className={req.met ? 'text-green-500' : 'text-gray-300'} />
                            <span className={`text-xs ${req.met ? 'text-green-500' : 'text-gray-500'}`}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:outline-none ${
                          confirmPassword && password !== confirmPassword
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                      {confirmPassword && password !== confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                      )}
                    </div>

                    {error && (
                      <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <Button type="button" variant="outline" onClick={previousStep} className="w-1/3">
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        className="w-2/3"
                        disabled={
                          !username ||
                          !email ||
                          !password ||
                          password !== confirmPassword ||
                          !passwordRequirements.every(req => req.met)
                        }
                      >
                        Create Account
                      </Button>
                    </div>
                  </div>
                )}

                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
