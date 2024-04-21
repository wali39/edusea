import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "../../../components/navbar-routes";

const Navbar = () => {
  return (
    <div className="flex items-center  h-full bg-white border-b-2 shadow-sm p-4 ">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
