import React from 'react';
import { ChevronRight, LogOut, FileText, User as UserIcon, Bell, HelpCircle, Info, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/UIComponents';
import { ProductCard, CategoryCard } from '../components/ProductComponents';
import { PRODUCTS, CATEGORIES } from '../constants';
import { useStore } from '../context/StoreContext';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

// --- ANIMATION VARIANTS ---
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 } 
  }
};

// --- HOME PAGE (SHOP) ---
export const Home: React.FC = () => {
  const exclusive = PRODUCTS.slice(0, 3);
  const bestSelling = PRODUCTS.slice(3, 6);
  const groceries = CATEGORIES.slice(0, 3);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="pb-32 space-y-8 bg-[#F5F5F7] md:bg-transparent min-h-screen pt-4 md:pt-0"
    >
      {/* Search Bar - No longer sticky header with logo, just search */}
      <motion.div variants={sectionVariants} className="px-5 md:hidden">
        <SearchBar placeholder="Search Store" className="shadow-sm border border-gray-200/50 bg-white" />
      </motion.div>

      {/* Hero Banner */}
      <motion.div variants={sectionVariants} className="px-5 md:px-0">
        <div className="w-full relative h-[180px] md:h-[350px] rounded-[32px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] group isolate">
           <motion.img 
             style={{ y: y1 }}
             src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80" 
             className="w-full h-full object-cover scale-110" 
             alt="Banner" 
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-8 md:px-12 backdrop-blur-[1px]">
              <span className="text-white/80 font-bold text-xs md:text-xl tracking-widest uppercase mb-2">Fresh Collection</span>
              <span className="text-white font-extrabold text-3xl md:text-6xl drop-shadow-lg mb-3 tracking-tight">Vegetables</span>
              <span className="text-[#FFD700] font-bold text-lg md:text-2xl tracking-widest drop-shadow-md">UP TO 40% OFF</span>
           </div>
        </div>
      </motion.div>

      {/* Sections */}
      <Section title="Exclusive Offer" products={exclusive} />
      
      {/* Horizontal Category Scroll */}
      <motion.div variants={sectionVariants} className="px-5 md:px-0">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-dark tracking-tight">Groceries</h2>
          <span className="text-primary font-semibold text-sm cursor-pointer hover:bg-white px-3 py-1.5 rounded-full transition-all">See all</span>
        </div>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:space-x-0 md:gap-6 md:overflow-visible">
           {groceries.map(cat => (
             <motion.div 
               whileHover={{ scale: 1.02, y: -2 }}
               whileTap={{ scale: 0.98 }}
               key={cat.id} 
               className={`${cat.color} rounded-[24px] p-4 flex items-center gap-4 min-w-[240px] h-[100px] cursor-pointer hover:shadow-lg transition-all border border-transparent hover:border-black/5`}
             >
               <img src={cat.image} className="w-16 h-16 object-contain drop-shadow-md" alt={cat.name} />
               <span className="font-bold text-dark text-[16px] leading-tight">{cat.name}</span>
             </motion.div>
           ))}
        </div>
      </motion.div>

      <Section title="Best Selling" products={bestSelling} />
    </motion.div>
  );
};

const Section: React.FC<{ title: string; products: any[] }> = ({ title, products }) => (
  <motion.div variants={sectionVariants} className="pl-5 md:pl-0">
    <div className="flex justify-between items-center mb-5 pr-5 md:pr-0">
      <h2 className="text-2xl font-bold text-dark tracking-tight">{title}</h2>
      <span className="text-primary font-semibold text-sm cursor-pointer hover:bg-white px-3 py-1.5 rounded-full transition-all">See all</span>
    </div>
    <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-8 -ml-5 px-5 md:ml-0 md:px-0 md:grid md:grid-cols-4 lg:grid-cols-5 md:space-x-0 md:gap-6 md:overflow-visible md:pb-0 scroll-pl-5 snap-x">
      {products.map(p => (
        <div key={p.id} className="snap-start">
           <ProductCard product={p} className="w-[170px] md:w-auto" />
        </div>
      ))}
    </div>
  </motion.div>
);

// --- EXPLORE PAGE ---
export const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="pb-32 pt-4 px-5 md:px-0 bg-[#F5F5F7] md:bg-transparent min-h-screen"
    >
       <motion.div variants={sectionVariants} className="sticky top-[60px] z-30 bg-[#F5F5F7]/80 backdrop-blur-xl -mx-5 px-5 py-4 mb-6 md:top-0 md:bg-transparent md:backdrop-blur-none">
          <h2 className="text-center font-bold text-xl mb-4 text-dark md:hidden">Find Products</h2>
          <SearchBar placeholder="Search Store" className="shadow-sm bg-white" />
       </motion.div>
       
       <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 md:gap-6">
         {CATEGORIES.map((cat, index) => (
           <motion.div
             key={cat.id}
             variants={{
               hidden: { opacity: 0, scale: 0.8, y: 20 },
               visible: { opacity: 1, scale: 1, y: 0, transition: { delay: index * 0.05, type: "spring" } }
             }}
           >
             <CategoryCard 
               {...cat} 
               onClick={() => navigate(`/category/${cat.id}`)}
             />
           </motion.div>
         ))}
       </div>
    </motion.div>
  );
};

