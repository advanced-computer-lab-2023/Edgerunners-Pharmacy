import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import { useRef } from "react";
import axios from 'axios';
//import {faCheck,faTimes,faInfoCircle} from "@fortawesome/fontawesome-svg-core";
//import {fontAwesomeIcon} from "@fortawesome/fontawesome-svg-core"; 

function AddMedicine(props) {
    const medicineNameRef = useRef();
    const medicineIngredientsRef = useRef();
    const medicinePriceRef = useRef();
    const medicineUseRef = useRef();
    const medicineQuantityRef = useRef();
    function submitHandeler(event) {
        event.preventDefault();
        const nameValue = medicineNameRef.current.value;
        const ingredientsValue = medicineIngredientsRef.current.value;
        const priceValue = medicinePriceRef.current.value;
        const useValue = medicineUseRef.current.value;
        const quatityValue = medicineQuantityRef.current.value;
        const newMedicine = {
            Picture: " ",
            Name: nameValue,
            Description: ingredientsValue,
            Price: priceValue,
            MedicinalUse: useValue,
            Quantity: quatityValue,
            Sales: 0,
        };

        console.log(newMedicine);
        axios
            .post("http://localhost:3001/addMedicine", newMedicine, {

            })
            .then((res) => {

                console.log("Medicine added");
                medicineNameRef.current.value = "";
                medicineIngredientsRef.current.value = "";
                medicinePriceRef.current.value = "";
                medicineUseRef.current.value = "";
                medicineQuantityRef.current.value = "";

            })
            .catch((error) => {
                console.log("Unable to add Medicine");
            });
    }

    return (
        <div className=" justify-center flex mt-20">


            <Card width='w-4/12' height=' h-[40rem]'>
                <div className=" flex justify-center  mt-6 mb-0 ">
                    <Logo height='4rem' />

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
                                <input type="text" id="medicineuse" name="medicineuse" ref={medicineUseRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>

                            <div className=" mb-4">
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Quantity : </label>
                                <br />
                                <input type="text" id="medicinequantity" name="medicinequantity" ref={medicineQuantityRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
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
    )
}
export default AddMedicine;