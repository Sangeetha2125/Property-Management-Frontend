
import Signup from './pages/Signup';
import LogIn from './pages/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import Owner from './pages/OwnerProperties';
import axios from 'axios';
import {Hero}  from './components/landing/landing page';
import Tenant from './pages/TenantListing';
export default function App(){
  
  axios.defaults.headers.common['Authorization'] = "Bearer " +localStorage.getItem('token')
  return(
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='' element={<Hero/>}/>
      <Route path="/signup" element={<Signup/>}/>
  	  <Route path="/login" element={<LogIn/>}/>
  	  <Route path="/owner" element={<Owner/>}/>
      
  	  <Route path="/tenant" element={<Tenant/>}/>
     </Routes>
     </BrowserRouter>
   </div>
  )
}