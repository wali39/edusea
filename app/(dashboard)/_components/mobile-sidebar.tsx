"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideBar from "./sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-50 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
