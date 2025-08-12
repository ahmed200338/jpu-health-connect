// @ts-nocheck
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

async function countRows(table: string) {
  const { count } = await supabase.from(table as any).select("*", { count: "exact", head: true });
  return count ?? 0;
}

// Lightweight helper to avoid deep generic inference issues in TS
const uq = (key: any, fn: () => Promise<any>) => useQuery({ queryKey: key, queryFn: fn } as any) as any;

export default function DashboardHome() {
  useEffect(() => {
    document.title = "لوحة التحكم | الرئيسية";
  }, []);

  const usersQ = uq(["count","users"], () => countRows("users"));
  const subsQ = uq(["count","student_subscription"], () => countRows("student_subscription"));
  const plansQ = uq(["plans-dist"], async () => {
      const { data } = await supabase.from("student_subscription").select("plan");
      const counts: Record<string, number> = { gold: 0, silver: 0, bronze: 0 };
      (data || []).forEach((r: any) => { if (r.plan) counts[r.plan] = (counts[r.plan] || 0) + 1; });
      return [
        { name: "ذهبي", value: counts.gold },
        { name: "فضي", value: counts.silver },
        { name: "برونزي", value: counts.bronze },
      ];
    }
  );
  const collegesQ = uq(["college-dist"], async () => {
      const { data } = await supabase.from("student_subscription").select("college_department");
      const counts: Record<string, number> = {};
      (data || []).forEach((r: any) => {
        const k = r.college_department || "غير محدد";
        counts[k] = (counts[k] || 0) + 1;
      });
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }
  );
  const latestSubsQ = uq(["latest-subs"], async () => {
      const { data } = await supabase.from("student_subscription").select("student_id, college_department, plan, created_at").order("created_at", { ascending: false }).limit(5);
      return data || [];
    }
  );
  const latestUsersQ = uq(["latest-users"], async () => {
      const { data } = await supabase.from("users").select("full_name, email, role, created_at").order("created_at", { ascending: false }).limit(5);
      return data || [];
    }
  );
  const pendingReqQ = uq(["pending-req"], async () => {
      const { data } = await supabase.from("student_subscription").select("student_id, college_department, plan, request_status, created_at").eq("request_status", "pending").order("created_at", { ascending: false }).limit(5);
      return data || [];
    }
  );
  const servicesCountsQ = uq(["services-counts"], async () => {
      const realKeys = ["pharmacies","doctors","hospitals","laboratories"] as const;
      const counts: Record<string, number> = {};
      await Promise.all(realKeys.map(async (t) => { counts[t] = await countRows(t); }));
      return [
        { label: "الصيدليات", value: counts.pharmacies||0 },
        { label: "الأطباء", value: counts.doctors||0 },
        { label: "المستشفيات", value: counts.hospitals||0 },
        { label: "المختبرات", value: counts.laboratories||0 },
      ];
    }
  );

  const totalServices = useMemo(() => (servicesCountsQ.data||[]).reduce((s, x) => s + (x.value||0), 0), [servicesCountsQ.data]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card><CardHeader><CardTitle>المستخدمون</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{usersQ.data ?? 0}</CardContent></Card>
        <Card><CardHeader><CardTitle>مشتركو التأمين</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{subsQ.data ?? 0}</CardContent></Card>
        <Card><CardHeader><CardTitle>الخدمات الطبية</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{totalServices}</CardContent></Card>
        <Card><CardHeader><CardTitle>طلبات الاشتراك المعلقة</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{pendingReqQ.data?.length ?? 0}</CardContent></Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-80">
          <CardHeader><CardTitle>توزيع الباقات</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plansQ.data || []}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <RTooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="h-80">
          <CardHeader><CardTitle>توزيع الكليات</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={collegesQ.data || []} dataKey="value" nameKey="name" outerRadius={90}>
                  {(collegesQ.data||[]).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <RTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>أحدث المشتركين</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الرقم الجامعي</TableHead>
                  <TableHead>الكلية</TableHead>
                  <TableHead>الباقة</TableHead>
                  <TableHead>التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(latestSubsQ.data||[]).map((r:any, i:number) => (
                  <TableRow key={i}>
                    <TableCell>{r.student_id}</TableCell>
                    <TableCell>{r.college_department}</TableCell>
                    <TableCell>{r.plan}</TableCell>
                    <TableCell>{new Date(r.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>أحدث التسجيلات</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(latestUsersQ.data||[]).map((u:any, i:number) => (
                  <TableRow key={i}>
                    <TableCell>{u.full_name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>{new Date(u.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
