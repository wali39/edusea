import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const coursesPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const courses = await db.course.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default coursesPage;
