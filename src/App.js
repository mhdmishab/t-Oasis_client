import React from 'react';
import UserRouter from './routes/UserRouter';
import VendorRouter from './routes/VendorRouter';
import AdminRouter from './routes/AdminRouter';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UserRouter/>
      <VendorRouter/>
      <AdminRouter/>
      <ToastContainer position="bottom-right" />
      

    </>
  );
}
            
          

export default App;
