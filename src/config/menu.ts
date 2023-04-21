import Settings from "@mui/icons-material/Settings";
import ExitToApp from "@mui/icons-material/ExitToApp";

interface SideBarOption {
  id: number;
  name: string;
  href: string;
  icon: IconType;
}
export const sideBarOption: SideBarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
    icon: "Settings",
  },
];

export const MuiIcons = {
  Settings,
  ExitToApp,
};

export type IconType = keyof typeof MuiIcons;
