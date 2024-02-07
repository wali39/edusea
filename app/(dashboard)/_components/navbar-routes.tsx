"use client";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherMode = pathname.startsWith("/teacher");
  const isPlayerMode = pathname.includes("/chapter");
  return (
    <div className="flex ml-auto gap-x-2 ">
      {isTeacherMode || isPlayerMode ? (
        <Link href="/">
          <button className="flex gap-x-2 py-2 px-3 bg-gray-100 hover:bg-gray-200">
            <LogOut />
            Exit
          </button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <button className="py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300">
            Teacher Mode
          </button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
