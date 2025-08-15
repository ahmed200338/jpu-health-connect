import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddServiceFormProps {
  serviceType: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddServiceForm({ serviceType, onSuccess, onCancel }: AddServiceFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    region: "",
    specialty: "",
    department: "",
    description: "",
    gender: "",
    work_hours: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data: any = {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        region: formData.region
      };

      if (serviceType === "الأطباء") {
        data = {
          ...data,
          specialty: formData.specialty,
          department: formData.department,
          description: formData.description,
          gender: formData.gender,
          work_hours: formData.work_hours
        };
        
        const { error } = await supabase
          .from("doctors")
          .insert([data]);
          
        if (error) throw error;
      } else if (serviceType === "الصيدليات") {
        const { error } = await supabase
          .from("pharmacies")
          .insert([data]);
          
        if (error) throw error;
      } else if (serviceType === "المختبرات") {
        const { error } = await supabase
          .from("laboratories")
          .insert([data]);
          
        if (error) throw error;
      } else if (serviceType === "المستشفيات") {
        const { error } = await supabase
          .from("hospitals")
          .insert([data]);
          
        if (error) throw error;
      } else {
        toast.error("نوع الخدمة غير مدعوم");
        return;
      }

      toast.success("تم إضافة الخدمة بنجاح");
      onSuccess();
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
          <Label htmlFor="name">الاسم *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            placeholder="أدخل الاسم"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">الهاتف</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="أدخل رقم الهاتف"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">المنطقة</Label>
          <Select value={formData.region} onValueChange={(value) => updateField("region", value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر المنطقة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الرياض">الرياض</SelectItem>
              <SelectItem value="جدة">جدة</SelectItem>
              <SelectItem value="الدمام">الدمام</SelectItem>
              <SelectItem value="مكة">مكة</SelectItem>
              <SelectItem value="المدينة">المدينة</SelectItem>
              <SelectItem value="الطائف">الطائف</SelectItem>
              <SelectItem value="تبوك">تبوك</SelectItem>
              <SelectItem value="القصيم">القصيم</SelectItem>
              <SelectItem value="حائل">حائل</SelectItem>
              <SelectItem value="جازان">جازان</SelectItem>
              <SelectItem value="نجران">نجران</SelectItem>
              <SelectItem value="الباحة">الباحة</SelectItem>
              <SelectItem value="عسير">عسير</SelectItem>
              <SelectItem value="الحدود الشمالية">الحدود الشمالية</SelectItem>
              <SelectItem value="الجوف">الجوف</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {serviceType === "الأطباء" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="specialty">التخصص</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => updateField("specialty", e.target.value)}
                placeholder="أدخل التخصص"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">القسم</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => updateField("department", e.target.value)}
                placeholder="أدخل القسم"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">الجنس</Label>
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
              <Label htmlFor="work_hours">ساعات العمل</Label>
              <Input
                id="work_hours"
                value={formData.work_hours}
                onChange={(e) => updateField("work_hours", e.target.value)}
                placeholder="مثال: 8:00 - 17:00"
              />
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">العنوان</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => updateField("address", e.target.value)}
          placeholder="أدخل العنوان الكامل"
          rows={2}
        />
      </div>

      {serviceType === "الأطباء" && (
        <div className="space-y-2">
          <Label htmlFor="description">الوصف</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="أدخل وصف الطبيب ومؤهلاته"
            rows={3}
          />
        </div>
      )}

      <div className="flex items-center gap-2 pt-4">
        <Button type="submit" disabled={loading || !formData.name.trim()}>
          {loading ? "جاري الحفظ..." : "حفظ"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}