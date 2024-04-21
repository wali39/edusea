import { Clock, LucideIcon } from "lucide-react";

interface InfoCardProps {
  Icon: LucideIcon;
  progressItems: number;
  label: string;
}

const InfoCard = ({ Icon, progressItems, label }: InfoCardProps) => {
  return (
    <div className="flex items-center gap-x-4 rounded-md border-2 p-2 bg-slate-100">
      <div className="bg-slate-300  rounded-full p-2">
        <Icon size={25} className="text-slate-600 font-medium" />
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {progressItems}
          {progressItems == 1 ? " Course" : " Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
