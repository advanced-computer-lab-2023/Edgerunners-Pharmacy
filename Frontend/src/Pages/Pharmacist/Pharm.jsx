import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SidebarPharm";
import './Pharm.scss'
import '../Bootstrap.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {
  faBedPulse,
  faUserDoctor,
  faFileCirclePlus,
  faHandHoldingMedical,
  faPrescriptionBottleMedical,
  faSyringe,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Pharm() {
  const [randomPointsInWallet, setRandomPointsInWallet] = useState(0);
  useEffect(() => {
    getWalletValue();
  }, []); // The empty dependency array ensures the effect runs only once

  const getWalletValue = async () => {
    try {
      let username = sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3001/getWalletPharm", {
        params: { username }
      });
      console.log("Wallet data from the server:", res.data);
      setRandomPointsInWallet(res.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="Bootstrap Pharm">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="footer mt-20">
        <div className="headers">
          <h3>Choose one of our services
            {/* <br></br>What You Need..<a href="https://www.youtube.com/watch?v=NlkYOKr2JXE&ab_channel=naz">.</a> */}
          </h3>
        </div>
        <div className="footer-in row">
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewMedPharm" style={{ textDecoration: "none" }}>
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
            <a href="/ViewSales" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Sales Report
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View sales based on a chosen month</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faPrescriptionBottleMedical}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Clinic
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>Chat with a doctor</p>
          </div>
        </div>
      </div>
    </div>
  );
}