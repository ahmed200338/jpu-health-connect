import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";



export default function DashboardLayout() {
  const { user, signOut, userRole } = useAuth();

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
            <Button 
                  variant="secondary" 
                  size="sm" 
                  className="space-x-2 space-x-reverse border-primary text-lg"
                  onClick={signOut}
                >
                  <LogOut className="w-4 h-4" />
                  <span>تسجيل الخروج</span>
                </Button>
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
