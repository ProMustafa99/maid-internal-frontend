import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider } from "@toolpad/core/internal";
import { useAuth } from "../context/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "../../pages/Dashboard";
import Leads from "../../pages/Leads";
import Maids from "../../pages/Maids";
import Notifiaction from "../../pages/Notifiaction";
import Settings from "../../pages/Settings";
import TeamMembers from "../../pages/TeamMembers";
import MaidsForm from "../../pages/MaidsForm";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "maids",
    title: "Maids",
    icon: <PersonIcon />,
    children: [
      {
        segment: "all-maids",
        title: "List Maids",
        icon: <ListIcon />,
      },
      {
        segment: "add-maids",
        title: "Add Maids",
        icon: <AddIcon />,
      },
    ],
  },
  {
    segment: "leads",
    title: "Leads",
    icon: <AssignmentIcon />,
  },
  {
    segment: "team",
    title: "Team",
    icon: <GroupIcon />,
  },
  {
    segment: "notifications",
    title: "Notifications",
    icon: <NotificationsIcon />,
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },

  // {
  //   segment: 'integrations',
  //   title: 'Integrations',
  //   icon: <LayersIcon />,
  // },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function LogoutComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/dashboard");
  }, [logout, navigate]);

  return <div>Logging out...</div>;
}

function DemoPageContent() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/maids" element={<Maids />} />
      <Route path="/maids/all-maids" element={<Maids />} />
      <Route path="/maids/add-maids" element={<MaidsForm />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/team" element={<TeamMembers />} />
      <Route path="/notifications" element={<Notifiaction />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/logout" element={<LogoutComponent />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function MainLayoutBasic(props: DemoProps) {
  const { window } = props;
  const navigate = useNavigate();
  const location = useLocation();

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  // Create a custom router object that works with React Router
  const router = {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (url: string | URL) => navigate(url.toString()),
  };

  return (
    // Remove this provider when copying and pasting into your project.
    <DemoProvider window={demoWindow}>
      {/* preview-start */}
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <div className="p-6 container mx-auto bg-white rounded-lg shadow-md">
          <DemoPageContent />
          </div>
        </DashboardLayout>
      </AppProvider>
      {/* preview-end */}

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </DemoProvider>
  );
}
