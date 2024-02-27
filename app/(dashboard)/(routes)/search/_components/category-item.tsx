"use client";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  id?: string;
  icon?: IconType;
}
const CategoryItem = ({ label, id, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("categoryId");
  const title = searchParams.get("title");
  const isSelected = currentCategory == id;
  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: title,
          categoryId: isSelected ? null : id,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center border rounded-lg py-2 px-3 bg-slate-100 gap-x-2 hover:bg-slate-200 ",
        isSelected && "bg-slate-300 border-slate-500/40 border-2"
      )}
      type="button"
    >
      {Icon && (
        <Icon
          size={25}
          className={cn(label === "Rocket science" && "text-green-500")}
        />
      )}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
