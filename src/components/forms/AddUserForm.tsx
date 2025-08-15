import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddUserFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddUserForm({ onSuccess, onCancel }: AddUserFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "student"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("users")
        .insert([formData]);

      if (error) {
        console.error("Error adding user:", error);
        toast.error("خطأ في إضافة المستخدم");
      } else {
        toast.success("تم إضافة المستخدم بنجاح");
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
          <Label htmlFor="full_name">الاسم الكامل *</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            required
            placeholder="أدخل الاسم الكامل"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
            placeholder="أدخل البريد الإلكتروني"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="أدخل رقم الهاتف"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">نوع المستخدم</Label>
          <Select value={formData.role} onValueChange={(value) => updateField("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع المستخدم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">طالب</SelectItem>
              <SelectItem value="admin">مدير</SelectItem>
              <SelectItem value="staff">موظف</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <Button 
          type="submit" 
          disabled={loading || !formData.full_name.trim() || !formData.email.trim()}
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