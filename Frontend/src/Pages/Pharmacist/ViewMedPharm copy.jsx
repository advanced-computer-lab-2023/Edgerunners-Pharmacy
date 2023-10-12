import React, { useState } from "react";
import Logo from "../../UI/Logo";
import GetMedicine from "../getMedicine";
import { Card } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export default function ViewMedPharmCopy() {
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

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/AddMedicine`; 
    navigate(path);
  }

  let navigate2 = useNavigate(); 
  const routeChange2 = () =>{ 
    let path2 = `/EditMedicine`; 
    navigate2(path2);
  }

  if (Medicine) {
    console.log(Medicine);
    return (
      <div className="-mt -20">
        <div className="justify-center flex mt-6 mb-4">
          <Logo />
        </div>
        <div className="form-prescription space-x-3 justify-center flex">
          <label htmlFor="">Name</label>
          <input
            className="text-sky-600  outline  w-40  h-9  rounded-md -mt-1.5 shadow -mb-4"
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="" htmlFor="">Description</label>
          <input
            className="text-sky-600  outline  w-40  h-9  rounded-md -mt-1.5 shadow -mb-4"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button className="  text-sky-600  outline  w-40  h-9  rounded-md -mt-1.5 shadow -mb-4" type="submit" onSubmit={handleSubmit}>
            submit
          </button>
          <div className="space-x-2">
            <button className="  text-sky-600  outline  w-40  h-9  rounded-md -mt-2 shadow -mb-4" onClick={routeChange}> Add medicine </button>
            <button className=" text-sky-600  outline  w-40  h-9  rounded-md -mt-2 shadow -mb-4" onClick={routeChange2}> Edit medicine </button>
          </div>
        </div>

        <div className="justify-center flex mt-20 space-x-6">
          {Medicine.map((p, index) => {
            return (
              <div className="mt-10 pb-10 w-3/12 h-[13rem] rounded-md shadow-md  bg-sky-50 justify-center space-y-4">
                <div key={index} className="justify-center">
                  <a>{p.Name}</a>
                  <br />
                  <a>{p.Price + "EGP"}</a>
                  <br />
                  <a>{p.Description}</a>
                  <br />
                  <a>{p.Quantity}</a>
                  <br />
                  <a>{p.Sales}</a>
                  <br />
                  <a>{p.Picture}</a>
                  <br />
                  <button className="justify-center text-sky-600  outline  w-40  h-9  rounded-md   mt-2 shadow">select</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
