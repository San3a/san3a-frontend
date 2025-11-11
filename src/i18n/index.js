import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";

i18n.use(initReactI18next).init({
  debug: true,
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  fallbackLng: "en",
});

export default i18n;
