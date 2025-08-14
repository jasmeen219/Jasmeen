import { Link } from "react-router-dom";
import PageTitle from "../Layout/Pagetitle";
import React, { useState } from "react";
import axios from "axios";

export default function Register() {

  const[email, setEmail] = useState("");
  const[password, setpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the registration logic, e.g., API call to register the user
    console.log("Email:", email);
    console.log("Password:",password)
  }



  return (
    <>
      <PageTitle title={"Register"} />
      <div className="container my-5">
        <div className="row no-gutters">
          <div className="col-md-7">
            <div className="contact-wrap w-100 p-md-5 p-4">
              <h3 className="mb-4">Register</h3>
              <form
                method="POST"
                id="RegisterForm"
                name="RegisterForm"
                className="contactForm"
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
                        value="Register"
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