import { data, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PageTitle from "../Layout/Pagetitle";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../../ApiServices";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const nav=useNavigate()

const  handleSubmit = async(e) => {
  setloading(true)
    e.preventDefault();
    // Here you can handle the login logic, e.g., API call to authenticate the user
    console.log("Email:", email);
    console.log("Password:", password);
  const data={
    email: email,
    password: password
  }
  // await axios.post("http://localhost:4001/api/user/login", data).then((res) => {
  await ApiServices.login(data).then((res) => {
    console.log(res.data);
   if(res.data.success){
     toast.success(res.data.message)
     sessionStorage.setItem("userId", res.data.data._id)
     sessionStorage.setItem("email", res.data.data.email)
     sessionStorage.setItem("token", res.data.token)
     sessionStorage.setItem("isLogin", true)
     sessionStorage.setItem("userType", res.data.data.userType)

     if (res.data.data.userType==1){
      nav("/admin")
     }

    }
    else{
     toast.success(res.data.message)

   }
    // sessionStorage.setItem("isLogin", true)


    
  }).catch((err) => {
    console.error("Error during login:", err);
    toast.error(res.data.message)
    alert("Login Failed");  

  }).finally(()=>{
    setloading(false)
  })
    
  }




  return (
    <>
    <ToastContainer/>
      {/* <PageTitle title={"Login"} /> */}
      
            <div className="container-xxl bg-white p-0">
                <div className="container-xxl py-5 bg-dark hero-header mb-5">
                    <div className="container text-center my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            Login 
                        </h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item">
                                    <Link to="#">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="#">Pages</Link>
                                </li>
                                <li
                                    className="breadcrumb-item text-white active"
                                    aria-current="page"
                                >
                                    Login
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
    </div>
      {
        loading?
        <FadeLoader cssOverride={{ margin: "20% 50%" }} />
        :
      <div className="container my-5">

        <div className="row no-gutters justify-content-center">
          <div className="col-md-8" style={{ boxshadow: "0px 0px 0px 10px gray" }}>
            <div className="contact-wrap w-100 p-md-5 p-4">


              <h3 className="mb-4 text-center">Login</h3>
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
          
        </div>
      </div>
      }
      
      
    </>
  );
}
