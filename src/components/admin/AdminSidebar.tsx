import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Home, Settings, Shield, Users, ListChecks, FileSpreadsheet } from "lucide-react";

const items = [
  { title: "الصفحة الرئيسية", url: "/dashboard", icon: Home },
  { title: "إعدادات التأمين", url: "/dashboard/insurance-settings", icon: Settings },
  { title: "إدارة الاشتراكات", url: "/dashboard/subscriptions", icon: FileSpreadsheet },
  { title: "إدارة المستخدمين", url: "/dashboard/users", icon: Users },
  { title: "إدارة خدمات التأمين", url: "/dashboard/services", icon: Shield },
  { title: "نماذج الطلبات", url: "/dashboard/requests", icon: ListChecks },
];

export default function AdminSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar side="right" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground">لوحة التحكم</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild className="justify-end">
                    <NavLink to={item.url} end className={getNavCls}>
                      {!isCollapsed && <span className="ml-2">{item.title}</span>}
                      <item.icon className="h-4 w-4" />
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
