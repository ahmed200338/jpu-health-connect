import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout() {
  return (
    <div dir="rtl" className="min-h-[80vh] flex w-full">
      {/* المحتوى */}
      <main className="flex-1">
        <header className="h-14 flex items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">لوحة التحكم</h1>
          </div>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>

      {/* الشريط الجانبي الثابت في اليمين */}
      <AdminSidebar />
    </div>
  );
}
