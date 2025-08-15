import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddSubscriptionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddSubscriptionForm({ onSuccess, onCancel }: AddSubscriptionFormProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    user_id: "",
    student_id: "",
    college_department: "",
    plan: "",
    gender: "",
    birth_date: ""
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, full_name, email")
        .eq("role", "student")
        .order("full_name");

      if (error) {
        console.error("Error loading users:", error);
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error("Unexpected error loading users:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("student_subscription")
        .insert([{
          user_id: parseInt(formData.user_id),
          student_id: parseInt(formData.student_id),
          college_department: formData.college_department,
          plan: formData.plan as "bronze" | "silver" | "gold",
          gender: formData.gender,
          birth_date: formData.birth_date,
          request_status: "pending" as "pending" | "approved" | "rejected"
        }]);

      if (error) {
        console.error("Error adding subscription:", error);
        toast.error("خطأ في إضافة الاشتراك");
      } else {
        toast.success("تم إضافة الاشتراك بنجاح");
        onSuccess();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="user_id">المستخدم *</Label>
          <Select value={formData.user_id} onValueChange={(value) => updateField("user_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر المستخدم" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.full_name} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="student_id">الرقم الجامعي *</Label>
          <Input
            id="student_id"
            value={formData.student_id}
            onChange={(e) => updateField("student_id", e.target.value)}
            required
            placeholder="أدخل الرقم الجامعي"
            type="number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="college_department">الكلية/القسم *</Label>
          <Select value={formData.college_department} onValueChange={(value) => updateField("college_department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الكلية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الصيدلة">الصيدلة</SelectItem>
              <SelectItem value="الإدارة">الإدارة</SelectItem>
              <SelectItem value="الهندسة المدنية">الهندسة المدنية</SelectItem>
              <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
              <SelectItem value="الهندسة المعمارية">الهندسة المعمارية</SelectItem>
              <SelectItem value="الطب">الطب</SelectItem>
              <SelectItem value="طب الأسنان">طب الأسنان</SelectItem>
              <SelectItem value="التمريض">التمريض</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="plan">نوع الخطة *</Label>
          <Select value={formData.plan} onValueChange={(value) => updateField("plan", value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع الخطة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bronze">برونزية</SelectItem>
              <SelectItem value="silver">فضية</SelectItem>
              <SelectItem value="gold">ذهبية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">الجنس *</Label>
          <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الجنس" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ذكر">ذكر</SelectItem>
              <SelectItem value="أنثى">أنثى</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth_date">تاريخ الميلاد</Label>
          <Input
            id="birth_date"
            value={formData.birth_date}
            onChange={(e) => updateField("birth_date", e.target.value)}
            type="date"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <Button 
          type="submit" 
          disabled={loading || !formData.user_id || !formData.student_id || !formData.college_department || !formData.plan || !formData.gender}
        >
          {loading ? "جاري الحفظ..." : "حفظ"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}