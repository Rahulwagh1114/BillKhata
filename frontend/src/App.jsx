import './App.css'
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/LandingPage/Home/Home'
import { BrowserRouter, Routes,Route } from "react-router-dom";

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/dashboard" element={ <Dashboard/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
