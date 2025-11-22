import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import TechServicesPage from "../features/technician-service/pages/TechServicesPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ChatBotPage from "../features/chatbot/pages/ChatBotPage";
import ChatPage from "../features/chat/pages/ChatPage";
import Dashboard from "../features/admin/pages/Dashboard";
import Users from "../features/admin/pages/Users";
import Categories from "../features/admin/pages/Categories";
import Reviews from "../features/admin/pages/Reviews";
import Layout from "../features/admin/components/Layout";
import TechServicePage from "../features/technician-service/pages/TechServicePage";
import Checkout from "../features/Checkout/pages/Checkout";
import ProtectedRoute from "./ProtectedRoute";
import AboutUsPage from "../pages/AboutUsPage";

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
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
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
