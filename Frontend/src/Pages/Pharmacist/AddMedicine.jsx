import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import { useRef } from "react";
import axios from 'axios';
import Sidebar from "../../Components/SidebarPharm";
import GetMedicinalUse from "../getMedicinalUses";
import { useNavigate } from "react-router-dom";
//import {faCheck,faTimes,faInfoCircle} from "@fortawesome/fontawesome-svg-core";
//import {fontAwesomeIcon} from "@fortawesome/fontawesome-svg-core"; 

function AddMedicine(props) {
    const medicineNameRef = useRef();
    const medicineIngredientsRef = useRef();
    const medicinePriceRef = useRef();
    const medicineUseRef = useRef();
    const medicineQuantityRef = useRef();
    const pictureRef = useRef();
    let MedicinalUses = GetMedicinalUse({});
    const uses = MedicinalUses || [];

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/ViewMedPharm`;
        navigate(path);
    };

    function submitHandeler(event) {
        event.preventDefault();
        const nameValue = medicineNameRef.current.value;
        const ingredientsValue = medicineIngredientsRef.current.value;
        const priceValue = medicinePriceRef.current.value;
        const useValue = medicineUseRef.current.value;
        const quantityValue = medicineQuantityRef.current.value;

        const formData = new FormData();
        formData.append('Name', nameValue);
        formData.append('Description', ingredientsValue);
        formData.append('Price', priceValue);
        formData.append('MedicinalUse', useValue);
        formData.append('Quantity', quantityValue);
        formData.append('Picture', pictureRef.current.files[0]);

        console.log(formData);

        axios.post("http://localhost:3001/addMedicine", formData, {})
            .then((res) => {
                console.log("Medicine added", res);
                medicineNameRef.current.value = "";
                medicineIngredientsRef.current.value = "";
                medicinePriceRef.current.value = "";
                medicineUseRef.current.value = "";
                medicineQuantityRef.current.value = "";
                pictureRef.current.value = "";
            })
            .catch((error) => {
                console.error("Unable to add Medicine", error);
            });
    }

    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="mt-28">
                <button className="text-sky-600  outline  w-40  h-9 rounded-md shadow ml-16" onClick={routeChange}> Back </button>
                <div className=" justify-center flex mb-20">
                    <Card width='w-4/12' height=' h-[45rem]'>
                        <div className=" flex justify-center  mt-6 mb-0 ">
                            <a href="/ViewMedPharm"><Logo height='4rem' /></a>
                            <h1 className=" text-2xl font-bold  text-center  text-sky-600  ml-0   mt-6 ">  Add Medicine </h1>
                        </div >
                        <div className=" flex justify-center mt-7">
                            <form onSubmit={submitHandeler}>
                                <div className=" mt-3">
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Medicine name : </label>
                                        <br />
                                        <input type="text" id="medicinename" name="medicinename" ref={medicineNameRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Description : </label>
                                        <br />
                                        <input type="text" id="medicineingredients" name="medicineingredients" ref={medicineIngredientsRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Price : </label>
                                        <br />
                                        <input type="text" id="medicineprice" name="medicineprice" ref={medicinePriceRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Medicinal Use : </label>
                                        <br />
                                        <select
                                            id="medicineuse"
                                            name="medicineuse"
                                            ref={medicineUseRef}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="" disabled>
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
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Quantity : </label>
                                        <br />
                                        <input type="text" id="medicinequantity" name="medicinequantity" ref={medicineQuantityRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className=" mb-4">
                                        <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Picture : </label>
                                        <br />
                                        <input type="file" id="picture" name="picture" ref={pictureRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className=" flex justify-center  mt-6">
                                        <br />
                                        <br />
                                        <button className="  text-sky-600  outline  w-40  h-9 rounded-md   mt-2 shadow"> Confirm </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default AddMedicine;