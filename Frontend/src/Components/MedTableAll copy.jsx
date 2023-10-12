import React, { useState } from "react";
import Logo from "../UI/Logo";
import GetMedicine from "../Pages/getMedicine";

export default function MedTableAllCopy() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  let Medicine = GetMedicine({
    Name: name,
    Description: description,
  });
  const handleSubmit = async (e) => {
    e.preventDefaut();
    Medicine = await GetMedicine({
      Name: name,
      Description: description,
    });
  };

  if (Medicine) {
    console.log(Medicine);
    return (
      <div className="Bootstrap PatientHome">
        <div className="header">
          <div className="justify-center flex -mt-8 ">
            <Logo />
          </div>
          <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg ">
            <div className="container justify-center flex mt-20 ">
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
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="#adoptions"
                    >
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
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="#education"
                    >
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
        </div>
        <div className="form-prescription">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="">Description</label>
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button type="submit" onSubmit={handleSubmit}>
            submit
          </button>
        </div>
        <div>
          {Medicine.map((p, index) => {
            return (
              <div key={index}>
                <a>{p.Name}</a>
                <br />
                <a>{p.Price + "EGP"}</a>
                <br />
                <a>{p.Description}</a>
                <br />
                <a>{p.Picture}</a>
                <br />
                <button>select</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
