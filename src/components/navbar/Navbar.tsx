import React, { useEffect, useState } from 'react';
import SearchBar from '../searchbar/SearchBar';

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSearchClick = () => {
   setShowSearch(!showSearch);
  }
  const onShowDrawer = () => {
    setShowDrawer(true);
  }

  return (
    <nav className={`fixed absolute top-0 left-0 w-full z-50 flex justify-between items-center px-3 py-6 md:px-12 ${isScrolled 
        ? 'bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg'
        : 'bg-transparent' 
      }`}>
      <div className="flex items-center gap-6">
        {/* Logo Icon */}
       <img src="/logo-mobile.svg" alt="Logo" className="cursor-pointer" />
       <a href="#" className="md:block hidden text-gray-400 hover:text-white  font-medium transition-all hover:translate-x-1">Home</a>
       <a href="#" className="md:block hidden text-gray-400 hover:text-white font-medium transition-all hover:translate-x-1">Favorites</a>
      </div>
      
      <div className="flex gap-2 text-white md:hidden">
        <img src="/search.svg" alt="Search" onClick={onSearchClick} />
        { !showSearch && <img src="/menu-mobile.svg" alt="Logo"  onClick={onShowDrawer} className="cursor-pointer"/> }
      </div>
      <div className={showSearch ? "flex md:flex-1 justify-end " : "hidden md:flex md:flex-1 md:justify-end" }>
        <SearchBar />
      </div>

      <div className={`fixed top-0 left-0 h-full w-full bg-black z-100 p-6 shadow-2xl border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
        showDrawer ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header Drawer */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <img src="/logo-mobile.svg" alt="Logo"  />
          </div>
          
          <button onClick={() => setShowDrawer(false)} className="p-1 hover:bg-gray-800 rounded-full transition text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-6">
          <a href="#" className="block text-gray-400 hover:text-white text-lg font-medium transition-all hover:translate-x-1">Home</a>
          <a href="#" className="block text-gray-400 hover:text-white text-lg font-medium transition-all hover:translate-x-1">Favorites</a>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;