import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
    const [Failed, setFailed] = useState(false);
    const passwordRef = useRef();
    const passwordConRef = useRef();

    let navigate = useNavigate();
    const routeChange = () => {
        let type = sessionStorage.getItem("type");
        if (type === "Pharmacist") {
            type = "Pharm";
        }
        let path = `/${type}`;
        navigate(path);
    };

    function submitHandeler(event) {
        event.preventDefault();
        const usernameValue = sessionStorage.getItem("Username");
        const passwordValue = passwordRef.current.value;
        const passwordConValue = passwordConRef.current.value;
        const change = {
            Username: usernameValue,
            Password: passwordValue,
            confirmPassword: passwordConValue,
        };
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
        if (passwordRegex.test(passwordRef.current.value)) {
            setFailed(false);
            axios
                .put("http://localhost:3001/changePassword", change, {})
                .then((res) => {
                    console.log(res);
                    console.log("Password changed");
                    passwordRef.current.value = "";
                    passwordConRef.current.value = "";
                    let type = sessionStorage.getItem("type");
                    if (type === "Pharmacist") {
                        type = "Pharm";
                    }
                    window.location.href = `/${type}`;
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setFailed(true);
        }
    }
    return (
        <div>
            <div className="text-2xl font-bold flex justify-center text-center text-sky-600 mt-16">
                <a>{sessionStorage.getItem("type")}<br></br>Username: {sessionStorage.getItem("Username")}</a>
            </div>
            <div>
                <button className="  text-sky-600  outline  w-40  h-9  rounded-md shadow" onClick={routeChange}> Back </button>
            </div>
            <div className=" justify-center flex mt-6">
                <Card width='w-4/12' height=' h-[26rem]'>
                    <div className=" flex justify-center  mt-6 mb-0 ">
                        <a
                            onClick={() => {
                                let type = sessionStorage.getItem("type");
                                if (type === "Pharmacist") {
                                    type = "Pharm";
                                }
                                window.location.href = `/${type}`;
                            }}
                        ><Logo height='4rem' className="mt-6 mb-0" /></a>
                        <h1 className="text-2xl font-bold text-center text-sky-600 ml-0 mt-6">Change Password</h1>
                    </div >
                    <div className=" flex justify-center mt-7">

                        <form onSubmit={submitHandeler}>
                            <div className=" mt-3">
                                <div className=" mb-4">
                                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Enter New Password : </label>
                                    <br />
                                    <input type="password" id="password" ref={passwordRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className=" mb-4">
                                    <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2"> Confirm Password : </label>
                                    <br />
                                    <input type="password" id="passwordCon" ref={passwordConRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className=" flex justify-center  mt-6">
                                    <br />
                                    <br />
                                    <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow"> Confirm </button>
                                </div>
                                {Failed && (
                                    <p className="text-red-500 text-center mt-2">
                                        Incorrect password format.
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}


export default ChangePassword;