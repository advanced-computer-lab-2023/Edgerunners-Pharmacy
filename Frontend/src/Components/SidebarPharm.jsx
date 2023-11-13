import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

const SidebarPharm = () => {
  return (
    <Menu>
      <a className="menu-item" href="/Pharm">
        Home
      </a>
      <a className="menu-item" href="/ViewMedPharm">
        View medicines
      </a>
      <a className="menu-item" href="/changePassword">
        Change my password
      </a>
      <a className="menu-item" href="/"
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

export default SidebarPharm;