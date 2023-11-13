import React, { useState } from "react";
import Logo from "../../UI/Logo";
import GetMedicine from "../getMedicine";
import { Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SidebarAdmin";

export default function ViewMedAdmin() {
  const [name, setName] = useState();
  const [medicinaluse, setMedicinalUse] = useState();
  let Medicine = GetMedicine({
    Name: name,
    MedicinalUse: medicinaluse,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    Medicine = await GetMedicine({
      Name: name,
      MedicinalUse: medicinaluse,
    });
  };

  if (Medicine) {
    console.log("Medicine:", Medicine);

    return (
      <div className="">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="justify-center flex mt-6 mb-4" href="/Admin">
          <a href="/Admin">
            <Logo />
          </a>
        </div>
        <div >
          <div className="form-prescription space-x-3 justify-center flex -mb-16 ">
            <label className="-mt-60">Name</label>
            <input
              className="text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4"
              type="text"
              name=""
              id=""
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className="-mt-60">Medicinal Use</label>
            <input
              className="text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4"
              type="text"
              onChange={(e) => {
                setMedicinalUse(e.target.value);
              }}
            />
            <button
              className="  text-sky-600  outline  w-40  h-9  rounded-md -mt-60 shadow -mb-4"
              type="submit"
              onSubmit={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 flex -mt-40 ml-20 pb-10">
          {Medicine.map((p, index) => {
            return (
              <div key={index} className="mt-10 mb-2 pb-2 w-[20rem] h-[16rem] rounded-md shadow-md  bg-sky-50 justify-center space-y-4">
                <div className="justify-center pl-4 mt-6">
                  {p.Picture ? (
                    <img
                      src={
                        p.Picture.startsWith("http")
                          ? p.Picture // External URL
                          : `http://localhost:3001/uploads/${p.Picture.substring(p.Picture.lastIndexOf('/') + 1, p.Picture.lastIndexOf('-Picture'))}-Picture.jpg` // Local image
                      }
                      alt={p.Name}
                      className="w-20 h-20"
                    />
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
                  {/* <div className="space-x-3 mt-11">
                    <button className="justify-end text-sky-600 outline w-72 h-9 rounded-md mb-2 mt-0.5 ">
                      <FontAwesomeIcon icon={faCartPlus} size="1x" color="sky-600" /> Select
                    </button>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}