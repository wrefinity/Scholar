import { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./Slicer/Auth";
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
import Thanks from "./components/Thanks";
import "./App.css";
import Gallery from "./Screen/Gallery/Gallery";
import Member from "./Screen/Member/Member";
import Services from "./Screen/Service/Services";
import ScholarCategory from "./features/Scholar/ScholarCategory";
import Category from "./Screen/Category/Category";
import CatPergant from "./Screen/CatPergant/CatPergant";
import PergantScreen from "./Screen/Pergant/PergantScreen";
import ScholarSelect from "./features/Scholar/ScholarSelect";
import TypeCat from "./Screen/Typer/TypeCat";
import PostList from "./features/Posts/PostList";
import ScholarFormUpdate from "./features/Scholar/ScholarFormUpdate";
import PergantVote from "./features/Pergant/PergantVote";
import PartnerScreen from "./Screen/Partner/PartnerScreen";
import PergentPayment from "./features/Pergant/PergentPayment";
import UsersTable from "./features/User/UsersTable";
import About from "./features/About/About";
import AboutScreen from "./Screen/About/AboutScreen";
import MessengerScreen from "./Screen/Messenger/MessengerScreen";
// import ResetPassword from "./features/Login/ResetPassword";
import NewPassword from "./features/Login/NewPassword";
import ScholarTerms from "./features/Scholar/ScholarTerms";
import ScholarSingleUser from "./features/Scholar/ScholarSingleUser";
import ScholarAll from "./features/Scholar/ScholarAll";
import EmailVerify from "./features/Login/EmailVerify";

const App = () => {
  return (
    <div style={{ margin: 0 }}>
      <Header />
      <ToastContainer />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* unprotected route  */}
            <Route path="/" element={<MainBody />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users_verification/:id/:token" element={<EmailVerify />} />
            <Route path="/reset_now/:id/:token" element={<NewPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/model_payments/:pergentId"
              element={<PergentPayment />}
            />
            <Route
              path="/scholars_apply/:scholarId"
              element={
                <ProtectedRoute>
                  <ScholarIndex />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about_home"
              element={
                <ProtectedAdminRoute>
                  <AboutScreen />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/scholars_update/:scholarId"
              element={
                <ProtectedAdminRoute>
                  <ScholarFormUpdate />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/scholars_terms/:id"
              element={
                <ProtectedAdminRoute>
                  <ScholarTerms />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/messenger"
              element={
                <ProtectedAdminRoute>
                  <MessengerScreen />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/scholars_apply"
              element={
                <ProtectedRoute>
                  <ScholarSelect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedAdminRoute>
                  <UsersTable />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/scholarships"
              element={
                <ProtectedAdminRoute>
                  <PostList />
                </ProtectedAdminRoute>
              }
            />
 
            <Route
              path="/myscholarships"
              element={
                <ProtectedRoute>
                  <ScholarSingleUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/application"
              element={
                <ProtectedAdminRoute>
                  <ScholarAll />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/scholars_add"
              element={
                <ProtectedAdminRoute>
                  <ScholarForm />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/scholars_category"
              element={
                <ProtectedAdminRoute>
                  <ScholarCategory />
                </ProtectedAdminRoute>
              }
            />
            <Route path="register" />
            <Route path="about-us" />
            <Route path="/contact_us" element={<Contact />} />
            <Route
              path="/categories"
              element={
                <ProtectedAdminRoute>
                  <Category />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/gallery_admin"
              element={
                <ProtectedAdminRoute>
                  <Gallery />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/member_admin"
              element={
                <ProtectedAdminRoute>
                  <Member />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/service_admin"
              element={
                <ProtectedAdminRoute>
                  <Services />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/catpergant"
              element={
                <ProtectedAdminRoute>
                  <CatPergant />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/model/:pergentId" element={<PergantVote />} />
            <Route
              path="/types"
              element={
                <ProtectedAdminRoute>
                  <TypeCat />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/pergants_create"
              element={
                <ProtectedAdminRoute>
                  <PergantScreen />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/patners"
              element={
                <ProtectedAdminRoute>
                  <PartnerScreen />
                </ProtectedAdminRoute>
              }
            />
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

const ProtectedRoute = ({ children }) => {
  const user = useSelector(getCurrentUser);
  let location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
const ProtectedAdminRoute = ({ children }) => {
  const user = useSelector(getCurrentUser);
  let location = useLocation();
  if (!user || !user?.isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
};
export default App;
