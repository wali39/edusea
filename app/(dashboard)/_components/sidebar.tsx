"use client";

import { Separator } from "@/components/ui/separator";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const SideBar = () => {
  return (
    <div className="flex flex-col  border-r-2 h-full  overflow-y-auto shadow-sm ">
      <div className="px-3 py-3 mb-2">
        <Logo />
      </div>
      <Separator className="shadow-sm mt-2" />
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
