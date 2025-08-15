import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Heart,
  Shield,
  Clock,
  Users,
  Stethoscope,
  UserCheck,
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import doctorHero from "@/assets/doctor-hero.jpg";
import medicalTeam from "@/assets/medical-team.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const { user } = useAuth();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get user data from users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single();

        if (userError || !userData) {
          setLoading(false);
          return;
        }

        // Check if user has an active subscription
        const { data: subscription, error: subError } = await supabase
          .from("student_subscription")
          .select("id")
          .eq("user_id", userData.id)
          .eq("request_status", "approved")
          .maybeSingle();

        if (!subError && subscription) {
          setHasSubscription(true);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [user]);
  const features = [
    {
      icon: Shield,
      title: "تأمين شامل",
      description: "تغطية طبية شاملة لجميع الخدمات الصحية المطلوبة للطلاب",
    },
    {
      icon: Clock,
      title: "خدمة على مدار الساعة",
      description: "متاح 24/7 لضمان حصولك على الرعاية الطبية في أي وقت",
    },
    {
      icon: Heart,
      title: "رعاية متخصصة",
      description: "فريق طبي متخصص ومؤهل لتقديم أفضل الخدمات الصحية",
    },
    {
      icon: Users,
      title: "شبكة واسعة",
      description: "شبكة واسعة من المستشفيات والعيادات المتعاقد معها",
    },
  ];

  const departments = [
    { name: "قسم الصيدليات", icon: "💊", verent: "/sections/pharmacies" },
    { name: "قسم المختبر", icon: "🔬", verent: "/sections/laboratories" },
    { name: "قسم الأشعة", icon: "📱", verent: "/sections/optical-clinics" },
    { name: "قسم  المشافي", icon: "🚨", verent: "/sections/hospitals" },
    { name: "قسم العيادات", icon: "🏥", verent: "/sections/doctors" },
    {
      name: "المعالجة الفيزيائية",
      icon: "🦴",
      verent: "/sections/physical-therapy",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-right text-accent ">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                مرحباً بكم في
                <span className="block text-accent mt-8">
                  جامعة الجزيرة الخاصة
                </span>
                <span className="block text-xl lg:text-2xl font-normal mt-4">
                  حيث نعتني بصحتكم
                </span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-accent leading-relaxed">
                موقع التأمين الصحي الجامعي لطلاب جامعة الجزيرة الخاصة
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!user && (
                  <Link to="/register">
                    <Button size="lg" className="btn-medical text-lg px-8 py-4">
                      إنشاء حساب جديد
                      <ChevronLeft className="w-5 h-5 mr-2" />
                    </Button>
                  </Link>
                )}
                {user && !hasSubscription && !loading && (
                  <Link to="/subscription">
                    <Button size="lg" className="btn-medical text-lg px-8 py-4">
                      الاشتراك بالتأمين
                      <ChevronLeft className="w-5 h-5 mr-2" />
                    </Button>
                  </Link>
                )}
                <Link to="/departments">
                  <Button
                    size="lg"
                    variant="outline"
                    className="btn-medical-outline bg-white/10 border-primary  hover:bg-primary/10 hover:text-primary text-lg px-8 py-4"
                  >
                    تصفح الأقسام
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={doctorHero}
                  alt="طبيبة مختصة"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Stethoscope className="w-6 h-6 text-primary" />
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        د. سارة أحمد
                      </p>
                      <p className="text-xs text-muted-foreground">
                        طبيبة عامة
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <UserCheck className="w-6 h-6 text-green-500" />
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">1260+</p>
                      <p className="text-xs text-muted-foreground">مريض سعيد</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-4">
              الهدف من الموقع
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            يهدف هذا الموقع إلى توفير منصة سهلة الاستخدام للطلاب في الجامعة للاستعلام عن حالة التأمين الصحي الخاصة بهم . من خلال هذا الموقع، يمكن للمستخدمين الوصول إلى معلومات دقيقة ومحدثّة حول تغطية التأمين الصحي، وتفاصيل الوثائق والإجراءات المطلوبة للاستفادة من الخدمات . نهدف إلى تعزيز الوعي بالحقوق الصحية وتسهيل الوصول إلى المعلومات الضرورية، مما يساهم في تحسين تجربة المستخدمين وضمان حصولهم على الرعاية الصحية اللازمة دون أي تعقيدات .</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-medical group hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20 medical-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-4">
              قائمة الأقسام
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Link to={dept.verent}>
                <Card
                  key={index}
                  className="card-medical group hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{dept.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {dept.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-6">
                الرعاية الصحية
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                تعتبر رعاية صحية الطلاب عنصراً أساسياً من أي برنامج تعليمي
                فعالي. في قسم الرعاية الصحية، يمكن الطلاب الحصول على خدمة أكثر
                صحة وسعادة، مما يساهم في تحسين تجربة المستخدمين وضمان حصولهم على
                الرعاية الصحية اللازمة.
              </p>
              <Link to="/support">
                <Button className="btn-medical">
                  تواصل معنا الآن
                  <ChevronLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </div>
            <div>
              <img
                src={medicalTeam}
                alt="الفريق الطبي"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-20 hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">تواصل معنا الآن !</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 md:space-x-reverse mb-8">
              <div className="flex items-center space-x-2 space-x-reverse">
                <MapPin className="w-5 h-5" />
                <span>درعا - أوتوستراد غباغب - سوريا</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-5 h-5" />
                <span>+963 11 221 7240</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-5 h-5" />
                <span>info@jude.edu.sy</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
