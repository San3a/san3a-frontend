import { useTranslation } from "react-i18next";
import { useGetTopTechniciansQuery } from "../homeApi";
import TopTechnicianShimmerCard from "../components/TopTechnicianShimmerCard";
import { useMemo } from "react";

function TopTechniciansSidebar() {
  const { data, isError, isLoading } = useGetTopTechniciansQuery();
  const topTechnicians = useMemo(() => data?.data || [], [data]);
  const { t } = useTranslation();

  const cardBg = "dark:bg-[#252728] bg-white";
  const subtleBg = "dark:bg-[#1b1d1e] bg-slate-50";
  const borderColor = "dark:border-white/5 border-slate-200";

  console.log(`This is top technicians data:`, JSON.stringify(topTechnicians));
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
          {data?.results ?? "-"}
        </span>
      </div>

      <div
        className={`${subtleBg} rounded-xl p-3 mb-3 text-xs text-muted-foreground`}
      >
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          {t("topTechniciansHint")}
        </span>
      </div>

      <ul className="space-y">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <TopTechnicianShimmerCard key={index} cardBg={cardBg} />
          ))
        ) : isError ? (
          <li className="text-sm text-red-500">{t("errorLoadingData")}</li>
        ) : (
          topTechnicians.map((tech, index) => {
            return (
              <li
                key={tech.id}
                className="group relative overflow-hidden rounded-xl border border-transparent bg-linear-to-r from-transparent via-transparent to-transparent hover:from-blue-500/10 hover:via-transparent hover:to-cyan-500/10 transition-colors duration-300"
              >
                <div className={`${cardBg} flex items-center gap-3 px-3 py-2`}>
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-blue-500 to-cyan-400 text-white text-sm font-semibold shadow-md">
                    <span>{index + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {tech.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-amber-400">
                      <span className="inline-flex items-center gap-1">
                        <span>★</span>
                        <span>{tech.rating.toFixed(1)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </aside>
  );
}

export default TopTechniciansSidebar;
