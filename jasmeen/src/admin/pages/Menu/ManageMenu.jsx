import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FadeLoader } from "react-spinners";
import ApiServices from "../../../ApiServices";

export default function ManageMenu() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);

    // fetch all menus
    const fetchMenus = async () => {
        setLoading(true);
        try {
            const res = await ApiServices.getMenus(); // API call (you need this in ApiServices)
            if (res.data.success) {
                setMenus(res.data.data); // assuming API returns {success:true, data:[...]}
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

    // delete menu
    const handleDelete = async (id) => {
       
        try {
            const res = await ApiServices.deleteMenu({ _id: id }); // API call (define in ApiServices)
            if (res.data.success) {
                toast.success("Menu deleted successfully");
                setMenus(menus.filter((menu) => menu._id !== id));
            } else {
                toast.error(res.data.message || "Failed to delete");
            }
        } catch (err) {
            console.error("Error deleting menu:", err);
            toast.error("Something went wrong while deleting");
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
                            Manage Menus
                        </h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item">
                                    <Link to="#">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="#">Admin</Link>
                                </li>
                                <li
                                    className="breadcrumb-item text-white active"
                                    aria-current="page"
                                >
                                    Manage Menus
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
                    <div className="d-flex justify-content-between mb-3">
                        <h3>All Menus</h3>
                        <Link to="/admin/add-menu" className="btn btn-primary">
                            + Add Menu
                        </Link>
                    </div>

                    {menus.length === 0 ? (
                        <p>No menus found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Day</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menus.map((menu, index) => (
                                        <tr key={menu._id}>
                                            <td>{index + 1}</td>
                                            <td>{menu.name}</td>
                                            <td>{menu.category}</td>
                                            <td>{menu.day}</td>
                                            <td>₹{menu.price}</td>
                                            <td>
                                                {menu.image ? (
                                                    <img
                                                        src={menu.image}
                                                        alt={menu.image}
                                                        width="60"
                                                        height="50"
                                                    />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm me-2"
                                                    onClick={() => handleDelete(menu._id)}
                                                >
                                                    Delete
                                                </button>
                                                <Link
                                                    to={`/admin/updatemenu/${menu._id}`}
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
