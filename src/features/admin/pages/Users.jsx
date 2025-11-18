import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "../../../components/ui/sonner";
import { toast } from "sonner";
import Card from "../components/Card";
import {
  useGetAllUsersQuery,
  useBanUserMutation,
  useUnbanUserMutation,
} from "../adminApi";

export default function Users() {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery();
  const [banUser] = useBanUserMutation();
  const [unbanUser] = useUnbanUserMutation();
  const [viewUser, setViewUser] = useState(null);

  if (isLoading)
    return (
      <p className="text-gray-500 text-center py-6">{t("loadingUsers")}</p>
    );
  if (isError)
    return (
      <p className="text-red-500 text-center py-6">{t("errorLoadingUsers")}</p>
    );

  const handleBanUnban = async (user) => {
    try {
      if (user.active) {
        await banUser(user._id).unwrap();
        toast.success(t("userBanned"));
      } else {
        await unbanUser(user._id).unwrap();
        toast.success(t("userUnbanned"));
      }
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(user.active ? t("banFailed") : t("unbanFailed"));
    }
  };

  const renderActions = (user) => (
    <div className="flex gap-3">
      <button
        onClick={() => setViewUser(user)}
        className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition cursor-pointer"
      >
        {t("view")}
      </button>

      <button
        onClick={() => handleBanUnban(user)}
        className={`px-4 py-2 rounded-lg transition cursor-pointer ${
          user.active
            ? "bg-red-100 text-red-700 hover:bg-red-200"
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}
      >
        {user.active ? t("ban") : t("unban")}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Toaster />
      <h2 className="text-2xl font-semibold">{t("usersManagement")}</h2>

      <Card
        className="p-6"
        title={t("customers") + ` (${data?.customers?.length ?? 0})`}
      >
        <ul className="space-y-4">
          {(data?.customers || []).map((user) => (
            <li
              key={user._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border hover:shadow-sm transition"
            >
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              {renderActions(user)}
            </li>
          ))}
        </ul>
      </Card>

      <Card
        className="p-6"
        title={t("technicians") + ` (${data?.technicians?.length ?? 0})`}
      >
        <ul className="space-y-4">
          {(data?.technicians || []).map((user) => (
            <li
              key={user._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border hover:shadow-sm transition"
            >
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              {renderActions(user)}
            </li>
          ))}
        </ul>
      </Card>

      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-4">{viewUser.name}</h3>
            <div className="space-y-2">
              <p>
                <strong>{t("email")}:</strong> {viewUser.email}
              </p>
              <p>
                <strong>{t("role")}:</strong> {viewUser.role}
              </p>
              <p>
                <strong>{t("status")}:</strong>{" "}
                {viewUser.active ? t("active") : t("banned")}
              </p>
              <p>
                <strong>{t("rating")}:</strong> {viewUser.rating}
              </p>
              {viewUser.role === "technician" && (
                <p>
                  <strong>{t("totalEarning")}:</strong> {viewUser.totalEarning}
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setViewUser(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
