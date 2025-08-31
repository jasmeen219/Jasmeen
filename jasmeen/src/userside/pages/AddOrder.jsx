import React, { useState } from "react";
import ApiServices from "../../ApiServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { addOrder } from "../apiservices"; // adjust the path as needed

function AddOrder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const {id,price}=useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = { 
            name:name,
            email: email, 
             contact:contact,
            address: address,
            userId: sessionStorage.getItem("userId"),
            menuitemId:id,
            total:price


         }
      await ApiServices.addorder(data).then((res)=>{
        console.log(res);
        
      }).catch((err)=>{
        toast.error(err.message)
      }) // call API
      setName("");
      setEmail("");
      setContact("");
      setAddress("");
    } catch (err) {
      console.error(err);
    //   alert("Failed to place order.");
    }
  };

  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Place Order
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">Pages</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Order
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Order Now
            </h5>
            <h1 className="mb-5">Fill Your Details</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="contact"
                          placeholder="Contact Number"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                        <label htmlFor="contact">Contact Number</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          id="address"
                          placeholder="Delivery Address"
                          style={{ height: 150 }}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label htmlFor="address">Delivery Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#"
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
      >
        <i className="bi bi-arrow-up" />
      </a>
    </div>
  );
}

export default AddOrder;
