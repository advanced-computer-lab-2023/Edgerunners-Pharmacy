import React from "react";
import Logo from "../../UI/Logo";
import './Admin.scss'
import '../Bootstrap.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBedPulse,
  faUserDoctor,
  faFileCirclePlus,
  faHandHoldingMedical,
  faUserInjured,
  faUserPlus,
  faUser,
  faSyringe
} from "@fortawesome/free-solid-svg-icons";

export default function Admin() {
  return (
    <div className="Bootstrap Admin">
      <div className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <a href="/"
              onClick={() => {
                sessionStorage.removeItem("Username");
                sessionStorage.removeItem("type");
                sessionStorage.removeItem("token");
              }}><Logo /></a>

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
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/ViewSalesAdmin">
                    Sales Report
                  </a>
                </li>
                <li className="nav-item dropdown group">
                  <a
                    className="nav-link dropdown-toggle flex items-center" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <span className="hidden md:inline"></span> {/* Displayed on larger screens */}
                    <a>{sessionStorage.getItem("Username")}</a>
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
        {/* <div className="information-div">
          <div>
            <Logo className="logo" width={800} height={800} />
          </div>
          <div className="welcome-div">
            <h1>Welcome To</h1>
            <h1>
              <span className="clinic-name">El-7a2ny </span>Pharmacy
            </h1>
            <h3>Admin Homepage</h3>
          </div>
        </div> */}
      </div>
      {/* <div className="body">
        <div className="description first">
          <FontAwesomeIcon
            className="icon"
            icon={faBedPulse}
            size="5x"
            style={{ color: "#1860dc" }}
          />
          <p>
            <br></br>
            El7a2ny is a software solution for clinics, doctors, pharmacists and
            patients alike to streamline and automate the interactions between
            patients, medical doctors and pharmacists
          </p>
        </div>
        <div className="description second">
          <FontAwesomeIcon
            className="icon"
            icon={faUserDoctor}
            size="5x"
            style={{ color: "#1860dc" }}
          />
          <p>
            <br></br>
            El7a2ny is a comprehensive healthcare platform that simplifies your healthcare journey.
            Our platform offers a wide range of services, allowing patients to view available medicines,
            place orders, and engage in direct chat consultations with experienced doctors and pharmacists.
            Whether you're seeking medication, professional medical advice, or seamless prescription fulfillment,
            our virtual pharmacy provides an all-in-one solution.
            Experience a seamless healthcare experience that puts you in control of your wellness journey
          </p>
        </div>
      </div> */}
      <div className="footer mt-20">
        <div className="headers">
          <h3>Choose one of our services
            {/* <br></br>What You Need..<a href="https://www.youtube.com/watch?v=NlkYOKr2JXE&ab_channel=naz">.</a> */}
          </h3>
        </div>
        <div className="footer-in row">
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faUser}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewAdminInfoAdmin" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Admins
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View all admins</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faUserDoctor}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewPharmInfoAdmin" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Pharmacists
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View all pharmacists</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faUserInjured}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewPatientInfoAdmin" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Patients
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View all patients</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewRequestsAdmin" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Requests
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View all pharmacists' requests</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewMedAdmin" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Medicine
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View all available medicines</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faSyringe}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewSalesAdmin" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Sales Report
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View sales based on a chosen month</p>
          </div>
        </div>
      </div>
    </div>
  );
}