import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  return (
    <aside dir="rtl" className="w-64 shrink-0 border-l bg-background sticky top-16 h-[calc(100vh-4rem)]">
      <div className="h-full overflow-y-auto">
        <div className="px-4 py-3">
          <div className="text-foreground font-semibold mb-2 text-right">لوحة التحكم</div>
          <nav>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.url}>
                  <NavLink
                    to={item.url}
                    end
                    className={({ isActive }) =>
                      `flex items-center justify-end gap-2 px-3 py-2 rounded-md transition-smooth ${getNavCls({ isActive })}`
                    }
                  >
                    <span className="ml-2">{item.title}</span>
                    <item.icon className="h-4 w-4" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
