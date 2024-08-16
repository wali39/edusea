import { Clock, LucideIcon } from "lucide-react";

interface InfoCardProps {
  Icon: LucideIcon;
  progressItems: number;
  label: string;
}

const InfoCard = ({ Icon, progressItems, label }: InfoCardProps) => {
  return (
    <div className="flex items-center gap-x-4 rounded-md border-x-2 border-secondarySea p-2 bg-lightBackgroundSea">
      <div className="bg-primarySea  rounded-full p-2">
        <Icon size={25} className="text-white font-medium" />
      </div>
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-gray-500 text-sm">
          {progressItems}
          {progressItems == 1 ? " Course" : " Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
