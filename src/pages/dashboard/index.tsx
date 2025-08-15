import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { setPageSEO } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserPlus, Shield, Ticket } from "lucide-react";

export default function DashboardHome() {
  const [counts, setCounts] = useState({ users: 0, subs: 0, services: 0, pharmacies: 0, doctors: 0, labs: 0, hospitals: 0, all: 0 });
  const [plans, setPlans] = useState<Record<string, number>>({});
  const [colleges, setColleges] = useState<Record<string, number>>({});
  const [latestSubs, setLatestSubs] = useState<any[]>([]);
  const [latestUsers, setLatestUsers] = useState<any[]>([]);

  useEffect(() => {
    setPageSEO("لوحة التحكم - إحصائيات", "إحصائيات عامة ولوحات بيانية للمنصة", location.origin + "/dashboard");

    const getCount = async (table: string) => {
      const { count } = await supabase.from(table as any).select("*", { count: "exact", head: true });
      return count || 0;
    };

    (async () => {
      try {
        const [users, subs, pharmacies, doctors, labs, hospitals] = await Promise.all([
          getCount("users"),
          getCount("student_subscription"),
          getCount("pharmacies"),
          getCount("doctors"),
          getCount("laboratories"),
          getCount("hospitals"),
        ]);
        const services = pharmacies + doctors + labs + hospitals;
        setCounts({ users, subs, services, pharmacies, doctors, labs, hospitals, all: services });

        const { data: subRows, error: subError } = await supabase
          .from("student_subscription")
          .select("plan, college_department, created_at");
          
        if (subError) {
          console.error("Error fetching subscription data:", subError);
        } else {
          const plansCount: Record<string, number> = {};
          const collegeCount: Record<string, number> = {};
          (subRows || []).forEach((r: any) => {
            const p = r.plan || "غير محدد";
            plansCount[p] = (plansCount[p] || 0) + 1;
            const c = r.college_department || "أخرى";
            collegeCount[c] = (collegeCount[c] || 0) + 1;
          });
          setPlans(plansCount);
          setColleges(collegeCount);
        }

        const { data: latestS, error: latestSubsError } = await supabase
          .from("student_subscription")
          .select("created_at, college_department, plan, student_id")
          .order("created_at", { ascending: false })
          .limit(6);
          
        if (!latestSubsError) {
          setLatestSubs(latestS || []);
        }

        const { data: latestU, error: latestUsersError } = await supabase
          .from("users")
          .select("created_at, full_name, email, role")
          .order("created_at", { ascending: false })
          .limit(6);
          
        if (!latestUsersError) {
          setLatestUsers(latestU || []);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    })();
  }, []);

  const planData = useMemo(() => Object.entries(plans).map(([k, v]) => ({ name: k, value: v })), [plans]);
  const collegeData = useMemo(() => Object.entries(colleges).map(([k, v]) => ({ name: k, value: v })), [colleges]);

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-medical"><CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">عدد المستخدمين</CardTitle><Users className="w-5 h-5 text-primary"/></CardHeader><CardContent className="text-3xl font-bold">{counts.users}</CardContent></Card>
        <Card className="card-medical"><CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">مشتركو التأمين</CardTitle><Shield className="w-5 h-5 text-primary"/></CardHeader><CardContent className="text-3xl font-bold">{counts.subs}</CardContent></Card>
        <Card className="card-medical"><CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">الخدمات الطبية</CardTitle><Ticket className="w-5 h-5 text-primary"/></CardHeader><CardContent className="text-3xl font-bold">{counts.all}</CardContent></Card>
        <Card className="card-medical"><CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">خدمات جديدة</CardTitle><UserPlus className="w-5 h-5 text-primary"/></CardHeader><CardContent className="text-3xl font-bold">{counts.pharmacies + counts.doctors + counts.labs + counts.hospitals}</CardContent></Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="card-medical">
          <CardHeader><CardTitle>المشتركون حسب الخطة</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ChartContainer config={{}}>
              <ResponsiveContainer>
                <BarChart data={planData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader><CardTitle>الطلاب حسب الكلية</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ChartContainer config={{}}>
              <ResponsiveContainer>
                <BarChart data={collegeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--accent))" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Latest tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="card-medical">
          <CardHeader><CardTitle>آخر الاشتراكات</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الكلية</TableHead>
                  <TableHead>الخطة</TableHead>
                  <TableHead>الرقم الجامعي</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestSubs.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{r.college_department || "—"}</TableCell>
                    <TableCell>{r.plan || "—"}</TableCell>
                    <TableCell>{r.student_id || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>أحدث 6 اشتراكات</TableCaption>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardHeader><CardTitle>آخر التسجيلات</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد</TableHead>
                  <TableHead>الدور</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestUsers.map((u, i) => (
                  <TableRow key={i}>
                    <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{u.full_name || "—"}</TableCell>
                    <TableCell>{u.email || "—"}</TableCell>
                    <TableCell>{u.role || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>أحدث 6 مستخدمين</TableCaption>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
