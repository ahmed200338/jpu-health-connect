// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SubscriptionsManagement() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => { document.title = "لوحة التحكم | إدارة الاشتراكات"; }, []);

  const subsQ = useQuery({
    queryKey: ["subs-all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("student_subscription")
        .select("student_id, college_department, plan, request_status, created_at, gender, birth_date")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const rows = (subsQ.data || []).filter((r: any) =>
      !term ||
      String(r.student_id || "").toLowerCase().includes(term) ||
      String(r.college_department || "").toLowerCase().includes(term) ||
      String(r.plan || "").toLowerCase().includes(term) ||
      String(r.request_status || "").toLowerCase().includes(term)
    );
    const sorted = [...rows].sort((a: any, b: any) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [subsQ.data, search, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    setSortKey(key);
    setSortDir((d) => (key === sortKey ? (d === "asc" ? "desc" : "asc") : "asc"));
  };

  const exportCSV = () => {
    const headers = ["student_id","college_department","plan","request_status","created_at"];
    const rows = filtered.map((r: any) => headers.map((h) => r[h] ?? ""));
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscriptions_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>إدارة الاشتراكات</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="بحث..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-40 md:w-64" />
            <Button variant="secondary" onClick={exportCSV}>تصدير CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("student_id")}>الرقم الجامعي</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("college_department")}>الكلية</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("plan")}>الباقة</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("request_status")}>الحالة</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("created_at")}>التاريخ</TableHead>
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
            <DialogTitle>تفاصيل الاشتراك</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-1 text-sm">
              <div>الرقم الجامعي: {selected.student_id}</div>
              <div>الكلية: {selected.college_department}</div>
              <div>الخطة: {selected.plan}</div>
              <div>الحالة: {selected.request_status}</div>
              <div>تاريخ الإنشاء: {new Date(selected.created_at).toLocaleString()}</div>
              <div>الجنس: {selected.gender}</div>
              <div>تاريخ الميلاد: {selected.birth_date}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
