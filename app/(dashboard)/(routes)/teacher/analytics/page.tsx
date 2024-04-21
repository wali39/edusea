import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DataCard from "./_components/data-card";
import DataChart from "./_components/data-charts";
import { getAnalytics } from "@/actions/get-analytics";

const AnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");
  const { data, totalRevenues, totalSales } = await getAnalytics(userId);
  //   console.log("data", data);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DataCard
          label={"Total revenue"}
          value={totalRevenues}
          priceFormatted
        />
        <DataCard label={"Total sales"} value={totalSales} />
      </div>
      <DataChart data={data} />
    </div>
  );
};

export default AnalyticsPage;
