import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "./Components/Pages/About"
import Bookings from "./Components/Pages/Bookings"
import Contact from "./Components/Pages/Contact"
import Homes from "./Components/Pages/Home"
import Menu from "./Components/Pages/Menu"
import Services from "./Components/Pages/Services"
import Terms from "./Components/Pages/Terms"
import Testimonials from "./Components/Pages/Testimonials"
import Layout from "./Components/Layout/Layout"
import Login from "./Components/auth/Login" 
import Register from "./Components/auth/Register"
import AdminMaster from "./admin/layout/AdminMaster"
import AdminDashboard from "./admin/layout/AdminDashboard"
import ManageCustomer from "./admin/pages/ManageCustomer"
function App() {


  return (
    <>
    {/* <About/> */}
    {/* <Bookings/> */}
    {/* <Contact/> */}
    {/* <Home/> */}
    {/* <Menu/> */}
    {/* <Login/> */}
    {/* <Register/> */}
    {/* <Services/> */}
    {/* <Terms/> */}
    {/* <Testimonials/> */}


    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Homes/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="bookings" element={<Bookings/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="menu" element={<Menu/>}/>
        <Route path="services" element={<Services/>}/>
        <Route path="terms" element={<Terms/>}/>
        <Route path="testimonials" element={<Testimonials/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>


      <Route path="/admin" element={<AdminMaster/>}>
      <Route index element={<AdminDashboard/>}/>
      <Route path="manageCustomer" element={<ManageCustomer/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
