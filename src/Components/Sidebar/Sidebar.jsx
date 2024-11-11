import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SidebarMenu from '../SidebarMenu/SidebarMenu'
import './navbarSidebar.css'

function Sidebar() {
    return (
        <>
            <div className="sticky-top">
                <Navbar />
            </div>
            <div className="container-fluid">
                <div className="row" >
                    <div className="col-lg-2 col-md-3 p-0 side-bar  border-left">
                        <SidebarMenu />
                    </div>
                    <main className="col-lg-10 border overflow-auto main-content" style={{ height: '100%' }}>
                        <Outlet />
                    </main>
                </div>
            </div>

        </>
    )
}

export default Sidebar