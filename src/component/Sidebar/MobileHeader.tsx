import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/auth-context";
import { useLanguageSwitcher } from "../../hooks/language-switcher";
import Sidebar from "./Sidebar";

export function MobileHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { currentLanguage } = useLanguageSwitcher();
  const { t } = useTranslation();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const trigger = document.getElementById("sidebar-trigger");
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        trigger &&
        !trigger.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="lg:hidden bg-white border-b border-gray-200 py-4 px-4 flex items-center justify-between">
      <button
        id="sidebar-trigger"
        className="text-gray-600"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-y-0 ${currentLanguage === "ar" ? "right-0" : "left-0"} w-3/5 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          open
            ? "translate-x-0"
            : currentLanguage === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
      >
        <Sidebar setOpen={setOpen} />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="text-primary-600 font-semibold text-lg">
        {t("app.name")}
      </div>

      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm font-medium">
          {user?.display_name?.charAt(0)?.toUpperCase() || "?"}
        </span>
      </div>
    </header>
  );
}
