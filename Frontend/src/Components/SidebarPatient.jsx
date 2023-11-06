import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

const SidebarPatient = () => {
  return (
    <Menu>
      <a className="menu-item" href="/Patient">
        Home
      </a>
      <a className="menu-item" href="/ViewMedPatient">
        View medicines
      </a>
      <a className="menu-item" href="/Cart">
        View cart
      </a>
      <a className="menu-item" href="/ViewOrders">
        View orders
      </a>
      {/* add href */}
      <a className="menu-item">
        Add delivery address
      </a>
      <a className="menu-item">
        Change my password
      </a>
      <a className="menu-item">
        Logout
      </a>
      
    </Menu>
  );
};

export default SidebarPatient;