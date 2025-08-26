import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiServices from "../../ApiServices";

export default function ManageVendor() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    // Check authentication & role
    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLogin");
        const userType = sessionStorage.getItem("userType");

        if (!isLogin || userType !== "1") {
            toast.error("Unauthorized! Admin only.");
            nav("/login");
        } else {
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        
        
        await ApiServices.getAllVendors().then((res)=>{

            setUsers(res.data.data)
            console.log(res.data);
            
        })
        fetchVendors()
        
        setLoading(false);
            
       
    };

    const handleDelete = async (userId) => {

        setLoading(true);
        try {
            let data = { _id: userId }
            console.log(data);
            
            await ApiServices.VendorStatus(data).then((res)=>{
                console.log(res.data);
                
            })
            toast.success("User deleted successfully!");


            // setUsers(users.filter((u) => u._id !== userId));
        } catch (err) {
            console.error(err);
            toast.error("Error deleting user!");
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

                {loading ? (
                    <FadeLoader cssOverride={{ margin: "20% 50%" }} />
                ) : (
                   <div className="container">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>User Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    {user.userType === 1 ? "Admin" : "Customer"}
                                                </td>
                                                <td>
                                                    <button
                                                        className={user.status ? "btn btn-success " : "btn btn-danger "}
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        {user.status?"active":"block"}
                                                        
                                                    </button>
                                                    {/* You can also add Edit button here */}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                   </div>
                )}
           
        </>
    );
}
