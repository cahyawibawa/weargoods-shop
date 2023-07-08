export type UserRole = "user" | "admin" | "superadmin";
export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}
import { type Icons } from "@/components/Icons";
export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}
export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}
export type SidebarNavItem = NavItemWithChildren;
