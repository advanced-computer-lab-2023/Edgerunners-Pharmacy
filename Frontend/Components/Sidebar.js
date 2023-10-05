import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/Admin">
        Home
      </a>
      <a className="menu-item" href="/addAdmin">
        Add an administrator
      </a>
      <a className="menu-item" href="/viewPharmInfoAdmin">
        View pharmacists
      </a>
      <a className="menu-item" href="/viewPatientInfoAdmin">
        View patients
      </a>
      <a className="menu-item" href="/viewAppAdmin">
        View requests
      </a>
    </Menu>
  );
};