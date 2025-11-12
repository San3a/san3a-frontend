import MainLayout from "./layouts/MainLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";

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
      <MainLayout>
        <HomePage />
      </MainLayout>
    </>
  );
};

export default App;
