import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Admin from './Pages/Admin/Admin'
import AddAdmin from './Pages/Admin/AddAdmin';
import AddPharmacist from './Pages/Pharmacist/AddPharmacist';
import AddPatient from './Pages/Patient/AddPatient';
import ViewAdminInfoAdmin from './Pages/Admin/ViewAdminInfoAdmin';
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
import LoginAll from './Pages/Login/LoginAll';
import Cart from './Pages/Patient/Cart';
import ViewOrders from './Pages/Patient/ViewOrders';
import AddDeliveryAddress from './Pages/Patient/AddDeliveryAddress';
import PaymentSuccess from './Pages/Patient/PaymentSuccess';
import PaymentCashSuccess from './Pages/Patient/PaymentCashSuccess';
import PaymentCanceled from './Pages/Patient/PaymentCanceled';
import ResetPass from './Pages/Login/ResetPass';
import LoginPage from './Pages/Login/LoginPage';
import ChangePassword from './Pages/Login/ChangePassword';
import Login from './Pages/Login/Login';
import AddEmail from './Pages/Admin/AddEmail';
import ViewSales from './Pages/Pharmacist/ViewSales';
import ViewSalesAdmin from './Pages/Admin/ViewSalesAdmin';
import ViewMedPrescription from './Pages/Patient/ViewMedPrescription';
import Alternatives from './Pages/Patient/Alternatives';

const root = ReactDOM.createRoot(document.getElementById('root'));

// user hasn't logged in yet or is a pending pharmacist so won't access anything except login, reset password, and register pages.
if(sessionStorage.getItem("type") === null || sessionStorage.getItem("type") === "PendingPharmacist") {
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/LoginAll" element={<LoginAll />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/AddPharmacist" element={<AddPharmacist />} />
        <Route path="/AddPatient" element={<AddPatient />} />
        <Route path="/ResetPass" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// if he is an admin a set of routes is only available for him meaning he can't access pharmacists' or patients' routes even if he know the url
} else if(sessionStorage.getItem("type") === "Admin") {
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />
        <Route path="/AddEmail" element={<AddEmail />} />
        <Route path="/ViewAdminInfoAdmin" element={<ViewAdminInfoAdmin />} />
        <Route path="/ViewPharmInfoAdmin" element={<ViewPharmInfoAdmin />} />
        <Route path="/ViewPatientInfoAdmin" element={<ViewPatientInfoAdmin />} />
        <Route path="/ViewRequestsAdmin" element={<ViewRequestsAdmin />} />
        <Route path="/ViewMedAdmin" element={<ViewMedAdmin />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/ViewSalesAdmin" element={<ViewSalesAdmin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// if he is a pharmacist a set of routes is only available for him meaning he can't access patients' or admins' routes even if he know the url
} else if(sessionStorage.getItem("type") === "Pharmacist") {
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Pharm" element={<Pharm />} />
        <Route path="/AddMedicine" element={<AddMedicine />} />
        <Route path="/EditMedicine" element={<EditMedicine />} />
        <Route path="/ViewMedPharm" element={<ViewMedPharmCopy />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/ViewSales" element={<ViewSales />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// if he is a patient a set of routes is only available for him meaning he can't access pharmacists' or admins' routes even if he know the url
} if(sessionStorage.getItem("type") === "Patient") {
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Patient" element={<Patient />} />
        <Route path="/ViewMedPatient" element={<ViewMedPatient />} />
        <Route path="/ViewMedPrescriptions" element={<ViewMedPrescription />} />
        <Route path="/Alternatives" element={<Alternatives />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ViewOrders" element={<ViewOrders />} />
        <Route path="/Address" element={<AddDeliveryAddress />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/PaymentCanceled" element={<PaymentCanceled />} Component={PaymentCanceled} />
        <Route path="/PaymentCashSuccess" element={<PaymentCashSuccess />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
}
