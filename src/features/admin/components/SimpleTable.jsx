import React from "react";
import { useTranslation } from "react-i18next";

export default function SimpleTable({ columns = [], rows = [], actions }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead
          className={`text-gray-500 ${isRTL ? "text-right" : "text-left"}`}
        >
          <tr>
            {columns.map((c) => (
              <th key={c} className="p-2">
                {c}
              </th>
            ))}
            {actions && <th className="p-2">{t("actions")}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r._id}
              className={`border-t hover:bg-gray-50 transition ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {columns.map((c) => (
                <td className="p-2" key={c}>
                  {r[c] ?? ""}
                </td>
              ))}
              {actions && <td className="p-2">{actions(r)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
