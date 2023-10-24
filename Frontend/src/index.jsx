import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Admin from './Pages/Admin/Admin'
import AddAdmin from './Pages/Admin/AddAdmin';
import AddPharmacist from './Pages/Pharmacist/AddPharmacist';
import AddPatient from './Pages/Patient/AddPatient';
import ViewPharmInfoAdmin from './Pages/Admin/ViewPharmInfoAdmin';
import ViewPatientInfoAdmin from './Pages/Admin/ViewPatientInfoAdmin';
import ViewRequestsAdmin from './Pages/Admin/ViewRequestsAdmin';
import ViewMedAdmin from './Pages/Admin/ViewMedAdmin';
import ViewMedPatient from './Pages/Patient/ViewMedPatient';
import App from './App';
import AddMedicine from './Pages/Pharmacist/AddMedicine';
import EditMedicine from './Pages/Pharmacist/EditMedicine';
import ViewMedPharmCopy from './Pages/Pharmacist/ViewMedPharm copy';
import Patient from './Pages/Patient/Patient';
import Pharm from './Pages/Pharmacist/Pharm';
import MedTableAllCopy from './Components/MedTableAll copy';
import LoginAll from './Pages/Login/LoginAll';
import UseDocumentUpload from './Pages/Pharmacist/UseDocumentUpload';
import UseImageUpload from './Pages/Pharmacist/UseImageUpload';
import Cart from './Pages/Patient/Cart';

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

        <Route path="/Pharm" element={<Pharm />} />
        <Route path="/AddMedicine" element={<AddMedicine />} />
        <Route path="/EditMedicine" element={<EditMedicine />} />
        <Route path="/ViewMedPharm" element={<ViewMedPharmCopy />} />
        
        <Route path="/Patient" element={<Patient />} />
        <Route path="/ViewMedPatient" element={<ViewMedPatient />} />
        <Route path="/Cart" element={<Cart />} />
        
        <Route path="/LoginAll" element={<LoginAll />} />
        <Route path="/AddPharmacist" element={<AddPharmacist />} />
        <Route path="/AddPatient" element={<AddPatient />} />

        <Route path="/MedTableAllCopy" element={<MedTableAllCopy />} />
        <Route path="/UseDocumentUpload" element={<UseDocumentUpload />} />
        <Route path="/UseImageUpload" element={<UseImageUpload />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
