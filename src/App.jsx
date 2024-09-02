
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Sidebar from "./Components/Sidebar/Sidebar";
import Payment from "./Pages/Payment";
import FAQS from "./Pages/FAQS";
import PhysicalClassStudents from "./Pages/PhysicalClassStudents";
import Setting from "./Pages/Setting";
import Cookie from "js-cookie";
import Login from "./Pages/Login";
const App = () => {
  let dashboard = Cookie.get('dashboardlogin')
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,
      children: [
        // { path: '/', element: <>
        // {
        //   dashboard ? <Home /> :""
        // }

        // </>  
        // },  
        {
          path: '/', element: <>
            <Home />
          </>
        },
        { path: '/payment', element: <Payment /> },
        { path: '/faqs', element: <FAQS /> },
        { path: '/phy', element: <PhysicalClassStudents /> },
        { path: '/setting', element: <Setting /> },
      ],
    },
    {
      path:'/login',
      element:<Login/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
