import { Link } from "react-router-dom";
import React from "react";
import PageTitle from "../Layout/Pagetitle";
// import PageTitle from "./Layout/PageTitle"; // Adjusted import path for your project

export default function Login() {
  return (
    <>
      <PageTitle title={"Login"} />
      <div className="container my-5">
        <div className="row no-gutters">
          <div className="col-md-7">
            <div className="contact-wrap w-100 p-md-5 p-4">
              <h3 className="mb-4">Login</h3>
              <form
                method="POST"
                id="loginForm"
                name="loginForm"
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