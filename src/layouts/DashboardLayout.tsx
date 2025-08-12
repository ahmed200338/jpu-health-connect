import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout() {
  return (
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
          </div>
        </main>

        {/* الشريط الجانبي في اليمين */}
      </div>
    </SidebarProvider>
  );
}
