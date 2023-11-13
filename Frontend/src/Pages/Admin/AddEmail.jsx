import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import { useRef } from "react";
import Sidebar from "../../Components/SidebarAdmin";
import axios from "axios";

function AddEmail(props) {
    const usernameRef = useRef();
    const emailRef = useRef();
    function submitHandeler(event) {
        event.preventDefault();
        const usernameValue = usernameRef.current.value;
        const emailValue = emailRef.current.value;
        const newAdmin = {
            Username: usernameValue,
            Email: emailValue,
        };
        console.log(newAdmin);
        axios
        .put("http://localhost:3001/updateAdmin", newAdmin, {

        })
        .then((res) => {
          console.log("Admin updated");
          usernameRef.current.value="";
          emailRef.current.value="";
        })
        .catch((error) => {
            console.log("Unable to update email");
        });
    }
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className=" justify-center flex mt-20">
                <Card width='w-4/12' height=' h-[32rem]'>
                    <div className=" flex justify-center  mt-6 mb-0 ">
                        <a href="/Admin"><Logo height='4rem' className="mt-6 mb-0" /></a>
                        <h1 className="text-2xl font-bold text-center text-sky-600 ml-0 mt-6">New Email</h1>
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
                                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Enter email : </label>
                                    <br />
                                    <input type="text" id="email" ref={emailRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
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


export default AddEmail;