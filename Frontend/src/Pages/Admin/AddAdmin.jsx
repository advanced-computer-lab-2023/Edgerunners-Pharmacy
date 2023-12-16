import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import { useRef, useState } from "react";
import Sidebar from "../../Components/SidebarAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import {faCheck,faTimes,faInfoCircle} from "@fortawesome/fontawesome-svg-core";
//import {fontAwesomeIcon} from "@fortawesome/fontawesome-svg-core";

function AddAdmin(props) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();
  const [Failed, setFailed] = useState(false);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/ViewAdminInfoAdmin`;
    navigate(path);
  };

  function submitHandeler(event) {
    event.preventDefault();
    const usernameValue = usernameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const passwordConValue = passwordConRef.current.value;
    const newAdmin = {
      Username: usernameValue,
      Email: emailValue,
      Password: passwordValue,
    };
    console.log(newAdmin);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
    if (passwordRegex.test(passwordValue) && passwordConValue == passwordValue) {
      setFailed(false);
      axios
        .post("http://localhost:3001/addAdmin", newAdmin, {})
        .then((res) => {
          console.log("Admin added");
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          passwordConRef.current.value = "";
        })
        .catch((error) => {
          console.log("Unable to add admin");
        });
    } else {
      setFailed(true);
    }
  }
  return (
    <div>
      <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <div className="mt-28">
        <button className=" text-sky-600  outline  w-40  h-9  rounded-md shadow ml-16" onClick={routeChange}>Back</button>
        <div className=" justify-center flex">
          <Card width="w-4/12" height=" h-[36rem]">
            <div className=" flex justify-center  mt-6 mb-0 ">
              <a href="/ViewAdminInfoAdmin">
                <Logo height="4rem" className="mt-6 mb-0" />
              </a>
              <h1 className="text-2xl font-bold text-center text-sky-600 ml-0 mt-6">
                New Admin
              </h1>
            </div>
            <div className=" flex justify-center mt-7">
              <form onSubmit={submitHandeler}>
                <div className=" mt-3">
                  <div className=" mb-4">
                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2">
                      {" "}
                      Username :{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      ref={usernameRef}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className=" mb-4">
                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2">
                      {" "}
                      Email :{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      id="email"
                      name="email"
                      ref={emailRef}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className=" mb-4">
                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2">
                      {" "}
                      Password :{" "}
                    </label>
                    <br />
                    <input
                      type="password"
                      id="password"
                      ref={passwordRef}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className=" mb-4">
                    <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2">
                      {" "}
                      Confirm Password :{" "}
                    </label>
                    <br />
                    <input
                      type="password"
                      id="passwordCon"
                      ref={passwordConRef}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className=" flex justify-center  mt-6">
                    {/* <br />
                  <br /> */}
                    <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow">
                      {" "}
                      Confirm{" "}
                    </button>
                  </div>
                </div>
                {Failed && (
                  <p className="text-red-500 text-center mt-2">
                    Incorrect password format.
                  </p>
                )}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
