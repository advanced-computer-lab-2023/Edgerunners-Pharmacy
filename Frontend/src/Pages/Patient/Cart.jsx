import Logo from "../../UI/Logo";
import React, { useState, useEffect } from 'react';
import SidebarPatient from "../../Components/SidebarPatient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Patient.scss'
import '../Bootstrap.scss'
import {
  faTrashCan,
  faArrowLeft,
  faUser,
  faBasketShopping
} from "@fortawesome/free-solid-svg-icons";
import GetCart from "../getCart";
import GetAddress from "../getAddress";
import axios from "axios";
import emailjs from "emailjs-com";
import { Input } from "postcss";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [medicineName] = useState();
  const [count, setCount] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [price, setprice] = useState(0);
  const [state] = useState();
  const [city] = useState();
  const [street] = useState();
  const [apartment] = useState();
  const [selectedOption, setSelectedOption] = useState('');
  const [randomPointsInWallet, setRandomPointsInWallet] = useState(0);
  const [pointsTakenAway, setPointsTakenAway] = useState(0);
  const [pointsRemaining, setPointsRemaining] = useState(0);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/ViewMedPatient`;
    navigate(path);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  let addressData = GetAddress({
    state: state,
    city: city,
    street: street,
    apartment: apartment,
  })

  const options = addressData;

  let CartData = GetCart({
    medicineName: medicineName,
    count: count,
    price: price,
  });

  let total = CartData.reduce((acc, item) => acc + item.totalprice, 0);

  useEffect(() => {
    getWalletValue();
  }, [randomPointsInWallet, total]);

  const getWalletValue = async () => {
    try {
      let username = sessionStorage.getItem("Username");
      const res = await axios.get("http://localhost:3001/getWallet", {
        params: { username }
      });
      console.log("Wallet data from the server:", res.data);
      setRandomPointsInWallet(res.data);
      setPointsTakenAway(total);
      setPointsRemaining(res.data - total);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleincrement = async (name, price) => {
    try {
      await axios.put("http://localhost:3001/incrementQuantity", {
        medicinename: name,
        price: price,
        username: sessionStorage.getItem("Username"),
      });
      console.log("Update request sent successfully");
      setCount(count + 1);
      setTotalPrice(totalprice + price);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handledecrement = async (name, price) => {
    try {
      await axios.put("http://localhost:3001/decrementQuantity", {
        medicinename: name,
        price: price,
        username: sessionStorage.getItem("Username"),
      });
      console.log("Update request sent successfully");
      setCount(count - 1);
      setTotalPrice(totalprice - price);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleremove = async (name) => {
    try {
      await axios.put("http://localhost:3001/removeFromCart", {
        medicinename: name,
        username: sessionStorage.getItem("Username"),
      });
      console.log("Item removed successfully");
      setCount(count - count);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handlePayment = async () => {
    try {
      const pharmacistData = await axios.get("http://localhost:3001/getPharmacist", {});

      await Promise.all(CartData.map(async (medicine) => {
        const { medicineName, count } = medicine;
        const response = await axios.put("http://localhost:3001/updateQuantity", {
          Name: medicineName,
          taken: count,
        });

        if (response.data === "Quantity is now zero") {
          await Promise.all(pharmacistData.data.map(async (pharmacist) => {
            const { Name, Email, ReqStatus } = pharmacist;
            if(ReqStatus === "Accepted")
              await notification(medicineName, Name, Email);
          }));
        }
      }));

      if (paymentMethod === "payWithVisa") {
        let user = sessionStorage.getItem("Username")
        await axios.post("http://localhost:3001/create-checkout-session", { Username: user }).then((res) => {
          window.location = res.data.url
          handleOrder();
        }).catch((err) => console.log(err.message));
      } else if (paymentMethod === "payWithWallet" && pointsRemaining >= 0) {
        await handleOrder();
        window.location = "/PaymentSuccess";
      } else {
        await handleOrder();
        window.location = paymentMethod === "payWithWallet" ? "/PaymentCanceled" : "/PaymentCashSuccess";
      }
    } catch (error) {
      console.error("Error updating data:", error);

      // Redirect to another page if status is 400 with the message "Not enough to remove"
      if (error.response && error.response.status === 400 && error.response.data === "Not enough to remove") {
        window.location = "/ViewMedPatient";
      }
    }
  };

  const handleOrder = async () => {
    let pay = null;
    if (paymentMethod === "payWithVisa") {
      pay = "Visa";
    } else if (paymentMethod === "payWithWallet") {
      pay = "Wallet";
    } else {
      pay = "Cash on delivery";
    }
    try {
      let newDate = new Date();
      let newDay = newDate.getDate();
      let newMonth = newDate.getMonth() + 1;
      let newYear = newDate.getFullYear();
      let newFullDate = newDay + "/" + newMonth + "/" + newYear;
      await axios.put("http://localhost:3001/addOrder", {
        orderaddress: selectedOption,
        paymentmethod: pay,
        username: sessionStorage.getItem("Username"),
        date: newFullDate,
        month: newMonth,
      });

      console.log("Order request sent successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const notification = async (medicineName, pharmacistName, pharmacistEmail) => {
    try {
      const notificationData = {
        name: pharmacistName,
        message: `${medicineName} is out of stock`,
        receiver: pharmacistEmail,
      };

      if (!notificationData.receiver) {
        console.error("Recipient email address is empty");
        // Handle the error or notify the user about the issue
        return;
      }

      const response = emailjs.send(
        "service_0mev55g",
        "template_y4a9dm4",
        {
          name: pharmacistName,
          message: `${medicineName} is out of stock`,
          receiver: pharmacistEmail,
        },
        "JQ3H-s3Z8rus70cVv"
      );

      await axios.put("http://localhost:3001/notifyOutOfStock", {
        notifications: notificationData
      });
      
      console.log(`Notification sent: ${medicineName}`);
    } catch (error) {
      console.error(`Error in notification: ${error.message}`);
      // Handle other errors as needed...
    }
  };

  if (CartData && CartData.length > 0) {
    return (
      <div>
        <SidebarPatient pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="flex mb-14 mt-32">
          <div className="ml-10">
            {CartData.map((p, index) => (
              <div key={index} className="mt-6 w-[60rem] h-[14.25rem] rounded-md shadow-md  bg-gray-100 justify-center space-y-4">
                <div className="justify-center pl-4 pt-4">
                  {p.Picture ? (
                    <img alt={p.Name} className="w-20 h-20 mt-16" />
                  ) : (<div className="mt-4 rounded-md shadow-md w-40 h-40 bg-gray-300"><br></br>no image</div>)}
                  <br />
                  <div className="-mt-44 ml-44 mb-4">
                    <h3 className="font-bold"><a >{p.medicineName}</a></h3>
                    <div className="-mt-6">
                      <label className="text-gray-500 ml-64"> Each: </label><label className="font-bold ">EGP </label><label><a >{p.price}</a></label>
                      <label className="text-gray-500 ml-64"> Total: </label><label className="font-bold ">EGP </label><label><a >{p.totalprice}</a></label>
                      <br />
                      <label className="text-gray-500">Use: </label><label className="text-gray-500"><a ></a></label>
                      <br />
                      <label className="text-gray-500">Description: </label>
                      <div className="mt-8 ml-34">
                        <label className="text-gray-500">Quantity: </label>
                        <label className="text-grey pl-2"> {p.count} </label>
                        <button className="justify-end text-red-600 outline w-9 h-9 rounded-md mb-2 mt-0.5 ml-2" onClick={() => handledecrement(p.medicineName, p.price)}>
                          -
                        </button>
                        <button
                          className={`justify-end text-sky-600 outline w-9 h-9 rounded-md mb-2 mt-0.5 ml-3 ${p.count <= 0 ? 'cursor-not-allowed' : ''}`}
                          onClick={() => handleincrement(p.medicineName, p.price)}
                          disabled={p.count <= 0}
                        >
                          +
                        </button>
                        <button className="justify-end ml-80 pl-52" onClick={() => handleremove(p.medicineName)}>
                          <FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#DC2626" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-4 mt-6 w-[30rem] h-[30rem] bg-gray-50 rounded-md shadow-md justify-center space-y-4">
            <div className="flex items-center mt-4 ml-4">
              <select id="dropdown" value={selectedOption} onChange={handleSelectChange} className="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5">
                <option value="" disabled>Select delivery address</option>
                {options.map((p, index) => (
                  <option key={index} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <a href="/Address">
                <button className="text-sky-600 outline w-60 h-10 rounded-md mb-2 ml-3 mt-2">
                  Add delivery address
                </button>
              </a>
            </div>
            <form className="ml-4 pt-4">
              <label className="text-gray-500">
                <input
                  type="radio" name="paymentMethod"
                  value="cashOnDelivery" checked={paymentMethod === 'cashOnDelivery'} onChange={handlePaymentMethodChange}
                /> Cash on delivery
              </label>
              <br></br>
              <label className="text-gray-500">
                <input
                  type="radio" name="paymentMethod"
                  value="payWithWallet" checked={paymentMethod === 'payWithWallet'} onChange={handlePaymentMethodChange}
                /> Pay with Wallet
              </label>
              <br></br>
              <label className="mt-2 text-gray-500">
                <input
                  type="radio" name="paymentMethod"
                  value="payWithVisa" checked={paymentMethod === 'payWithVisa'} onChange={handlePaymentMethodChange}
                /> Pay with Visa
              </label>
              {paymentMethod === 'payWithWallet' && (
                <div className="pt-4">
                  <label className="text-gray-500 ml-4"> Points in wallet: {randomPointsInWallet} </label><br />
                  <label className="text-gray-500 ml-4"> Total: {total} </label><br />
                  <label className="text-gray-500 ml-4"> Points remaining: {pointsRemaining} </label><br />
                </div>
              )}
            </form>
            <div className="pt-4">
              <label className="text-gray-500 ml-4"> Shipping cost </label><label className="text-gray-500 ml-72"> TBD </label>
              <br></br>
              <label className="text-gray-500 ml-4"> Tax </label><label className="text-gray-500 pl-12 ml-80"> TBD </label>
              <br></br>
              <label className="text-gray-500 font-bold ml-4"> Total price </label><label className="text-gray-500 font-bold pl-72 ml-4"> {total} </label>
            </div>
            <div className="flex justify-end mt-10">
              <a href="/ViewMedPatient">
                <button className="justify-end bg-gray-400 text-white w-20 h-10 rounded-md mb-2 mt-0.5 mr-8">
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>
              </a>
              <a>
                <button className="justify-end bg-sky-600 text-white w-60 h-10 rounded-md mb-2 mt-0.5 mr-14" onClick={handlePayment}>
                  <FontAwesomeIcon icon={faBasketShopping} /> Checkout
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <SidebarPatient pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-40">
          <button className="text-sky-600  outline  w-40  h-9 rounded-md shadow ml-16" onClick={routeChange}> Back </button>
          <div className="h-[16rem] justify-center text-center space-y-4 mt-28">
            <h1>The cart is empty</h1>
            <h3>You can add medicines <a href="/ViewMedPatient">here</a></h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;