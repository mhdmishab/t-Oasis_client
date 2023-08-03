import React from 'react';
import UserRouter from './routes/UserRouter';
import VendorRouter from './routes/VendorRouter';
import AdminRouter from './routes/AdminRouter';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
    <div className="max-w-screen-4xl mx-auto">
    <BrowserRouter>
      <Routes>
          <Route path='/*'  element={<UserRouter/>}/>
          <Route path='/manager/*'  element={<VendorRouter/>}/>
          <Route path='/admin/*'  element={<AdminRouter/>}/>
      </Routes>
    </BrowserRouter>
    
      
      <ToastContainer position="bottom-right" />
      
      </div>
    </>
  );
}
            
          

export default App;
