import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import ApiServices from "../../ApiServices";
import { FadeLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [meals, setMeals] = useState("");
  const [price, setPrice] = useState("");
  const [mealdate, setMealDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name,
      email,
      password,
      meals,
      price,
      mealdate,
      deliveryaddress: deliveryAddress,
    };

    try {
      const res = await ApiServices.CustomerRegister(data);
      console.log(res.data);
      toast.success(res.data.message || "Registration successful!");

      // Optionally store user session after registration (like login)
      sessionStorage.setItem("userId", res.data.data?._id);
      sessionStorage.setItem("email", res.data.data?.email);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("isLogin", true);

    } catch (err) {
      console.error("Error during registration:", err);
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-xxl bg-white p-0">
        <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container text-center my-5 pt-5 pb-4">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Register
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
                  Register
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {loading ? (
        <FadeLoader cssOverride={{ margin: "20% 50%" }} />
      ) : (
        <div className="container my-5">
          <div className="row justify-content-center no-gutters">
            <div className="col-md-7">
              <div className="contact-wrap w-100 p-md-5 p-4">
                <h3 className="mb-4">Register</h3>
                <form
                  onSubmit={handleSubmit}
                  method="POST"
                  id="RegisterForm"
                  name="RegisterForm"
                  className="contactForm"
                >
                  <div className="row">
                    {/* Name */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter your name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter your email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter your password"
                          required
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Meals */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="meals">Meals</label>
                        <input
                          type="text"
                          className="form-control"
                          id="meals"
                          placeholder="Meal name"
                          required
                          value={meals}
                          onChange={(e) => setMeals(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          placeholder="Enter price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Meal Date */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="mealdate">Meal Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="mealdate"
                          required
                          value={mealdate}
                          onChange={(e) => setMealDate(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="deliveryAddress">Delivery Address</label>
                        <textarea
                          className="form-control"
                          id="deliveryAddress"
                          placeholder="Enter delivery address"
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Register"
                          className="btn btn-primary"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div>
                  Already have an account?{" "}
                  <Link to="/login">Login here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
