import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Home, Settings, Shield, Users, ListChecks, FileSpreadsheet, Menu, UserCircle, UserRound, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
  const { signOut } = useAuth();

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar side="right" collapsible="icon" >
      <SidebarContent className="side-admin" >
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground "><div className="flex items-center space-x-4 space-x-reverse mb-2">
            <Link to="/profile" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10  rounded-xl flex items-center justify-center">
                <UserCircle  className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-right w-28  bg-primary-foreground/20">
                <h1 className="text-2xl mr-3 font-bold text-accent">J<span className="text-primary-foreground">P</span>U E<span className="text-primary-foreground">R</span></h1>
                
              </div>
            </Link>
          </div></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem  key={item.url}>
                  <SidebarMenuButton size="lg" asChild className="justify-start hover:bg-accent">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon  className="h-4 w-4 text-primary-foreground" />
                      {!isCollapsed && <span className="ml-2 text-lg text-primary-foreground">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  size="lg" 
                  className="justify-start hover:bg-destructive/10 text-destructive hover:text-destructive"
                  onClick={signOut}
                >
                  <LogOut className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-2 text-lg">تسجيل الخروج</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
