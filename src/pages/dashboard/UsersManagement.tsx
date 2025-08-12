// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function UsersManagement() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => { document.title = "لوحة التحكم | إدارة المستخدمين"; }, []);

  const usersQ = useQuery({
    queryKey: ["users-all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("users")
        .select("full_name, email, role, phone, created_at")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const rows = (usersQ.data || []).filter((r: any) =>
      !term ||
      String(r.full_name || "").toLowerCase().includes(term) ||
      String(r.email || "").toLowerCase().includes(term) ||
      String(r.role || "").toLowerCase().includes(term)
    );
    const sorted = [...rows].sort((a: any, b: any) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [usersQ.data, search, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    setSortKey(key);
    setSortDir((d) => (key === sortKey ? (d === "asc" ? "desc" : "asc") : "asc"));
  };

  const exportCSV = () => {
    const headers = ["full_name","email","role","phone","created_at"];
    const rows = filtered.map((r: any) => headers.map((h) => r[h] ?? ""));
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>إدارة المستخدمين</CardTitle>
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
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("full_name")}>الاسم</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("email")}>البريد</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("role")}>الدور</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("created_at")}>التاريخ</TableHead>
                  <TableHead>إجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(filtered || []).map((u: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{u.full_name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>{new Date(u.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => setSelected(u)}>عرض</Button>
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
            <DialogTitle>تفاصيل المستخدم</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-1 text-sm">
              <div>الاسم: {selected.full_name}</div>
              <div>البريد: {selected.email}</div>
              <div>الهاتف: {selected.phone}</div>
              <div>الدور: {selected.role}</div>
              <div>تاريخ الإنشاء: {new Date(selected.created_at).toLocaleString()}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
