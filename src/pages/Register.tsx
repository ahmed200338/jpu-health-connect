import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Phone, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import doctorHero from "@/assets/doctor-hero.jpg";

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration
    toast({
      title: "تم إنشاء الحساب بنجاح",
      description: "مرحباً بك في نظام التأمين الصحي لجامعة الجزيرة الخاصة",
    });
    
    console.log("Registration data:", formData);
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
                    <p className="text-sm font-semibold text-foreground">د. ديفيد جيمس</p>
                    <p className="text-xs text-muted-foreground">طبيب أطفال</p>
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
            <div className="text-center mt-6 text-white">
              <h3 className="text-2xl font-bold mb-2">أنشأ حسابك الآن</h3>
              <p className="text-white/80">يرجى التواصل معنا للحصول على أسرع استجابة.</p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="card-medical">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">أنشأ حسابك الآن</h1>
                <p className="text-muted-foreground">قم بإنشاء حسابك اليوم وابدأ في استخدام التأمين</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-right block">الاسم :</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="سماء منذر الحميد"
                        value={formData.name}
                        onChange={handleChange}
                        className="pr-10"
                        dir="rtl"
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-right block">الايميل :</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="samahalhmed@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pr-10 ltr"
                        dir="ltr"
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-right block">كلمة المرور :</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="123456789"
                        value={formData.password}
                        onChange={handleChange}
                        className="pr-10 ltr"
                        dir="ltr"
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-right block">رقم الهاتف :</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="0933885542"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pr-10 ltr"
                        dir="ltr"
                      />
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-medical">
                    تسجيل دخول
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    هل لديك حساب بالفعل؟{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      قم بتسجيل الدخول
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;