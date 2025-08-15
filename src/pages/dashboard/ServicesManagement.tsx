import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { setPageSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { exportToCSV, exportToXLSX } from "@/utils/export";
import { toast } from "sonner";

interface Row { id: number; created_at: string; name?: string | null; address?: string | null; phone?: string | null; region?: string | null; specialty?: string | null; department?: string | null; }

type ServiceType = "الكل" | "الصيدليات" | "الأطباء" | "المختبرات" | "المستشفيات" | "عيادات الأسنان" | "العيون" | "الأشعة" | "المعالجة الفيزيائية";

export default function ServicesManagement() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<ServiceType>("الكل");

  useEffect(() => {
    setPageSEO("إدارة خدمات التأمين", "إدارة مقدمي الخدمات الطبية", location.origin + "/dashboard/services");
  }, []);

  useEffect(() => {
    loadServices();
  }, [type]);

  const loadServices = async () => {
    try {
      let allData: Row[] = [];
      
      if (type === "الكل") {
        const [doctors, pharmacies, labs, hospitals] = await Promise.all([
          supabase.from("doctors").select("id, created_at, name, address, phone, region, specialty, department"),
          supabase.from("pharmacies").select("id, created_at, name, address, phone, region"),
          supabase.from("laboratories").select("id, created_at, name, address, phone, region"),
          supabase.from("hospitals").select("id, created_at, name, address, phone, region")
        ]);
        
        allData = [
          ...(doctors.data || []),
          ...(pharmacies.data || []),
          ...(labs.data || []),
          ...(hospitals.data || [])
        ];
      } else if (type === "الأطباء") {
        const { data, error } = await supabase.from("doctors").select("id, created_at, name, address, phone, region, specialty, department");
        if (error) throw error;
        allData = data || [];
      } else if (type === "الصيدليات") {
        const { data, error } = await supabase.from("pharmacies").select("id, created_at, name, address, phone, region");
        if (error) throw error;
        allData = data || [];
      } else if (type === "المختبرات") {
        const { data, error } = await supabase.from("laboratories").select("id, created_at, name, address, phone, region");
        if (error) throw error;
        allData = data || [];
      } else if (type === "المستشفيات") {
        const { data, error } = await supabase.from("hospitals").select("id, created_at, name, address, phone, region");
        if (error) throw error;
        allData = data || [];
      } else {
        allData = []; // غير متوفرة كجداول منفصلة حالياً
      }
      
      setRows(allData);
    } catch (error) {
      console.error("Error loading services:", error);
      toast.error("خطأ في تحميل البيانات");
      setRows([]);
    }
  };

  const deleteServices = async () => {
    if (selected.length === 0) return;
    
    try {
      // حذف من الجداول المختلفة حسب النوع
      if (type === "الأطباء") {
        const { error } = await supabase.from("doctors").delete().in("id", selected);
        if (error) throw error;
      } else if (type === "الصيدليات") {
        const { error } = await supabase.from("pharmacies").delete().in("id", selected);
        if (error) throw error;
      } else if (type === "المختبرات") {
        const { error } = await supabase.from("laboratories").delete().in("id", selected);
        if (error) throw error;
      } else if (type === "المستشفيات") {
        const { error } = await supabase.from("hospitals").delete().in("id", selected);
        if (error) throw error;
      }
      
      toast.success(`تم حذف ${selected.length} عنصر`);
      setSelected([]);
      loadServices();
    } catch (error) {
      console.error("Error deleting services:", error);
      toast.error("خطأ في حذف العناصر");
    }
  };

  const filtered = useMemo(() => {
    let r = [...rows];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(x => (x.name || "").toLowerCase().includes(q) || (x.address || "").toLowerCase().includes(q));
    }
    return r;
  }, [rows, search]);

  const toggleAll = (checked: boolean) => setSelected(checked ? filtered.map(r => r.id) : []);
  const toggleOne = (id: number, checked: boolean) => setSelected(checked ? [...selected, id] : selected.filter(x => x !== id));

  return (
    <div className="space-y-4">
      <Card className="card-medical">
        <CardHeader className="flex-row items-center justify-between"><CardTitle>الإجراءات</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Select value={type} onValueChange={(v: any) => setType(v)}>
              <SelectTrigger className="w-56"><SelectValue placeholder="اختر نوع الخدمة" /></SelectTrigger>
              <SelectContent>
                {(["الكل","الأطباء","الصيدليات","المختبرات","المستشفيات","عيادات الأسنان","العيون","الأشعة","المعالجة الفيزيائية"] as ServiceType[]).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="بحث بالاسم أو العنوان" value={search} onChange={e => setSearch(e.target.value)} className="w-64" />
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild><Button variant="secondary">إضافة</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>إضافة خدمة</DialogTitle></DialogHeader><div className="text-sm text-muted-foreground">الحفظ سيُفعَّل لاحقاً.</div></DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild><Button variant="outline" disabled={selected.length !== 1}>تعديل</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>تعديل خدمة</DialogTitle></DialogHeader><div className="text-sm text-muted-foreground">التعديل قيد التطوير.</div></DialogContent>
            </Dialog>
            <Button variant="destructive" disabled={!selected.length} onClick={deleteServices}>حذف</Button>
            <Button onClick={() => exportToCSV("services.csv", filtered as any)}>تصدير CSV</Button>
            <Button onClick={() => exportToXLSX("services.xlsx", filtered as any)}>تصدير Excel</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="card-medical">
        <CardHeader><CardTitle>الخدمات</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={selected.length === filtered.length && filtered.length>0} onCheckedChange={(v) => toggleAll(!!v)} /></TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>التخصص/القسم</TableHead>
                <TableHead>العنوان</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>المنطقة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell><Checkbox checked={selected.includes(r.id)} onCheckedChange={(v) => toggleOne(r.id, !!v)} /></TableCell>
                  <TableCell>{r.name || "—"}</TableCell>
                  <TableCell>{r.specialty || r.department || "—"}</TableCell>
                  <TableCell>{r.address || "—"}</TableCell>
                  <TableCell>{r.phone || "—"}</TableCell>
                  <TableCell>{r.region || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>إجمالي: {filtered.length}</TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
