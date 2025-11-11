import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [menuSide, setMenuSide] = useState(
    i18n.language === "ar" ? "right" : "left"
  );
  useEffect(() => {
    setLinks([
      { name: t("home"), href: "/" },
      { name: t("offers"), href: "/offers" },
      { name: t("categories"), href: "/categories" },
      { name: t("about"), href: "/about" },
    ]);
  }, [i18n.language, t]);

  const handleMenuToggle = () => {
    if (!isOpen) setMenuSide(i18n.language === "ar" ? "right" : "left");
    setIsOpen(!isOpen);
  };
  return (
    <nav className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/80 rounded-xl shadow-md px-6 py-3 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-800">
            {t("appName")}
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <LanguageSwitcher />
        </div>
        <button
          onClick={handleMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`fixed top-0 ${menuSide}-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-2xl transform ${
          isOpen
            ? "translate-x-0"
            : menuSide === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        } transition-transform duration-300 flex flex-col p-6 gap-6 z-40 rounded-l-xl`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {t("appName")}
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-5 mt-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="mt-auto">
          <LanguageSwitcher />
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/25 z-30 md:hidden backdrop-blur-sm"
        />
      )}
    </nav>
  );
}
