"use client";

import { Separator } from "@/components/ui/separator";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const SideBar = () => {
  return (
    <div className="flex flex-col  border-r-2 h-full  overflow-y-auto shadow-sm bg-stone-50">
      <div className="p-5">
        <Logo />
      </div>
      <Separator className="mt-2" />
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
