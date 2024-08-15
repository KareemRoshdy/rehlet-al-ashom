import NavbarRoutes from "@/app/(dashboard)/_components/NavbarRoutes";
import CourseMobileSidebar from "./CourseMobileSidebar";

const CourseNavbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar />
      <NavbarRoutes isAdminPage />
    </div>
  );
};

export default CourseNavbar;
