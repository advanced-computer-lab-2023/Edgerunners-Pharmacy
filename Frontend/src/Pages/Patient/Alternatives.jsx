import React, { useState, useEffect } from "react";
import GetMedicine from "../../Pages/getMedicine";
import GetMedicinalUse from "../../Pages/getMedicinalUses";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Card } from "@material-tailwind/react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../../Components/SidebarPatient";


export default function Alternatives() {
  const location = useLocation();
  let medicinename = "";
  let OverTheCounter = true;
  const [alternatives, setAlternatives] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [showAlternatives, setShowAlternatives] = useState(false);
  const navigate = useNavigate();

  let navigate1 = useNavigate();
  const routeChange = () => {
    let path = `/ViewMedPatient`;
    navigate1(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        medicinename = new URLSearchParams(location.search).get("medicinename");
        OverTheCounter = new URLSearchParams(location.search).get("OverTheCounter");
        const response = await axios.get(`http://localhost:3001/showAlternatives`, {
          params: {
            medicinename,
            OverTheCounter,
          },
        });

        // Use the response data as needed
        const alternativesData = response.data;
        // Update state with alternatives data
        setAlternatives(alternativesData);
      } catch (error) {
        console.error("Error fetching alternatives:", error);
      }
    };

    fetchData();
  }, [medicinename, OverTheCounter]);

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
          console.log(medicinename);
          console.log(OverTheCounter);

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

  if (alternatives.length > 0) {
    return (
      <div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-40">
          <button className=" text-sky-600  outline  w-40  h-9  rounded-md shadow ml-16" onClick={routeChange}>Back</button>
          <div className="items-center flex justify-center">
            <h2 style={{ color: '#93AFDA' }}>Alternatives</h2>
          </div>
          <div className="grid grid-cols-4 flex ml-20 pb-10">
            {alternatives.map((p, index) => {
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
                          onClick={() => {
                            navigate(`/Alternatives?medicinename=${encodeURIComponent(p.Name)}&OverTheCounter=${OverTheCounter}`);
                          }}
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
      </div>
    );
  } else {
    return (
      <div className="mt-40">
        <button className="text-sky-600  outline  w-40  h-9 rounded-md shadow ml-16" onClick={routeChange}> Back </button>
        <div className="h-[16rem] justify-center text-center space-y-4 mt-28">
          <h1>There are no alternatives</h1>
        </div>
      </div>
    );
  }
}