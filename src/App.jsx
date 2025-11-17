import MainLayout from "./layouts/MainLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import TestPage from "./pages/TestPage";
import Dashboard from "./features/admin/pages/Dashboard";
import Users from "./features/admin/pages/Users";
import Categories from "./features/admin/pages/Categories";
import Reviews from "./features/admin/pages/Reviews";
import Layout from "./features/admin/components/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import ChatPage from "./features/chat/pages/chatPage";
const App = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang =
      localStorage.getItem("language") || navigator.language.startsWith("ar")
        ? "ar"
        : "en";
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [i18n]);
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/test" element={<TestPage />}></Route>
            <Route path="/chat/:conversationId" element={<ChatPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/reviews" element={<Reviews />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
