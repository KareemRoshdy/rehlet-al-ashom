import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-full border-l flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6 mr-auto w-full h-[80px]">
        <Logo />
      </div>

      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;