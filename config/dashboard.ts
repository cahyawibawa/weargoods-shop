import { SidebarNavItem } from "lib/utils";

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
}; // <-- This is the type of the dashboardConfig object

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "user",
      items: [],
    },
    // {
    //   title: "Stores",
    //   href: "/dashboard/store",
    //   icon: "store",
    //   items: [],
    // },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: "scrollText",
      items: [],
    },
  ],
};
