import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddDeliveryAddress() {
    const apartmentRef = useRef();
    const streetAddressRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/Patient`;
        navigate(path);
    };

    function submitHandeler(event) {
        event.preventDefault();
        const apartmentValue = apartmentRef.current.value;
        const streetValue = streetAddressRef.current.value;
        const cityValue = cityRef.current.value;
        const stateValue = stateRef.current.value;
        try {
            axios.put("http://localhost:3001/updateAddress", {
                state: stateValue,
                city: cityValue,
                street: streetValue,
                apartment: apartmentValue,
                username: sessionStorage.getItem("Username"),
            });
            console.log("Update request sent successfully");
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="mt-28">
                <button className="text-sky-600  outline  w-40  h-9 rounded-md shadow ml-16" onClick={routeChange}> Back </button>
                <div className="items-center flex justify-center">
                    <Card width='w-4/12' height=' h-[35rem]'>
                        <div className=" flex justify-center  mt-6 mb-0 ">
                            <a href="/Patient"><Logo height='4rem' className="mt-6 mb-0" /></a>
                            <h1 className="text-2xl font-bold text-center text-sky-600 ml-0 mt-6">Add Delivery Address</h1>
                        </div >
                        <div className=" flex justify-center mt-7">

                            <form onSubmit={submitHandeler}>
                                <div className=" mt-3">
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2"> State : </label>
                                        <br />
                                        <input type="text" id="country" ref={stateRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g, Cairo" />
                                    </div>
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2"> City : </label>
                                        <br />
                                        <input type="text" id="city" ref={cityRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g, New Cairo" />
                                    </div>
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Street : </label>
                                        <br />
                                        <input type="text" id="apartment" ref={streetAddressRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g, 123 Palm St." />
                                    </div>
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Apartment/building/house number : </label>
                                        <br />
                                        <input type="text" id="apartment" ref={apartmentRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g, Building 2" />
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
        </div>
    );
}

export default AddDeliveryAddress;