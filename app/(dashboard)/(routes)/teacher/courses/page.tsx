import { Button } from "@/components/ui/button";
import Link from "next/link";

const coursesPage = () => {
  return (
    <div>
      <Link href="/teacher/create">
        <Button>create course</Button>
      </Link>
    </div>
  );
};

export default coursesPage;
