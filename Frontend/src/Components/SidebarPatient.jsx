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
      <a className="menu-item" href="/Address">
        Add delivery address
      </a>
      <a className="menu-item" href="/changePassword">
        Change my password
      </a>
      <a className="menu-item" href='/'
        onClick={() => {
          sessionStorage.removeItem("Username");
          sessionStorage.removeItem("type");
          sessionStorage.removeItem("token");
          
        }}
      >
        Logout
      </a>
    </Menu>
  );
};

export default SidebarPatient;