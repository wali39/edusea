"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];
const teacherRoutes = [
  {
    icon: List,
    label: "course",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherMode = pathname.startsWith("/teacher");
  const routes = isTeacherMode ? teacherRoutes : studentRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          href={route.href}
          label={route.label}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
