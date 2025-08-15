import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditUserFormProps {
  userId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditUserForm({ userId, onSuccess, onCancel }: EditUserFormProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "student"
  });

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("full_name, email, phone, role")
        .eq("id", userId)
        .single();
      
      if (error) throw error;
      
      setData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "student"
      });
    } catch (error) {
      console.error("Error loading user:", error);
      toast.error("خطأ في تحميل بيانات المستخدم");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("users")
        .update({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          role: data.role
        })
        .eq("id", userId);

      if (error) throw error;

      toast.success("تم تحديث المستخدم بنجاح");
      onSuccess();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("خطأ في تحديث المستخدم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">الاسم الكامل</Label>
        <Input
          id="full_name"
          value={data.full_name}
          onChange={(e) => setData({...data, full_name: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">رقم الهاتف</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => setData({...data, phone: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">الدور</Label>
        <Select value={data.role} onValueChange={(value) => setData({...data, role: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">طالب</SelectItem>
            <SelectItem value="admin">مدير</SelectItem>
          </SelectContent>
        </Select>
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