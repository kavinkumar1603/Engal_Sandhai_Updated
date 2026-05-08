import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CartItemRow } from '../components/ProductComponents';
import { Button, ConfirmDialog } from '../components/UIComponents';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart: React.FC = () => {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-[80vh] px-6 text-center bg-[#F5F5F7] md:bg-white md:rounded-[32px]"
      >
         <motion.div 
           initial={{ scale: 0.8 }} animate={{ scale: 1 }}
           className="w-48 h-48 mb-6"
         >
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty" className="w-full h-full object-contain opacity-90 mix-blend-multiply" />
         </motion.div>
         <h2 className="text-2xl font-bold mb-2 text-dark">Your Cart is Empty</h2>
         <p className="text-gray-400 mb-8 max-w-xs leading-relaxed">Looks like you haven't added anything to your cart yet</p>
         <div className="w-full max-w-[200px]">
           <Button onClick={() => navigate('/')} className="shadow-2xl shadow-green-100">Start Shopping</Button>
         </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="pb-40 pt-2 px-5 min-h-screen flex flex-col md:px-0 bg-[#F5F5F7] md:bg-transparent"
    >
       <div className="flex items-center justify-between mb-6 md:mb-8 sticky top-0 bg-[#F5F5F7]/80 backdrop-blur-xl z-20 py-4 -mx-5 px-5 md:static md:bg-transparent md:mx-0 md:px-0 border-b border-gray-200/50 md:border-0">
          <span className="font-bold text-2xl text-dark tracking-tight">My Cart <span className="text-primary text-lg font-medium ml-1">({cart.reduce((a,c)=>a+c.quantity,0)})</span></span>
          <button 
            onClick={() => setShowClearConfirm(true)}
            className="text-red-500 text-sm font-bold bg-white hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors shadow-sm"
          >
            Clear
          </button>
       </div>
       
       <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12 items-start relative">
          {/* Cart Items List */}
          <div className="flex-1 w-full space-y-1 pb-10">
             <AnimatePresence mode='popLayout'>
               {cart.map(item => <CartItemRow key={item.id} item={item} />)}
             </AnimatePresence>
          </div>

          {/* Checkout Summary - Floating Dock on Mobile */}
          <div className="fixed bottom-[90px] left-5 right-5 z-20 md:static md:w-[380px] md:z-0">
             <motion.div 
               initial={{ y: 100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="bg-white/90 backdrop-blur-2xl border border-white/40 p-5 rounded-[32px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] md:p-6 md:border-gray-100 md:shadow-lg md:sticky md:top-24 md:bg-white"
             >
                 {/* Desktop Only Summary */}
                 <div className="hidden md:block space-y-4 mb-6">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="flex justify-between text-gray-500 text-sm font-medium">
                       <span>Subtotal</span>
                       <span className="text-dark">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm font-medium">
                       <span>Delivery</span>
                       <span className="text-dark">Free</span>
                    </div>
                    <div className="my-4 border-t border-dashed border-gray-200"></div>
                    <div className="flex justify-between text-xl font-bold text-dark">
                       <span>Total</span>
                       <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                 </div>

                 {/* Checkout Button */}
                 <Button onClick={() => setShowCheckout(true)} className="flex justify-between px-6 relative h-[60px] !rounded-[24px] shadow-2xl shadow-green-200 hover:shadow-green-300">
                    <span className="invisible md:hidden">Space</span>
                    <span className="font-bold text-lg tracking-wide flex items-center gap-2">
                       Checkout <ArrowRight size={20} />
                    </span>
                    <span className="bg-[#489E67] text-white rounded-[12px] px-2 py-1 text-sm absolute right-5 top-1/2 transform -translate-y-1/2 font-bold md:hidden shadow-sm">
                      ₹{cartTotal.toFixed(2)}
                    </span>
                 </Button>
             </motion.div>
          </div>
       </div>

       {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} total={cartTotal} />}
       <ConfirmDialog 
          isOpen={showClearConfirm}
          title="Clear Cart?"
          message="Are you sure you want to remove all items? This cannot be undone."
          onConfirm={() => {
             clearCart();
             setShowClearConfirm(false);
          }}
          onCancel={() => setShowClearConfirm(false)}
       />
    </motion.div>
  );
};

const CheckoutModal: React.FC<{ onClose: () => void; total: number }> = ({ onClose, total }) => {
  const navigate = useNavigate();
  
  const handlePlaceOrder = () => {
    setTimeout(() => {
        const success = Math.random() > 0.1; 
        navigate(success ? '/success' : '/failed');
    }, 800);
  };

  const Row: React.FC<{ label: string; value?: string; action?: boolean }> = ({ label, value, action }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 group cursor-pointer">
      <span className="text-gray-500 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-dark font-semibold text-[15px]">{value}</span>}
        {action && <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-end md:items-center justify-center">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-[#F5F5F7] w-full md:max-w-md md:rounded-[36px] rounded-t-[36px] p-6 pb-10 shadow-2xl h-[90vh] md:h-auto overflow-y-auto"
      >
         <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#F5F5F7] z-10 py-2">
            <h2 className="text-2xl font-bold text-dark">Checkout</h2>
            <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm"><X size={20} /></button>
         </div>

         <div className="bg-white rounded-[28px] p-6 shadow-sm mb-6 space-y-1">
            <Row label="Delivery" value="Home Delivery" action />
            <Row label="Address" value="Home Address" action />
            <Row label="Payment" value="**** 4747" action />
         </div>

         <div className="bg-white rounded-[28px] p-6 shadow-sm mb-8 space-y-1">
            <Row label="Promo Code" value="Pick discount" action />
            <div className="flex justify-between py-4 border-t border-dashed border-gray-100 mt-2 pt-4">
              <span className="font-bold text-dark text-lg">Total Cost</span>
              <span className="font-bold text-dark text-xl">₹{total.toFixed(2)}</span>
            </div>
         </div>

         <p className="text-gray-400 text-[11px] mb-6 px-4 text-center leading-relaxed">
            By placing an order you agree to our <br/><span className="text-dark font-bold">Terms</span> And <span className="text-dark font-bold">Conditions</span>
         </p>

         <Button onClick={handlePlaceOrder} className="!rounded-[24px] shadow-2xl shadow-primary/30 h-14 text-lg">Place Order</Button>
      </motion.div>
    </div>
  );
};

export const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart } = useStore();

  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center bg-white md:bg-transparent">
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="mb-8 relative"
      >
         <div className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center mb-4 relative z-10">
             <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(83,177,117,0.6)]">
                <motion.svg 
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                  width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </motion.svg>
             </div>
         </div>
         <motion.div 
           animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0] }} 
           transition={{ duration: 2, repeat: Infinity }}
           className="absolute inset-0 bg-green-200 rounded-full z-0"
         ></motion.div>
      </motion.div>
      
      <h2 className="text-3xl font-bold text-dark mb-4 leading-tight">Order Accepted!</h2>
      <p className="text-gray-400 mb-12 text-[15px] leading-relaxed max-w-xs">Your items have been placed and are on their way to being processed.</p>
      
      <div className="w-full max-w-xs space-y-4">
        <Button onClick={() => navigate('/')} className="!rounded-[24px] h-14">Track Order</Button>
        <Button variant="text" onClick={() => navigate('/')}>Back to home</Button>
      </div>
    </div>
  );
};

export const OrderFailed: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
       <motion.div 
         initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
         className="bg-white rounded-[32px] w-full max-w-sm p-8 text-center shadow-2xl"
       >
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <X size={36} className="text-red-500" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Oops! Order Failed</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">Something went wrong while processing your payment. Please try again.</p>
          
          <div className="space-y-3">
             <Button onClick={() => navigate('/cart')} className="!bg-red-500 !shadow-red-200 hover:!bg-red-600 !rounded-[20px]">Try Again</Button>
             <button onClick={() => navigate('/')} className="text-gray-400 font-semibold text-sm hover:text-dark transition-colors pt-2">Back to home</button>
          </div>
       </motion.div>
    </div>
  );
};
