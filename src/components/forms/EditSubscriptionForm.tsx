import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditSubscriptionFormProps {
  subscriptionId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditSubscriptionForm({ subscriptionId, onSuccess, onCancel }: EditSubscriptionFormProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    student_id: "",
    college_department: "",
    plan: "",
    request_status: "pending",
    gender: "",
    birth_date: ""
  });

  useEffect(() => {
    loadSubscription();
  }, [subscriptionId]);

  const loadSubscription = async () => {
    try {
      const { data: subscription, error } = await supabase
        .from("student_subscription")
        .select("student_id, college_department, plan, request_status, gender, birth_date")
        .eq("id", subscriptionId)
        .single();
      
      if (error) throw error;
      
      setData({
        student_id: subscription.student_id?.toString() || "",
        college_department: subscription.college_department || "",
        plan: (subscription.plan as any) || "",
        request_status: (subscription.request_status as any) || "pending",
        gender: subscription.gender || "",
        birth_date: subscription.birth_date || ""
      });
    } catch (error) {
      console.error("Error loading subscription:", error);
      toast.error("خطأ في تحميل بيانات الاشتراك");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("student_subscription")
        .update({
          student_id: parseInt(data.student_id),
          college_department: data.college_department,
          plan: data.plan as any,
          request_status: data.request_status as any,
          gender: data.gender,
          birth_date: data.birth_date
        })
        .eq("id", subscriptionId);

      if (error) throw error;

      toast.success("تم تحديث الاشتراك بنجاح");
      onSuccess();
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast.error("خطأ في تحديث الاشتراك");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="student_id">الرقم الجامعي</Label>
        <Input
          id="student_id"
          type="number"
          value={data.student_id}
          onChange={(e) => setData({...data, student_id: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="college_department">الكلية/القسم</Label>
        <Select value={data.college_department} onValueChange={(value) => setData({...data, college_department: value})}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الكلية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="الصيدلة">الصيدلة</SelectItem>
            <SelectItem value="الإدارة">الإدارة</SelectItem>
            <SelectItem value="الهندسة المدنية">الهندسة المدنية</SelectItem>
            <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
            <SelectItem value="الهندسة المعمارية">الهندسة المعمارية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="plan">الخطة</Label>
        <Select value={data.plan} onValueChange={(value) => setData({...data, plan: value})}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الخطة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gold">الذهبية</SelectItem>
            <SelectItem value="silver">الفضية</SelectItem>
            <SelectItem value="bronze">البرونزية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="request_status">حالة الطلب</Label>
        <Select value={data.request_status} onValueChange={(value) => setData({...data, request_status: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">قيد المراجعة</SelectItem>
            <SelectItem value="approved">مقبول</SelectItem>
            <SelectItem value="rejected">مرفوض</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">الجنس</Label>
        <Select value={data.gender} onValueChange={(value) => setData({...data, gender: value})}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الجنس" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">ذكر</SelectItem>
            <SelectItem value="female">أنثى</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="birth_date">تاريخ الميلاد</Label>
        <Input
          id="birth_date"
          type="date"
          value={data.birth_date}
          onChange={(e) => setData({...data, birth_date: e.target.value})}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>
    </form>
  );
}