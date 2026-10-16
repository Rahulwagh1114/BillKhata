import './App.css'
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/LandingPage/Home/Home'
import Hero from './components/Dashboard/Hero';
import Invoice from './components/Dashboard/Invoice';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from './components/Dashboard/Customers';
import CustomerLedger from './components/Dashboard/CustomerLedger';
import Products from './components/Dashboard/Products';
import { MyContext } from './MyContext';
import { useState } from 'react';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("accessToken"));
  const providerValues={
    isLogin,setIsLogin
  }
  return (
    <BrowserRouter>
     <MyContext.Provider value={providerValues}>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route element={<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Hero />} />
          <Route path="invoices" element={<Invoice />} />
          <Route path="customers" element={<Customers/>}/>
          <Route path="customerLedger" element={<CustomerLedger/>}/>
          <Route path="products" element={<Products/>}/>
          </Route>
          
          {/* <Route path="customers/:id/ledger" element={<CustomerLedger />} /> */}
        </Route>
      </Routes>
       </MyContext.Provider>
    </BrowserRouter>
  )
}

export default App