import {
  CalendarViewDay,
  DisplaySettings,
  Done,
  EventNote,
  ExpandLess,
  ExpandMore,
  Feedback,
  LocalOffer,
  Loyalty,
  NotificationImportant,
  NotificationsActive,
  OtherHouses,
  PinDrop,
  Policy,
  PunchClock,
  Settings,
  Straighten,
  ViewCarousel,
} from "@mui/icons-material";

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
  Done,
  ExpandLess,
  ExpandMore,
  NotificationsActive,
  Settings,
  PinDrop,
  Straighten,
  NotificationImportant,
  DisplaySettings,
  OtherHouses,
  EventNote,
  ViewCarousel,
  Loyalty,
  PunchClock,
  Policy,
  CalendarViewDay,
  Feedback,
  LocalOffer,
};

export type IconType = keyof typeof MuiIcons;
