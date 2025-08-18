import React from 'react'
import AdminHeader from './AdminHeader'
import Footer from '../../Components/Layout/Footer'
import { Outlet } from 'react-router-dom'

function AdminMaster() {
  return (
    <>
          <AdminHeader />
            <Outlet/>
          <Footer />
    </>
  )
}

export default AdminMaster