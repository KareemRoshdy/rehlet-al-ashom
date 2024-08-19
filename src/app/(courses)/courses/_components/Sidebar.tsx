import Logo from "@/app/(dashboard)/_components/Logo";
import CourseSidebarRoutes from "./CourseSidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-full border-l flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6 mr-auto  w-full h-[80px] border-b">
        <Logo />
      </div>

      <div className="flex flex-col w-full">
        <CourseSidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
