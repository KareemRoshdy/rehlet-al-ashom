import MobileSidebar from "@/app/(dashboard)/_components/MobileSidebar";
import NavbarRoutes from "@/app/(dashboard)/_components/NavbarRoutes";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes isAdminPage />
    </div>
  );
};

export default AdminNavbar;
