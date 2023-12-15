import React, { useMemo, useState, useCallback, useRef } from "react";
import emailjs from "emailjs-com";
import axios from "axios";
import "./resetPass.css"; // Import the CSS file
import { Link } from "react-router-dom";

export default function ResetPass() {
  const [Email, setEmail] = useState("");
  const final1 = useMemo(() => Math.floor(Math.random() * 900) + 100, [Email]);
  const final2 = useMemo(() => Math.floor(Math.random() * 900) + 100, [Email]);
  const [OTP, setOTP] = useState(false);
  const [Intial, setIntial] = useState(true);
  const [UserInput, SetUserInput] = useState(["", "", "", "", "", ""]);
  const [Verified, setVerified] = useState(false);
  const [NewPass, setNewPass] = useState("");
  const [Success, setSuccess] = useState(false);
  const [Failed, setFailed] = useState(false);
  const inputRefs = useRef([]);
  const passwordValidation = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
    if (passwordRegex.test(NewPass)) {
      ResetPass(); // Call the signup function here or perform other actions
    } else {
      // Show error in the register page
      setFailed(true);
    }
  };

  const handleVerify = () => {
    const res1 = UserInput[0] + UserInput[1] + UserInput[2];
    const res2 = UserInput[3] + UserInput[4] + UserInput[5];
    console.log(res1 + res2);
    console.log(final1 + "" + final2);
    if (parseInt(res1) === final1 && parseInt(res2) === final2) {
      setVerified(true);
      setOTP(false);
    }
  };

  const handleInputChange = (e, index) => {
    const updatedUserInput = [...UserInput];
    updatedUserInput[index] = e.target.value;
    SetUserInput(updatedUserInput);
  };

  const handle = () => {
    if (Email !== "") {
      console.log(final1 + "" + final2);
      emailjs.send(
        "service_bow4wjw",
        "template_1p4aore",
        {
          name: "my pookie bear",
          message: `your OTP is ${final1}-${final2}`,
          reciever: Email,
        },
        "EDcsSrK17MRIgCsU9"
      );
      setIntial(false);
      setOTP(true);
    }

  };

  const ResetPass = async () => {
    const res = await axios.put("http://localhost:3001/ResetPass", {
      Email: Email,
      Password: NewPass,
    });
    setVerified(false);
    if (res.data === "all good") {
      setSuccess(true);
      setFailed(false);
      window.location.href = "/";
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="outer">
      <div className="reset-pass-container">
        {OTP && (
          <React.Fragment>
            <div className="title">Enter the OTP</div>
            <div className="otp-input">
              {UserInput.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleInputChange(e, index)}
                  value={value}
                  className="input-field"
                />
              ))}
            </div>
            <button className="button" onClick={handleVerify}>verify</button>
          </React.Fragment>

        )}
        {Intial && (
          <React.Fragment>
            <div className="title">Enter Registered Email</div>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <button className="button" onClick={handle}>
              Reset Password
            </button>
          </React.Fragment>
        )}
        {Verified && (
          <React.Fragment>
            <div className="title">Enter New Password</div>
            <input
              type="password"
              placeholder="Enter your new password"
              onChange={(e) => setNewPass(e.target.value)}
              className="input-field"
            />
            <button className="button" onClick={passwordValidation}>
              Submit
            </button>
          </React.Fragment>
        )}
        {Success && <p className="message">Password updated successfully.</p>}
        {Failed && <p className="message">An error occurred.</p>}
        <div className="back-to-login">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}