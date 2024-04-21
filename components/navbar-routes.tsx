"use client";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "../app/(dashboard)/_components/search-input";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherMode = pathname.startsWith("/teacher");
  const isCourseMode = pathname.includes("/course");
  const isSearchPage = pathname === "/search";
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block ">
          <SearchInput />
        </div>
      )}
      <div className="flex ml-auto gap-x-2 ">
        {isTeacherMode || isCourseMode ? (
          <Link href="/">
            <button
              className="flex gap-x-2 py-2 px-2 bg-gray-50 
            rounded-sm hover:bg-gray-200 items-center "
            >
              Exit
              <LogOut size={20} />
            </button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <button className="flex items-center gap-x-2 py-2 px-3 bg-gray-50 rounded-md hover:bg-gray-300">
              <FaChalkboardTeacher size={25} /> Teacher
            </button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
