import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../Frontend/src/UI/Logo";

const Sidebar = () => {
  return (
    <div className="Bootstrap Patient">
      <div className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <a href="/Admin"><Logo /></a>
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
                  <a className="nav-link" aria-current="page" href="/ViewAdminInfoAdmin">
                    Admins
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewPharmInfoAdmin">
                    Pharmacists
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewPatientInfoAdmin">
                    Patients
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewRequestsAdmin">
                    Requests
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewMedAdmin">
                    Medicine
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
                    <span className="hidden md:inline"></span> {/* Displayed on larger screens */}
                  </a>
                  <div className="dropdown-menu absolute hidden group-hover:block" aria-labelledby="navbarDropdown">
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

export default Sidebar;