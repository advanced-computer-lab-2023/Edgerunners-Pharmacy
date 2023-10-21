import React from "react";
import Logo from "../../UI/Logo";
import './Pharm.scss'
import '../Bootstrap.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBedPulse,
  faUserDoctor,
  faFileCirclePlus,
  faPeopleGroup,
  faCalendarCheck,
  faStethoscope,
  faHandHoldingMedical,
  faPrescriptionBottleMedical,
  faSyringe,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

export default function Pharm() {
  return (
    <div className="Bootstrap Pharm">
      <div className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
          <a href="/"><Logo /></a>
            
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
            <div className="collapse navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#pets">
                    Video Call
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#adoptions">
                    Chat
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="#foundation"
                  >
                    My Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#help">
                    Health Record
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/Prescriptions">
                    Prescriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#about">
                    My Account
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#contact">
                    Log Out
                  </a>
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
        <div className="information-div">
          <div>
            <Logo className="logo" width={800} height={800} />
          </div>
          <div className="welcome-div">
            <h1>Welcome To</h1>
            <h1>
              <span className="clinic-name">El-7a2ny </span>Pharmacy
            </h1>
            <h3>Pharmacist Homepage</h3>
          </div>
        </div>
      </div>
      <div className="body">
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
      </div>
      <div className="footer">
        <div className="headers">
          <h3>Choose Our Any Services<br>
          </br>What You Need..<a href="https://www.youtube.com/watch?v=NlkYOKr2JXE&ab_channel=naz">.</a></h3>
        </div>
        <div className="footer-in row">
          {/* <div className="col-4">
            <FontAwesomeIcon
              icon={faPeopleGroup}
              size="4x"
              style={{ color: "#82d76a" }}
            />
             <a href = "http://localhost:5173/viewFamilyMem">
            <h3>Family</h3>
            </a>
            <p>
              add family members using name, National ID, age, gender and
              relation to the patient link another patient account as a family
              member
            </p>
          </div> */}
          <div className="col-4">
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              size="4x"
              style={{ color: "#82d76a" }}
              bounce
            />
             <a href = "/ViewMedPharm">
            <h3>Medicine</h3>
            </a>
            <p>View all available medicines</p>
          </div>
          <div className="col-4">
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="4x"
              style={{ color: "#82d76a" }}
              bounce
            />
            <h3>Archive/Unarchive Medicine</h3>
            <p>
              Choose medicine to archive/unarchive
            </p>
          </div>
          {/* <div className="col-4">
            <FontAwesomeIcon
              icon={faStethoscope}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <a href = "http://localhost:5173/Doctors">
            <h3>Our Doctors</h3>
            </a>
            <p>view a list of all doctors along with their speciality</p>
          </div> */}
          <div className="col-4">
            <FontAwesomeIcon
              icon={faPrescriptionBottleMedical}
              size="4x"
              style={{ color: "#82d76a" }}
              bounce
            />
            <h3>Clinic</h3>
            <p>Chat with a doctor</p>
          </div>
          <div className="col-4">
            <FontAwesomeIcon
              icon={faSyringe}
              size="4x"
              style={{ color: "#82d76a" }}
              bounce
            />
            <h3>Sales Report</h3>
            <p>View sales based on a chosen month</p>
          </div>
          <div className="col-4">
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              size="4x"
              style={{ color: "#82d76a" }}
              bounce
            />
            <a href = "/UseDocumentUpload">
            <h3>Upload/Remove Documents</h3>
            </a>
            <p>Upload/remove documents for my medical history</p>
          </div>
        </div>
      </div>
    </div>
  );
}