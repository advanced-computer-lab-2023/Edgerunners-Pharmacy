import Logo from "../../UI/Logo";
import Card from "../../UI/Card";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function AddPharmacist(props) {
  const usernameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dobRef = useRef();
  const hourlyrateRef = useRef();
  const affiliationRef = useRef();
  const educationRef = useRef();
  // const fileRef = useRef();
  const idFileRef = useRef();
  const degreeFileRef = useRef();
  const licenseFileRef = useRef();
  const [Failed, setFailed] = useState(false);

  // const handleFileChange = (e) => {
  const handleFileChange = (fileRef) => (e) => {
    if (e.target.files) {
      //You can perform additional checks or validations if needed
      //console.log("Selected file:", e.target.files[0]);
      console.log(
        `Selected file for ${fileRef.current.name}:`,
        e.target.files[0]
      );
    }
  };

  const handleUpload = async () => {
    // const file = fileRef.current.files[0];
    const idFile = idFileRef.current.files[0];
    const degreeFile = degreeFileRef.current.files[0];
    const licenseFile = licenseFileRef.current.files[0];
    console.log(idFile);
    const formData = new FormData();
    // if (file) {
    formData.append("Username", usernameRef.current.value);
    formData.append("Name", nameRef.current.value);
    formData.append("Email", emailRef.current.value);
    formData.append("Password", passwordRef.current.value);
    formData.append("DOB", dobRef.current.value);
    formData.append("Hourlyrate", hourlyrateRef.current.value);
    formData.append("Affiliation", affiliationRef.current.value);
    formData.append("Education", educationRef.current.value);
    formData.append("idFile", idFile);
    formData.append("degreeFile", degreeFile);
    formData.append("licenseFile", licenseFile);
    // formData.append("file", file);
    try {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
      if (passwordRegex.test(passwordRef.current.value)) {
        const result = await axios.post(
          "http://localhost:3001/uploadFile",
          formData
        );
        console.log(result.data);
      } else {
        setFailed(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  function submitHandeler(event) {
    event.preventDefault();
    // const usernameValue = usernameRef.current.value;
    // const nameValue = nameRef.current.value;
    // const emailValue = emailRef.current.value;
    // const passwordValue = passwordRef.current.value;
    // const dateofbirthValue = dobRef.current.value;
    // const hourlyrateValue = hourlyrateRef.current.value;
    // const affiliationValue = affiliationRef.current.value;
    // const educationValue = educationRef.current.value;
    // const fileValue = fileRef.current.value;
    // const AddPharmacist = {
    //   Username: usernameValue,
    //   Name: nameValue,
    //   Email: emailValue,
    //   Password: passwordValue,
    //   DOB: dateofbirthValue,
    //   Hourlyrate: hourlyrateValue,
    //   Affiliation: affiliationValue,
    //   Education: educationValue,
    // };
    // console.log(AddPharmacist);
    // axios
    //   .post("http://localhost:3001/addPharmacist", AddPharmacist, {})
    //   .then((res) => {
    //     console.log("Pharmacist added");
    //     usernameRef.current.value = "";
    //     passwordRef.current.value = "";
    //   })
    //   .catch((error) => {
    //     console.log("Unable to add Pharmacist");
    //   });
    handleUpload();
  }

  return (
    <div className="flex justify-center mt-10 pb-10">
      <Card width="w-4/12" height="h-[65rem]">
        <div className="flex justify-center mt-6 mb-0">
          <div className="justify-center flex mt-6 mb-4">
            <a href="/">
              <Logo height="3rem" className="mr-9" />
            </a>
          </div>
          <h1 className="text-xl font-bold text-center text-sky-600 mr-8 mt-9">
            Register as pharmacist
          </h1>
        </div>
        <div className="flex justify-center mt-4 mb-0">
          <form onSubmit={submitHandeler}>
            <div className="">
              <div>
                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2">
                  {" "}
                  Username :{" "}
                </label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={usernameRef}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2">
                  {" "}
                  Name :{" "}
                </label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={nameRef}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500 ml-2">
                  {" "}
                  Email :{" "}
                </label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
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
              <div>
                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2">
                  {" "}
                  Date of birth :{" "}
                </label>
                <input
                  type="date"
                  name="bday"
                  ref={dobRef}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2">
                  {" "}
                  Hourly rate :{" "}
                </label>
                <input
                  type="text"
                  name="hrate"
                  ref={hourlyrateRef}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2">
                  {" "}
                  Affiliation :{" "}
                </label>
                <input
                  type="text"
                  name="affiliation"
                  ref={affiliationRef}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2">
                  {" "}
                  Education :{" "}
                </label>
                <input
                  type="text"
                  name="education"
                  ref={educationRef}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* <div>
                <label className="text-xl font-bold font-SourceSansPro text-gray-500 ml-2">
                  {" "}
                  Upload File :{" "}
                </label>
                <br />
                <input
                  type="file"
                  name="file"
                  ref={fileRef}
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div> */}

              <div>
                <label className="text-xl font-bold font-SourceSansPro text-gray-500 ml-2">
                  {" "}
                  ID Document :{" "}
                </label>
                <br />
                <input
                  type="file"
                  name="idFile"
                  ref={idFileRef}
                  onChange={handleFileChange(idFileRef)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  multiple
                />
              </div>
              <div>
                <label className="text-xl font-bold font-SourceSansPro text-gray-500 ml-2">
                  {" "}
                  Pharmacy Degree :{" "}
                </label>
                <br />
                <input
                  type="file"
                  name="degreeFile"
                  ref={degreeFileRef}
                  onChange={handleFileChange(degreeFileRef)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  multiple
                />
              </div>
              <div>
                <label className="text-xl font-bold font-SourceSansPro text-gray-500 ml-2">
                  {" "}
                  Working License :{" "}
                </label>
                <br />
                <input
                  type="file"
                  name="licenseFile"
                  ref={licenseFileRef}
                  onChange={handleFileChange(licenseFileRef)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  multiple
                />
              </div>

              <button
                className="text-sky-600 outline w-40 h-9 rounded-md mt-5 shadow ml-20"
                type="submit"
              >
                {" "}
                Submit Request{" "}
              </button>
              {Failed && (
                <p style={{ color: "red" }}> Incorrect password format.</p>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default AddPharmacist;
