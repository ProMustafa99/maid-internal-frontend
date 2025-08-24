import { Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguageSwitcher } from "../../hooks/language-switcher";
import { useTranslation } from "react-i18next";


export default function LanguageSwitcher() {
    const { currentLanguage, switchLanguage } = useLanguageSwitcher();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  
    // Close dropdown on outside click
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    return (
      <div ref={ref} className="relative inline-block">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-none border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
          aria-label={t("common.languageSelector")}
        >
          <Languages className="h-5 w-5" />
        </button>
        {open && (
          <div className="absolute right-1 bottom-8 mt-1 bg-white border border-gray-300 rounded shadow-md z-50  p-1">
            <div
              onClick={() => {
                switchLanguage("en");
                setOpen(false);
              }}
              className={`relative flex cursor-default gap-2 px-3 py-2  rounded-sm  ${currentLanguage === "en" ? "bg-gray-100" : "bg-white"}`}
            >
              {t("common.english")}
            </div>
  
            <div
              onClick={() => {
                switchLanguage("ar");
                setOpen(false);
              }}
              className={`relative flex cursor-default gap-2 px-3 py-2  rounded-sm  ${currentLanguage === "ar" ? "bg-gray-100" : "bg-white"}`}
            >
              {t("common.arabic")}
            </div>
          </div>
        )}
      </div>
    );
}
