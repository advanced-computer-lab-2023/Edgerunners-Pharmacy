import Logo from "../UI/Logo";
import Card from "../UI/Card";
import { useEffect, useRef } from "react";

function AddPharmacist(props) {
    const usernameRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dobRef = useRef();
    const hourlyrateRef = useRef();
    const affiliationRef = useRef();
    const educationRef = useRef();

    function submitHandeler(event) {
        event.preventDefault();
        const usernameValue = usernameRef.current.value;
        const nameValue = nameRef.current.value;
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        const dateofbirthValue = dobRef.current.value;
        const hourlyrateValue = hourlyrateRef.current.value;
        const affiliationValue = affiliationRef.current.value;
        const educationValue = educationRef.current.value;
        const AddPharmacist = {
            userName: usernameValue,
            fullName: nameValue,
            email: emailValue,
            Password: passwordValue,
            dateOfBirth: dateofbirthValue,
            hourlyRate: hourlyrateValue,
            affiliation: affiliationValue,
            education: educationValue,
        };
        console.log(AddPharmacist);
    }

    return (
        <div className="flex justify-center mt-10 pb-10">
            <Card width='w-4/12' height='h-[50rem]'>
                <div className="flex justify-center mt-10 mb-0">
                    <Logo height='3rem' className='mr-9' />
                    <h1 className="text-xl font-bold text-center text-sky-600 mr-8 mt-3">Register as pharmacist</h1>
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
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Hourly rate : </label>
                                <input type="text" name="hrate" ref={hourlyrateRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Affiliation : </label>
                                <input type="text" name="affiliation" ref={affiliationRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Education : </label>
                                <input type="text" name="education" ref={educationRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow  ml-20 "> Submit Request </button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default AddPharmacist;
