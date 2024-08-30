import { FluentProvider, webLightTheme } from '@fluentui/react-components';import './App.css';
import { Drawer} from './components/layout/nav';
import { DrawerItem } from './types';

import {
  Board20Filled,
  Board20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  bundleIcon,
} from "@fluentui/react-icons";

// Define the icons using bundleIcon
const DashboardIcon = bundleIcon(Board20Filled, Board20Regular);
const AnnouncementsIcon = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);

// Define the array of items to pass to the Drawer component
const navItems: DrawerItem[] = [
  { href: "/dashboard", icon: <DashboardIcon />, text: "Dashboard", value: "1" },
  { href: "/announcements", icon: <AnnouncementsIcon />, text: "Announcements", value: "2" },
  // Add more items as needed
];
function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Drawer items={navItems}/>
    </FluentProvider>
  );
}

export default App;
