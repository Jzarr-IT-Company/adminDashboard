import React from 'react'
import { Link } from 'react-router-dom'

function SidebarMenu() {
    return (
        <>
        <div className="px-2">
            <div className="py-2">
                <Link className='btn btn-primary w-100 text-start py-3' to={'/'}>Dashboard</Link>
            </div>
            <div className="py-2">
                <Link className='btn btn-primary w-100 text-start py-3' to={'/payment'}>Payment </Link>
            </div>
            {/* <div className="py-2">
                <Link className='btn btn-primary w-100 text-start py-3'>Home</Link>
            </div>
            <div className="py-2">
                <Link className='btn btn-primary w-100 text-start py-3'>Home</Link>
            </div> */}
        </div>
        </>
    )
}

export default SidebarMenu