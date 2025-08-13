import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Pill, 
  Microscope, 
  Scan, 
  AlertTriangle, 
  Building2, 
  Bone,
  Stethoscope,
  Eye,
  Brain,
  Shield,
  Clock,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import stethoscopeBg from "@/assets/stethoscope-bg.jpg";

const Departments = () => {
  const departments = [
    {
      icon: Pill,
      name: "قسم الصيدليات",
      description: "توفير الأدوية والعلاجات المختلفة بجودة عالية وأسعار مناسبة للطلاب والموظفين في الجامعة",
      services: ["صرف الأدوية", "الاستشارات الدوائية", "متابعة العلاج"],
      hours: "8:00 ص - 8:00 م",
      path: "/sections/pharmacies"
    },
    {
      icon: Microscope,
      name: "قسم المختبر",
      description: "إجراء التحاليل الطبية والفحوصات المخبرية الشاملة باستخدام أحدث التقنيات والأجهزة المتطورة",
      services: ["تحاليل الدم", "فحص البول", "الفحوصات الميكروبيولوجية"],
      hours: "7:00 ص - 4:00 م",
      path: "/sections/laboratories"
    },
    {
      icon: Scan,
      name: "قسم الأشعة",
      description: "خدمات التصوير الطبي الشامل باستخدام أجهزة الأشعة المتطورة لتشخيص دقيق وآمن",
      services: ["الأشعة السينية", "الموجات فوق الصوتية", "الرنين المغناطيسي"],
      hours: "8:00 ص - 6:00 م",
      path: "/sections/dental-clinics"
    },
    {
      icon: AlertTriangle,
      name: "قسم مركز الأزمة",
      description: "وحدة الطوارئ الطبية المجهزة لاستقبال الحالات العاجلة وتقديم الإسعافات الأولية على مدار الساعة",
      services: ["الإسعافات الأولية", "حالات الطوارئ", "الرعاية العاجلة"],
      hours: "24 ساعة / 7 أيام",
      path: "/sections/hospitals"
    },
    {
      icon: Building2,
      name: "قسم العيادات",
      description: "مجموعة متنوعة من العيادات التخصصية لتقديم الرعاية الطبية الشاملة في مختلف التخصصات الطبية",
      services: ["الطب العام", "طب الأسنان", "أمراض النساء"],
      hours: "8:00 ص - 5:00 م",
      path: "/sections/doctors"
    },
    {
      icon: Bone,
      name: "المعالجة الفيزيائية",
      description: "قسم العلاج الطبيعي المتخصص في إعادة التأهيل وعلاج الإصابات والآلام العضلية والمفصلية",
      services: ["العلاج الطبيعي", "إعادة التأهيل", "التدليك العلاجي"],
      hours: "8:00 ص - 6:00 م",
      path: "/sections/physical-therapy"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${stethoscopeBg})` }}
      >
        <div className="absolute inset-0 bg-primary/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-accent">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            شريكك في الصحة والعافية
          </h1>
          <p className="text-xl text-accent/90 max-w-3xl mx-auto">
            نحن ملتزمون بتزويدك بأفضل الخدمات الطبية والصحية لضمان حياة أكثر صحة وسعادة
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              قائمة الأقسام
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              تعرف على جميع الأقسام الطبية المتاحة في نظام التأمين الصحي الجامعي
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
            <Link to={dept.path}>
              <Card key={index} className="card-medical group hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                      <dept.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {dept.name}
                      </h3>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{dept.hours}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-right">
                    {dept.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">الخدمات المتاحة:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {dept.services.map((service, idx) => (
                        <div key={idx} className="flex items-center space-x-2 space-x-reverse text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How to Access Services */}
      <section className="py-20 medical-gradient-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
            كيفية الوصول للخدمات
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">تسجيل الدخول</h3>
              <p className="text-muted-foreground">سجل دخولك إلى النظام باستخدام بيانات الطالب</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">اختر القسم</h3>
              <p className="text-muted-foreground">حدد القسم المناسب حسب احتياجك الطبي</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">احصل على الخدمة</h3>
              <p className="text-muted-foreground">توجه للقسم واستفد من الخدمات المشمولة بالتأمين</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      {/* <section className="py-16 hero-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
            <AlertTriangle className="w-8 h-8" />
            <h2 className="text-2xl font-bold">حالات الطوارئ</h2>
          </div>
          <p className="text-lg mb-6">
            في حالة الطوارئ الطبية، توجه مباشرة إلى قسم مركز الأزمة أو اتصل على:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 sm:space-x-reverse">
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <AlertTriangle className="w-4 h-4 ml-2" />
              911 - رقم الطوارئ
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <Shield className="w-4 h-4 ml-2" />
              +962 27 390 911
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Departments;