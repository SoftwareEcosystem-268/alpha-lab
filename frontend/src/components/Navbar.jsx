import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-yellow to-primary-red bg-clip-text text-transparent">
              Grade Calculator
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600 hidden sm:block">
                  สวัสดี, <span className="font-semibold text-primary-yellow-dark">{user?.username}</span>
                </span>
                <Link
                  to="/calculator"
                  className="px-4 py-2 rounded-lg text-primary-yellow-dark hover:bg-primary-cream transition-colors"
                >
                  คำนวณเกรด
                </Link>
                <Link
                  to="/history"
                  className="px-4 py-2 rounded-lg text-primary-yellow-dark hover:bg-primary-cream transition-colors"
                >
                  ประวัติ
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-red-light to-primary-red text-white hover:shadow-lg transition-all"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-primary-yellow-dark hover:bg-primary-cream transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
