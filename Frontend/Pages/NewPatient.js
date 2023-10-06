import Logo from "../UI/Logo";
import Card from "../UI/Card";
import SelectGender from "../UI/SelectGender";
import { useRef } from "react";
import Dropdown from "../UI/DropDown";

function NewPatient(props){

    return(
        <div className=" flex justify-center mt-10">
        <Card width='w-4/12' height=' h-[34rem]'>
               <div className=" flex justify-center  mt-10 mb-0 ">
            <Logo height='3rem' className='mr-9' />
        <h1 className=" text-xl font-bold  text-center  text-sky-600   mr-8 mt-3 "> Add Patient </h1>
        </div >
        <div className=" flex justify-center  mt-4 mb-0 ">
        <form>
            <div className=" mt-3">
            <div >
            <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Name : </label>
            <br />
            <input type="text" id="name" name="name"   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
            </div>
            <div >
            <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> NationalID : </label>
            <br />
            <input type="text" id="nationalId" name="nationalId"   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
            </div>
            <div >
            <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Age : </label>
            <br />
            <input type="text" id="age" name="age"   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
            </div>
            <Dropdown/>
            <SelectGender/>
            <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow  ml-7"> Confirm </button>
            </div>
        </form>
        </div>
        </Card>
        </div>
    )
}
export default NewPatient;