import Logo from "../../UI/Logo";
import React, { useState, useEffect } from 'react';
import Sidebar from "../../Components/SidebarPatient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faArrowLeft,
  faBasketShopping
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "postcss";

//(Add to cart) button 
const handleUpdate = async (p) => {
  // try {
  //   console.log("hereeee");
  //   console.log(p);
  //   await axios.put("http://localhost/updatePatient", {
  //     Cart: {
  //       medicineName: p.medicineName,
  //       count: 1,
  //     }
  //   });
  //   console.log("Update request sent successfully");
  //   setForceEffect(true);
  // }
  // catch {
  //   console.error("Error updating data:", error);
  // }
};

const handleIncrement = async (p) => {
  // try {
  //   console.log("hereeee");
  //   console.log(p);
  //   await axios.put("http://localhost/updatePatient", {
  //     Cart: {
  //       medicineName: p.medicineName,
  //       count: 1,
  //     }
  //   });
  //   console.log("Update request sent successfully");
  //   setForceEffect(true);
  // }
  // catch {
  //   console.error("Error updating data:", error);
  // }
};

const handleDecrement = async (p) => {
  // try {
  //   console.log("hereeee");
  //   console.log(p);
  //   await axios.put("http://localhost/updatePatient", {
  //     Cart: {
  //       medicineName: p.medicineName,
  //       count: 1,
  //     }
  //   });
  //   console.log("Update request sent successfully");
  //   setForceEffect(true);
  // }
  // catch {
  //   console.error("Error updating data:", error);
  // }
};

//Dummy data 
const makeOrderDetails = async () => {
  const getRandomStatus = () => {
    const uses = ['headache', 'cold', 'stomachache'];
    return uses[Math.floor(Math.random() * uses.length)];
  };
  const cartitems = [];
  for (let i = 1; i <= 5; i++) {
    const cartitem = {
      id: i,
      Name: `Name ${i}`,
      Price: `${i}` * 100,
      use: getRandomStatus(),
    };
    cartitems.push(cartitem);
  }
  return cartitems;
};

function generateRandomOptions() {
  const numberOfOptions = getRandomInt(1, 5); // Generate a random number between 1 and 5 (you can adjust this range as needed)
  const options = [];

  for (let i = 0; i < numberOfOptions; i++) {
    options.push(
      <option key={i} value={`Option ${i + 1}`}>
        Option {i + 1}
      </option>
    );
  }

  return options;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomPointsInWallet = getRandomInt(0, 1000); // Generate a random value for "Points in wallet"
const randomPointsTakenAway = getRandomInt(0, randomPointsInWallet); // Generate a random value for "Points taken away" (less than or equal to "Points in wallet")
const pointsRemaining = randomPointsInWallet - randomPointsTakenAway; // Calculate "Points remaining"

function Cart() {
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [cartitems, setcartitems] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleCardNumberChange = (event) => {
    // Remove non-numeric characters from the input
    const formattedInput = event.target.value.replace(/\D/g, '');
    // Add a space after every 4 digits
    const formattedNumber = formattedInput.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit the input to a maximum of 19 characters (16 digits + 3 spaces)
    if (formattedNumber.length <= 19) {
      setCardNumber(formattedNumber);
    }
  };

  const handleExpirationDateChange = (event) => {
    // Remove non-numeric and non-slash characters from the input
    const formattedInput = event.target.value.replace(/\D/g, '');
    // Automatically insert a slash after the 2nd digit
    const formattedNumber = formattedInput.replace(/(\d{2})(?=\d)/g, '$1/');
    // Limit the input to a maximum of 5 characters (MM/YY format)
    if (formattedInput.length <= 4) {
      setExpirationDate(formattedNumber);

    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await makeOrderDetails();
        setcartitems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    cartitems.forEach((item) => {
      total += item.Price; // Assuming item.Price is a number
    });
    return total;
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="justify-center flex mb-4">
        <a href="/Patient">
          <Logo />
        </a>
      </div>
      <div className="flex mb-14">
        <div className="ml-10">
          {cartitems.map((p, index) => {
            return (
              <div key={index} className="mt-6 w-[60rem] h-[12rem] rounded-md shadow-md  bg-gray-100 justify-center space-y-4">
                <div className="justify-center pl-4 pt-4">
                  {p.Picture ? (
                    <img src={p.Picture} alt={p.Name} className="w-20 h-20 mt-12" />
                  ) : (<div className="rounded-md shadow-md w-40 h-40 bg-gray-300"><br></br>no image</div>)}
                  <br />
                  <div className="-mt-44 ml-44 mb-4">
                    <h3 className="font-bold"><a >{p.Name}</a></h3>
                    <div className="-mt-6">
                      <label className="text-gray-500 ml-64"> Each: </label><label className="font-bold ">EGP </label><label><a >{p.Price}</a></label>
                      <label className="text-gray-500 ml-64"> Total: </label><label className="font-bold ">EGP </label><label><a >{p.Price}</a></label>
                      <br />
                      <label className="text-gray-500">Use: </label><label className="text-gray-500"><a >{p.use}</a></label>
                      <br />
                      <label className="text-gray-500">Description: </label>
                      <div className="mt-8 ml-34">
                        <label className="text-gray-500">Quantity: </label>
                        <label className="text-grey pl-2"> 2 </label>
                        <button className="justify-end text-red-600 outline w-9 h-9 rounded-md mb-2 mt-0.5 ml-2">
                          -
                        </button>
                        <button className="justify-end text-sky-600 outline w-9 h-9 rounded-md mb-2 mt-0.5 ml-3">
                          +
                        </button>
                        <button className="justify-end ml-80 pl-52">
                          <FontAwesomeIcon icon={faTrashCan} size="lg" style={{ color: "#DC2626" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          )}
        </div>

        <div className="ml-4 mt-6 w-[30rem] h-[30rem] bg-gray-50 rounded-md shadow-md justify-center space-y-4">
          <div className="flex items-center mt-4 ml-4">
            <select className="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5">
              <option>Select delivery address</option>
              {generateRandomOptions()}
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
              <div className="mt-4">
                <label htmlFor="walletValue">Points in wallet: {randomPointsInWallet}</label><br />
                <label htmlFor="walletValue">Points taken away: {randomPointsTakenAway}</label><br />
                <label htmlFor="walletValue">Points remaining: {pointsRemaining}</label><br />
              </div>
            )}

          </form>
          <div className="pt-4">
            <label className="text-gray-500 ml-4"> Shipping cost </label><label className="text-gray-500 ml-72"> TBD </label>
            <br></br>
            <label className="text-gray-500 ml-4"> Tax </label><label className="text-gray-500 pl-12 ml-80"> TBD </label>
            <br></br>
            <label className="text-gray-500 font-bold ml-4"> Total price </label><label className="text-gray-500 font-bold pl-72 ml-4"> {calculateTotalPrice()} </label>
          </div>
          <div className="flex justify-end mt-10">
            <a href="/ViewMedPatient">
              <button className="justify-end bg-gray-400 text-white w-20 h-10 rounded-md mb-2 mt-0.5 mr-8">
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              </button>
            </a>
            <a>
              <button className="justify-end bg-sky-600 text-white w-60 h-10 rounded-md mb-2 mt-0.5 mr-14">
                <FontAwesomeIcon icon={faBasketShopping} /><label>  Checkout</label>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;