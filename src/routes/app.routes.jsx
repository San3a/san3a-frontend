import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import TechServicesPage from "../features/technician-service/pages/TechServicesPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ChatBotPage from "../features/chatbot/pages/ChatBotPage";
import ChatPage from "../features/chat/pages/ChatPage";
import ProfilePage from "./../features/profile/pages/ProfilePage";
import Dashboard from "../features/admin/pages/Dashboard";
import Users from "../features/admin/pages/Users";
import Categories from "../features/admin/pages/Categories";
import Reviews from "../features/admin/pages/Reviews";
import Layout from "../features/admin/components/Layout";
import TechServicePage from "../features/technician-service/pages/TechServicePage";
import TechServiceCheckout from "../features/Checkout/pages/TechServiceCheckout";
import ProtectedRoute from "./ProtectedRoute";
import AboutUsPage from "../pages/AboutUsPage";
import SuccessCashPayment from "../features/Checkout/pages/SuccessCashPayment";
import CancelPayment from "../features/Checkout/pages/CancelPayment";
import OfferCheckout from "../features/Checkout/pages/OfferCheckout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["user", "technician", "admin"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/chat-bot-messaging" element={<ChatBotPage />} />
        <Route path="/tech-services" element={<TechServicesPage />} />
        <Route path="/tech-service/:id" element={<TechServicePage />} />
        <Route path="/chat/:conversationId" element={<ChatPage />} />

        <Route
          path="/tech-service-checkout/:id"
          element={<TechServiceCheckout />}
        />
        <Route path="/offer-checkout/:id" element={<OfferCheckout />} />

        <Route path="/aboutus" element={<AboutUsPage />} />
        {/* <Route path="/test" element={<TestPage />}></Route> */}
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/chat/:conversationId" element={<ChatPage />} />
        <Route
          path="/success-cash-payment"
          element={<SuccessCashPayment />}
        ></Route>
        <Route path="/payment-cancel" element={<CancelPayment />}></Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
