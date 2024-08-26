import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'

function Sidebar(children) {
  return (
    <>
    <div className="sticky-top">
        <Navbar/>
    </div>
        <div className="container-fluid" >
            <div className="row position-fixed" style={{overflow:"auto"}}>
                <div className="col-lg-3 col-md-3 border">
                    <div className="py-2">
                        <Link className='btn btn-primary w-100 text-start py-3' to={'/'}>Home</Link>
                    </div>
                    <div className="py-2">
                        <Link className='btn btn-primary w-100 text-start py-3' to={'/a'}>About</Link>
                    </div>
                    <div className="py-2">
                        <Link className='btn btn-primary w-100 text-start py-3'>Home</Link>
                    </div>
                    <div className="py-2">
                        <Link className='btn btn-primary w-100 text-start py-3'>Home</Link>
                    </div>
                </div>
                <main className="col-lg-8" style={{paddingLeft: '50px', height: '100vh', overflowY: 'auto'}}>
                    {children.children}
                </main>
            </div>
        </div>
    </>
  )
}

export default Sidebar

// import React from 'react';
// import Navbar from '../Navbar/Navbar';
// import { Link } from 'react-router-dom';
// // import './navbarSidebar.css'; // Create this CSS file

// function Sidebar({ children }) {
//   return (
//     <>
//       {/* <Navbar />
//       <div className="container-fluid">
//         <div className="row">
//           <nav className="col-lg-3 col-md-3 sidebar d-flex flex-column bg-light" style={{ height: '100vh' }}>
//             <div className="py-2">
//               <Link className='btn btn-primary w-100 text-start py-3' to={'/'}>Home</Link>
//             </div>
//             <div className="py-2">
//               <Link className='btn btn-primary w-100 text-start py-3' to={'/a'}>About</Link>
//             </div>
//             <div className="py-2">
//               <Link className='btn btn-primary w-100 text-start py-3'>Link 3</Link>
//             </div>
//             <div className="py-2">
//               <Link className='btn btn-primary w-100 text-start py-3'>Link 4</Link>
//             </div>
//           </nav>
//           <main className="col-lg-9 offset-lg-3" style={{ paddingTop: '56px', paddingLeft: '20px', height: '100vh', overflowY: 'auto' }}>
//             {children}
//           </main>
//         </div>
//       </div> */}
//            <div className="sticky-top">
//          <Navbar/>
//      </div>
//          <div className="container-fluid" >
//              <div className="row position-fixed" style={{overflow:"auto"}}>
//                  <div className="col-lg-3 col-md-3 border">
//                      <div className="py-2">
//                          <Link className='btn btn-primary w-100 text-start py-3' to={'/'}>Home</Link>
//                      </div>
//                      <div className="py-2">
//                          <Link className='btn btn-primary w-100 text-start py-3' to={'/a'}>About</Link>
//                      </div>
//                      <div className="py-2">
//                          <Link className='btn btn-primary w-100 text-start py-3'>Home</Link>
//                      </div>
//                      <div className="py-2">
//                          <Link className='btn btn-primary w-100 text-start py-3'>Home</Link>
//                      </div>
//                  </div>
//                  <div className="col-lg-8" style={{marginLeft:"20px"}}>
//                      {children.children}
//                  </div>
//              </div>
//          </div>
//     </>
//   );
// }

// export default Sidebar;
