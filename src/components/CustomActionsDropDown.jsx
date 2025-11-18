import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaEllipsisH } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

function CustomActionsDropDown({ options }) {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  const currentLang = i18n.language || "en";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`w-8 h-8 ms-auto rounded-full bg-transparent border-none ${
            theme === "dark" ? "hover:bg-gray-100" : "hover:bg-black/30"
          }`}
        >
          <FaEllipsisH
            className={`text-gray-600 ${
              theme === " dark" ? "hover:text-black" : "hover:text-white"
            }`}
          />
          <ChevronDown size={16} className="absolute opacity-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={currentLang === "ar" ? "start" : "end"}
        className={`min-w-fit ${theme === "dark" ? "bg-black" : "bg-white"}`}
      >
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={option.onClick}
            className={`cursor-pointer hover:bg-blue-900 hover:text-blue-700 font-semibold flex justify-center"
                              
                          }`}
          >
            <span className={`text-md mr-2 ${option.color}`}>
              {option.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomActionsDropDown;
