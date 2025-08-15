import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditServiceFormProps {
  serviceId: number;
  serviceType: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditServiceForm({ serviceId, serviceType, onSuccess, onCancel }: EditServiceFormProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
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

  useEffect(() => {
    loadService();
  }, [serviceId, serviceType]);

  const getTableName = () => {
    switch (serviceType) {
      case "الأطباء": return "doctors";
      case "الصيدليات": return "pharmacies";
      case "المختبرات": return "laboratories";
      case "المستشفيات": return "hospitals";
      default: return "doctors";
    }
  };

  const loadService = async () => {
    try {
      const tableName = getTableName();
      const { data: service, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", serviceId)
        .single();
      
      if (error) throw error;
      
      setData({
        name: (service as any)?.name || "",
        address: (service as any)?.address || "",
        phone: (service as any)?.phone || "",
        region: (service as any)?.region || "",
        specialty: (service as any)?.specialty || "",
        department: (service as any)?.department || "",
        description: (service as any)?.description || "",
        gender: (service as any)?.gender || "",
        work_hours: (service as any)?.work_hours || ""
      });
    } catch (error) {
      console.error("Error loading service:", error);
      toast.error("خطأ في تحميل بيانات الخدمة");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tableName = getTableName();
      let updateData: any = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        region: data.region
      };

      if (serviceType === "الأطباء") {
        updateData = {
          ...updateData,
          specialty: data.specialty,
          department: data.department,
          description: data.description,
          gender: data.gender,
          work_hours: data.work_hours
        };
      }

      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq("id", serviceId);

      if (error) throw error;

      toast.success("تم تحديث الخدمة بنجاح");
      onSuccess();
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("خطأ في تحديث الخدمة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">الاسم</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => setData({...data, name: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">العنوان</Label>
        <Input
          id="address"
          value={data.address}
          onChange={(e) => setData({...data, address: e.target.value})}
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
        <Label htmlFor="region">المحافظة</Label>
        <Select value={data.region} onValueChange={(value) => setData({...data, region: value})}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المحافظة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="دمشق">دمشق</SelectItem>
            <SelectItem value="ريف دمشق">ريف دمشق</SelectItem>
            <SelectItem value="حلب">حلب</SelectItem>
            <SelectItem value="حمص">حمص</SelectItem>
            <SelectItem value="حماة">حماة</SelectItem>
            <SelectItem value="اللاذقية">اللاذقية</SelectItem>
            <SelectItem value="طرطوس">طرطوس</SelectItem>
            <SelectItem value="إدلب">إدلب</SelectItem>
            <SelectItem value="درعا">درعا</SelectItem>
            <SelectItem value="السويداء">السويداء</SelectItem>
            <SelectItem value="القنيطرة">القنيطرة</SelectItem>
            <SelectItem value="دير الزور">دير الزور</SelectItem>
            <SelectItem value="الرقة">الرقة</SelectItem>
            <SelectItem value="الحسكة">الحسكة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {serviceType === "الأطباء" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="specialty">التخصص</Label>
            <Input
              id="specialty"
              value={data.specialty}
              onChange={(e) => setData({...data, specialty: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">القسم</Label>
            <Input
              id="department"
              value={data.department}
              onChange={(e) => setData({...data, department: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData({...data, description: e.target.value})}
              rows={3}
            />
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
            <Label htmlFor="work_hours">ساعات العمل</Label>
            <Input
              id="work_hours"
              value={data.work_hours}
              onChange={(e) => setData({...data, work_hours: e.target.value})}
              placeholder="مثال: 8:00 ص - 6:00 م"
            />
          </div>
        </>
      )}

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