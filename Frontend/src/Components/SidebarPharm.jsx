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
      <a className="menu-item">
        Change my password
      </a>
      <a className="menu-item">
        onClick={() => {
          sessionStorage.removeItem("Username");
          sessionStorage.removeItem("type");
          sessionStorage.removeItem("token");
          window.location.replace("/");
        }}
        Logout
      </a>
    </Menu>
  );
};

export default SidebarPharm;