import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <div dir="rtl">
      <SidebarProvider>
        <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b bg-background px-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="ml-2" />
            <h1 className="text-sm font-medium">لوحة التحكم</h1>
          </div>
        </header>
        <div className="flex w-full">
          {/* المحتوى ثم السايدبار يمين */}
          <SidebarInset className="flex-1 px-4 py-6">
            <Outlet />
          </SidebarInset>
          <AdminSidebar />
        </div>
      </SidebarProvider>
    </div>
  );
}
