import { data, Link } from "react-router-dom";
import React, { useState } from "react";
import PageTitle from "../Layout/Pagetitle";
import axios from "axios";
// import PageTitle from "./Layout/PageTitle"; // Adjusted import path for your project

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

const  handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can handle the login logic, e.g., API call to authenticate the user
    console.log("Email:", email);
    console.log("Password:", password);
  const data={
    email: email,
    password: password
  }
  await axios.post("http://localhost:4001/api/user/login", data).then((res) => {
    console.log(res.data);
   
  }).catch((err) => {
    console.error("Error during login:", err);
    alert("Login Failed");  
  })
    
  }




  return (
    <>
      <PageTitle title={"Login"} />
      
      <div className="container my-5">
        <div className="row no-gutters">
          <div className="col-md-7">
            <div className="contact-wrap w-100 p-md-5 p-4">
              <h3 className="mb-4">Login</h3>
              <form
           
                id="loginForm"
                name="loginForm"
                className="contactForm"
                onSubmit={handleSubmit}
                
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="label" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary"
                      />
                      <div className="submitting" />
                    </div>
                  </div>
                </div>
              </form>
              <div>
                Don't have an account? <Link to="/register">Register!</Link>
              </div>
            </div>
          </div>
          <div className="col-md-5 d-flex align-items-stretch">
            <div
              className="info-wrap w-100 p-5 img"
              style={{ backgroundImage: "url(/assets/images/img.jpg)" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
