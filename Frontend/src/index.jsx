import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Admin from './Pages/Admin/Admin'
import AddAdmin from './Pages/Admin/AddAdmin';
import ViewPharmInfoAdmin from './Pages/Admin/ViewPharmInfoAdmin';
import ViewPatientInfoAdmin from './Pages/Admin/ViewPatientInfoAdmin';
import ViewRequestsAdmin from './Pages/Admin/ViewRequestsAdmin';
import ViewMedAdmin from './Pages/Admin/ViewMedAdmin';
import App from './App';
import AddMedicine from './Pages/Pharmacist/AddMedicine';
import EditMedicine from './Pages/Pharmacist/EditMedicine';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />
        <Route path="/ViewPharmInfoAdmin" element={<ViewPharmInfoAdmin />} />
        <Route path="/ViewPatientInfoAdmin" element={<ViewPatientInfoAdmin />} />
        <Route path="/ViewRequestsAdmin" element={<ViewRequestsAdmin />} />
        <Route path="/ViewMedAdmin" element={<ViewMedAdmin />} />
        <Route path="/AddMedicine" element={<AddMedicine />} />
        <Route path="/EditMedicine" element={<EditMedicine />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
