import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    birthDate: "",
    college: "",
    universityId: "",
    insuranceId: "",
    phone: "",
    email: "",
    gender: "",
  });

  useEffect(() => { 
    document.title = "الملف الشخصي | JPU ER"; 
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user?.email)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setForm({
          fullName: data.full_name || "",
          birthDate: "",
          college: "",
          universityId: "",
          insuranceId: "",
          phone: data.phone || "",
          email: data.email || "",
          gender: "",
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل البيانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const { error } = await supabase
        .from('users')
        .update({
          full_name: form.fullName,
          phone: form.phone,
        })
        .eq('email', user?.email);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم حفظ التغييرات بنجاح",
      });
      setOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حفظ التغييرات",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const onGenderChange = (value: string) => setForm({ ...form, gender: value });

  return (
    <>
    <Navigation/>
    
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-accent">الملف الشخصي</h1>
          <p className="text-muted-foreground mt-1">معلومات الطالب وبيانات الاشتراك</p>
        </div>

        <Card className="card-medical">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">بيانات الطالب</h2>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-medical">طلب تعديل المعلومات</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>تعديل البيانات</DialogTitle>
                  </DialogHeader>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <Label>الاسم الكامل</Label>
                      <Input name="fullName" value={form.fullName} onChange={onChange} />
                    </div>
                    <div>
                      <Label>تاريخ الميلاد</Label>
                      <Input  type="date" name="birthDate" value={form.birthDate} onChange={onChange} />
                    </div>
                    <div>
                      <Label>الكلية</Label>
                      <Input name="college" value={form.college} onChange={onChange} />
                    </div>
                    <div>
                      <Label>الرقم الجامعي</Label>
                      <Input name="universityId" value={form.universityId} onChange={onChange} />
                    </div>
                    <div>
                      <Label>رقم بطاقة التأمين</Label>
                      <Input name="insuranceId" value={form.insuranceId} onChange={onChange} />
                    </div>
                    <div>
                      <Label>رقم الموبايل</Label>
                      <Input name="phone" value={form.phone} onChange={onChange} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>البريد الإلكتروني</Label>
                      <Input type="email" name="email" value={form.email} onChange={onChange} />
                    </div>
                  </div>
                   <DialogFooter>
                     <Button variant="outline" onClick={() => setOpen(false)} disabled={updating}>إلغاء</Button>
                     <Button className="bg-green-600 text-white hover:bg-green-700" onClick={handleUpdateProfile} disabled={updating}>
                       {updating ? "جاري الحفظ..." : "حفظ"}
                     </Button>
                   </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
           <CardContent dir="rtl" className="grid sm:grid-cols-2 gap-6 text-right">
             {loading ? (
               <>
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="space-y-2">
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-10 w-full" />
                   </div>
                 ))}
               </>
             ) : (
               <>
            <div className="space-y-2">
              <Label>اسم الطالب الثلاثي</Label>
              <Input name="fullName" value={form.fullName} disabled />
            </div>
            <div className="space-y-2">
              <Label>تاريخ الميلاد</Label>
              <Input type="date" name="birthDate" value={form.birthDate} disabled />
            </div>

            <div className="space-y-2">
              <Label>الكلية والقسم</Label>
              <Input name="college" value={form.college} disabled />
            </div>
            <div className="space-y-2">
              <Label>الرقم الجامعي</Label>
              <Input name="universityId" value={form.universityId} disabled />
            </div>

            <div className="space-y-2">
              <Label>الجنس</Label>
              <Select value={form.gender} onValueChange={onGenderChange} disabled>
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
              <Label>رقم الموبايل</Label>
              <Input name="phone" value={form.phone} disabled />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>البريد الإلكتروني</Label>
              <Input type="email" name="email" value={form.email} disabled />
            </div>

             <div className="space-y-2 sm:col-span-2">
               <Label>رقم بطاقة التأمين</Label>
               <Input name="insuranceId" value={form.insuranceId} disabled />
             </div>
             </>
             )}
           </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Profile;
