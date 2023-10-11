import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Menu>
      <a className="menu-item" href="/Admin">
        Home
      </a>
      <a className="menu-item" href="/AddAdmin">
        Add an administrator
      </a>
      <a className="menu-item" href="/ViewPharmInfoAdmin">
        View pharmacists
      </a>
      <a className="menu-item" href="/ViewPatientInfoAdmin">
        View patients
      </a>
      <a className="menu-item" href="/ViewRequestsAdmin">
        View requests
      </a>
    </Menu>
  );
};

export default Sidebar;