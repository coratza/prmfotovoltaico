import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LogOut, Download, Search, Users, CalendarDays, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads_preventivo">;

interface Props {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: Props) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("all");
  const [filterProvincia, setFilterProvincia] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads_preventivo")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
  };

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchSearch =
        !search ||
        l.nome.toLowerCase().includes(search.toLowerCase()) ||
        l.telefono.includes(search) ||
        (l.email && l.email.toLowerCase().includes(search.toLowerCase()));
      const matchTipo = filterTipo === "all" || l.tipologia === filterTipo;
      const matchProv = filterProvincia === "all" || l.provincia === filterProvincia;
      return matchSearch && matchTipo && matchProv;
    });
  }, [leads, search, filterTipo, filterProvincia]);

  const leadsThisMonth = useMemo(() => {
    const now = new Date();
    return leads.filter((l) => {
      const d = new Date(l.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  }, [leads]);

  const province = useMemo(() => [...new Set(leads.map((l) => l.provincia))].sort(), [leads]);

  const exportCSV = () => {
    const headers = [
      "Data", "Nome", "Telefono", "Email", "Tipologia", "Provincia",
      "Tipo Immobile", "Consumo kWh", "Spesa €", "kWp", "Risparmio/anno €",
      "Payback anni", "Qualifica 180%",
    ];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toLocaleDateString("it-IT"),
      l.nome, l.telefono, l.email || "", l.tipologia, l.provincia,
      l.tipo_immobile, l.consumo_annuo, l.spesa_annua, l.kwp_calcolati || "",
      l.risparmio_annuo || "", l.payback_anni || "", l.qualifica_180 || "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_prm_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fmt = (n: number | null) => (n != null ? Number(n).toLocaleString("it-IT") : "—");
  const fmtEur = (n: number | null) => (n != null ? `€ ${Number(n).toLocaleString("it-IT")}` : "—");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold font-[Josefin_Sans] text-foreground">Dashboard Lead PRM</h1>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-1" /> Esci
        </Button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" /> Lead totali
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{leads.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <CalendarDays className="h-4 w-4" /> Questo mese
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{leadsThisMonth}</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Filtrati</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{filtered.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca nome, telefono, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterTipo} onValueChange={setFilterTipo}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Tipologia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte</SelectItem>
              <SelectItem value="privato">Privato</SelectItem>
              <SelectItem value="azienda">Azienda</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterProvincia} onValueChange={setFilterProvincia}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Provincia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte</SelectItem>
              {province.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={exportCSV} variant="outline" className="shrink-0">
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Nessun lead trovato.</p>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefono</TableHead>
                  <TableHead className="hidden md:table-cell">Tipo</TableHead>
                  <TableHead className="hidden md:table-cell">Provincia</TableHead>
                  <TableHead className="hidden lg:table-cell">kWp</TableHead>
                  <TableHead className="hidden lg:table-cell">Risparmio/a</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((lead) => (
                  <Collapsible key={lead.id} open={expandedId === lead.id} onOpenChange={(open) => setExpandedId(open ? lead.id : null)} asChild>
                    <>
                      <CollapsibleTrigger asChild>
                        <TableRow className="cursor-pointer">
                          <TableCell className="text-sm">{new Date(lead.created_at).toLocaleDateString("it-IT")}</TableCell>
                          <TableCell className="font-medium">{lead.nome}</TableCell>
                          <TableCell>
                            <a href={`tel:${lead.telefono}`} className="text-primary hover:underline">{lead.telefono}</a>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant={lead.tipologia === "azienda" ? "default" : "secondary"}>
                              {lead.tipologia}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{lead.provincia}</TableCell>
                          <TableCell className="hidden lg:table-cell">{fmt(lead.kwp_calcolati)}</TableCell>
                          <TableCell className="hidden lg:table-cell">{fmtEur(lead.risparmio_annuo)}</TableCell>
                          <TableCell>
                            {expandedId === lead.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <tr>
                          <td colSpan={8} className="bg-muted/30 px-4 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div><span className="text-muted-foreground">Email:</span> {lead.email || "—"}</div>
                              <div><span className="text-muted-foreground">Immobile:</span> {lead.tipo_immobile}</div>
                              <div><span className="text-muted-foreground">Consumo:</span> {fmt(lead.consumo_annuo)} kWh</div>
                              <div><span className="text-muted-foreground">Spesa:</span> {fmtEur(lead.spesa_annua)}</div>
                              <div><span className="text-muted-foreground">Produzione:</span> {fmt(lead.produzione_annua)} kWh</div>
                              <div><span className="text-muted-foreground">Autoconsumo:</span> {lead.autoconsumo_pct != null ? `${lead.autoconsumo_pct}%` : "—"}</div>
                              <div><span className="text-muted-foreground">Costo lordo:</span> {fmtEur(lead.costo_lordo)}</div>
                              <div><span className="text-muted-foreground">Costo netto:</span> {fmtEur(lead.costo_netto)}</div>
                              <div><span className="text-muted-foreground">IRR:</span> {lead.irr_base != null ? `${lead.irr_base}% – ${lead.irr_max}%` : "—"}</div>
                              <div><span className="text-muted-foreground">Payback:</span> {lead.payback_anni != null ? `${lead.payback_anni} anni` : "—"}</div>
                              <div><span className="text-muted-foreground">Qualifica 180%:</span> {lead.qualifica_180 || "—"}</div>
                              {lead.tipologia === "azienda" && (
                                <>
                                  <div><span className="text-muted-foreground">mq tetto:</span> {fmt(lead.mq_tetto)}</div>
                                  <div><span className="text-muted-foreground">Attività:</span> {lead.profilo_attivita || "—"}</div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
