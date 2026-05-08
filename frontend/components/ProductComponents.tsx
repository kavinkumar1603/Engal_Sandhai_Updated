import React from 'react';
import { Plus, Minus, X, ChevronRight, Star } from 'lucide-react';
import { Product, CartItem } from '../types';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from './UIComponents';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductCard: React.FC<{ product: Product; className?: string }> = ({ product, className = "" }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  // Check if item is in cart
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, -1);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-[24px] p-4 flex flex-col justify-between h-[250px] relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 group ${className}`}
    >
      {/* Click image to see details, but card main action is buying */}
      <div 
        className="h-32 w-full flex items-center justify-center mb-2 cursor-pointer relative"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <motion.img 
          layoutId={`image-${product.id}`}
          src={product.image} 
          alt={product.name} 
          className="h-full object-contain drop-shadow-sm group-hover:drop-shadow-xl group-hover:scale-110 transition-all duration-500"
        />
      </div>
      
      <div className="flex flex-col flex-grow justify-end">
        <div className="mb-3">
           <h3 className="font-bold text-dark text-[16px] leading-tight mb-1 line-clamp-1 tracking-tight">{product.name}</h3>
           <p className="text-gray-400 text-xs font-medium">{product.unit}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-dark">₹{product.price.toFixed(2)}</span>
          
          <div className="h-10">
            <AnimatePresence mode="wait" initial={false}>
              {quantity > 0 ? (
                <motion.div
                  key="controls"
                  initial={{ opacity: 0, width: 40 }}
                  animate={{ opacity: 1, width: 100 }}
                  exit={{ opacity: 0, width: 40 }}
                  className="bg-primary/10 rounded-[14px] flex items-center justify-between px-1 h-10 w-[100px] overflow-hidden"
                >
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={handleDecrement}
                    className="w-8 h-8 flex items-center justify-center text-primary bg-white rounded-[10px] shadow-sm"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </motion.button>
                  <motion.span 
                    key={`qty-${quantity}`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-dark font-bold text-sm w-6 text-center"
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, 1); }}
                    className="w-8 h-8 flex items-center justify-center text-primary bg-white rounded-[10px] shadow-sm"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button 
                  key="add-btn"
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleIncrement}
                  className="w-10 h-10 bg-primary rounded-[14px] flex items-center justify-center text-white shadow-lg shadow-green-200 hover:shadow-green-300 transition-shadow"
                >
                  <Plus size={22} strokeWidth={3} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CategoryCard: React.FC<{ 
  name: string; 
  image: string; 
  color: string; 
  borderColor: string; 
  onClick?: () => void 
}> = ({ name, image, color, borderColor, onClick }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className={`${color} border ${borderColor} rounded-[24px] p-4 flex flex-col items-center justify-center h-[180px] cursor-pointer shadow-sm relative overflow-hidden group`}
  >
    <div className="absolute inset-0 bg-white/40 group-hover:bg-white/10 transition-colors duration-500"></div>
    <div className="relative z-10 flex flex-col items-center">
      <motion.img 
        src={image} 
        alt={name} 
        className="h-24 object-contain mb-4 drop-shadow-md group-hover:scale-110 transition-transform duration-500" 
      />
      <span className="text-dark font-bold text-center text-[15px] leading-tight max-w-[90%] tracking-tight">{name}</span>
    </div>
  </motion.div>
);

export const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useStore();
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        className="flex p-4 bg-white mb-3 rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 items-center relative overflow-hidden"
      >
        <div className="w-20 h-20 flex-shrink-0 mr-4 bg-[#F8F9FA] rounded-[18px] p-2 flex items-center justify-center">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-[16px] text-dark leading-tight truncate pr-2">{item.name}</h3>
            <button onClick={() => setShowConfirm(true)} className="text-gray-300 hover:text-red-500 transition-colors">
              <X size={18} />
            </button>
          </div>
          <p className="text-gray-400 text-xs font-medium mb-3">{item.unit}</p>
          
          <div className="flex justify-between items-center">
             <div className="flex items-center space-x-3 bg-gray-50 rounded-[12px] p-1">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-7 h-7 bg-white rounded-[10px] shadow-sm flex items-center justify-center text-dark"
                >
                  <Minus size={14} strokeWidth={2.5} />
                </motion.button>
                <span className="font-bold text-sm min-w-[16px] text-center">{item.quantity}</span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-7 h-7 bg-white rounded-[10px] shadow-sm flex items-center justify-center text-primary"
                >
                  <Plus size={14} strokeWidth={2.5} />
                </motion.button>
             </div>
             <span className="font-bold text-lg text-dark tracking-tight">₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </motion.div>
      <ConfirmDialog 
        isOpen={showConfirm}
        title="Remove Item?"
        message={`Remove ${item.name} from your cart?`}
        onConfirm={() => {
            removeFromCart(item.id);
            setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};
