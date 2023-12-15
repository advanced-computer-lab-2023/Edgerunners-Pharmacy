import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../Frontend/src/UI/Logo";
import axios from "axios";

const SidebarPatient = () => {
  const [randomPointsInWallet, setRandomPointsInWallet] = useState(0);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getWalletValue();
    getUserInfo();
  }, []); // The empty dependency array ensures the effect runs only once

  const getWalletValue = async () => {
    try {
      let username = sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3001/getWallet", {
        params: { username }
      });
      console.log("Wallet data from the server:", res.data);
      setRandomPointsInWallet(res.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const getUserInfo = async () => {
    try {
      let username = sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3001/getOnePatient", {
        params: { username }
      });
      setUserInfo(res.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }
  return (
    <div className="Bootstrap Patient">
      <div className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <a href="/Patient"><Logo height='4rem' className="mt-6 mb-0" /></a>
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
                  <a className="nav-link" aria-current="page" href="/ViewMedPatient">
                    Medicine
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/Cart">
                    Cart
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewOrders">
                    Orders
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
                    <span className="nav-link" aria-current="page">Phone number: {userInfo.phoneNumber}</span>
                    <span className="nav-link" aria-current="page">Wallet: {randomPointsInWallet} points</span>
                    <div className="dropdown-divider"></div>
                    <span className="nav-link" aria-current="page" href="/Address">Add delivery address</span>
                    <span className="nav-link" aria-current="page" href="/changePassword">Change password</span>
                    <span className="nav-link" aria-current="page" href='/'
                      onClick={() => {
                        sessionStorage.removeItem("Username");
                        sessionStorage.removeItem("type");
                        sessionStorage.removeItem("token");
                      }}>Log Out</span>
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

export default SidebarPatient;