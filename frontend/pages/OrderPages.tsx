import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Package, Calendar, Clock, MapPin, CreditCard, Bell, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageHeader } from '../components/UIComponents';
import { motion } from 'framer-motion';

export const OrdersList: React.FC = () => {
  const { orders } = useStore();
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const filteredOrders = filterDate 
    ? orders.filter(o => o.date === filterDate)
    : orders;

  const handleContainerClick = (e: React.MouseEvent) => {
    // Prevent triggering picker when clicking the clear button
    if ((e.target as HTMLElement).closest('button')) return;

    const input = dateInputRef.current;
    if (input) {
      // Use showPicker() to programmatically open the date dropdown
      if ('showPicker' in (input as any)) {
        try {
          (input as any).showPicker();
        } catch (err) {
          // Fallback if showPicker fails
          input.focus();
        }
      } else {
        input.focus();
        // For older browsers, sometimes clicking programmatically helps
        input.click(); 
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFilterDate('');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24 md:pb-10">
      <div className="hidden md:block pt-6 px-6">
        <h1 className="text-3xl font-bold text-dark mb-6">Your Orders</h1>
      </div>
      <div className="md:hidden">
         <PageHeader title="Your Orders" />
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-0 mt-4 md:mt-0">
        {/* Date Filter */}
        <div 
            onClick={handleContainerClick}
            className="bg-white rounded-[20px] p-4 mb-6 shadow-sm flex items-center justify-between gap-4 cursor-pointer hover:bg-white/80 transition-colors relative"
        >
           <div className="flex-1 min-w-0">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1 pointer-events-none">Filter By Date</label>
             <input 
               ref={dateInputRef}
               type="date" 
               className="w-full text-dark font-medium bg-transparent outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
               value={filterDate}
               onChange={handleDateChange}
             />
           </div>
           
           {filterDate ? (
             <button 
               onClick={clearDate} 
               className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
             >
               <X size={16} className="text-gray-500" />
             </button>
           ) : (
             <div className="bg-gray-50 p-2 rounded-full pointer-events-none">
               <Calendar size={20} className="text-gray-500" />
             </div>
           )}
        </div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
               <Package size={48} className="mx-auto mb-4 opacity-20" />
               <p>No orders found.</p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform group"
              >
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-dark">
                         <Package size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-bold text-dark text-lg leading-none mb-1">{order.id}</h3>
                        <p className="text-gray-400 text-sm font-medium">{order.displayDate}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="font-bold text-xl text-primary block">₹{order.total.toFixed(2)}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100">
                   <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-500' :
                        order.status === 'Cancelled' ? 'bg-red-500' :
                        'bg-orange-500'
                      }`}></div>
                      <span className={`font-semibold text-sm ${
                        order.status === 'Delivered' ? 'text-green-600' :
                        order.status === 'Cancelled' ? 'text-red-600' :
                        'text-orange-600'
                      }`}>{order.status}</span>
                   </div>
                   <div className="flex items-center text-gray-400 font-medium text-sm group-hover:text-primary transition-colors">
                      View Details <ChevronRight size={16} className="ml-1" />
                   </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find(o => o.id === id);

  if (!order) return <div className="p-10 text-center">Order not found</div>;

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24 md:pb-10">
      <div className="md:hidden">
         <PageHeader title="Order Details" />
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-0 pt-4 md:pt-10">
         <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
            {/* Header */}
            <div className="bg-gray-50/50 p-6 border-b border-gray-100">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-dark mb-1">Order #{order.id}</h1>
                    <p className="text-gray-500 font-medium">{order.displayDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-orange-50 text-orange-600 border-orange-100'
                  }`}>
                    {order.status}
                  </span>
               </div>
               
               <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                     <Clock size={14} /> 45 mins delivery
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                     <CreditCard size={14} /> Visa **** 4242
                  </div>
               </div>
            </div>

            {/* Items */}
            <div className="p-6">
               <h3 className="font-bold text-dark text-lg mb-4">Items ({order.items.length})</h3>
               <div className="space-y-4 mb-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-2">
                       <div className="w-16 h-16 bg-[#F8F9FA] rounded-xl p-2 flex items-center justify-center">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                       </div>
                       <div className="flex-1">
                          <h4 className="font-bold text-dark text-base">{item.name}</h4>
                          <p className="text-gray-400 text-xs font-medium">{item.unit}</p>
                       </div>
                       <div className="text-right">
                          <p className="font-bold text-dark">₹{item.price.toFixed(2)}</p>
                          <p className="text-gray-400 text-xs font-medium">Qty: {item.quantity}</p>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm font-medium text-gray-500">
                     <span>Subtotal</span>
                     <span>₹{order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-500">
                     <span>Delivery</span>
                     <span>Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-dark pt-2">
                     <span>Total</span>
                     <span className="text-primary">₹{order.total.toFixed(2)}</span>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="mt-6 text-center">
            <button className="text-primary font-bold text-sm hover:underline">Download Invoice</button>
         </div>
      </div>
    </div>
  );
};

export const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead } = useStore();

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24 md:pb-10">
       <div className="hidden md:block pt-6 px-6">
          <h1 className="text-3xl font-bold text-dark mb-6">Notifications</h1>
       </div>
       <div className="md:hidden">
          <PageHeader title="Notifications" />
       </div>

       <div className="max-w-2xl mx-auto px-5 md:px-0 mt-4 md:mt-0 space-y-3">
          {notifications.map((note) => (
             <motion.div 
               key={note.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className={`p-4 rounded-[24px] flex gap-4 ${note.read ? 'bg-white' : 'bg-green-50 border border-green-100'}`}
               onClick={() => markNotificationAsRead(note.id)}
             >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${note.type === 'order' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                   {note.type === 'order' ? <Package size={20} /> : <Bell size={20} />}
                </div>
                <div className="flex-1">
                   <h3 className={`font-bold text-base mb-1 ${note.read ? 'text-dark' : 'text-primary'}`}>{note.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed mb-2">{note.message}</p>
                   <span className="text-xs text-gray-400 font-medium">{new Date(note.date).toLocaleString()}</span>
                </div>
                {!note.read && (
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                )}
             </motion.div>
          ))}
          {notifications.length === 0 && (
             <div className="text-center py-20 text-gray-400">
                <Bell size={48} className="mx-auto mb-4 opacity-20" />
                <p>No new notifications</p>
             </div>
          )}
       </div>
    </div>
  );
};
