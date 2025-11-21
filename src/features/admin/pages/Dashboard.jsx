import React from "react";
import { useTranslation } from "react-i18next";
import Card from "../components/Card";
import Reviews from "./Reviews";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  useGetCountsQuery,
  useGetTechniciansPerCategoryQuery,
} from "../adminApi";
import Categories from "./Categories";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

const usersDemo = [
  { _id: "Cairo", count: 10 },
  { _id: "Alexandria", count: 8 },
  { _id: "Giza", count: 7 },
];

const techDemo = [
  { _id: "Cairo", count: 5 },
  { _id: "Alexandria", count: 4 },
  { _id: "Giza", count: 3 },
];

const cityKeys = {
  Cairo: "cities.Cairo",
  Alexandria: "cities.Alexandria",
  Giza: "cities.Giza",
};

export default function Dashboard() {
  const { t } = useTranslation();

  const { data: counts } = useGetCountsQuery();
  const { data: techPerCat } = useGetTechniciansPerCategoryQuery();

  const renderLegend = (data) => (
    <div className="flex justify-center gap-4 mt-2 flex-wrap">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[i % COLORS.length] }}
          />
          <span className="text-sm">{t(cityKeys[item._id] || item._id)}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Counts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4" title={t("dashboard.totalIncome")}>
          <div className="text-3xl font-bold">{3120}</div>
        </Card>
        <Card className="p-4" title={t("dashboard.totalCustomers")}>
          <div className="text-3xl font-bold">
            {counts?.totalCustomers ?? 0}
          </div>
        </Card>
        <Card className="p-4" title={t("dashboard.totalTechnicians")}>
          <div className="text-3xl font-bold">
            {counts?.totalTechnicians ?? 0}
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart from backend */}
        <Card className="p-4" title={t("dashboard.techPerCategory")}>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart
                data={(techPerCat || []).map((item) => ({
                  name: item.category?.name
                    ? t(
                        `categoryNames.${item.category.name}`,
                        item.category.name
                      )
                    : t("unknown"),
                  count: item.count,
                }))}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickLine={false}
                  tickFormatter={(val) => t(`categoryNames.${val}`, val)}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickLine={false}
                  axisLine={true}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  contentStyle={{ borderRadius: 8 }}
                  labelFormatter={(label) => t(`categoryNames.${label}`, label)}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie charts with dummy data */}
        <Card className="p-12" title={t("dashboard.usersDemographics")}>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={usersDemo.map((item) => ({
                    name: t(`cities.${item._id}`, item._id),
                    value: item.count,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={80}
                  label={false}
                >
                  {usersDemo.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  labelFormatter={(label) => t(`cities.${label}`, label)}
                />
              </PieChart>
            </ResponsiveContainer>

            {renderLegend(
              usersDemo.map((item) => ({
                _id: t(`cities.${item._id}`, item._id),
                count: item.count,
              }))
            )}
          </div>
        </Card>

        <Card className="p-12" title={t("dashboard.techDemographics")}>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={techDemo.map((item) => ({
                    name: t(`cities.${item._id}`, item._id),
                    value: item.count,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={80}
                  label={false}
                >
                  {techDemo.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  labelFormatter={(label) => t(`cities.${label}`, label)}
                />
              </PieChart>
            </ResponsiveContainer>

            {renderLegend(
              techDemo.map((item) => ({
                _id: t(`cities.${item._id}`, item._id),
                count: item.count,
              }))
            )}
          </div>
        </Card>
      </div>

      <Categories></Categories>
    </div>
  );
}
