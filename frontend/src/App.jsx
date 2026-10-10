import './App.css'
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/LandingPage/Home/Home'
import Hero from './components/Dashboard/Hero';
import Invoice from './components/Dashboard/Invoice';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from './components/Dashboard/Customers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Hero />} />
          <Route path="invoices" element={<Invoice />} />
          <Route path="customers" element={<Customers/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App