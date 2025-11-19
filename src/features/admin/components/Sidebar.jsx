import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Layers, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const loc = useLocation();

  const links = [
    { to: "/admin", label: t("dashboardTitle"), icon: <Home size={16} /> },
    { to: "/admin/users", label: t("users"), icon: <Users size={16} /> },
    {
      to: "/admin/categories",
      label: t("categories"),
      icon: <Layers size={16} />,
    },
    { to: "/admin/reviews", label: t("reviews"), icon: <Star size={16} /> },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
          AD
        </div>
        <div>
          <div className="font-semibold">{t("admin")}</div>
          <div className="text-xs text-gray-400">{t("panel")}</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 ${
              loc.pathname === l.to ? "bg-gray-100" : ""
            }`}
          >
            <div className="text-slate-600">{l.icon}</div>
            <div className="text-sm">{l.label}</div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
