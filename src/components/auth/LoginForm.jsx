import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import { Lock, CheckCircle } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await dispatch(login({ email, password }));
      
      if (result.payload?.token) {
        navigate('/dashboard');
      } else if (result.error) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHelpClick = () => {
    setShowHelpModal(true);
  };

  const handleCloseModal = () => {
    setShowHelpModal(false);
  };

  const handleUseDemoCredentials = () => {
    setEmail('emailEmployeeHJ@domainHJ.com');
    setPassword('password123');
    setError('');
    setShowHelpModal(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">

      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold text-teal-600">VulnSight</h1>
      </div>

      <div className="max-w-xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center font-medium">{error}</p>
          </div>
        )}
        <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden"></div>
        <div className="bg-gradient-to-r from-teal-500 to-lime-400 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-semibold mb-3">Sign In</h1>
        <p className="text-lg opacity-90">Sign in with registered email and password</p>
      </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="emailEmployeeHJ@domainHJ.com"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Problem to Sign in Link */}
          <div>
            <button 
              type="button"
              onClick={handleHelpClick}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Problem to Sign in?
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-teal-500 to-lime-400 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Verification & Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 bg-gradient-to-r from-teal-50 to-lime-50 border border-teal-200 rounded-lg p-5 flex items-start gap-4">
          <div className="bg-teal-500 text-white rounded-full p-2 flex-shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-teal-700 font-semibold mb-1">Restricted Access</h3>
            <p className="text-gray-600 text-sm">
              Access are restricted for only an authorized users with proper credentials.
            </p>
          </div>
        </div>

        {/* User Help Modal */}
        {showHelpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Mail className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Contact IT Support</h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="text-teal-800 font-medium mb-2">Contact IT Support Team</p>
                  <p className="text-gray-600 mb-4">
                    If you're having trouble signing in, please contact our IT development team:
                  </p>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded border">
                    <Mail className="w-5 h-5 text-teal-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email:</p>
                      <a 
                        href="mailto:IT_developerteam@gmail.com" 
                        className="text-teal-600 hover:text-teal-700 font-medium text-lg break-all"
                      >
                        IT_developerteam@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;