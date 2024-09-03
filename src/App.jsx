
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
import { useGlobalState } from "./Context/Context";
import PaymentLogin from "./Pages/PaymentLogin";
import SettingLogin from "./Pages/SettingLogin";
import FaqsLogin from "./Pages/FaqsLogin";
import PhysicalLogin from "./Pages/PhysicalLogin";
const App = () => {
  const { userToken, settToken, paymToken, physToken, faqsToken, } = useGlobalState()
  let dashToken = Cookie.get('dashToken')
  let paymtToken = Cookie.get('paymToken')
  let supporToken = Cookie.get('supportToken')
  let settiToken = Cookie.get('settToken')
  let phyToken = Cookie.get('physToken')
  console.log(dashToken)
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <Sidebar />,
    //   children:[
    //     {
    //       path: '/',
    //       element: userToken || dashToken ? <Home /> : <Navigate to="/login" />
    //     },
    //     { path: '/payment', element: paymToken || paymtToken ? <Payment /> : <Navigate to="/plogin" /> },
    //     { path: '/faqs', element: faqsToken || supporToken ? <FAQS /> : <Navigate to="/flogin" /> },
    //     { path: '/phy', element:physToken|| phyToken ? <PhysicalClassStudents /> : <Navigate to="/phlogin" /> },
    //     { path: '/setting', element: settToken || settiToken ? <Setting /> : <Navigate to="/slogin" /> },
    //   ],
    // },
    {
      path: "/",
      element: <Sidebar />,
      children:[
        {
          path: '/',
          element:   <Home />
        },
        { path: '/payment', element:     <Payment />  },
        { path: '/faqs', element:  <FAQS />  },
        { path: '/phy', element: <PhysicalClassStudents />  },
        { path: '/setting', element:   <Setting />  },
      ],
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/plogin',
      element: <PaymentLogin />
    },
    {
      path: '/slogin',
      element: <SettingLogin />
    },
    {
      path: '/flogin',
      element: <FaqsLogin />
    }
    ,
    {
      path: '/phlogin',
      element: <PhysicalLogin />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
