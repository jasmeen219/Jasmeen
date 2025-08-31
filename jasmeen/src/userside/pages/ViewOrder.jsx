import React, { useEffect, useState } from "react";
import ApiServices from "../../ApiServices";
import { toast } from "react-toastify";

function ViewOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = sessionStorage.getItem("userId"); // in case you need to filter by user
                await ApiServices.viewOrder({ userId }).then((res) => {
                    // adjust if API returns differently (e.g. res.data)
                    setOrders(res.data || res);
                }).catch((err) => {
                    toast.error(err.message);
                });
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch orders");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container text-center my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">
                        My Orders
                    </h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center text-uppercase">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Orders
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                            Your Orders
                        </h5>
                        <h1 className="mb-5">Order History</h1>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="table-responsive wow fadeInUp" data-wow-delay="0.2s">
                                <table className="table table-bordered table-hover text-center">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>Menu Item</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length > 0 ? (
                                            orders.map((order, index) => (
                                                <tr key={order._id || index}>
                                                    <td>{index + 1}</td>
                                                    <td>{order.name}</td>
                                                    <td>{order.email}</td>
                                                    <td>{order.contact}</td>
                                                    <td>{order.address}</td>
                                                    <td>{order.menuitemId}</td>
                                                    <td>{order.total}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7">No orders found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
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

export default ViewOrders;
