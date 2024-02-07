import Navbar from "./_components/navbar";
import SideBar from "./_components/sidebar";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="md:pl-56 h-[80px] fixed w-full ">
        <Navbar />
      </div>
      <div className="hidden w-56 h-full md:flex flex-col fixed z-50 inset-y-0 ">
        <SideBar />
      </div>
      <div className="md:pl-56 h-full pt-[80px]">{children}</div>
    </div>
  );
};

export default LayoutDashboard;
