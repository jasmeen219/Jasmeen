import { Link } from "react-router-dom";



function AdminHeader() {
    return (
        <>
            {/* Navbar & Hero Start */}
            <div className="container-xxl position-relative p-0">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                    <Link to="/" className="navbar-brand p-0">
                        <h1 className="text-primary m-0">
                            <i className="fa fa-utensils me-3" />
                            Restoran
                        </h1>
                        {/* <img src="img/logo.png" alt="Logo"> */}
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="fa fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0 pe-4">
                            <Link to="/" className="nav-item nav-link">
                                Home
                            </Link>
                           
                            <Link to="/admin/manageCustomer" className="nav-item nav-link">
                                Manage User
                            </Link>
                           
                        </div>
                        <div className="nav-item dropdown">
                            <Link
                                href="#"
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                Menu
                            </Link>
                            <div className="dropdown-menu m-0">
                                <Link to="/admin/addmenu" className="nav-item nav-link">
                                    Add Menu
                                </Link>
                                <Link to="/admin/manageMenu" className="nav-item nav-link">
                                    Manage Menu
                                </Link>

                            </div>
                        </div>
                       
                        <Link to="/login" className="btn btn-primary py-2 px-4">
                            login
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Navbar & Hero End */}
        </>
    );
}

export default AdminHeader;