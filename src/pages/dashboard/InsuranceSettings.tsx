import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const plans = [
  { key: "gold", name: "الذهبية", price: 30, features: ["تغطية شاملة", "خصومات عالية", "أولوية بالخدمات"] },
  { key: "silver", name: "الفضية", price: 20, features: ["تغطية متوسطة", "خصومات جيدة", "شبكة معتمدة"] },
  { key: "bronze", name: "البرونزية", price: 10, features: ["تغطية أساسية", "خصومات محدودة", "خدمات أساسية"] },
];

export default function InsuranceSettings() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "لوحة التحكم | إعدادات التأمين";
    (async () => {
      const { data } = await (supabase as any).from("subscription_requests").select("id, registration_open").order("id", { ascending: true }).limit(1);
      if (data && data[0]) setOpen(!!data[0].registration_open);
    })();
  }, []);

  const toggle = async (value: boolean) => {
    setLoading(true);
    try {
      // نضمن وجود سجل واحد فقط
      const { data } = await (supabase as any).from("subscription_requests").select("id").order("id", { ascending: true }).limit(1);
      if (data && data[0]) {
        await (supabase as any).from("subscription_requests").update({ registration_open: value }).eq("id", data[0].id);
      } else {
        await (supabase as any).from("subscription_requests").insert({ registration_open: value });
      }
      setOpen(value);
      toast({ title: value ? "تم فتح باب التسجيل" : "تم إغلاق باب التسجيل" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>حالة التسجيل</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">تفعيل/تعطيل باب التسجيل على التأمين</div>
            <div className="mt-1 font-medium">الحالة الحالية: {open ? "مفتوح" : "مغلق"}</div>
          </div>
          <Switch checked={open} onCheckedChange={toggle} disabled={loading} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.key}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 text-2xl font-bold">{p.price} د.أ / شهر</div>
              <ul className="list-disc pr-5 space-y-1 text-sm">
                {p.features.map((f) => (<li key={f}>{f}</li>))}
              </ul>
              <Button className="mt-4 w-full" variant="secondary">تعديل (لاحقًا)</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
