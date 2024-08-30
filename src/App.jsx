
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Sidebar from "./Components/Sidebar/Sidebar";
import Payment from "./Pages/Payment";

const App = () => {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <>
    //     <Home />
      
    // </>,
    // },
    // {
    //   path: "/payment",
    //   element: <>
    //     <Payment />
      
    // </>,
    // },
    // {
    //   path: "/a",
    //   element: <>
    //       <About />
    //     {/* <Sidebar>
    //     </Sidebar> */}
    //   </>
    // },
    
    {
      path: "/",
      element: <Sidebar />,
      children: [
        { path: '/', element: <Home /> }, // Default route for /dashboard
        { path: '/payment', element: <Payment /> }, // Profile route
        // { path: 'editqualification', element: <QalificationUpdates /> }, // Profile route
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
