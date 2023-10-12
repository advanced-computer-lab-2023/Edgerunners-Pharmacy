import Logo from "../../UI/Logo";
import Card from "../../UI/Card";
import SelectGender from "../../UI/SelectGender";
import { useRef } from "react";
import Dropdown from "../../UI/DropDown";
import axios from "axios";

function AddPatient(props) {
    const usernameRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dobRef = useRef();
    const genderRef = useRef();
    const mobilenumRef = useRef();
    const emergencyfullnameRef = useRef();
    const emergencymobilenumRef = useRef();
    const emergencyrelationRef = useRef();

    function submitHandeler(event) {
        event.preventDefault();
        const usernameValue = usernameRef.current.value;
        const nameValue = nameRef.current.value;
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        const dateofbirthValue = dobRef.current.value;
        const genderValue = genderRef.current.value;
        const mobilenumValue = mobilenumRef.current.value;
        const emergencyfullnameValue = emergencyfullnameRef.current.value;
        const emergencymobilenumValue = emergencymobilenumRef.current.value;
        const emergencyrelationValue = emergencyrelationRef.current.value;
        const AddPatient = {
            Username: usernameValue,
            Name: nameValue,
            Email: emailValue,
            Password: passwordValue,
            DOB: dateofbirthValue,
            Gender: genderValue,
            phoneNumber: mobilenumValue,
            EmergencyContact: {
				FullnameEC: emergencyfullnameValue,
				phoneNumberEC: emergencymobilenumValue,
                Relations: emergencyrelationValue
			},
        };
        console.log(AddPatient);
        axios
        .post("http://localhost:3001/addPatient", AddPatient, {

        })
        .then((res) => {
         
          console.log("Patient added");
          usernameRef.current.value="";
          passwordRef.current.value="";         

        })
        .catch((error) => {
         
            console.log("Unable to add Patient");
          
        });
    }

    return (
        <div className="flex justify-center mt-10 pb-10">
            <Card width='w-4/12' height='h-[60rem]'>
                <div className="flex justify-center mt-10 mb-0">
                    <Logo height='3rem' className='mr-9' />
                    <h1 className="text-xl font-bold text-center text-sky-600 mr-8 mt-3">Register as patient</h1>
                </div>
                <div className="flex justify-center mt-4 mb-0">
                    <form onSubmit={submitHandeler}>
                        <div className=" mt-3">
                            <div >
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Username : </label>
                                <br />
                                <input type="text" id="name" name="name" ref={usernameRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div >
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Name : </label>
                                <br />
                                <input type="text" id="name" name="name" ref={nameRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div >
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Email : </label>
                                <br />
                                <input type="text" id="name" name="name" ref={emailRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className=" mb-4">
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Password : </label>
                                <br />
                                <input type="password" id="password" ref={passwordRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Date of birth : </label>
                                <input type="date" name="bday" ref={dobRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Gender : </label>
                                <select ref={genderRef} className="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                    <option>Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div >
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Mobile number : </label>
                                <br />
                                <input type="text" id="mobilenumber" name="mobilenumber" ref={mobilenumRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div >
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Emergency contact name : </label>
                                <br />
                                <input type="text" id="name" name="name" ref={emergencyfullnameRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div >
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Emergency contact mobile number : </label>
                                <br />
                                <input type="text" id="mobilenumber" name="mobilenumber" ref={emergencymobilenumRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <select ref={emergencyrelationRef} className="bg-50 border border-300 text-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                    <option>Select Relation</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Sibling">Sibling</option>
                                    <option value="Child">Child</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Other">Other</option>
                                </select>                            <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow  ml-20 "> Register </button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default AddPatient;
