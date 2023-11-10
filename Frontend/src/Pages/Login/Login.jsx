import React, { Component } from "react";
import { useRef, useState } from "react";
import SelectGender from "../../UI/SelectGender";
import SelectRelation from "../../UI/SelectRelation";
import axios from "axios";
import './PatientReg.scss'

class Login extends Component {
    state = {
        isContainerActive: false,
        signUp_name: null,
        signUp_email: null,
        signUp_password: null,
        signUp_number: null,
        signIn_username: null,
        signIn_password: null,
        signUp_gender: null,

        role: null,
        signUp_hourlyRate: null,
        file: null,
    };
    handleFileChange = (e) => {
        if (e.target.files) {
            this.setState({ file: e.target.files[0] });
        }
    };

    handleUpload = async () => {
        if (this.state.file) {
            const formData = new FormData();
            formData.append("Username", this.state.signUp_username);
            formData.append("Name", this.state.signUp_name);
            formData.append("Email", this.state.signUp_email);
            formData.append("Password", this.state.signUp_password);
            formData.append("DOB", this.state.signUp_DOB);
            formData.append("Hourlyrate", this.state.signUp_hourlyRate);
            formData.append("Affiliation", this.state.signUp_affiliation);
            formData.append("Education", this.state.signUp_education);
            formData.append("file", this.state.file);
            console.log(sessionStorage.getItem("Username"));
            try {
                const result = await fetch("http://localhost:3001/uploadFile", {
                    method: "POST",
                    body: formData,
                });

                const data = await result.json();

                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    };
    signUpAdmin = (event) => {
        event.preventDefault();
        const newUser = {
            Username: this.state.signUp_username,
            Password: this.state.signUp_password,
        };
        console.log(newUser);

        axios
            .post("http://localhost:3001/addAdmin", newUser)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({ isContainerActive: false });

    };
    signUpPatient = (event) => {
        event.preventDefault();
        const newUser = {
            Username: this.state.signUp_username,
            Password: this.state.signUp_password,
            DOB: this.state.signUp_DOB,
            Gender: this.state.signUp_gender,
            phoneNumber: this.state.signUp_number,
            Name: this.state.signUp_name,
            Email: this.state.signUp_email,
            EmergencyContact: {
                FullnameEC: this.state.signUp_emergencyContactName,
                phoneNumberEC: this.state.signUp_emergencyContactNumber,
                relationEC: this.state.signUp_relation,
            },
        };
        console.log(newUser);

        axios
            .post("http://localhost:3001/addPatient", newUser)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({ isContainerActive: false });

    };
    signUpPharmacist = (event) => {
        event.preventDefault();
        const newUser = {
            Username: this.state.signUp_username,
            Name: this.state.signUp_name,
            Email: this.state.signUp_email,
            Password: this.state.signUp_password,
            DOB: this.state.signUp_DOB,
            Hourlyrate: this.state.signUp_hourlyRate,
            Affiliation: this.state.signUp_affiliation,
            Education: this.state.signUp_education,
        };
        console.log(newUser);

        axios
            .post("http://localhost:3001/addPharmacist", newUser)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({ isContainerActive: false });

    };
    signIn = async (event) => {
        event.preventDefault();
        const newUser = {
            Username: this.state.signIn_username,
            Password: this.state.signIn_password,
        };
        axios
            .post("http://localhost:3001/signin", {
                Username: newUser.Username,
                Password: newUser.Password,
            })
            .then((res) => {
                sessionStorage.setItem("Username", res.data.Username);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("type", res.data.type);

                console.log(res);
                if (res.statusText == "OK") {
                    if (sessionStorage.getItem("type") == "Patient") {
                        window.location.replace("/Patient");
                    } else if (sessionStorage.getItem("type") == "Pharmacist") {
                        if (sessionStorage.getItem("ReqStatus") == "Accepted") {
                            window.location.replace("/Pharmacist");
                        }
                        // else if(sessionStorage.getItem("Status") == "Waiting"){
                        //   window.location.replace("/Contract");
                        // }              
                    } else {
                        window.location.replace("/Admin");
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    render() {
        return (
            <div className="PatientReg">
                <body>
                    <div
                        className={`container${this.state.isContainerActive ? " right-panel-active" : ""
                            }`}
                        id="container"
                    >
                        {this.state.role === "Patient" && (
                            // Patient Registration
                            <div class="form-container sign-up-container">
                                <form action="">
                                    <h1>Create Account</h1>
                                    <div class="social-container">
                                        <a href="#" class="social">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#" class="social">
                                            <i class="fab fa-google-plus-g"></i>
                                        </a>
                                        <a href="#" class="social">
                                            <i class="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                    <span>or Use your Email for registration</span>
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_username: event.currentTarget.value,
                                            });
                                        }}
                                        type="text"
                                        placeholder="Username"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({ signUp_name: event.currentTarget.value });
                                        }}
                                        type="text"
                                        placeholder="Name"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_email: event.currentTarget.value,
                                            });
                                        }}
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_password: event.currentTarget.value,
                                            });
                                        }}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <SelectGender
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_gender: event.currentTarget.value,
                                            });
                                        }}
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_number: event.currentTarget.value,
                                            });
                                        }}
                                        type="number"
                                        placeholder="Phone Number"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({ signUp_DOB: event.currentTarget.value });
                                        }}
                                        type="date"
                                        placeholder="Date Of Birth"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_emergencyContactName: event.currentTarget.value,
                                            });
                                        }}
                                        type="text"
                                        placeholder="Emergency Contact Name"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_emergencyContactNumber:
                                                    event.currentTarget.value,
                                            });
                                        }}
                                        type="number"
                                        placeholder="Emergency Contact Number"
                                    />
                                    <SelectRelation
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_relation: event.currentTarget.value,
                                            });
                                        }}
                                    />
                                    <button onClick={this.signUpPatient}> Sign Up</button>
                                </form>
                            </div>
                        )}

                        {this.state.role === "Pharmacist" && (
                            // Pharmacist Registration
                            <div class="form-container sign-up-container">
                                <form action="">
                                    <h1>Create Account</h1>
                                    <div class="social-container">
                                        <a href="#" class="social">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#" class="social">
                                            <i class="fab fa-google-plus-g"></i>
                                        </a>
                                        <a href="#" class="social">
                                            <i class="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                    <span>or use your email for registration</span>
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_username: event.currentTarget.value,
                                            });
                                        }}
                                        type="text"
                                        placeholder="Username"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({ signUp_name: event.currentTarget.value });
                                        }}
                                        type="text"
                                        placeholder="Name"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_email: event.currentTarget.value,
                                            });
                                        }}
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_password: event.currentTarget.value,
                                            });
                                        }}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_hourlyRate: event.currentTarget.value,
                                            });
                                        }}
                                        type="number"
                                        placeholder="Hourly Rate"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({ signUp_DOB: event.currentTarget.value });
                                        }}
                                        type="date"
                                        placeholder="Date Of Birth"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_affiliation: event.currentTarget.value,
                                            });
                                        }}
                                        type="text"
                                        placeholder="Affiliation"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_education: event.currentTarget.value,
                                            });
                                        }}
                                        type="text"
                                        placeholder="Education"
                                    />
                                    <div className="input-group">
                                        <label htmlFor="file" className="sr-only">
                                            Choose a file
                                        </label>
                                        <input
                                            id="file"
                                            type="file"
                                            onChange={this.handleFileChange}
                                        />
                                    </div>

                                    {this.state.file && (
                                        <button onClick={() => {
                                            this.handleUpload();
                                            this.signUpPharmacist();
                                        }} className="submit">
                                            Sign Up
                                        </button>
                                    )}
                                    {/* <button onClick = {this.handleUpload}> Sign Up</button> */}
                                </form>
                            </div>
                        )}

                        {this.state.role === "Admin" && (
                            // Admin Registration
                            <div class="form-container sign-up-container">
                                <form action="">
                                    <h1>Create Account</h1>
                                    <div class="social-container">
                                        <a href="#" class="social">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#" class="social">
                                            <i class="fab fa-google-plus-g"></i>
                                        </a>
                                        <a href="#" class="social">
                                            <i class="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                    <span>or Use your Email for registration</span>
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_username: event.currentTarget.value,
                                            });
                                        }}
                                        type="text"
                                        placeholder="Username"
                                    />
                                    <input
                                        onChange={(event) => {
                                            this.setState({
                                                signUp_password: event.currentTarget.value,
                                            });
                                        }}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <button onClick={this.signUpAdmin}> Sign Up</button>
                                </form>
                            </div>
                        )}

                        <div class="form-container sign-in-container">
                            <img class="raya-img" alt="" />
                            <form action="">
                                <h1>Sign in</h1>
                                <div class="social-container">
                                    <a href="/patientHome" class="social">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" class="social">
                                        <i class="fab fa-google-plus-g"></i>
                                    </a>
                                    <a href="#" class="social">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                                <span>or use your account</span>
                                <input
                                    onChange={(event) => {
                                        this.setState({
                                            signIn_username: event.currentTarget.value,
                                        });
                                    }}
                                    type="text"
                                    placeholder="Username"
                                />
                                <input
                                    onChange={(event) => {
                                        this.setState({
                                            signIn_password: event.currentTarget.value,
                                        });
                                    }}
                                    type="password"
                                    placeholder="Password"
                                />
                                <a href="/ResetPass">Forgot your password?</a>

                                <button onClick={this.signIn}>Sign In</button>
                            </form>
                        </div>
                        <div class="overlay-container">
                            <div class="overlay">
                                <div class="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>
                                        To keep connected with us please login with your personal
                                        details
                                    </p>
                                    <button
                                        class="ghost"
                                        id="signIn"
                                        onClick={() => this.setState({ isContainerActive: false })}
                                    >
                                        Sign In
                                    </button>
                                </div>
                                <div class="overlay-panel overlay-right">
                                    <h1>Hi There!</h1>
                                    <p>Enter your personal details to open an account with us</p>
                                    <button
                                        class="ghost"
                                        id="signUpAdmin"
                                        onClick={() => {
                                            this.setState({ role: "Admin" });
                                            this.setState({ isContainerActive: true });
                                        }}
                                    >
                                        Sign Up as an Admin
                                    </button>
                                    <button
                                        class="ghost"
                                        id="signUpPatient"
                                        onClick={() => {
                                            this.setState({ role: "Patient" });
                                            this.setState({ isContainerActive: true });
                                        }}
                                    >
                                        Sign Up as a Patient
                                    </button>
                                    <button
                                        class="ghost"
                                        id="signUpPharmacist"
                                        onClick={() => {
                                            this.setState({ role: "Pharmacist" });
                                            this.setState({ isContainerActive: true });
                                        }}
                                    >
                                        Sign Up as a Pharmacist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        );
    }
}
export default Login;