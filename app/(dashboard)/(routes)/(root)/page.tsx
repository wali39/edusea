import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseList from "../search/_components/course-list";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "../../_components/info-card";
import GetDashboardCourses from "@/actions/get-dashboard-courses";

const Dashboard = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");
  const { completedCourses, courseInProgress } = await GetDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          Icon={Clock}
          progressItems={courseInProgress.length}
          label="In Progress"
        />
        <InfoCard
          Icon={CheckCircle}
          progressItems={completedCourses.length}
          label="Completed"
        />
      </div>
      
      <CourseList items={[...completedCourses, ...courseInProgress]} />
    </div>
  );
};

export default Dashboard;
