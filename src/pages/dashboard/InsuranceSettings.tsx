import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { setPageSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function InsuranceSettings() {
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<number | null>(null);

  useEffect(() => {
    setPageSEO("إعدادات التأمين", "إدارة خطط التأمين وحالة التسجيل", location.origin + "/dashboard/insurance-settings");
    (async () => {
      const { data } = await supabase
        .from("system_settings")
        .select("id, registration_status")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setRecordId(data.id ?? null as any);
        setStatus(!!data.registration_status);
      }
    })();
  }, []);

  const saveStatus = async () => {
    setLoading(true);
    try {
      if (recordId) {
        const { error } = await supabase.from("system_settings").update({ registration_status: status }).eq("id", recordId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("system_settings").insert({ id: 1, registration_status: status } as any);
        if (error) throw error;
        setRecordId(1);
      }
      toast.success("تم تحديث حالة التسجيل");
    } catch (e: any) {
      toast.error("تعذر حفظ الحالة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* حالة التسجيل */}
      <Card className="card-medical">
        <CardHeader><CardTitle>حالة التسجيل بالتأمين</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">يمكنك إتاحة تسجيل الطلاب/إيقافه</div>
            <div className="text-base">الحالة الحالية: <span className={status ? "text-green-600" : "text-red-600"}>{status ? "مفتوح" : "متوقف"}</span></div>
          </div>
          <div className="flex items-center gap-3 ">
            <Switch dir="ltr" checked={status} onCheckedChange={setStatus} />
            <Button onClick={saveStatus} disabled={loading}>{loading ? "جاري الحفظ..." : "حفظ"}</Button>
          </div>
        </CardContent>
      </Card>

      {/* خطط التأمين */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { key: "gold", title: "الذهبية", gradient: "gradient-gold" },
          { key: "silver", title: "الفضية", gradient: "gradient-silver" },
          { key: "bronze", title: "البرونزية", gradient: "gradient-bronze" },
        ].map((p) => (
          <Card key={p.key} className="card-medical">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="flex items-center justify-between">
                <span>{p.title}</span>
                <span className={`${p.gradient} text-primary-foreground px-3 py-1 rounded-full text-sm`}>{p.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor={`price-${p.key}`}>السعر</Label>
                <Input id={`price-${p.key}`} placeholder="0.00" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`features-${p.key}`}>المزايا</Label>
                <textarea id={`features-${p.key}`} className="w-full rounded-md border bg-background p-2 text-sm" rows={4} placeholder="اكتب المزايا لكل خطة..." />
              </div>
              <Button onClick={() => toast.success("تم حفظ الخطة محلياً (للعرض فقط)")}>حفظ الخطة</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
