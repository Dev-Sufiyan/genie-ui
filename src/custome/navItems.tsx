import { DrawerItem } from "../types";
import { Dashboard } from "../components/pages";
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

export const navItems: DrawerItem[] = [
    { icon: <DashboardIcon />, text: "Dashboard", value: "1" ,component:<Dashboard/>},
    {  icon: <AnnouncementsIcon />, text: "Announcements", value: "2" , component:<AnnouncementsIcon />},
  ];