// --- ACCOUNT PAGE ---
export const Account: React.FC = () => {
  const { user, notifications } = useStore();
  const navigate = useNavigate();
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
    }
  };
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  const menuGroupVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };
  
  const MenuLink: React.FC<{ icon: any; label: string; subtext?: string; isDestructive?: boolean; onClick?: () => void; badge?: number }> = ({ icon: Icon, label, subtext, isDestructive, onClick, badge }) => (
    <motion.div 
      variants={itemVariants}
      whileHover={{ x: 6, backgroundColor: "rgba(245, 245, 247, 1)" }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`flex items-center justify-between p-4 cursor-pointer group rounded-2xl transition-all ${isDestructive ? 'hover:bg-red-50' : 'hover:bg-gray-50'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDestructive ? 'bg-red-100 text-red-500' : 'bg-[#F2F3F5] text-dark group-hover:bg-white group-hover:shadow-md'}`}>
          <Icon size={20} strokeWidth={isDestructive ? 2.5 : 2} className={isDestructive ? '' : 'opacity-70 group-hover:opacity-100'} />
        </div>
        <div>
          <span className={`text-[15px] font-semibold block ${isDestructive ? 'text-red-500' : 'text-dark'}`}>{label}</span>
          {subtext && <span className="text-xs text-graytext font-medium mt-0.5 block">{subtext}</span>}
        </div>
      </div>
      {!isDestructive && (
        <div className="flex items-center gap-3">
          {badge && badge > 0 && <div className="w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-red-200 shadow-md">{badge}</div>}
          <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-32 md:pb-12 md:bg-transparent pt-4">
      <div className="max-w-5xl mx-auto px-5 md:pt-0">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid md:grid-cols-12 gap-6 lg:gap-10">
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <motion.div variants={itemVariants} className="relative w-full h-52 rounded-[32px] p-6 text-white shadow-[0_20px_40px_-10px_rgba(46,58,89,0.3)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2E3A59] via-[#161621] to-[#0D0D12]"></div>
              <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-primary rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-pulse"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 p-0.5 bg-white/10 backdrop-blur-sm">
                        <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="Avatar" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight tracking-wide">{user.name}</h3>
                        <p className="text-xs text-gray-300 font-medium tracking-wider">MEMBER SINCE 2021</p>
                      </div>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]"></div>
                     <span className="text-[10px] font-bold tracking-widest uppercase text-[#FFD700]">Gold</span>
                   </div>
                </div>

                <div>
                   <div className="flex justify-between items-end mb-1">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Loyalty Points</p>
                        <p className="text-2xl font-mono font-bold tracking-tight">2,450 <span className="text-sm font-normal text-primary">PTS</span></p>
                      </div>
                      <ShieldCheck size={28} className="text-white/20" />
                   </div>
                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-3">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "70%" }} 
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-primary to-green-300 rounded-full"
                      ></motion.div>
                   </div>
                </div>
              </div>
            </motion.div>
            
            {/* Removed Stat Cards for Orders, Wallet, Codes as requested */}
          </div>

          <div className="md:col-span-7 lg:col-span-8 space-y-6">
            <motion.div variants={menuGroupVariants} className="bg-white rounded-[32px] p-3 shadow-sm border border-gray-100/50">
               <div className="flex flex-col gap-1">
                 <MenuLink icon={FileText} label="Your Orders" subtext="Track ongoing & past orders" onClick={() => navigate('/orders')} />
                 <MenuLink icon={UserIcon} label="My Details" subtext="Edit personal info" />
                 {/* Removed Delivery Address */}
                 {/* Removed Payment Methods (Removed to keep it clean if not requested, but keeping generic Account page structure, deleting only requested) */}
               </div>
            </motion.div>

            <motion.div variants={menuGroupVariants} className="bg-white rounded-[32px] p-3 shadow-sm border border-gray-100/50">
               <div className="flex flex-col gap-1">
                 <MenuLink icon={Bell} label="Notifications" badge={unreadNotifications} onClick={() => navigate('/notifications')} />
                 {/* Removed Promo Codes */}
                 <MenuLink icon={HelpCircle} label="Help & Support" />
                 <MenuLink icon={Info} label="About Us" />
               </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2 pb-6 md:pb-0">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white hover:bg-red-50 text-dark hover:text-red-600 font-bold py-4 rounded-[24px] flex items-center justify-center gap-2 transition-colors border border-gray-200/50 hover:border-red-100 group shadow-sm"
              >
                <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                <span>Log Out</span>
              </motion.button>
              <p className="text-center text-xs text-gray-300 mt-6 font-medium">App Version 2.5.0</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
