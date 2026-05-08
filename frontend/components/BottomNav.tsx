import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Store, Search, ShoppingCart, User, Carrot, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SearchBar } from './UIComponents';
import { motion, AnimatePresence } from 'framer-motion';

export const TopNav: React.FC = () => {
  const { cart, user } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const NavItem: React.FC<{ to: string; icon: any; label: string; badge?: number }> = ({ to, icon: Icon, label, badge }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'text-primary bg-green-50' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative">
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} />
            {badge ? (
              <span className="absolute -top-2 -right-2 bg-[#FF324B] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white shadow-sm">
                {badge > 9 ? '9+' : badge}
              </span>
            ) : null}
          </div>
          <span className={`font-semibold text-sm ${isActive ? 'text-primary' : 'text-gray-700 group-hover:text-primary'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    <div className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 px-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
          <Carrot className="text-primary transition-transform group-hover:rotate-12" size={32} />
          <span className="text-2xl font-bold text-dark tracking-tight group-hover:text-primary transition-colors">Engal Sandhai</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <SearchBar placeholder="Search store..." />
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-4">
          <NavItem to="/" icon={Store} label="Shop" />
          <NavItem to="/explore" icon={Search} label="Explore" />
          <NavItem to="/cart" icon={ShoppingCart} label="Cart" badge={cartCount} />
          
          <div className="w-px h-8 bg-gray-200 mx-2"></div>

          <NavLink to="/account" className={({ isActive }) => `flex items-center gap-3 pl-2 pr-1 py-1 rounded-full transition-all border ${isActive ? 'border-primary bg-green-50' : 'border-transparent hover:bg-gray-50'}`}>
             <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 ring-2 ring-transparent group-hover:ring-primary/20">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
             </div>
             <span className="text-sm font-semibold text-dark pr-2 hidden lg:block">{user.name.split(' ')[0]}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const MobileNav: React.FC = () => {
  const { cart, user } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close drawer on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const DrawerItem: React.FC<{ to: string; icon: any; label: string; badge?: number }> = ({ to, icon: Icon, label, badge }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center justify-between p-4 rounded-xl transition-all duration-200 mb-2 ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-dark'}`
      }
    >
      <div className="flex items-center gap-4">
        <Icon size={24} strokeWidth={2} />
        <span className="font-semibold text-base">{label}</span>
      </div>
      {badge ? (
        <span className="bg-[#FF324B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      ) : <ChevronRight size={16} className="text-gray-300" />}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-gray-100 px-4 h-[60px] flex items-center justify-between shadow-sm">
        <button onClick={toggleDrawer} className="p-2 -ml-2 text-dark hover:bg-gray-100 rounded-full transition-colors">
          <Menu size={24} />
        </button>

        <Link to="/" className="font-bold text-lg text-dark tracking-tight flex items-center gap-1.5">
          <Carrot className="text-primary" size={24} />
          <span>Engal Sandhai</span>
        </Link>

        <Link to="/cart" className="p-2 -mr-2 relative text-dark hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute top-1 right-0.5 bg-[#FF324B] text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Spacer for fixed header */}
      <div className="md:hidden h-[60px]" />

      {/* Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 bg-black/40 z-[70] md:hidden backdrop-blur-sm"
            />
            
            {/* Drawer Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[80] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-full border border-gray-200 overflow-hidden bg-white">
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h3 className="font-bold text-dark text-lg leading-tight">{user.name.split(' ')[0]}</h3>
                     <p className="text-xs text-gray-500">View Profile</p>
                   </div>
                 </div>
                 <button onClick={toggleDrawer} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                   <X size={20} className="text-gray-500" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                 <div className="space-y-1">
                   <DrawerItem to="/" icon={Store} label="Shop" />
                   <DrawerItem to="/explore" icon={Search} label="Explore" />
                   <DrawerItem to="/cart" icon={ShoppingCart} label="Cart" badge={cartCount} />
                   <DrawerItem to="/account" icon={User} label="Account" />
                 </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                 <button className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors w-full p-2 font-medium">
                   <LogOut size={20} />
                   <span>Log Out</span>
                 </button>
                 <p className="text-center text-xs text-gray-300 mt-4">Version 2.5.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
