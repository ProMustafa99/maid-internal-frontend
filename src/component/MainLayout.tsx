// import { Outlet } from "react-router-dom";
// import { MobileHeader } from "./Sidebar/MobileHeader";
// import Sidebar from "./Sidebar/Sidebar";
// import { useEffect, useState } from "react";

// export default function MainLayout() {
//   const [width, setWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return (
//     <div className={`h-screen flex overflow-hidden text-xl rtl:text-2xl`}>
//       <div className="hidden lg:block"><Sidebar /></div>
//       <div className="flex-1 flex flex-col md:overflow-x-hidden">
//         {width < 1024 ? <MobileHeader /> : <></>}
//         <main className="flex-1 overflow-y-auto bg-gray-50 lg:p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
