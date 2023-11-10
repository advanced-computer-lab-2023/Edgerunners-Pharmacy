import React, { useState, useEffect } from "react";
import Logo from "../UI/Logo";
import GetMedicine from "../Pages/getMedicine";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Card } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function MedTableAllCopy() {
  const [name, setName] = useState();
  const [medicinaluse, setMedicinalUse] = useState();
  const [forceEffect, setForceEffect] = useState(false);

  let Medicine = GetMedicine({
    Name: name,
    MedicinalUse: medicinaluse,
  });
  const handleSubmit = async (e) => {
    e.preventDefaut();
    Medicine = await GetMedicine({
      Name: name,
      MedicinalUse: medicinaluse,
    });
  };

  const handleaddcart = async (name, price) => {
    try {
      axios.put("http://localhost:3001/updatePatient", {
        medicinename: name,
        quantity: 1,
        price: price,
        username: sessionStorage.getItem("Username"), // Replace with the actual username
      });
      console.log("Update request sent successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };



  if (Medicine) {
    console.log(Medicine);
    return (
      <div className="">
        <div className="form-prescription space-x-3 justify-center flex -mt-4 -mb-16">
          <label className="-mb-4 -mt-60">Name</label>
          <input
            className="text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4"
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="-mb-4 -mt-60">Medicinal Use</label>
          <input
            className="text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4"
            type="text"
            onChange={(e) => {
              setMedicinalUse(e.target.value);
            }}
          />
          <button className="  text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4" type="submit" onSubmit={handleSubmit}>
            Submit
          </button>
        </div>

        <div className="grid grid-cols-4 flex -mt-44 ml-20 pb-10">
          {Medicine.map((p, index) => {
            return (
              <div key={index} className="mt-10 mb-2 pb-2 w-[20rem] h-[16rem] rounded-md shadow-md  bg-sky-50 justify-center space-y-4">
                <div className="justify-center pl-4 mt-6">
                  {p.Picture ? (
                    <img src={p.Picture} alt={p.Name} className="w-20 h-20" />
                  ) : (<div className="rounded-md shadow-md w-20 h-20 bg-gray-300"><br></br>no image</div>)}
                  <br />
                  <div className="-mt-24 ml-24 mb-4">
                    <h3 className="text-3xl font-bold"><a >{p.Name}</a></h3>
                    <br />
                    <div className="-mt-6">
                      <label className="font-bold">EGP </label><label><a >{p.Price}</a></label>
                      <br />
                      <label className="text-gray-500"><a >{p.Description}</a></label>
                      <br />
                      <label className="text-gray-500">Use: </label><label className="text-gray-500"><a >{p.MedicinalUse}</a></label>
                      <br />
                    </div>
                  </div>
                  <div className="space-x-3 mt-11">
                    <button className="justify-end text-sky-600 outline w-72 h-9 rounded-md mb-2 mt-0.5 " onClick={() => handleaddcart(p.Name, p.Price)}>
                      <FontAwesomeIcon icon={faCartPlus} size="1x" color="sky-600" /> Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}