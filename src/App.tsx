

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import UnitPage from './pages/units/UnitPage';
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import PropertyPage from "./pages/properties/PropertyPage";
import UnitType from "./pages/units/UnitType";
import { Toaster } from "sonner";
import RequestPage from "./pages/requests/RequestPage";
import OwnerDashboard from "./pages/owner dashboard/OwnerDashboard";
import AgreementPage from "./pages/agreements/AgreementPage";
import ProfilePage from "./pages/shared/Profile";
import { Hero } from "./pages/shared/LandingPage";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster richColors visibleToasts={2} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/properties/:id/units" element={<UnitPage />} />
          <Route path="/properties/:propertyId/units/:unitId" element={<UnitType />} />
          <Route path="/requests" element={<RequestPage />} />
          <Route path='/agreements' element={<AgreementPage/>}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<OwnerDashboard/>} />
        </Routes>
      </BrowserRouter>
    </div> 
  ) 
}