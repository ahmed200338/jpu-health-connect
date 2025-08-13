import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { LogIn, Lock, User, Shield, Eye, EyeOff, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import doctorHero from "@/assets/doctor-hero.jpg";

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.password) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Simulate login
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بعودتك إلى نظام التأمين الصحي",
    });
    
    console.log("Login data:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen hero-section relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Doctor Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src={doctorHero} 
                alt="طبيبة مختصة" 
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <User className="w-6 h-6 text-primary" />
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">د. سارة أحمد</p>
                    <p className="text-xs text-muted-foreground">طبيبة عامة</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Shield className="w-6 h-6 text-green-500" />
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">1260+</p>
                    <p className="text-xs text-muted-foreground">مريض سعيد</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6 text-accent">
              <h3 className="text-2xl font-bold mb-2">أنشأ حسابك الآن</h3>
              
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="card-medical">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">تسجيل دخول</h1>
                <p className="text-muted-foreground">ابدأ في استخدام التأمين</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-right block"> اسم المستخدم:</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="اسم المستخدم او البريد الاكتروني"
                        value={formData.name}
                        onChange={handleChange}
                        className="pr-10"
                        dir="rtl"
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-right block">كلمة المرور :</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="كلمة المرور"
                        value={formData.password}
                        onChange={handleChange}
                        className="pr-10 pl-10 rtl"
                        dir="rtl"
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-medical">
                    تسجيل دخول
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    ليس لديك حساب بعد؟{" "}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      أنشئ حساباً جديداً
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary/60" />
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact Info */}

    </div>
  );
};

export default Login;