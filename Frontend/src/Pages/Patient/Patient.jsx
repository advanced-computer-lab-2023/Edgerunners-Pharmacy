import React, { useState, useEffect } from "react";
import Logo from "../../UI/Logo";
import './Patient.scss'
import '../Bootstrap.scss'
import { Input } from "postcss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBedPulse,
  faUserDoctor,
  faFileCirclePlus,
  faHandHoldingMedical,
  faPrescriptionBottleMedical,
  faCartShopping,
  faSyringe,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Patient() {
  const [randomPointsInWallet, setRandomPointsInWallet] = useState(0);

  useEffect(() => {
    getWalletValue();
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
  return (
    <div className="Bootstrap Patient">
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
                  <a className="nav-link" aria-current="page" href="/Address">
                    Add delivery address
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
                    <a>{sessionStorage.getItem("Username")}</a>
                  </a>
                  <div className="dropdown-menu absolute hidden group-hover:block" aria-labelledby="navbarDropdown">
                    <a className="nav-link" aria-current="page">Wallet: {randomPointsInWallet} points</a>
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
        {/* <div className="information-div">
          <div>
            <Logo className="logo" width={800} height={800} />
          </div>
          <div className="welcome-div">
            <h1>Welcome To</h1>
            <h1>
              <span className="clinic-name">El-7a2ny </span>Pharmacy
            </h1>
            <h3>Patient Homepage</h3>
          </div>
        </div> */}
      </div>
      {/* <div className="body mt-4">
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
          <h3>Choose one of our services</h3>
        </div>
        <div className="footer-in row">
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewMedPatient" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Medicine
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View all available medicines</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faCartShopping}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/Cart" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>Cart</h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View all the medicines added to your cart</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faPrescriptionBottleMedical}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="ViewOrders" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>Orders</h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View past/current orders' details</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/Address" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>Delivery address</h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>Add a new delivery address</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faSyringe}
              size="4x"
              style={{ color: "#93AFDA" }}
            />
            <a href="https://www.youtube.com/watch?v=7Sq6ookE6nA&t=10s&ab_channel=Achilles" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>Pharmacy</h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>Chat with a pharmacist</p>
          </div>
        </div>
      </div>
    </div>
  );
}