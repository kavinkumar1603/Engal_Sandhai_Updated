import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share, ChevronLeft } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { useStore } from '../context/StoreContext';
import { Button, QuantityControl, PageHeader } from '../components/UIComponents';
import { ProductCard } from '../components/ProductComponents';
import FilterModal from './FilterModal';
import { motion } from 'framer-motion';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  
  if (!product) return <div>Product not found</div>;

  return (
    <div className="pb-32 bg-white min-h-screen md:pb-10 relative">
      {/* Mobile Header (Floating) */}
      <div className="md:hidden absolute top-0 left-0 right-0 p-5 flex justify-between items-center z-20">
         <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all">
            <ChevronLeft size={24} className="text-dark" />
         </button>
      </div>

      <div className="md:flex md:items-start md:max-w-6xl md:mx-auto md:pt-10 md:gap-12">
        {/* Left: Image (Desktop) / Top: Image (Mobile) */}
        <div className="bg-[#F2F3F2] rounded-b-[40px] md:rounded-[32px] relative md:w-1/2 h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
           <motion.img 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             src={product.image} alt={product.name} 
             className="h-[60%] md:h-[70%] object-contain drop-shadow-xl" 
           />
        </div>
        
        {/* Right: Details */}
        <div className="px-6 -mt-10 relative z-10 md:mt-0 md:px-0 md:w-1/2">
           <div className="bg-white rounded-t-[32px] p-6 md:p-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:shadow-none min-h-[500px] flex flex-col">
              {/* Header Info */}
              <div className="mb-6 pt-4 md:pt-0">
                 <div className="flex items-center gap-2 mb-2">
                   <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">{product.category}</span>
                 </div>
                 <h1 className="text-2xl md:text-4xl font-bold text-dark w-full leading-tight mb-2">{product.name}</h1>
                 <p className="text-gray-400 font-medium text-lg">{product.unit}</p>
              </div>
              
              {/* Qty & Price */}
              <div className="flex justify-between items-center mb-8">
                <QuantityControl 
                   quantity={qty} 
                   onIncrease={() => setQty(qty + 1)} 
                   onDecrease={() => setQty(Math.max(1, qty - 1))}
                   variant="large"
                />
                <span className="text-3xl font-bold text-dark tracking-tight">₹{(product.price * qty).toFixed(2)}</span>
              </div>

              <div className="flex-1"></div>

              {/* Desktop Button */}
              <div className="hidden md:block md:max-w-sm mt-8">
                 <Button onClick={() => addToCart(product, qty)} className="h-14 text-lg shadow-xl shadow-green-200">Add To Basket</Button>
              </div>
           </div>
        </div>
      </div>
      
      {/* Sticky Bottom Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 md:hidden z-30 pb-8">
         <Button onClick={() => addToCart(product, qty)} className="shadow-xl shadow-green-200 h-14 text-lg !rounded-[20px]">Add To Basket</Button>
      </div>
    </div>
  );
};

export const CategoryView: React.FC = () => {
  const { id } = useParams();
  const category = CATEGORIES.find(c => c.id === id);
  const products = PRODUCTS.filter(p => p.category === category?.name || p.category === 'Beverages'); 
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="pb-24 pt-4 px-4 relative md:px-0">
       <div className="md:hidden">
          <PageHeader 
              title={category?.name || 'Category'} 
              rightAction={
                <button onClick={() => setShowFilter(true)} className="p-1">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.75 15.75L12.4875 12.4875" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              } 
          />
       </div>

       <div className="hidden md:flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-dark">{category?.name}</h2>
          <button onClick={() => setShowFilter(true)} className="flex items-center space-x-2 text-dark font-semibold hover:text-primary transition-colors">
              <span>Filter</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.75 15.75L12.4875 12.4875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>
       </div>
       
       <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
       </div>

       {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}
    </div>
  );
};