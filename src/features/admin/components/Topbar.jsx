import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default function Topbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-white p-3 rounded-2xl shadow flex items-center justify-between">
      <div className="text-sm text-gray-600">
        {t("welcomeBack", { user: user?.name || "Admin" })}
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-gray-700 hover:bg-slate-200 transition">
              {user?.name?.charAt(0)?.toUpperCase() || "O"}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 bg-white" align="end">
            <DropdownMenuLabel className="flex items-center gap-2">
              <User size={16} />
              {user?.name || "Admin"}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer flex items-center gap-2"
            >
              <LogOut size={16} />
              {t("Logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
