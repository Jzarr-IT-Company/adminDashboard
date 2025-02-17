// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { decodeToken } from '../../Utilis/Decodedtoken.utilis';
// function SidebarMenu() {
//     useEffect(() => {
//         console.log(decodeToken());
//     }, []);

//     return (
//         <>
//             <div className="px-2">
//                 <div className="py-2">
//                     <Link className='btn btn-primary w-100 text-start py-3 text-capitalize' to={'/'}>Dashboard</Link>
//                 </div>
//                 <div className="py-2">
//                     <Link className='btn btn-primary w-100 text-start py-3 text-capitalize' to={'/physicalform'}>Physical class</Link>
//                 </div>
//                 <div className="py-2">
//                     <Link className='btn btn-primary w-100 text-start py-3 text-capitalize' to={'/fees'}>Fees</Link>
//                 </div>
//                 <div className="py-2">
//                     <Link className='btn btn-primary w-100 text-start py-3 text-capitalize' to={'/phy'}>Physical class Website from </Link>
//                 </div>
//                 <div className="py-2">
//                     <Link className='btn btn-primary w-100 text-start py-3 text-capitalize' to={'/payment'}>Payment </Link>
//                 </div>
//                 <div className="py-2">
//                     <Link className='btn btn-primary w-100 text-start py-3 text-capitalize' to={'/faqs'}>Support</Link>
//                 </div>
//                 <div className="py-2">
//                     <Link className='btn btn-primary w-100 text-start py-3 text-capitalize' to={'/setting'}>Setting</Link>
//                 </div>
//                 <h4 className='text-capitalize'>HDPiks Images</h4>
//                 <div className="py-2">
//                     <Link className='btn btn-primary w-100 text-start py-3 text-capitalize' to={'/check'}>All Images</Link>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default SidebarMenu;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { decodeToken } from "../../Utilis/Decodedtoken.utilis";

function SidebarMenu() {
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const user = decodeToken();
    if (user?.designation === "Staff") {
      setIsStaff(true);
    }
  }, []);

  return (
    <div className="px-2">
      {isStaff ? (
        <>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/physicalform"}
            >
              Physical class
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/fees"}
            >
              Fees
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/"}
            >
              Dashboard
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/physicalform"}
            >
              Physical class
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/fees"}
            >
              Fees
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/phy"}
            >
              Physical class Website from
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/payment"}
            >
              Payment
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/faqs"}
            >
              Support
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/setting"}
            >
              Setting
            </Link>
          </div>
          <h4 className="text-capitalize">HDPiks Images</h4>
          <div className="py-2">
            <Link
              className="btn btn-primary w-100 text-start py-3 text-capitalize"
              to={"/check"}
            >
              All Images
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default SidebarMenu;
