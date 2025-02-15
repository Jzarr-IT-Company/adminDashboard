
// import "bootstrap/dist/css/bootstrap.min.css";
// import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
// import Home from "./Pages/Home";
// import About from "./Pages/About";
// import Sidebar from "./Components/Sidebar/Sidebar";
// import Payment from "./Pages/Payment";
// import FAQS from "./Pages/FAQS";
// import PhysicalClassStudents from "./Pages/PhysicalClassStudents";
// import Setting from "./Pages/Setting";
// import Login from "./Pages/Login";
// import { useGlobalState } from "./Context/Context";
// import CheckAllImages from "./Pages/CheckAllImages";
// import PhysicalClass from "./Pages/PhysicalClass";
// import AddStudentsFormModalCompo from "./Components/AddStudentsFormModalCompo/AddStudentsFormModalCompo";
// import EditStudentData from "./Pages/EditStudentData";
// import FeePage from "./Pages/FeePage";
// import { decodeToken } from "./Utilis/Decodedtoken.utilis";
// const App = () => {
//   useEffect(() => {
//     console.log(decodeToken());
//   }, []);
//   const router = createBrowserRouter([
//     // {
//     //   path: "/",
//     //   element: <Sidebar />,
//     //   children:[
//     //     {
//     //       path: '/',
//     //       element: userToken || dashToken ? <Home /> : <Navigate to="/login" />
//     //     },
//     //     { path: '/payment', element: paymToken || paymtToken ? <Payment /> : <Navigate to="/plogin" /> },
//     //     { path: '/faqs', element: faqsToken || supporToken ? <FAQS /> : <Navigate to="/flogin" /> },
//     //     { path: '/phy', element:physToken|| phyToken ? <PhysicalClassStudents /> : <Navigate to="/phlogin" /> },
//     //     { path: '/setting', element: settToken || settiToken ? <Setting /> : <Navigate to="/slogin" /> },
//     //   ],
//     // },
//     {
//       path: "/",
//       element: <Sidebar />,
//       children: [
//         {
//           path: '/',
//           element: <Home />
//         },
//         { path: '/payment', element: <Payment /> },
//         { path: '/faqs', element: <FAQS /> },
//         { path: '/phy', element: <PhysicalClassStudents /> },
//         { path: '/ed/:id', element: <EditStudentData /> },
//         { path: '/physicalform', element: <PhysicalClass /> },
//         { path: '/addst', element: <AddStudentsFormModalCompo /> },
//         { path: '/setting', element: <Setting /> },
//         { path: '/check', element: <CheckAllImages /> },
//         { path: '/fees', element: <FeePage /> },
//       ],
//     },
//     {
//       path: '/login',
//       element: <Login />
//     } 
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// };

// export default App;


// import "bootstrap/dist/css/bootstrap.min.css";
// import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { decodeToken } from "./Utilis/Decodedtoken.utilis"; 

// import Home from "./Pages/Home";
// import About from "./Pages/About";
// import Sidebar from "./Components/Sidebar/Sidebar";
// import Payment from "./Pages/Payment";
// import FAQS from "./Pages/FAQS";
// import PhysicalClassStudents from "./Pages/PhysicalClassStudents";
// import Setting from "./Pages/Setting";
// import Login from "./Pages/Login";
// import CheckAllImages from "./Pages/CheckAllImages";
// import PhysicalClass from "./Pages/PhysicalClass";
// import AddStudentsFormModalCompo from "./Components/AddStudentsFormModalCompo/AddStudentsFormModalCompo";
// import EditStudentData from "./Pages/EditStudentData";
// import FeePage from "./Pages/FeePage";

// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       const decoded = decodeToken(token);
//       if (decoded) {
//         setUser(decoded);
//       }
//     }
//   }, []);

//   const isLoggedIn = !!user;  
//   const isStaff = user?.designation === "Staff";

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: isLoggedIn ? <Sidebar /> : <Navigate to="/login" />,
//       children: isStaff
//         ? [  
//             { path: "/fees", element: <FeePage /> },
//             { path: "/physicalform", element: <PhysicalClass /> },
//             { path: "*", element: <Navigate to="/physicalform" /> } // Prevent access to other routes
//           ]
//         : [  
//             { path: "/", element: <Home /> },
//             { path: "/payment", element: <Payment /> },
//             { path: "/faqs", element: <FAQS /> },
//             { path: "/phy", element: <PhysicalClassStudents /> },
//             { path: "/ed/:id", element: <EditStudentData /> },
//             { path: "/physicalform", element: <PhysicalClass /> },
//             { path: "/addst", element: <AddStudentsFormModalCompo /> },
//             { path: "/setting", element: <Setting /> },
//             { path: "/check", element: <CheckAllImages /> },
//             { path: "/fees", element: <FeePage /> },
//           ],
//     },
//     { path: "/login", element: <Login /> },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;


import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeToken } from "./Utilis/Decodedtoken.utilis"; 

import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import Payment from "./Pages/Payment";
import FAQS from "./Pages/FAQS";
import PhysicalClassStudents from "./Pages/PhysicalClassStudents";
import Setting from "./Pages/Setting";
import Login from "./Pages/Login";
import CheckAllImages from "./Pages/CheckAllImages";
import PhysicalClass from "./Pages/PhysicalClass";
import AddStudentsFormModalCompo from "./Components/AddStudentsFormModalCompo/AddStudentsFormModalCompo";
import EditStudentData from "./Pages/EditStudentData";
import FeePage from "./Pages/FeePage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = decodeToken(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decoded?.exp && decoded.exp > currentTime) {
        setUser(decoded);
      } else {
        // Token expired, remove it and redirect to login
        Cookies.remove("token");
        Cookies.remove("id");
        setUser(null);
      }
    }
  }, []);

  const isLoggedIn = !!user;
  const isStaff = user?.designation === "Staff";

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Sidebar /> : <Navigate to="/login" />,
      children: isStaff
        ? [
            { path: "/fees", element: <FeePage /> },
            { path: "/physicalform", element: <PhysicalClass /> },
            { path: "/ed/:id", element: <EditStudentData /> },
            { path: "/addst", element: <AddStudentsFormModalCompo /> },
            { path: "*", element: <Navigate to="/physicalform" /> },
          ]
        : [
            { path: "/", element: <Home /> },
            { path: "/payment", element: <Payment /> },
            { path: "/faqs", element: <FAQS /> },
            { path: "/phy", element: <PhysicalClassStudents /> },
            { path: "/ed/:id", element: <EditStudentData /> },
            { path: "/physicalform", element: <PhysicalClass /> },
            { path: "/addst", element: <AddStudentsFormModalCompo /> },
            { path: "/setting", element: <Setting /> },
            { path: "/check", element: <CheckAllImages /> },
            { path: "/fees", element: <FeePage /> },
          ],
    },
    { path: "/login", element: <Login /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
