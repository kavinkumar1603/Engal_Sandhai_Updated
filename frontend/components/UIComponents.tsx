import React from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'text' | 'ghost';
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  variant = 'primary',
  children,
  ...props
}) => {
  const baseStyle = "w-full py-4 rounded-[18px] font-bold text-[16px] transition-all duration-300 flex items-center justify-center active:scale-[0.98]";
  const variants = {
    primary: "bg-primary text-white hover:bg-[#469e65] shadow-[0_10px_20px_-5px_rgba(83,177,117,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(83,177,117,0.5)]",
    outline: "bg-transparent border-[1.5px] border-gray-200 text-dark hover:border-primary hover:text-primary hover:bg-green-50",
    text: "bg-transparent text-dark font-medium hover:text-primary hover:bg-gray-50",
    ghost: "bg-gray-100 text-gray-600 hover:bg-gray-200"
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.97 }}
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const QuantityControl: React.FC<{
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  variant?: 'small' | 'large';
}> = ({ quantity, onIncrease, onDecrease, variant = 'small' }) => {
  const isLarge = variant === 'large';
  
  return (
    <div className="flex items-center space-x-4 bg-gray-50 p-1.5 rounded-[16px]">
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onDecrease}
        className={`${isLarge ? 'w-10 h-10' : 'w-8 h-8'} rounded-[12px] bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-dark transition-colors`}
      >
        <svg width="12" height="2" viewBox="0 0 12 2" fill="none"><path d="M1 1H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </motion.button>
      <span className={`font-bold text-dark min-w-[20px] text-center ${isLarge ? 'text-xl' : 'text-lg'}`}>{quantity}</span>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onIncrease}
        className={`${isLarge ? 'w-10 h-10' : 'w-8 h-8'} rounded-[12px] bg-white shadow-sm border border-gray-100 flex items-center justify-center text-primary hover:bg-green-50 transition-colors`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </motion.button>
    </div>
  );
};

export const PageHeader: React.FC<{ title?: string; onBack?: () => void; rightAction?: React.ReactNode; className?: string }> = ({ title, onBack, rightAction, className = '' }) => {
  const navigate = useNavigate();
  return (
    <div className={`flex items-center justify-between p-5 bg-white/80 backdrop-blur-xl sticky top-0 z-30 ${className}`}>
      <button onClick={onBack || (() => navigate(-1))} className="w-10 h-10 -ml-2 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors">
        <ChevronLeft size={28} className="text-dark" strokeWidth={2.5} />
      </button>
      {title && <h1 className="text-xl font-bold text-dark tracking-tight">{title}</h1>}
      <div className="w-10 flex justify-end">{rightAction}</div>
    </div>
  );
};

export const SearchBar: React.FC<{ placeholder?: string; onClick?: () => void; className?: string }> = ({ placeholder = "Search Store", onClick, className = '' }) => {
  return (
    <div 
      onClick={onClick} 
      className={`w-full bg-[#F2F3F5] hover:bg-[#EBECEE] transition-colors rounded-[18px] h-[50px] flex items-center px-4 space-x-3 cursor-text group ${className}`}
    >
      <Search className="text-gray-500 group-hover:text-dark transition-colors" size={20} strokeWidth={2.5} />
      <span className="text-gray-500 font-medium text-[15px] w-full">{placeholder}</span>
    </div>
  );
};

export const ConfirmDialog: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[28px] w-full max-w-sm p-6 text-center shadow-2xl"
      >
        <h3 className="text-xl font-bold text-dark mb-3">{title}</h3>
        <p className="text-gray-500 text-[15px] leading-relaxed mb-8">{message}</p>
        <div className="flex space-x-3">
          <Button variant="ghost" onClick={onCancel} className="flex-1 !bg-gray-100 hover:!bg-gray-200 !rounded-[16px]">Cancel</Button>
          <Button variant="primary" onClick={onConfirm} className="flex-1 !bg-red-500 !shadow-red-200 hover:!bg-red-600 hover:!shadow-red-300 !rounded-[16px]">Confirm</Button>
        </div>
      </motion.div>
    </div>
  );
};