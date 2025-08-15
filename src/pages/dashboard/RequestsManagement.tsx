import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { setPageSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReqRow { id: number; created_at: string; student_id?: number | null; college_department?: string | null; plan?: string | null; request_status?: string | null; }

export default function RequestsManagement() {
  const [rows, setRows] = useState<ReqRow[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("student_subscription")
        .select("id, created_at, student_id, college_department, plan, request_status")
        .eq("request_status", "pending");
      
      if (error) {
        console.error("Error fetching requests:", error);
        toast.error("خطأ في تحميل البيانات");
        setRows([]);
      } else {
        setRows(data || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("خطأ غير متوقع");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageSEO("نماذج الطلبات", "مراجعة طلبات الاشتراك وقبولها أو رفضها", location.origin + "/dashboard/requests");
    load();
  }, []);

  const act = async (id: number, status: "approved" | "rejected") => {
    const { error } = await supabase.from("student_subscription").update({ request_status: status } as any).eq("id", id);
    if (error) toast.error("تعذر تنفيذ العملية");
    else { toast.success("تم التحديث"); load(); }
  };

  return (
    <div className="space-y-4">
      <Card className="card-medical">
        <CardHeader className="flex-row items-center justify-between"><CardTitle>طلبات الاشتراك</CardTitle><Button onClick={load} disabled={loading}>{loading ? "جاري التحديث..." : "تحديث"}</Button></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الرقم الجامعي</TableHead>
                <TableHead>الكلية</TableHead>
                <TableHead>الخطة</TableHead>
                <TableHead>الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{r.student_id || "—"}</TableCell>
                  <TableCell>{r.college_department || "—"}</TableCell>
                  <TableCell>{r.plan || "—"}</TableCell>
                  <TableCell className="space-x-2 space-x-reverse">
                    <Button size="sm" onClick={() => act(r.id, "approved")}>قبول</Button>
                    <Button size="sm" variant="destructive" onClick={() => act(r.id, "rejected")}>رفض</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>إجمالي: {rows.length}</TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
