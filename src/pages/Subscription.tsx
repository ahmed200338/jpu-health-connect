import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";


const plans = [
  {
    key: "bronze",
    title: "الباقة البرونزية",
    price: 270000,
    features: [
      "الخدمات الطبية الاساسية",
      "الخدمات الطبية داخل المشفى للطلاب: بحد مالي 1,000,000",
      "الأدوية المحلية و المستوردة بشكل نظامي (5 زيارات)",
      "فحوصات مخبرية (5 زيارات)",
      "زيارات الطبيب (5 زيارات)",
      "  ",
    ],
  },
  {
    key: "silver",
    title: "الباقة الفضية",
    price: 380000,
    features: [
      "تغطية موسعة للعيادات التخصصية",
      "نسبة أعلى لتغطية الأدوية",
      "الخدمات الطبية داخل المشفى للطلاب: بحد مالي 1,500,000",
      "الأدوية المحلية و المستوردة بشكل نظامي (10 زيارات)",
      "فحوصات مخبرية وتصوير بالاشعة (10 زيارات)",
      "زيارات الطبيب (10 زيارات)",
     

    ],
  },
  {
    key: "gold",
    title: "الباقة الذهبية",
    price: 500000,
    features: [
      "تغطية شاملة للعيادات والتخصصات",
      "تغطية أعلى لعمليات  ",
      "تغطية واسعة للأدوية والتحاليل",
      "رعاية طبية مميزة وسريعة",
      "الخدمات الطبية داخل المشفى للطلاب بشكل كامل ",
      "الأدوية المحلية و المستوردة بشكل نظامي ",
      "فحوصات مخبرية وتصوير بالاشعة",
      "الزيارات الطبية ",
    ],
  },
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    birthDate: "",
    gender: "",
    collegeDepartment: ""
  });
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => { document.title = "الاشتراك بالتأمين | JPU ER"; }, []);

  const handlePlanSelect = (planKey: string) => {
    setSelectedPlan(planKey);
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "خطأ",
        description: "يجب تسجيل الدخول أولاً",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('student_subscription')
        .insert({
          user_id: parseInt(user.id),
          student_id: parseInt(formData.studentId),
          plan: selectedPlan as "bronze" | "silver" | "gold",
          college_department: formData.collegeDepartment,
          gender: formData.gender,
          birth_date: formData.birthDate,
          request_status: "pending"
        });

      if (error) throw error;

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم مراجعة طلبك وإرسال الرد عبر البريد الإلكتروني",
      });
      
      setShowDialog(false);
      setFormData({
        studentId: "",
        birthDate: "",
        gender: "",
        collegeDepartment: ""
      });
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
    <Navigation/>
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-accent">خطط الاشتراك</h1>
          <p className="text-accent/80 mt-2">اختر الخطة المناسبة واطلب الاشتراك بسهولة</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 ">
          {plans.map((plan) => (
            <Card key={plan.key} className="overflow-hidden border-0 shadow-card h-full">
              <div className={`h-4 ${plan.key === 'bronze' ? 'bg-[linear-gradient(135deg,hsl(var(--bronze-1)),hsl(var(--bronze-2)))]' : plan.key === 'silver' ? 'bg-[linear-gradient(135deg,hsl(var(--silver-1)),hsl(var(--silver-2)))]' : 'bg-[linear-gradient(135deg,hsl(var(--gold-1)),hsl(var(--gold-2)))]'}`} />
              <div className="p-6 rounded plan-card bg-primary/30 hover-scale">
                <CardHeader className="pb-2">
                  <h3 className="text-2xl font-bold text-accent">{plan.title}</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pr-6 space-y-2 text-accent/90">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <div className="text-3xl font-extrabold text-accent mt-4">
                    SYP {plan.price.toLocaleString()}
                    <span className="text-accent/70 text-base font-normal"> / السنة</span>
                  </div>
                  
                    <Button 
                      onClick={() => handlePlanSelect(plan.key)}
                      className="w-full btn-medical"
                    >
                      طلب اشتراك
                    </Button>
                  
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* نموذج طلب الاشتراك */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right text-accent">
              الاشتراك في {selectedPlan === 'bronze' ? 'الباقة البرونزية' : 
                         selectedPlan === 'silver' ? 'الباقة الفضية' : 
                         'الباقة الذهبية'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="studentId" className="text-accent">الرقم الجامعي</Label>
              <Input
                id="studentId"
                type="number"
                required
                value={formData.studentId}
                onChange={(e) => updateField('studentId', e.target.value)}
                className="mt-1 text-right"
                placeholder="أدخل الرقم الجامعي"
              />
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-accent">تاريخ الميلاد</Label>
              <Input
                id="birthDate"
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => updateField('birthDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="gender" className="text-accent">الجنس</Label>
              <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger className="mt-1 text-right">
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="collegeDepartment" className="text-accent">الكلية/القسم</Label>
              <Select value={formData.collegeDepartment} onValueChange={(value) => updateField('collegeDepartment', value)}>
                <SelectTrigger className="mt-1 text-right">
                  <SelectValue placeholder="اختر الكلية/القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="كلية الطب">كلية الطب</SelectItem>
                  <SelectItem value="كلية الهندسة">كلية الهندسة</SelectItem>
                  <SelectItem value="كلية العلوم">كلية العلوم</SelectItem>
                  <SelectItem value="كلية الآداب">كلية الآداب</SelectItem>
                  <SelectItem value="كلية التربية">كلية التربية</SelectItem>
                  <SelectItem value="كلية الاقتصاد">كلية الاقتصاد</SelectItem>
                  <SelectItem value="كلية الحقوق">كلية الحقوق</SelectItem>
                  <SelectItem value="كلية الزراعة">كلية الزراعة</SelectItem>
                  <SelectItem value="كلية طب الأسنان">كلية طب الأسنان</SelectItem>
                  <SelectItem value="كلية الصيدلة">كلية الصيدلة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1"
                disabled={loading}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                className="flex-1 btn-medical"
                disabled={loading || !formData.studentId || !formData.birthDate || !formData.gender || !formData.collegeDepartment}
              >
                {loading ? "جاري الإرسال..." : "طلب اشتراك"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

export default Subscription;
