import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const mockTechnicians = [
  {
    id: 1,
    nameEn: "Ahmed Ali",
    nameAr: "أحمد علي",
    categoryEn: "Electrician",
    categoryAr: "كهربائي",
    rating: 4.9,
    jobs: 128,
  },
  {
    id: 2,
    nameEn: "Sara Hassan",
    nameAr: "سارة حسن",
    categoryEn: "Cleaner",
    categoryAr: "منظف",
    rating: 4.8,
    jobs: 96,
  },
  {
    id: 3,
    nameEn: "Mohamed Nabil",
    nameAr: "محمد نبيل",
    categoryEn: "Plumber",
    categoryAr: "سباك",
    rating: 4.7,
    jobs: 110,
  },
  {
    id: 4,
    nameEn: "Nour Adel",
    nameAr: "نور عادل",
    categoryEn: "Painter",
    categoryAr: "دهان",
    rating: 4.7,
    jobs: 87,
  },
  {
    id: 5,
    nameEn: "Omar Khaled",
    nameAr: "عمر خالد",
    categoryEn: "Carpenter",
    categoryAr: "نجار",
    rating: 4.6,
    jobs: 75,
  },
];

function TopTechniciansSidebar() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const cardBg = theme === "dark" ? "bg-[#252728]" : "bg-white";
  const subtleBg = theme === "dark" ? "bg-[#1b1d1e]" : "bg-slate-50";
  const borderColor = theme === "dark" ? "border-white/5" : "border-slate-200";

  return (
    <aside
      className={`${cardBg} border ${borderColor} rounded-2xl shadow-lg p-4 sm:p-5 w-full max-w-xs sticky top-24 h-fit`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-primary uppercase tracking-[0.14em]">
            {t("topTechniciansLabel")}
          </h2>
          <p className="text-lg font-bold mt-1">{t("topTechniciansTitle")}</p>
        </div>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-tr from-blue-500 to-cyan-400 text-white text-sm font-semibold shadow-md">
          5
        </span>
      </div>

      <div
        className={`${subtleBg} rounded-xl p-3 mb-3 text-xs text-muted-foreground`}
      >
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {t("topTechniciansHint")}
        </span>
      </div>

      <ul className="space-y">
        {mockTechnicians.map((tech, index) => {
          const name = isArabic ? tech.nameAr : tech.nameEn;
          const category = isArabic ? tech.categoryAr : tech.categoryEn;
          return (
            <li
              key={tech.id}
              className="group relative overflow-hidden rounded-xl border border-transparent bg-linear-to-r from-transparent via-transparent to-transparent hover:from-blue-500/10 hover:via-transparent hover:to-cyan-500/10 transition-colors duration-300 cursor-pointer"
            >
              <div className={`${cardBg} flex items-center gap-3 px-3 py-2`}>
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-blue-500 to-cyan-400 text-white text-sm font-semibold shadow-md">
                  <span>{index + 1}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {category}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-amber-400">
                    <span className="inline-flex items-center gap-1">
                      <span>★</span>
                      <span>{tech.rating.toFixed(1)}</span>
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      · {tech.jobs} {t("jobsDone")}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default TopTechniciansSidebar;
