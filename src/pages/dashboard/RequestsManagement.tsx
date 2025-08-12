// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RequestsManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => { document.title = "لوحة التحكم | الطلبات"; }, []);

  const q = useQuery({
    queryKey: ["requests-all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("student_subscription")
        .select("student_id, college_department, plan, request_status, created_at")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (q.data || []).filter((r: any) => {
      const matches =
        !term ||
        String(r.student_id || "").toLowerCase().includes(term) ||
        String(r.college_department || "").toLowerCase().includes(term) ||
        String(r.plan || "").toLowerCase().includes(term);
      const statusOk = status === "all" || r.request_status === status;
      return matches && statusOk;
    });
  }, [q.data, search, status]);

  const exportCSV = () => {
    const headers = ["student_id","college_department","plan","request_status","created_at"];
    const rows = filtered.map((r: any) => headers.map((h) => r[h] ?? ""));
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `requests_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>الطلبات</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="بحث..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-36 md:w-56" />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="approved">مقبول</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" onClick={exportCSV}>تصدير CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الرقم الجامعي</TableHead>
                  <TableHead>الكلية</TableHead>
                  <TableHead>الباقة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>إجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(filtered || []).map((r: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{r.student_id}</TableCell>
                    <TableCell>{r.college_department}</TableCell>
                    <TableCell>{r.plan}</TableCell>
                    <TableCell>{r.request_status}</TableCell>
                    <TableCell>{new Date(r.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => setSelected(r)}>عرض</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-1 text-sm">
              <div>الرقم الجامعي: {selected.student_id}</div>
              <div>الكلية: {selected.college_department}</div>
              <div>الخطة: {selected.plan}</div>
              <div>الحالة: {selected.request_status}</div>
              <div>التاريخ: {new Date(selected.created_at).toLocaleString()}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
