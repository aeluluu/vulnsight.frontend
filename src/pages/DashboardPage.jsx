import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { FaChartBar, FaExclamationTriangle, FaCheckCircle, FaClock, FaArrowUp, FaArrowDown, FaSignOutAlt, FaUser } from 'react-icons/fa';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const stats = [
    {
      title: 'Total Scans',
      value: '1,248',
      change: '+12.5%',
      trend: 'up',
      icon: FaChartBar,
      color: 'primary',
    },
    {
      title: 'Critical Vulnerabilities',
      value: '42',
      change: '-8.2%',
      trend: 'down',
      icon: FaExclamationTriangle,
      color: 'danger',
    },
    {
      title: 'Resolved Issues',
      value: '894',
      change: '+5.3%',
      trend: 'up',
      icon: FaCheckCircle,
      color: 'green',
    },
    {
      title: 'Pending Reviews',
      value: '56',
      change: '+2.1%',
      trend: 'up',
      icon: FaClock,
      color: 'yellow',
    },
  ];

  const recentScans = [
    { id: 1, target: 'api.company.com', status: 'Completed', vulnerabilities: 3, date: '2024-01-15' },
    { id: 2, target: 'app.company.com', status: 'In Progress', vulnerabilities: null, date: '2024-01-15' },
    { id: 3, target: 'admin.company.com', status: 'Completed', vulnerabilities: 12, date: '2024-01-14' },
    { id: 4, target: 'database.company.com', status: 'Failed', vulnerabilities: null, date: '2024-01-14' },
    { id: 5, target: 'auth.company.com', status: 'Completed', vulnerabilities: 1, date: '2024-01-13' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">VulnSight Dashboard</h1>
          <p className="text-gray-600 mt-1">Security Vulnerability Monitoring Platform</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-lime-400 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
              <p className="text-sm text-gray-500">{user?.role || 'Administrator'}</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Back to Login Button (Small) */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/login')}
          className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
        >
          <span>← Back to Login Page</span>
        </button>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-lime-400 rounded-2xl p-6 text-white mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-teal-100">
              Monitor security threats and manage vulnerability scans in real-time
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Start New Scan
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            primary: 'bg-teal-100 text-teal-600',
            danger: 'bg-red-100 text-red-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600',
          };
          
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <FaArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <FaArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Scans Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Scans</h2>
          <button className="text-teal-600 hover:text-teal-700 font-medium">
            View All →
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Target</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Vulnerabilities</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan) => (
                <tr key={scan.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{scan.target}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${scan.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      ${scan.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}
                      ${scan.status === 'Failed' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {scan.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {scan.vulnerabilities !== null ? (
                      <span className={`
                        font-semibold
                        ${scan.vulnerabilities > 10 ? 'text-red-600' : ''}
                        ${scan.vulnerabilities <= 10 && scan.vulnerabilities > 3 ? 'text-yellow-600' : ''}
                        ${scan.vulnerabilities <= 3 ? 'text-green-600' : ''}
                      `}>
                        {scan.vulnerabilities} found
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{scan.date}</td>
                  <td className="py-4 px-4">
                    <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Scan</h3>
          <p className="text-gray-600 text-sm mb-4">
            Perform a quick vulnerability scan on a single target
          </p>
          <input 
            type="text" 
            placeholder="Enter URL or IP address" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
          />
          <button className="w-full bg-gradient-to-r from-teal-500 to-lime-400 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Start Quick Scan
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Account Options</h3>
          <p className="text-gray-600 text-sm mb-4">
            Manage your account and session
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full border border-teal-200 text-teal-600 py-2.5 rounded-lg font-medium hover:bg-teal-50 transition-colors flex items-center justify-center gap-2"
            >
              <FaUser className="w-4 h-4" />
              Switch Account
            </button>
            <button
              onClick={handleLogout}
              className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FaSignOutAlt className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Session Info</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Logged in as:</p>
              <p className="font-medium text-gray-900">{user?.email || 'emailEmployeeHJ@domainHJ.com'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role:</p>
              <p className="font-medium text-gray-900">{user?.role || 'Administrator'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Session active:</p>
              <p className="font-medium text-green-600">Active now</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Return to login page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;