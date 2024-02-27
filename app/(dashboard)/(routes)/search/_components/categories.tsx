"use client";

import { Category } from "@prisma/client";
import CategoryItem from "./category-item";
import { IconType } from "react-icons";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcElectricalSensor,
  FcSportsMode,
  FcCommandLine,
} from "react-icons/fc";
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdOutlineRocketLaunch } from "react-icons/md";
interface CategoriesProps {
  items: Category[];
}
const iconMap: Record<Category["name"], IconType> = {
  "Electrical engineering": FcElectricalSensor,
  "Rocket science": MdOutlineRocketLaunch,
  "computer science": FcMultipleDevices,
  "Machine learning": FcEngineering,
  Fashion: FcSportsMode,
  Accounting: FcSalesPerformance,
};
const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex gap-x-2 pb-2 items-center overflow-x-scroll">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          icon={iconMap[item?.name]}
          label={item?.name}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
