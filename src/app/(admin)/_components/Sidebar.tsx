import Logo from "@/app/(dashboard)/_components/Logo";
import SidebarRoutes from "@/app/(dashboard)/_components/SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-full border-l flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6  w-full h-[80px] border-b ">
        <Logo />
      </div>

      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
