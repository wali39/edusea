import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    (pathname == "/" && href == "/") ||
    pathname == href ||
    pathname.startsWith(`${href}/`);

  const handleclick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={handleclick}
      className={cn(
        "flex gap-x-2 pl-4 transition-all",
        isActive && "bg-gray-400 text-white "
      )}
    >
      <div className="flex gap-x-2 py-4">
        <Icon />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto border-r-4 border-r-lime-900  h-full opacity-0 ",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
