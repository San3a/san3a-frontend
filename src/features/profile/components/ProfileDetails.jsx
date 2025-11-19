import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Star, Mail, Briefcase } from "lucide-react";

const ProfileDetails = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Rating */}
      <div className="p-5 rounded-xl shadow-sm flex flex-col items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
        <Star className="text-yellow-500 mb-2" />
        <h3 className="font-semibold text-lg">{t("Rating")}</h3>
        <p className="text-xl font-bold">{user.rating}</p>
      </div>

      {/* Total Earnings (Technician only) */}
      {user.role === "technician" && (
        <div className="p-5 rounded-xl shadow-sm flex flex-col items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
          <Briefcase className="text-green-600 mb-2" />
          <h3 className="font-semibold text-lg">{t("Total Earnings")}</h3>
          <p className="text-xl font-bold">${user.totalEarning}</p>
        </div>
      )}

      {/* Email */}
      <div className="p-5 rounded-xl shadow-sm flex flex-col items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
        <Mail className="text-blue-600 mb-2" />
        <h3 className="font-semibold text-lg">{t("Email")}</h3>
        <p className="text-sm">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
