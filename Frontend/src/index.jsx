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
import ViewOrders from './Pages/Patient/ViewOrders';
import AddDeliveryAddress from './Pages/Patient/AddDeliveryAddress';
import PaymentSuccess from './Pages/Patient/PaymentSuccess';
import PaymentCanceled from './Pages/Patient/PaymentCanceled';
import ResetPass from './Pages/Login/ResetPass';
import LoginPage from './Pages/Login/LoginPage';

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
        <Route path="/UseDocumentUpload" element={<UseDocumentUpload />} />
        <Route path="/UseImageUpload" element={<UseImageUpload />} />
        
        <Route path="/Patient" element={<Patient />} />
        <Route path="/ViewMedPatient" element={<ViewMedPatient />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ViewOrders" element={<ViewOrders />} />
        <Route path="/Address" element={<AddDeliveryAddress />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/PaymentCanceled" element={<PaymentCanceled />} />
        
        <Route path="/LoginAll" element={<LoginAll />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/AddPharmacist" element={<AddPharmacist />} />
        <Route path="/AddPatient" element={<AddPatient />} />
        <Route path="/ResetPass" element={<ResetPass />} />

        <Route path="/MedTableAllCopy" element={<MedTableAllCopy />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
