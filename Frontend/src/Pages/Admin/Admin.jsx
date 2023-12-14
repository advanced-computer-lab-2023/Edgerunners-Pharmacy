import React from "react";
import Sidebar from "../../Components/SidebarAdmin";
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
      <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
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