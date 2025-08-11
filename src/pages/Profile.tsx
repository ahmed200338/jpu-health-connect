import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "أحمد محمد",
    birthDate: "1999-05-10",
    college: "كلية الهندسة",
    universityId: "20201234",
    insuranceId: "INS-123456",
    phone: "+963 991 234 567",
    email: "student@example.com",
  });

  useEffect(() => { document.title = "الملف الشخصي | JPU ER"; }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">الملف الشخصي</h1>
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
                      <Input type="date" name="birthDate" value={form.birthDate} onChange={onChange} />
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
                    <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
                    <Button className="bg-green-600 text-white hover:bg-green-700" onClick={() => setOpen(false)}>حفظ</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4 text-right">
            <div><span className="text-muted-foreground">الاسم:</span> {form.fullName}</div>
            <div><span className="text-muted-foreground">تاريخ الميلاد:</span> {form.birthDate}</div>
            <div><span className="text-muted-foreground">الكلية:</span> {form.college}</div>
            <div><span className="text-muted-foreground">الرقم الجامعي:</span> {form.universityId}</div>
            <div><span className="text-muted-foreground">رقم بطاقة التأمين:</span> {form.insuranceId}</div>
            <div><span className="text-muted-foreground">الموبايل:</span> {form.phone}</div>
            <div className="sm:col-span-2"><span className="text-muted-foreground">البريد الإلكتروني:</span> {form.email}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
