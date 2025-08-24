// import { Building, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/auth-context";
// import { useLanguageSwitcher } from "../../hooks/language-switcher";
// import { useNavigationPermissions } from "../../hooks/useNavigationPermissions";
// import LanguageSwitcher from "./LanguageSwitcher";

// interface SidebarProps {
//   setOpen?: (open: boolean) => void;
// }

// export default function Sidebar({ setOpen }: SidebarProps) {
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const { t } = useTranslation();
//   const { currentLanguage } = useLanguageSwitcher();
//   const { filteredNavItems } = useNavigationPermissions(t);
//   return (
//     <div
//       className={
//         "flex flex-col w-full lg:w-64 bg-white border-r border-l border-gray-200 h-screen"
//       }
//     >
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center justify-center p-2 bg-primary-50 rounded-md">
//           <Building className="h-6 w-6 text-primary-600 mr-2" />
//           <span className="text-primary-600 font-semibold text-2xl">
//             {t("app.name")}
//           </span>
//         </div>
//       </div>

//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center space-x-3">
//           <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//             <span className="text-gray-500 font-medium">
//               {user?.display_name?.charAt(0)?.toUpperCase() || "F"}
//             </span>
//           </div>
//           <div>
//             <p className="font-medium text-gray-800">{user?.display_name}</p>
//             <p className="text-sm text-gray-500">{user?.role}</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 px-2 py-4 space-y-1">
//         {filteredNavItems.map((item) => {
//           const isActive = location.pathname === item.href;
//           const Icon = item.icon;

//           return (
//             <Link key={item.name} to={item.href}>
//               <div
//                 className={`flex items-center px-5 py-3 rounded-md cursor-pointer ${isActive ? "bg-primary text-primary-foreground" : "text-gray-600"}`}
//                 onClick={() => setOpen && setOpen(false)}
//               >
//                 <Icon className="h-5 w-5 me-2" />
//                 <span className="flex-1 text-start">{item.name}</span>
//                 <div className="lg:hidden">
//                   {currentLanguage === "ar" ? (
//                     <ChevronLeft className="h-4 w-4" />
//                   ) : (
//                     <ChevronRight className="h-4 w-4" />
//                   )}
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </nav>


//       <div className="p-4 border-t border-gray-200 flex justify-between items-center">
//         <button
//           className="flex items-center text-gray-600 hover:text-gray-800 space-x-2"
//           onClick={logout}
//         >
//           <LogOut
//             className={`mr-3  h-5 w-5 ${currentLanguage === "ar" ? "rotate-180 ml-3" : ""}`}
//           />
//           <span className="">{t("auth.logout")}</span>
//         </button>

//         <LanguageSwitcher />
//       </div>
//     </div>
//   );
// }
