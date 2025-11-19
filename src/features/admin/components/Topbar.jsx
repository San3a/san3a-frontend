import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Topbar() {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-3 rounded-2xl shadow flex items-center justify-between">
      <div className="text-sm text-gray-600">
        {t("welcomeBack", { user: "Admin" })}
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          O
        </div>
      </div>
    </div>
  );
}
