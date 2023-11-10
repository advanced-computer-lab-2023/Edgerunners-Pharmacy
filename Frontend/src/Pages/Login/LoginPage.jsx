import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import { useRef } from "react";
import axios from "axios";

function LoginPage(props) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    function submitHandeler(event) {
        event.preventDefault();
        const usernameValue = usernameRef.current.value;
        const passwordValue = passwordRef.current.value;
        const login = {
            Username: usernameValue,
            Password: passwordValue,
        };
        console.log(login);
        axios
            .post("http://localhost:3001/signin", login, {
                Username: login.Username,
                Password: login.Password,
            })
            .then((res) => {
                sessionStorage.setItem("Username", res.data.Username);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("type", res.data.type);

                console.log(res);
                if (res.statusText === "OK") {
                    if (sessionStorage.getItem("type") === "Patient") {
                        window.location.replace("/Patient");
                    } else if (sessionStorage.getItem("type") === "Pharmacist") {
                        window.location.replace("/Pharm");     
                    } else {
                        window.location.replace("/Admin");
                    }
                }
            })
            .catch((error) => {
                console.log("Unable to login");
            });
    }
    return (
        <div>
            <div className=" justify-center flex mt-20">
                <Card width='w-4/12' height=' h-[25rem]'>
                    <div className=" flex justify-center  mt-6 mb-0 ">
                        <a href="/LoginAll"><Logo height='4rem' className="mt-6 mb-0" /></a>
                        <h1 className="text-2xl font-bold text-center text-sky-600 ml-0 mt-6">Login</h1>
                    </div >
                    <div className=" flex justify-center mt-7">

                        <form onSubmit={submitHandeler}>
                            <div className=" mt-3">
                                <div className=" mb-4">
                                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2"> Username : </label>
                                    <br />
                                    <input type="text" id="username" name="username" ref={usernameRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>

                                <div className=" mb-4">
                                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Password : </label>
                                    <br />
                                    <input type="password" id="password" ref={passwordRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
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
    )
}


export default LoginPage;