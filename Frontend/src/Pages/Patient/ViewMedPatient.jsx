import React, { useState } from "react";
import Logo from "../../UI/Logo";
import GetMedicine from "../getMedicine";
import { Card } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export default function ViewMedPatient() {
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
      <div className="">
        <div className="justify-center flex mt-6 mb-4">
          <Logo />
        </div>
        <div className="form-prescription space-x-3 justify-center flex -mb-16">
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
          <label className="-mb-4 -mt-60">Description</label>
          <input
            className="text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button className="  text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4" type="submit" onSubmit={handleSubmit}>
            submit
          </button>
        </div>

        <div className="justify-center flex -mt-40 space-x-6">
          {Medicine.map((p, index) => {
            return (
              <div className="mt-10 mb-2 pb-2 w-3/12 h-[13.5rem] rounded-md shadow-md  bg-sky-50 justify-center space-y-4">
                <div key={index} className="justify-center pl-4 mt-2">
                  <a >{p.Name}</a>
                  <br />
                  <a >{p.Price + "EGP"}</a>
                  <br />
                  <a >{p.Description}</a>
                  <br />
                  <a >{p.Quantity}</a>
                  <br />
                  <a >{p.Sales}</a>
                  <br />
                  <a >{p.Picture}</a>
                  <br />
                  <button className="justify-end text-sky-600  outline  w-40  h-9  rounded-md mb-2 mt-2 shadow">select</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
