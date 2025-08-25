import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { createTheme } from '@mui/material/styles';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import Dashboard from '../../pages/Dashboard';
import Leads from '../../pages/Leads';
import Maids from '../../pages/Maids';
import Notifiaction from '../../pages/Notifiaction';
import Settings from '../../pages/Settings';
import TeamMembers from '../../pages/TeamMembers';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'maids',
    title: 'Maid',
    icon: <PersonIcon />,
  },

  {
    segment: 'leads',
    title: 'Leads',
    icon: <AssignmentIcon />,
  },

  {
    segment: 'team',
    title: 'Team',
    icon: <GroupIcon />,
  },
  {
    segment: 'notifications',
    title: 'Notifications',
    icon: <NotificationsIcon />,
  },

  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
 
  // {
  //   segment: 'reports',
  //   title: 'Reports',
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: 'sales',
  //       title: 'Sales',
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: 'traffic',
  //       title: 'Traffic',
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: 'integrations',
  //   title: 'Integrations',
  //   icon: <LayersIcon />,
  // },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
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

function DemoPageContent({ pathname }: { pathname: string }) {
  // Extract the segment from the pathname
  const segment = pathname.split('/').pop() || 'dashboard';
  
  // Render the appropriate component based on the segment
  switch (segment) {
    case 'dashboard':
      return <Dashboard />;
    case 'maids':
      return <Maids />;
    case 'leads':
      return <Leads />;
    case 'team':
      return <TeamMembers />;
    case 'notifications':
      return <Notifiaction />;
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard />;
  }
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

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

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
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
      {/* preview-end */}
    </DemoProvider>
  );
}
