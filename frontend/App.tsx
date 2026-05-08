import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { TopNav, MobileNav } from './components/BottomNav';
import { Home, Explore, Account } from './pages/MainPages';
import { ProductDetails, CategoryView } from './pages/ProductPages';
import { Cart, OrderSuccess, OrderFailed } from './pages/CartFlow';
import { OrdersList, OrderDetails, Notifications } from './pages/OrderPages';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide MobileNav on these routes for mobile
  const hideMobileNav = ['/checkout', '/success', '/failed', '/orders/', '/notifications'];
  const shouldHideMobileNav = hideMobileNav.some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 text-dark font-sans flex flex-col">
      <TopNav />
      {!shouldHideMobileNav && <MobileNav />}
      
      <div className="flex-1 w-full max-w-[1920px] mx-auto bg-white shadow-sm md:my-6 md:rounded-3xl md:max-w-7xl md:px-8 md:min-h-[80vh]">
        <div className="h-full pb-20 md:pb-0">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:id" element={<CategoryView />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/failed" element={<OrderFailed />} />
          </Routes>
        </Layout>
      </Router>
    </StoreProvider>
  );
};

export default App;
