import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FadeLoader } from "react-spinners";
import ApiServices from "../../ApiServices";
import { Link } from "react-router-dom";

function ViewMenu() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMenus = async () => {
        setLoading(true);
        try {
            const res = await ApiServices.getMenus();
            console.log(res);
            if (res.data.success) {
                setMenus(res.data.data);
            } else {
                toast.error(res.data.message || "Failed to load menus");
            }
        } catch (err) {
            console.error("Error fetching menus:", err);
            toast.error("Something went wrong while fetching menus");
        } finally {
            setLoading(false);
        }
    };

  

    useEffect(() => {
        fetchMenus();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="container-xxl bg-white p-0">
                <div className="container-xxl py-5 bg-dark hero-header mb-5">
                    <div className="container text-center my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            Food Menu
                        </h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">Pages</a>
                                </li>
                                <li className="breadcrumb-item text-white active" aria-current="page">
                                    Menu
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                {/* Menu Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                                Food Menu
                            </h5>
                            <h1 className="mb-5">Most Popular Items</h1>
                        </div>

                        {loading ? (
                            <FadeLoader cssOverride={{ margin: "10% auto" }} />
                        ) : (
                            <div className="row g-4">
                                {menus.length > 0 ? (
                                    menus.map((menu) => (
                                        <div className="col-lg-6" key={menu._id}>
                                            <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        className="flex-shrink-0 img-fluid rounded"
                                                        src={menu.image || "/assets/img/default-food.jpg"}
                                                        alt={menu.name}
                                                        style={{ width: 80 }}
                                                    />
                                                    <div className="w-100 d-flex flex-column text-start ps-4">
                                                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                            <span>{menu.name} -</span>
                                                            <span className="text-primary"> -Rs. {menu.price}</span>
                                                        </h5>
                                                        <small className="fst-italic">{menu.description}</small>
                                                    </div>
                                                </div>
                                                {/* Order Button */}
                                                <Link to={`/addOrder/${menu._id}/${menu.price}`} 
                                                    className="btn btn-sm btn-primary ms-3"
                                                   
                                                >
                                                    Order
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center">No menu items found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/* Menu End */}

                {/* Back to Top */}
                <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                    <i className="bi bi-arrow-up" />
                </a>
            </div>
        </>
    );
}

export default ViewMenu;
