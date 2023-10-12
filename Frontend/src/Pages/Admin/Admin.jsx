import React from "react";
import Logo from "../../UI/Logo";
import "./Admin.scss";
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
} from "@fortawesome/free-solid-svg-icons";

function Admin() {
  return (
    <div className="Bootstrap Admin">
      <div className="header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <Logo />
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
              <span className="clinic-name">El-7a2ny </span>Medical Clinic
            </h1>
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
          <h3>Header 1</h3>
          <p>
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
          <h3>Header 2</h3>
          <p>
            El7a2ny encompasses everything from trying to find a doctor,
            scheduling meetings with doctors, conducting on-premise or online
            meetings, getting prescriptions, getting reminders for follow-ups,
            accessing medical history, and ordering medication that was
            prescribed
          </p>
        </div>
      </div>
      <div className="footer">
        <div className="headers">
          <h3>Choose Our Any Services</h3>
          <h3>What You Need..</h3>
        </div>
        <div className="footer-in row">
          <div className="col-4">
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Upload/Remove Documents</h3>
            <p>upload/remove documents for my medical history</p>
          </div>

          <div className="col-4">
            <FontAwesomeIcon
              icon={faPeopleGroup}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Family</h3>
            <p>
              add family members using name, National ID, age, gender and
              relation to the patient link another patient account as a family
              member
            </p>
          </div>
          <div className="col-4">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Make Appointment</h3>
            <p>
              select an appointment date and time for myself or for a family
              member
            </p>
          </div>
          <div className="col-4">
            <FontAwesomeIcon
              icon={faStethoscope}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Our Doctors</h3>
            <p>view a list of all doctors along with their speciality</p>
          </div>
          <div className="col-4">
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Health Packages</h3>
            <p>view all details of selected doctor including specilaty</p>
          </div>
          <div className="col-4">
            <FontAwesomeIcon
              icon={faPrescriptionBottleMedical}
              size="4x"
              style={{ color: "#82d76a" }}
            />
            <h3>Pharmacy</h3>
            <p>view the available quantity, and sales of each medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;