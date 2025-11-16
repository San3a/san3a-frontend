import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isRTL = i18n.language === "ar";

  useEffect(() => {
    setLinks([
      { name: t("home"), href: "/" },
      { name: t("offers"), href: "/offers" },
      { name: t("categories"), href: "/categories" },
      { name: t("about"), href: "/about" },
    ]);
  }, [i18n.language, t]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setIsOpen(false);
  };

  const menuClass = isOpen
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-full pointer-events-none";

  return (
    <nav
      className={`top-0 left-0 bg-peter w-full z-50 backdrop-blur-sm transition-colors duration-300 border-b border-opacity-20`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="/"
          className="text-2xl font-extrabold tracking-tight transition-colors duration-300 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500"
        >
          {t("appName")}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-semibold text-sm tracking-wider transition-all duration-300 relative group
               `}
            >
              {link.name}
              <span
                className={`absolute bottom-[-5px] left-0 w-full h-[2px] transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 `}
              ></span>
            </a>
          ))}

          <div className="flex items-center gap-4 border-l pl-4 border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <input
                type="text"
                placeholder={t("search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`py-1.5 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-80 ${
                  isRTL ? "pr-3 pl-10 text-right" : "pl-3 pr-10"
                } bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm`}
              />
              <button
                type="submit"
                className={`absolute ${
                  isRTL ? "left-3" : "right-3"
                } top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition`}
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="full-page-drawer"
        >
          {isOpen ? (
            <X size={28} className="text-gray-700 dark:text-gray-100" />
          ) : (
            <Menu size={28} className="text-gray-700 dark:text-gray-100" />
          )}
        </button>
      </div>

      <div
        id="full-page-drawer"
        className={`fixed inset-0 h-screen w-screen transform transition-all duration-500 ease-in-out z-[90] flex flex-col p-8 md:hidden 
          ${menuClass} ${
          theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-gray-900"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center mb-10">
          <a
            href="/"
            className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500"
          >
            {t("appName")}
          </a>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close menu"
          >
            <X size={32} className="text-gray-700 dark:text-gray-100" />
          </button>
        </div>

        <div className="flex flex-col gap-6 flex-grow">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-3xl font-bold tracking-tight transition hover:text-blue-500 dark:hover:text-blue-400 ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <form onSubmit={handleSearch} className="mt-8 relative w-full">
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`py-3 text-lg rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-blue-500 w-full bg-transparent text-gray-800 dark:text-gray-200 ${
              isRTL ? "pr-14 pl-4 text-right" : "pl-14 pr-4"
            } border-gray-300 dark:border-gray-700`}
          />
          <button
            type="submit"
            className={`absolute ${
              isRTL ? "left-4" : "right-4"
            } top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition`}
            aria-label="Search"
          >
            <Search size={24} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
