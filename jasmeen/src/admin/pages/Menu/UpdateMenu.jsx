import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../../../ApiServices";

export default function UpdateMenu() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [day, setDay] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [url, seturl] = useState("")

    const nav = useNavigate();
    const {id}=useParams()

    useEffect(()=>{
        fetchMenuDetails()
    },[])

    const fetchMenuDetails = async () => {
        // setLoading(true);
        try {
            const res = await ApiServices.SingleMenu({ _id: id }); // <-- You said this API exists

            console.log(res);
            
            if (res.data.success) {
                const menu = res.data.data;
                setName(menu.name || "");
                setDescription(menu.description || "");
                setPrice(menu.price || "");
                seturl(menu.image)
                setCategory(menu.category || "");
                setDay(menu.day || "");
                // image is not set here — user can upload new one if needed
            } else {
                toast.error(res.data.message || "Failed to fetch menu details");
            }
        } catch (err) {
            console.error("Error fetching menu details:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleFile = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", name);
            data.append("_id", id);
            data.append("description", description);
            data.append("price", price);
            // data.append("category", category);
            data.append("day", day);
            if (!!image) {
                data.append("image", image);
            }
console.log(data.name);

            const res = await ApiServices.UpdateMenu(data);
            
            console.log(res);
            
            if (res.data.success) {
                toast.success(res.data.message || "Menu Added Successfully");
                // nav("/admin/menu");
            } else {
                toast.error(res.data.message || "Failed to add menu");
            }
        } catch (err) {
            console.error("Error while adding menu:", err);
            toast.error("Something went wrong!");
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
                            UpdateMenu
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
                                    aria-current="page"
                                    className="breadcrumb-item text-white active"
                                >
                                    Update Menu
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
                    <div className="row no-gutters justify-content-center">
                        <div
                            className="col-md-8"
                            style={{ boxshadow: "0px 0px 0px 10px gray" }}
                        >
                            <div className="contact-wrap w-100 p-md-5 p-4">
                                <h3 className="mb-4 text-center">Add New Menu</h3>
                                <div className="d-flex justify-content-center">
                                        <img width={100} src={url} alt="" />
                                </div>
                                <form
                                    id="menuForm"
                                    name="menuForm"
                                    className="contactForm"
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                    <div className="row">
                                        {/* Name */}
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="label" htmlFor="name">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    placeholder="Menu Name"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="label" htmlFor="description">
                                                    Description
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    placeholder="Menu Description"
                                                    rows="3"
                                                    required
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="label" htmlFor="price">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="price"
                                                    placeholder="Menu Price"
                                                    required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Category (select) */}
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="label" htmlFor="category">
                                                    Category
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="category"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                >
                                                    <option value="">-- Select Category --</option>
                                                    <option value="Starter">Starter</option>
                                                    <option value="Main Course">Main Course</option>
                                                    <option value="Dessert">Dessert</option>
                                                    <option value="Beverage">Beverage</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Day */}
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="label" htmlFor="day">
                                                    Day
                                                   
                                                </label>
                                                <input
                                                    type="text"
                                                        className="form-control"
                                                    name="day"
                                                    placeholder="e.g., Monday, Tuesday"
                                                    required
                                                    value={day}
                                                    onChange={(e) => setDay(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="label" htmlFor="image">
                                                    Upload Image
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={handleFile}
                                                />
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <div className="col-md-12">
                                            <div className="form-group mt-3">
                                                <input
                                                    type="submit"
                                                    value="Add Menu"
                                                    className="btn btn-primary"
                                                />
                                                <div className="submitting" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
