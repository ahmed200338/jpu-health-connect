import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { setPageSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { exportToCSV, exportToXLSX } from "@/utils/export";
import { toast } from "sonner";

interface SubRow {
  id: number;
  created_at: string;
  user_id?: number | null;
  student_id?: number | null;
  college_department?: string | null;
  plan?: string | null;
  request_status?: string | null;
  gender?: string | null;
  birth_date?: string | null;
  full_name?: string | null; // joined
}

export default function SubscriptionsManagement() {
  const [rows, setRows] = useState<SubRow[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [filterCollege, setFilterCollege] = useState<string>("الكل");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof SubRow>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    setPageSEO("إدارة الاشتراكات", "إدارة اشتراكات الطلاب في التأمين", location.origin + "/dashboard/subscriptions");
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from("student_subscription")
        .select("id, created_at, user_id, student_id, college_department, plan, request_status, gender, birth_date")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error("خطأ في تحميل البيانات");
        setRows([]);
        return;
      }
      
      const subs = data || [];
      const userIds = subs.map((s: any) => s.user_id).filter(Boolean);
      let names: Record<string, string> = {};
      
      if (userIds.length) {
        const { data: users, error: usersError } = await supabase
          .from("users")
          .select("id, full_name")
          .in("id", userIds as any);
          
        if (!usersError && users) {
          users.forEach((u: any) => (names[u.id] = u.full_name));
        }
      }
      
      setRows(subs.map((s: any) => ({ ...s, full_name: names[String(s.user_id)] || null })));
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("خطأ غير متوقع");
      setRows([]);
    }
  };

  const deleteSubscriptions = async () => {
    if (selected.length === 0) return;
    
    try {
      const { error } = await supabase
        .from("student_subscription")
        .delete()
        .in("id", selected);
      
      if (error) {
        console.error("Error deleting subscriptions:", error);
        toast.error("خطأ في حذف الاشتراكات");
      } else {
        toast.success(`تم حذف ${selected.length} اشتراك`);
        setSelected([]);
        loadSubscriptions();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("خطأ غير متوقع");
    }
  };

  const toggleSort = (k: keyof SubRow) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    let r = [...rows];
    if (filterCollege !== "الكل") r = r.filter(x => (x.college_department || "").includes(filterCollege));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      r = r.filter(x =>
        (x.full_name || "").toLowerCase().includes(q) ||
        String(x.student_id || "").includes(q) ||
        String(x.id || "").includes(q)
      );
    }
    r.sort((a: any, b: any) => {
      const av = a[sortKey]; const bv = b[sortKey];
      if (av == null) return 1; if (bv == null) return -1;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return r;
  }, [rows, filterCollege, search, sortKey, sortDir]);

  const toggleAll = (checked: boolean) => setSelected(checked ? filtered.map(r => r.id) : []);
  const toggleOne = (id: number, checked: boolean) => setSelected(checked ? [...selected, id] : selected.filter(x => x !== id));

  return (
    <div className="space-y-4">
      <Card className="card-medical">
        <CardHeader className="flex-row items-center justify-between"><CardTitle>الإجراءات</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Select onValueChange={setFilterCollege}>
              <SelectTrigger className="w-48"><SelectValue placeholder="عرض حسب الكلية" /></SelectTrigger>
              <SelectContent>
                {['الكل','الصيدلة','الإدارة','الهندسة المدنية','تقنية المعلومات','الهندسة المعمارية'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="بحث بالاسم/الرقم الجامعي/رقم الاشتراك" value={search} onChange={e => setSearch(e.target.value)} className="w-64" />
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild><Button variant="secondary">إضافة</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>إضافة مشترك</DialogTitle></DialogHeader>
                <div className="text-sm text-muted-foreground">سيتم تفعيل الحفظ بعد تهيئة قاعدة البيانات للقيود اللازمة.</div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild><Button variant="outline" disabled={selected.length !== 1}>تعديل</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>تعديل مشترك</DialogTitle></DialogHeader>
                <div className="text-sm text-muted-foreground">التعديل قيد التطوير.</div>
              </DialogContent>
            </Dialog>
            <Button variant="destructive" disabled={!selected.length} onClick={() => setOpenConfirm(true)}>حذف</Button>
            <Button onClick={() => exportToCSV("subscriptions.csv", filtered as any)}>تصدير CSV</Button>
            <Button onClick={() => exportToXLSX("subscriptions.xlsx", filtered as any)}>تصدير Excel</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="card-medical">
        <CardHeader><CardTitle>المشتركون</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={selected.length === filtered.length && filtered.length>0} onCheckedChange={(v) => toggleAll(!!v)} /></TableHead>
                <TableHead onClick={() => toggleSort("id")} className="cursor-pointer">رقم الاشتراك</TableHead>
                <TableHead onClick={() => toggleSort("full_name")} className="cursor-pointer">الاسم</TableHead>
                <TableHead onClick={() => toggleSort("student_id")} className="cursor-pointer">الرقم الجامعي</TableHead>
                <TableHead>الخطة</TableHead>
                <TableHead>الكلية</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead onClick={() => toggleSort("created_at")} className="cursor-pointer">التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell><Checkbox checked={selected.includes(r.id)} onCheckedChange={(v) => toggleOne(r.id, !!v)} /></TableCell>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.full_name || "—"}</TableCell>
                  <TableCell>{r.student_id || "—"}</TableCell>
                  <TableCell>{r.plan || "—"}</TableCell>
                  <TableCell>{r.college_department || "—"}</TableCell>
                  <TableCell>{r.request_status || "—"}</TableCell>
                  <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>إجمالي: {filtered.length}</TableCaption>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف العناصر المحددة من العرض فقط.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => { deleteSubscriptions(); setOpenConfirm(false); }}>تأكيد</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
