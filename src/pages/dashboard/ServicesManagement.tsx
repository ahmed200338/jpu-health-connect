// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SERVICE_TABS = [
  { key: "pharmacies", title: "الصيدليات", columns: ["name","phone","region","address","created_at"] },
  { key: "doctors", title: "الأطباء", columns: ["name","specialty","phone","region","created_at"] },
  { key: "hospitals", title: "المستشفيات", columns: ["name","phone","region","created_at"] },
  { key: "laboratories", title: "المختبرات", columns: ["name","phone","region","created_at"] },
];

function useServiceData(table: string) {
  return useQuery({
    queryKey: ["services", table],
    queryFn: async () => {
      const { data } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });
}

export default function ServicesManagement() {
  const [tab, setTab] = useState("pharmacies");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => { document.title = "لوحة التحكم | إدارة الخدمات"; }, []);

  const q = useServiceData(tab);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (q.data || []).filter((r: any) =>
      !term ||
      Object.values(r).some((v) => String(v || "").toLowerCase().includes(term))
    );
  }, [q.data, search]);

  const exportCSV = () => {
    const cols = SERVICE_TABS.find((t) => t.key === tab)?.columns || [];
    const rows = filtered.map((r: any) => cols.map((h) => r[h] ?? ""));
    const csv = [cols.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeCols = SERVICE_TABS.find((t) => t.key === tab)?.columns || [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>إدارة الخدمات</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="بحث..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-40 md:w-64" />
            <Button variant="secondary" onClick={exportCSV}>تصدير CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} dir="rtl">
            <TabsList className="flex gap-2 flex-wrap">
              {SERVICE_TABS.map((t) => (
                <TabsTrigger key={t.key} value={t.key}>{t.title}</TabsTrigger>
              ))}
            </TabsList>
            {SERVICE_TABS.map((t) => (
              <TabsContent key={t.key} value={t.key}>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {t.columns.map((c) => (
                          <TableHead key={c}>{c}</TableHead>
                        ))}
                        <TableHead>إجراء</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(filtered || []).map((r: any, i: number) => (
                        <TableRow key={i}>
                          {t.columns.map((c) => (
                            <TableCell key={c}>{String(r[c] ?? "")}</TableCell>
                          ))}
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => setSelected(r)}>عرض</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تفاصيل الخدمة</DialogTitle>
          </DialogHeader>
          {selected && (
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(selected, null, 2)}</pre>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
