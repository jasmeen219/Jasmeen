import { Link } from "react-router-dom";



function Header() {
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
                            <Link to="/about" className="nav-item nav-link active">
                                About
                            </Link>
                            <Link to="/services" className="nav-item nav-link">
                                Service
                            </Link>
                            <Link to="/menu" className="nav-item nav-link">
                                Menu
                            </Link>
                            <div className="nav-item dropdown">
                                <Link
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Pages
                                </Link>
                                <div className="dropdown-menu m-0">
                                    <Link to="/bookings" className="dropdown-item">
                                        Booking
                                    </Link>
                                    <Link to="/terms" className="dropdown-item">
                                        Our Team
                                    </Link>
                                    <Link to="/testimonials" className="dropdown-item">
                                        Testimonial
                                    </Link>
                                </div>
                            </div>
                            <Link to="/contact" className="nav-item nav-link">
                                Contact
                            </Link>
                        </div>
                        <Link to="/bookings" className="btn btn-primary py-2 px-4">
                            Book A Table
                        </Link>
                    </div>
                </nav>
            </div>
                
            {/* Navbar & Hero End */}
        </>
     );
}

export default Header;