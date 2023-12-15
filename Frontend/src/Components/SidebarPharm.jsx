import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../Frontend/src/UI/Logo";
import axios from 'axios';

const SidebarPharm = () => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      let username = sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3001/getOnePharmacist", {
        params: { username }
      });
      setUserInfo(res.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="Bootstrap Patient">
      <div className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <a href="/Pharm"><Logo height='4rem' className="mt-6 mb-0" /></a>
            <button
              className="navbar-toggler ps-0"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon d-flex justify-content-start align-items-center">
                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div className="navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewMedPharm">
                    View Medicine
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/AddMedicine">
                    Add Medicine
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/EditMedicine">
                    Edit Medicine
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewSales">
                    Sales Report
                  </a>
                </li>
                <li className="nav-item">

                </li>
                <li className="nav-item dropdown group">
                  <a
                    className="nav-link dropdown-toggle flex items-center" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <span className="hidden md:inline">{sessionStorage.getItem("Username")}</span>
                  </a>
                  <div className="dropdown-menu absolute hidden group-hover:block" aria-labelledby="navbarDropdown">
                    <span className="nav-link" aria-current="page">Email: {userInfo.Email}</span>
                    <span className="nav-link" aria-current="page">Hourly rate: {userInfo.Hourlyrate}</span>
                    <span className="nav-link" aria-current="page">Affiliation: {userInfo.Affiliation}</span>
                    <span className="nav-link" aria-current="page">Education: {userInfo.Education}</span>
                    <span className="nav-link" aria-current="page">Wallet: {userInfo.WalletValue} points</span>
                    <div className="dropdown-divider"></div>
                    <a className="nav-link" aria-current="page" href="/changePassword">Change password</a>
                    <a className="nav-link" aria-current="page" href='/'
                      onClick={() => {
                        sessionStorage.removeItem("Username");
                        sessionStorage.removeItem("type");
                        sessionStorage.removeItem("token");
                      }}>Log Out</a>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <a className="nav-link px-2" href="#!">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-2" href="#!">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ps-2" href="#!">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarPharm;