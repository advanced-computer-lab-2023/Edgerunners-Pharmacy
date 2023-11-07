import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";
import axios from "axios";
import { useRef } from "react";

function AddDeliveryAddress() {
    const nameRef = useRef();
    const apartmentRef = useRef();
    const streetAddressRef = useRef();
    const cityRef = useRef();
    const countryRef = useRef();
    function submitHandeler(event) {
        event.preventDefault();
        const nameValue = nameRef.current.value;
        const apartmentValue = apartmentRef.current.value;
        const cityValue = cityRef.current.value;
        const countryValue = countryRef.current.value;
        const newAddress = {
            Name:  nameValue,
            Apartment: apartmentValue,
            City: cityValue,
            Country: countryValue,
        };
        console.log(newAddress);
        axios
        .post("http://localhost:3001/addAddress", newAddress, {

        })
        .then((res) => {
         
          console.log("Address added");
          nameRef.current.value="";
          apartmentRef.current.value="";
          cityRef.current.value="";
          countryRef.current.value="";
         

        })
        .catch((error) => {
         
            console.log("Unable to add address");
          
        });
    }
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className=" justify-center flex mt-20">
                <Card width='w-4/12' height=' h-[35rem]'>
                    <div className=" flex justify-center  mt-6 mb-0 ">
                        <a href="/Patient"><Logo height='4rem' className="mt-6 mb-0" /></a>
                        <h1 className="text-2xl font-bold text-center text-sky-600 ml-0 mt-6">Add Delivery Address</h1>
                    </div >
                    <div className=" flex justify-center mt-7">

                        <form onSubmit={submitHandeler}>
                            <div className=" mt-3">
                                <div className=" mb-4">
                                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Name : </label>
                                    <br />
                                    <input type="text" id="fullname" name="fullname" ref={nameRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>

                                <div className=" mb-4">
                                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Apartment/building/house number : </label>
                                    <br />
                                    <input type="text" id="apartment" ref={apartmentRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className=" mb-4">
                                    <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2"> City : </label>
                                    <br />
                                    <input type="text" id="city" ref={cityRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className=" mb-4">
                                    <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2"> Country : </label>
                                    <br />
                                    <input type="text" id="country" ref={countryRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className=" flex justify-center  mt-6">
                                    <br />
                                    <br />
                                    <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow"> Confirm </button>

                                </div>

                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default AddDeliveryAddress;