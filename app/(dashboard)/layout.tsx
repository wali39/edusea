import Navbar from "./_components/navbar";
import SideBar from "./_components/sidebar";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="md:pl-56 h-[80px]  fixed z-10 w-full ">
        <Navbar />
      </div>
      <div className="hidden w-56 h-full md:flex flex-col fixed z-50 inset-y-0 ">
        <SideBar />
      </div>
      <div className="md:pl-56 h-full pt-[80px] bg-backgroundSea">
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
