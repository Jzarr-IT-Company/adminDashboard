import React from 'react'
import DashboardPasswordChangeComp from '../Components/DashboardPasswordChangeComp/DashboardPasswordChangeComp'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import PhysicalclassDashboard from '../Components/PhysicalclassDashboard/PhysicalclassDashboard'
function Setting() {
  const navigate = useNavigate()
  const handle = async () => {
    Cookies.remove("dashToken")
    Cookies.remove("dashId")
    Cookies.remove("paymToken")
    Cookies.remove("supportToken")
    Cookies.remove("settToken")
    Cookies.remove("physToken")
    navigate('/login')
  }
  return (
    <>
      <div className="container py-5 px-5">
        <h3 className='mb-3'>Setting</h3>
        <div className="row">
          <DashboardPasswordChangeComp />
          <button onClick={handle}>delete</button>
        </div>
      </div>
    </>
  )
}

export default Setting