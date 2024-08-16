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
              className="flex gap-x-2 py-2 px-2 bg-lightBackgroundSea 
            rounded-md hover:bg-[#afd6eb63] text-teal-600 items-center "
            >
              Exit
              <LogOut size={20} />
            </button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <button className="flex items-center gap-x-2 py-2 px-3 bg-lightBackgroundSea rounded-md hover:bg-[#afd6eb63] text-teal-600">
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
