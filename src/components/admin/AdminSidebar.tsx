import { NavLink, Outlet } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Shield, Users, Stethoscope, Inbox, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "الرئيسية", url: "/dashboard", icon: Home },
  { title: "إعدادات التأمين", url: "/dashboard/insurance", icon: Shield },
  { title: "إدارة الاشتراكات", url: "/dashboard/subscriptions", icon: FileText },
  { title: "إدارة المستخدمين", url: "/dashboard/users", icon: Users },
  { title: "إدارة الخدمات", url: "/dashboard/services", icon: Stethoscope },
  { title: "الطلبات", url: "/dashboard/requests", icon: Inbox },
];

export default function AdminSidebar() {
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-2 rounded-md px-3 py-2 transition-colors",
      isActive ? "bg-muted text-primary" : "hover:bg-muted/50"
    );

  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>لوحة التحكم</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
