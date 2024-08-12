import React, { useState, useEffect } from "react";
import GetMedicine from "../Pages/getMedicine";
import GetMedicinalUse from "../Pages/getMedicinalUses";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Card } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function MedTablePrescriptions() {
  const [name, setName] = useState();
  const [medicinaluse, setMedicinalUse] = useState();
  const [forceEffect, setForceEffect] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [prescribedMedicines, setPrescribedMedicines] = useState([]);
  const [Medicine, setMedicine] = useState([]);
  const navigate = useNavigate();
  let MedicinalUses = GetMedicinalUse({});
  let selectedMedicine = [];
  const uses = MedicinalUses || [];
  const OverTheCounter = false;

  const HandleAlternatives = async (name) => {
    try {
      navigate(`/Alternatives?medicinename=${encodeURIComponent(name)}&OverTheCounter=${OverTheCounter}`);
    } catch (error) {
      console.error("Error fetching alternatives:", error);
    }
  }

  // const selectData = () => {
  //   let medicinedata = getMedicine();
  //   let result1 = [];
  //   // medicinedata.then((resultArray1) => {
  //   //   for(let i=0;i<resultArray1.length;i++){
  //   //     result1.push(resultArray1[i]);
  //   //   }
  //   // });
  //   console.log("Medicine data:", medicinedata);
  //   let prescriptiondata = getPrescriptions();
  //   prescriptiondata.then((resultArray) => {
  //     prescriptiondata = resultArray;
  //   });
  //   console.log("Prescriptions data:", prescriptiondata);
  //   selectedMedicine = [];
  //   for (let i = 0; i < medicinedata.length; i++) {
  //     if (prescriptiondata.includes(medicinedata[i].Name)) {
  //       selectedMedicine.push(medicinedata[i]);
  //     }
  //   }
  //   console.log("Selected Medicine:", selectedMedicine);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       selectData();
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
  function Med() {
    const [med, setMed] = useState();
    useEffect(() => {
      getMed();
      async function getMed() {
        const res = await axios.get(`http://localhost:3001/getAllMedicines`);
        setMed(res.data);
      }
    }, []);
    return med;
  }
  function MedP() {
    const [med, setMed] = useState();
    useEffect(() => {
      getMed();
      async function getMed() {
        const res = await axios.get("http://localhost:3001/getPrescriptions", {
          params: {
            Patient: sessionStorage.getItem("Username"),
          },
        });
        setMed(res.data);
      }
    }, []);
    return med;
  }

  // const getMedicine = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/getAllMedicines`);
  //     setMedicine(res.data);
  //     console.log("medicine:", res.data);
  //     return res;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  let medi = Med();
  let Per = MedP();

  if(medi && Per){
    let test = [];
    for (let index = 0; index < medi.length; index++) {
      test.unshift(medi[index].Name);
    }
    for (let i = 0; i < test.length; i++) {
          if (Per.includes(test[i])) {
            selectedMedicine.push(medi[i]);
          }
        }
        console.log("Selected: " + selectedMedicine);
  }


  // const getPrescriptions = async () => {
  //   if (sessionStorage.getItem("type") === "Patient") {
  //     try {
  //       const res = await axios.get("http://localhost:3001/getPrescriptions", {
  //         params: {
  //           Patient: sessionStorage.getItem("Username"),
  //         },
  //       });
  //       setPrescribedMedicines(res.data);
  //       console.log("prescriptions:", res.data);
  //       return res.data;
  //     } catch (error) {
  //       console.error("Error fetching prescriptions:", error);
  //       throw error;
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Medicine = await GetMedicine({
      Name: name,
      MedicinalUse: medicinaluse,
      OverTheCounter,
    });
  };

  const handleAddToCart = async (name, price, availableQuantity) => {
    if (sessionStorage.getItem("type") === "Patient") {
      try {
        if (availableQuantity > 0) {
          // Disable the button temporarily
          setAddedToCart((prevAddedToCart) => ({
            ...prevAddedToCart,
            [name]: true,
          }));

          // Update the cart
          axios.put("http://localhost:3001/updatePatient", {
            medicinename: name,
            quantity: 1,
            price: price,
            username: sessionStorage.getItem("Username"),
          });
          console.log("Update request sent successfully");

          // Wait for 2 seconds
          setTimeout(() => {
            // Enable the button after 2 seconds
            setAddedToCart((prevAddedToCart) => ({
              ...prevAddedToCart,
              [name]: false,
            }));
          }, 500);
        } else {
          setShowAlternatives(true);
          console.log("Cannot add to cart. Insufficient quantity.");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  if (selectedMedicine.length > 0) {
    return (
      <div>
        <div className="form-prescription space-x-3 justify-center flex mb-4 mt-4">
          <label className="-mt-48">Search</label>
          <input
            className="text-sky-600  outline  w-40  h-9  rounded-md -mt-48 shadow"
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button className="  text-sky-600  outline  w-40  h-9  rounded-md -mt-48 shadow" type="submit" onSubmit={handleSubmit}>
            Submit
          </button>
          <label className="-mt-48">Medicinal Use</label>
          <select
            className="text-sky-600 outline w-40 h-9 rounded-md -mt-48 shadow"
            value={medicinaluse}
            onChange={(e) => {
              setMedicinalUse(e.target.value);
            }}
          >
            <option value="" enabled="true">
              Select Medicinal Use
            </option>
            {Array.isArray(uses) &&
              uses.map((use, index) => (
                <option key={index} value={use}>
                  {use}
                </option>
              ))}
          </select>
        </div>

        <div className="grid grid-cols-4 flex -mt-44 ml-20 pb-10">
          {selectedMedicine.map((p, index) => {
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
                      <label className="text-gray-500">Active ingredient: </label><label className="text-gray-500"><a >{p.ActiveIngredient}</a></label>
                      <br />
                    </div>
                  </div>
                  <div className="space-x-3 mt-8">
                    {p.Quantity > 0 ? (
                      <button
                        className={`justify-end text-sky-600 outline w-72 h-9 rounded-md mb-2 mt-0.5 ${addedToCart[p.Name] ? 'bg-gray-300 cursor-not-allowed' : ''
                          }`}
                        onClick={() => handleAddToCart(p.Name, p.Price, p.Quantity)}
                        disabled={addedToCart[p.Name]}
                      >
                        {addedToCart[p.Name] ? 'Added to cart' : (
                          <>
                            <FontAwesomeIcon icon={faCartPlus} size="1x" color="sky-600" /> Add to cart
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        className="justify-end text-sky-600 outline w-72 h-9 rounded-md mb-2 mt-0.5"
                        onClick={() => HandleAlternatives(p.Name)}
                      >
                        Show Alternatives
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div className="h-[16rem] justify-center text-center space-y-4 mt-48"><h1>No medicine found</h1></div>;
  }
}