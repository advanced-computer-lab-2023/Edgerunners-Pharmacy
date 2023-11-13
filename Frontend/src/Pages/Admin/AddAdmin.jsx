import Card from "../../UI/Card";
import Logo from "../../UI/Logo";
import { useRef, useState } from "react";
import Sidebar from "../../Components/SidebarAdmin";
import axios from "axios";
//import {faCheck,faTimes,faInfoCircle} from "@fortawesome/fontawesome-svg-core";
//import {fontAwesomeIcon} from "@fortawesome/fontawesome-svg-core";

function AddAdmin(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();
  const [Failed, setFailed] = useState(false);

  function submitHandeler(event) {
    event.preventDefault();
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;
    const passwordConValue = passwordConRef.current.value;
    const newAdmin = {
      Username: usernameValue,
      Password: passwordValue,
    };
    console.log(newAdmin);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
    if (passwordRegex.test(passwordValue)) {
      axios
        .post("http://localhost:3001/addAdmin", newAdmin, {})
        .then((res) => {
          console.log("Admin added");
          usernameRef.current.value = "";
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
      <div className=" justify-center flex mt-20">
        <Card width="w-4/12" height=" h-[32rem]">
          <div className=" flex justify-center  mt-6 mb-0 ">
            <a href="/Admin">
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
                  <br />
                  <br />
                  <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow">
                    {" "}
                    Confirm{" "}
                  </button>
                  {Failed && <p>Incorrect password format.</p>}
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AddAdmin;
