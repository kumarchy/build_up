import React, { useContext, useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import Profile from '../Profile/Profile';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';
// { setShowSignup }
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { searchPost } = useContext(StoreContext);

  const handleSearch = (e) => {
    let term = e.target.value.replace(/#/g, ''); 
    setSearchTerm(term);
    searchPost(term); 
  };  

  const navigate = useNavigate();

  return (
    <nav className="bg-[#0F1B21] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="w-40 cursor-pointer">
            <img src="/buildUp.png" alt=""   onClick={() => navigate("/")}/>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-20">
            <a href="/" className="text-white border-b-2 border-transparent hover:border-white transition-all duration-200">
              Home
            </a>
            <Link to="/form" className="flex items-center justify-center text-white border-b-2 border-transparent hover:border-white transition-all duration-200">
              <span className="text-2xl">+</span> AddProject
            </Link>
          </div>

          {/* Search and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch} // Call handleSearch on input change
                value={searchTerm}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                onClick={() => setIsProfileVisible(!isProfileVisible)}
              >
                <User className="h-5 w-5 text-gray-500" />
                {isProfileVisible && (
                  <div className="absolute bg-white shadow-lg rounded-lg p-2 top-14" > 
                  {/* onClick={() => setShowSignup(true)} */}
                    <Profile />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-white focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Home</a>
            <a href="/about" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Projects</a>
            <Link to="/form" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">AddProject</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 flex items-center space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSearch} // Call handleSearch on input change
                  value={searchTerm}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                onClick={() => setIsProfileVisible(!isProfileVisible)}
              >
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;