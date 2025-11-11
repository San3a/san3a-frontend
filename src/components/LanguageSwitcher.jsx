import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const currentLang = i18n.language || "en";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded ${
          currentLang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`px-3 py-1 rounded ${
          currentLang === "ar" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
