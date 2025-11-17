import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";
import ChatBotButton from "./ChatBotButton";

export default function Navbar() {
  const { t, i18n } = useTranslation();
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
    return () => (document.body.style.overflow = "");
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
    setIsOpen(false);
  };

  const menuClass = isOpen
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-full pointer-events-none";

  return (
    <nav
      className={`top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className={`text-3xl font-extrabold italic text-gray-900 dark:text-white hover:text-blue-500`}
          style={{
            fontFamily: isRTL
              ? "'Cairo', sans-serif"
              : "'Great Vibes', cursive",
          }}
        >
          {t("appName")}
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="font-medium text-sm text-gray-800 hover:text-blue-500 transition dark:text-gray-200 dark:hover:text-blue-500"
            >
              {link.name}
            </Link>
          ))}

          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`py-1.5 rounded border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 pl-3 pr-10 text-sm`}
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
          <ChatBotButton />
          <ThemeToggle />
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <X size={28} className="text-gray-900 dark:text-white" />
          ) : (
            <Menu size={28} className="text-gray-900 dark:text-white" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 h-screen w-screen bg-white dark:bg-gray-900 flex flex-col p-6 transition-all duration-500 ${menuClass} z-40`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className={`text-3xl font-extrabold italic text-gray-900 dark:text-white `}
            style={{
              fontFamily: isRTL
                ? "'Cairo', sans-serif"
                : "'Great Vibes', cursive",
            }}
          >
            {t("appName")}
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X size={28} className="text-gray-900 dark:text-white" />
          </button>
        </div>

        <div className="flex flex-col gap-6 flex-grow">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-500 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <form onSubmit={handleSearch} className="mt-6 relative w-full">
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`py-2 rounded border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent pl-3 pr-10 w-full`}
          />
          <button
            type="submit"
            className={`absolute ${
              isRTL ? "left-3" : "right-3"
            } top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition`}
          >
            <Search size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
