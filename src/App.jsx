
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Sidebar from "./Components/Sidebar/Sidebar";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Home />
      
    </>,
    },
    {
      path: "/a",
      element: <>
        <Sidebar>
          <About />
        </Sidebar>
      </>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
