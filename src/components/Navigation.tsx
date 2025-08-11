import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, UserCircle, LogIn, UserPlus, ChevronDown, User } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "الرئيسية", icon: null },
    { path: "/support", label: "الدعم والمساعدة", icon: null },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-right">
                <h1 className="text-lg font-bold text-foreground">JPU ER</h1>
                <p className="text-xs text-muted-foreground">التأمين الصحي</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-smooth px-3 py-2 rounded-lg ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Sections Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium space-x-2 space-x-reverse">
                  <span>الأقسام</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[60] bg-popover">
                <Link to="/sections/doctors"><DropdownMenuItem>الأطباء</DropdownMenuItem></Link>
                <Link to="/sections/hospitals"><DropdownMenuItem>المستشفيات</DropdownMenuItem></Link>
                <Link to="/sections/pharmacies"><DropdownMenuItem>الصيدليات</DropdownMenuItem></Link>
                <Link to="/sections/laboratories"><DropdownMenuItem>المختبرات</DropdownMenuItem></Link>
                <Link to="/sections/dental-clinics"><DropdownMenuItem>عيادات الأسنان</DropdownMenuItem></Link>
                <Link to="/sections/radiology"><DropdownMenuItem>الأشعة</DropdownMenuItem></Link>
                <Link to="/sections/optical-clinics"><DropdownMenuItem>العيون</DropdownMenuItem></Link>
                <Link to="/sections/physical-therapy"><DropdownMenuItem>المعالجة الفيزيائية</DropdownMenuItem></Link>
                <div className="my-1 h-px bg-border" />
                <Link to="/subscription"><DropdownMenuItem>الاشتراك بالتأمين</DropdownMenuItem></Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Link to="/profile" className="text-muted-foreground hover:text-foreground" aria-label="الملف الشخصي">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="space-x-2 space-x-reverse">
                <LogIn className="w-4 h-4" />
                <span>تسجيل دخول</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="btn-medical space-x-2 space-x-reverse">
                <UserPlus className="w-4 h-4" />
                <span>إنشاء حساب</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <div className="px-4 text-xs text-muted-foreground mb-1">الأقسام</div>
                <div className="grid grid-cols-2 gap-2 px-4">
                  <Link to="/sections/doctors" onClick={() => setIsMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">الأطباء</Link>
                  <Link to="/sections/hospitals" onClick={() => setIsMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">المستشفيات</Link>
                  <Link to="/sections/pharmacies" onClick={() => setIsMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">الصيدليات</Link>
                  <Link to="/sections/laboratories" onClick={() => setIsMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">المختبرات</Link>
                  <Link to="/sections/dental-clinics" onClick={() => setIsMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">عيادات الأسنان</Link>
                  <Link to="/sections/radiology" onClick={() => setIsMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">الأشعة</Link>
                  <Link to="/sections/optical-clinics" onClick={() => setIsMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">العيون</Link>
                  <Link to="/sections/physical-therapy" onClick={() => setIsMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">المعالجة الفيزيائية</Link>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <Link to="/subscription" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground">الاشتراك بالتأمين</Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start space-x-2 space-x-reverse">
                    <LogIn className="w-4 h-4" />
                    <span>تسجيل دخول</span>
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full btn-medical justify-start space-x-2 space-x-reverse">
                    <UserPlus className="w-4 h-4" />
                    <span>إنشاء حساب</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;