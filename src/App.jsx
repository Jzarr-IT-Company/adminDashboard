
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Sidebar from "./Components/Sidebar/Sidebar";
import Payment from "./Pages/Payment";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,
      children: [
        { path: '/', element: <Home /> },  
        { path: '/payment', element: <Payment /> },  
        // { path: 'editqualification', element: <QalificationUpdates /> },  
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
