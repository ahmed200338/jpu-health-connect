import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";


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
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => { document.title = "الاشتراك بالتأمين | JPU ER"; }, []);

  return (
    <>
    <Navigation/>
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-accent">خطط الاشتراك</h1>
          <p className="text-accent/80 mt-2">اختر الخطة المناسبة واطلب الاشتراك بسهولة</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.key} className="overflow-hidden border-0 shadow-card">
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
                  <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); setSelected(plan.key); alert('تم إرسال طلب الاشتراك'); }}>
                    <div>
                      <Label className="text-accent">الاسم الكامل</Label>
                      <Input required className="mt-1 border-primary bg-accent/10 text-accent placeholder:text-accent/60" placeholder="أدخل اسمك" />
                    </div>
                    <div>
                      <Label className="text-accent">رقم الموبايل</Label>
                      <Input required className="mt-1 border-primary  bg-accent/10 text-accent placeholder:text-accent/60" placeholder="مثال: 09xxxxxxxx" />
                    </div>
                    <div>
                      <Label className="text-accent">البريد الإلكتروني</Label>
                      <Input type="email" className="mt-1 border-primary  bg-accent/10 text-accent placeholder:text-accent/60" placeholder="name@email.com" />
                    </div>
                    <Button type="submit" className="w-full btn-medical">طلب اشتراك</Button>
                  </form>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Subscription;
