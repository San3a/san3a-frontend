import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function HomeHelperSidebar() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const cardBase =
    "rounded-2xl border shadow-sm px-4 py-3 mb-3 transition-colors";
  const cardBg =
    theme === "dark"
      ? "bg-[#252728] border-gray-700"
      : "bg-white border-gray-200";

  const smallText =
    theme === "dark" ? "text-gray-400 text-xs" : "text-gray-500 text-xs";
  const titleText =
    theme === "dark"
      ? "text-white font-semibold"
      : "text-gray-900 font-semibold";

  const isTechnician = role === "technician";

  const categories = useMemo(
    () => [
      { key: "electrician", icon: "🔌" },
      { key: "plumber", icon: "👨‍🔧" },
      { key: "carpenter", icon: "🔨" },
      { key: "painter", icon: "🎨" },
    ],
    []
  );

  const howItWorksSteps = useMemo(
    () => ["howItWorksStep1", "howItWorksStep2", "howItWorksStep3"],
    []
  );

  const techTips = useMemo(() => ["techTip1", "techTip2", "techTip3"], []);

  return (
    <aside className="space-y-3">
      {!isTechnician && (
        <>
          <div className={`${cardBase} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <span className="text-blue-500 text-lg">💡</span>
              </div>
              <h3 className={`${titleText} text-sm`}>
                {t("needHelpFindingTechnician")}
              </h3>
            </div>
            <p className={smallText}>{t("needHelpFindingTechnicianDesc")}</p>
          </div>

          <div className={`${cardBase} ${cardBg}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`${titleText} text-sm`}>
                {t("popularCategories")}
              </h3>
            </div>
            <div
              className={`flex flex-wrap gap-2 mt-1 ${
                isRTL ? "justify-end" : "justify-start"
              }`}
            >
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  } transition-colors`}
                >
                  <span>{cat.icon}</span>
                  <span>{t(`category_${cat.key}`)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`${cardBase} ${cardBg}`}>
            <h3 className={`${titleText} text-sm mb-1`}>{t("howItWorks")}</h3>
            <ol
              className={`mt-1 space-y-1.5 text-xs ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {howItWorksSteps.map((stepKey, idx) => (
                <li key={stepKey} className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/10 text-[0.65rem] text-blue-500">
                    {idx + 1}
                  </span>
                  <span>{t(stepKey)}</span>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}

      {isTechnician && (
        <>
          <div className={`${cardBase} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <span className="text-emerald-500 text-lg">🛠️</span>
              </div>
              <h3 className={`${titleText} text-sm`}>{t("techTipsTitle")}</h3>
            </div>
            <ol
              className={`mt-1 space-y-1.5 text-xs ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {techTips.map((tipKey, idx) => (
                <li key={tipKey} className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-[0.65rem] text-emerald-500">
                    {idx + 1}
                  </span>
                  <span>{t(tipKey)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={`${cardBase} ${cardBg}`}>
            <h3 className={`${titleText} text-sm mb-1`}>
              {t("techProfileReminderTitle")}
            </h3>
            <p className={smallText}>{t("techProfileReminderDesc")}</p>
          </div>
        </>
      )}
    </aside>
  );
}

export default HomeHelperSidebar;
