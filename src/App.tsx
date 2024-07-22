

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import axios from 'axios';
import { Hero } from './pages/LandingPage';
import UnitPage from './pages/units/UnitPage';
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import PropertyPage from "./pages/properties/PropertyPage";
import UnitType from "./components/units/UnitType";
import { Toaster } from "sonner";
import RequestPage from "./pages/requests/RequestPage";
export default function App() {

  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
  return (
    <div className="App">
      <BrowserRouter>
      <Toaster richColors visibleToasts={2}/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/properties/:id/units" element={<UnitPage />} />
          <Route path="/properties/:propertyId/units/:unitId" element={<UnitType/>} />
          <Route path="/requests/:unitId" element={<RequestPage/>} />
        </Routes>
      </BrowserRouter>  
      
    </div>
  )
}