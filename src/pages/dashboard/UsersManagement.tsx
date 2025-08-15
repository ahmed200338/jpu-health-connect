import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { setPageSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { exportToCSV, exportToXLSX } from "@/utils/export";
import { toast } from "sonner";

interface UserRow { id: number; created_at: string; full_name?: string | null; email?: string | null; phone?: string | null; role?: string | null; }

export default function UsersManagement() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof UserRow>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setPageSEO("إدارة المستخدمين", "عرض وإدارة المستخدمين", location.origin + "/dashboard/users");
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, created_at, full_name, email, phone, role")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching users:", error);
        toast.error("خطأ في تحميل البيانات");
        setRows([]);
      } else {
        setRows(data || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("خطأ غير متوقع");
      setRows([]);
    }
  };

  const deleteUsers = async () => {
    if (selected.length === 0) return;
    
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .in("id", selected);
      
      if (error) {
        console.error("Error deleting users:", error);
        toast.error("خطأ في حذف المستخدمين");
      } else {
        toast.success(`تم حذف ${selected.length} مستخدم`);
        setSelected([]);
        loadUsers();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("خطأ غير متوقع");
    }
  };

  const filtered = useMemo(() => {
    let r = [...rows];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(x => (x.full_name || "").toLowerCase().includes(q) || (x.email || "").toLowerCase().includes(q));
    }
    r.sort((a: any, b: any) => {
      const av = a[sortKey]; const bv = b[sortKey];
      if (av == null) return 1; if (bv == null) return -1;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return r;
  }, [rows, search, sortKey, sortDir]);

  const toggleAll = (checked: boolean) => setSelected(checked ? filtered.map(r => r.id) : []);
  const toggleOne = (id: number, checked: boolean) => setSelected(checked ? [...selected, id] : selected.filter(x => x !== id));

  return (
    <div className="space-y-4">
      <Card className="card-medical">
        <CardHeader className="flex-row items-center justify-between"><CardTitle>الإجراءات</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input placeholder="بحث بالاسم أو البريد" value={search} onChange={e => setSearch(e.target.value)} className="w-64" />
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild><Button variant="secondary">إضافة</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>إضافة مستخدم</DialogTitle></DialogHeader><div className="text-sm text-muted-foreground">إدارة المستخدمين للعرض فقط حالياً.</div></DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild><Button variant="outline" disabled={selected.length !== 1}>تعديل</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>تعديل مستخدم</DialogTitle></DialogHeader><div className="text-sm text-muted-foreground">التعديل قيد التطوير.</div></DialogContent>
            </Dialog>
            <Button variant="destructive" disabled={!selected.length} onClick={deleteUsers}>حذف</Button>
            <Button onClick={() => exportToCSV("users.csv", filtered as any)}>تصدير CSV</Button>
            <Button onClick={() => exportToXLSX("users.xlsx", filtered as any)}>تصدير Excel</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="card-medical">
        <CardHeader><CardTitle>المستخدمون</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={selected.length === filtered.length && filtered.length>0} onCheckedChange={(v) => toggleAll(!!v)} /></TableHead>
                <TableHead className="cursor-pointer" onClick={() => setSortKey("full_name")}>الاسم</TableHead>
                <TableHead>البريد</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead className="cursor-pointer" onClick={() => setSortKey("created_at")}>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell><Checkbox checked={selected.includes(r.id)} onCheckedChange={(v) => toggleOne(r.id, !!v)} /></TableCell>
                  <TableCell>{r.full_name || "—"}</TableCell>
                  <TableCell>{r.email || "—"}</TableCell>
                  <TableCell>{r.phone || "—"}</TableCell>
                  <TableCell>{r.role || "—"}</TableCell>
                  <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
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
