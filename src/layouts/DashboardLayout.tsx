import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout() {
  return (
<<<<<<< HEAD
    <SidebarProvider>
      <div className="min-h-[80vh] flex w-full">
        {/* المحتوى */}
         <AdminSidebar />
        <main className="flex-1">
          <header className="h-14 flex items-center justify-between border-b px-4 hedr-admin">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="ml-2" />
              <h1 className="text-2xl font-semibold  ">لوحة التحكم</h1>
            </div>
          </header>
          <div className="p-4">
            <Outlet />
=======
    <div dir="rtl" className="min-h-[80vh] flex w-full">
      {/* المحتوى */}
      <main className="flex-1">
        <header className="h-14 flex items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">لوحة التحكم</h1>
>>>>>>> 7acf058744beb3e02098cc3b2d13790ca18ccfca
          </div>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>

<<<<<<< HEAD
        {/* الشريط الجانبي في اليمين */}
      </div>
    </SidebarProvider>
=======
      {/* الشريط الجانبي الثابت في اليمين */}
      <AdminSidebar />
    </div>
>>>>>>> 7acf058744beb3e02098cc3b2d13790ca18ccfca
  );
}
