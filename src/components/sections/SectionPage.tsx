import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Filter, SortAsc, SortDesc } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SectionPageProps {
  title: string;
  disc: string;
  backgroundImage: string;
  pageKey: string;
  tableName: string;
}

const SectionPage = ({ title, disc, backgroundImage, pageKey, tableName }: SectionPageProps) => {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [gov, setGov] = useState<"الكل" | string>("الكل");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `${title} | JPU ER`;
    fetchData();
  }, [title, tableName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName as any)
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim();
    let data = items.filter((it) => {
      const hay = `${it.name || ''} ${it.description || ''} ${it.address || ''}`;
      const matchQuery = q ? hay.includes(q) : true;
      const matchGov = gov === "الكل" ? true : it.region === gov;
      return matchQuery && matchGov;
    });

    data.sort((a, b) => (order === "asc" ? (a.name || '').localeCompare(b.name || '') : (b.name || '').localeCompare(a.name || '')));
    return data;
  }, [items, query, order, gov]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-52 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-primary/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start text-white">
          <h1 className="text-5xl pb-4  text-accent font-bold">{title}</h1>
          <p className="text-accent text-lg mt-2">{disc}</p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <Input
              placeholder={`بحث حسب الاسم او العنوان`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="sm:max-w-md"
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="space-x-2 space-x-reverse">
                  <Filter className="w-4 h-4" />
                  <span>تصفية</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-[60] bg-card">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">الترتيب الأبجدي</Label>
                    <RadioGroup value={order} onValueChange={(v) => setOrder(v as any)} className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="asc" id={`${pageKey}-asc`} />
                        <Label htmlFor={`${pageKey}-asc`} className="flex items-center gap-2">
                          <SortAsc className="w-4 h-4" /> تصاعدي
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="desc" id={`${pageKey}-desc`} />
                        <Label htmlFor={`${pageKey}-desc`} className="flex items-center gap-2">
                          <SortDesc className="w-4 h-4" /> تنازلي
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm">المحافظة</Label>
                    <Select value={gov} onValueChange={(v) => setGov(v as any)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent className="z-[70] bg-popover">
                        <SelectItem value="الكل">الكل</SelectItem>
                        {[
                          "دمشق","ريف دمشق","حلب","حمص","حماة","اللاذقية","طرطوس","إدلب","دير الزور","الرقة","الحسكة","درعا","السويداء","القنيطرة"
                        ].map((g) => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="card-medical">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">لا توجد نتائج مطابقة حالياً</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((it) => (
                <Card key={it.id} className="card-medical hover:scale-[1.02]">
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold text-foreground text-right">{it.name}</h3>
                    <p className="text-sm text-muted-foreground text-right">{it.region}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {it.description && (
                      <p className="text-muted-foreground text-right leading-relaxed">{it.description}</p>
                    )}
                    {it.address && (
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{it.address}</span>
                      </div>
                    )}
                    {it.phone && (
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{it.phone}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SectionPage;