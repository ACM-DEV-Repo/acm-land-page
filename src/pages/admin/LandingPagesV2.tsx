import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageContainer } from "@/components/admin/layout/AdminPageContainer";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import type { LPRecord } from "@/lib/cms-v2/cms-types";
import { getNewLPContent } from "@/lib/cms-v2/lp-template";

export default function LandingPagesV2() {
  const [lps, setLps] = useState<LPRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLPs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("bd_cms_lp_v2").select("*").order("updated_at", { ascending: false });
    if (error) { toast.error("Erro ao carregar LPs"); console.error(error); }
    else setLps((data || []) as unknown as LPRecord[]);
    setLoading(false);
  };

  useEffect(() => { fetchLPs(); }, []);

  const createLP = async () => {
    const key = `lp-${Date.now()}`;
    const { error } = await supabase.from("bd_cms_lp_v2").insert({
      lp_key: key, name: "Nova Landing Page", slug: key, status: "draft",
      content: getNewLPContent() as any,
    });
    if (error) { toast.error("Erro ao criar LP"); return; }
    toast.success("LP criada!");
    navigate(`/admin/lps/${key}`);
  };

  const deleteLP = async (id: string, name: string) => {
    if (!confirm(`Excluir "${name}"?`)) return;
    const { error } = await supabase.from("bd_cms_lp_v2").delete().eq("id", id);
    if (error) toast.error("Erro ao excluir");
    else { toast.success("Excluída"); fetchLPs(); }
  };

  const filtered = lps.filter(lp => lp.name.toLowerCase().includes(search.toLowerCase()) || lp.slug.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminPageContainer type="table">
      <AdminPageHeader title="Landing Pages" description={`${lps.length} páginas`} />
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="pl-10" /></div>
        <Button onClick={createLP}><Plus className="h-4 w-4 mr-2" />Nova LP</Button>
      </div>
      {loading ? <p className="text-muted-foreground text-center py-12">Carregando...</p> : filtered.length === 0 ? <p className="text-muted-foreground text-center py-12">Nenhuma LP encontrada</p> : (
        <div className="grid gap-4">
          {filtered.map(lp => (
            <div key={lp.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2"><h3 className="font-semibold">{lp.name}</h3><Badge variant={lp.status === 'active' ? 'default' : 'secondary'}>{lp.status}</Badge></div>
                <p className="text-sm text-muted-foreground">/l/{lp.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild><Link to={`/l/${lp.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link></Button>
                <Button variant="ghost" size="sm" asChild><Link to={`/admin/lps/${lp.lp_key}`}><Pencil className="h-4 w-4" /></Link></Button>
                <Button variant="ghost" size="sm" onClick={() => deleteLP(lp.id, lp.name)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminPageContainer>
  );
}
