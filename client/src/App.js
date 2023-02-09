import { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

import Header from "./components/Header/Header";
import MainBody from "./Screen/Main/MainBody";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout";
import RequireAuth from "./Auth/RequireAuth";
import Login from "./features/Login/Login";
import SignUp from "./features/SignUp/SignUp";
import ScholarForm from "./features/Scholar/ScholarForm";
import ScholarIndex from "./features/Scholar/ScholarIndex";
import Contact from "./components/Contact/Contact";
import "./App.css";
import Gallery from "./Screen/Gallery/Gallery";
import Member from "./Screen/Member/Member";
import Services from "./Screen/Service/Services";
import ScholarCategory from "./features/Scholar/ScholarCategory";
const App = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* unprotected route  */}
            <Route path="/" element={<MainBody />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/scholars_apply" element={<ScholarIndex />} />
            <Route path="/scholars_add" element={<ScholarForm />} />
            <Route path="/scholars_category" element={<ScholarCategory />} />
            <Route path="register" />
            <Route path="about-us" />
            <Route path="/contact_us" element={<Contact />} />
            <Route path="/gallery_admin" element={<Gallery />} />
            <Route path="/member_admin" element={<Member />} />
            <Route path="/service_admin" element={<Services />} />
            <Route path="services" />

            {/* for protected routes */}
            <Route element={<RequireAuth allowedRoles={[]} />}>
              {/* <Route path="register" /> */}
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
      <Footer />
    </div>
  );
};

const ProtectUserRoute = ({ children }) => {
  const [cookies] = useCookies();
  const user = cookies.user;
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProtectAdminRoute = ({ children }) => {
  const [cookies] = useCookies();
  const user = cookies.user;
  if (!user) {
    return <Navigate to="/" replace />;
  } else if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const PreventMultipleLogin = ({ children }) => {
  const [cookies] = useCookies();
  const user = cookies.user;
  if (user) {
    return <Navigate to="/dash" replace />;
  } else {
    return children;
  }
};
const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
};
export default App;
