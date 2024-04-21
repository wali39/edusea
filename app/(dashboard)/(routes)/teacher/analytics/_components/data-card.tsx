import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  label: string;
  value: number;
  priceFormatted?: boolean;
}

const DataCard = ({ label, value, priceFormatted }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {priceFormatted ? formatPrice(value) : value}
        </p>
      </CardContent>
    </Card>
  );
};

export default DataCard;
