import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Received lead data:", JSON.stringify(body));

    // Validate required fields
    const required = ["nome", "telefono", "tipologia", "provincia", "tipo_immobile", "potenza", "consumo_annuo", "spesa_annua"];
    for (const field of required) {
      if (!body[field] && body[field] !== 0) {
        console.error(`Missing required field: ${field}`);
        return new Response(
          JSON.stringify({ error: `Campo obbligatorio mancante: ${field}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Validate string lengths
    if (typeof body.nome === "string" && body.nome.length > 200) {
      return new Response(
        JSON.stringify({ error: "Nome troppo lungo (max 200 caratteri)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (typeof body.telefono === "string" && body.telefono.length > 30) {
      return new Response(
        JSON.stringify({ error: "Telefono troppo lungo (max 30 caratteri)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("leads_preventivo").insert({
      nome: body.nome,
      telefono: body.telefono,
      email: body.email || null,
      tipologia: body.tipologia,
      provincia: body.provincia,
      tipo_immobile: body.tipo_immobile,
      connessione: body.connessione || "connesso",
      potenza: body.potenza,
      accumulo: body.accumulo || false,
      consumo_annuo: body.consumo_annuo,
      spesa_annua: body.spesa_annua,
      produzione_annua: body.produzione_annua,
      autoconsumo_pct: body.autoconsumo_pct,
      autoconsumo_kwh: body.autoconsumo_kwh,
      prezzo_variabile: body.prezzo_variabile,
      costo_lordo: body.costo_lordo,
      beneficio_incentivi: body.beneficio_incentivi,
      costo_netto: body.costo_netto,
      risparmio_annuo: body.risparmio_annuo,
      payback_anni: body.payback_anni,
      roi_annuo: body.roi_annuo,
      risparmio_25_anni: body.risparmio_25_anni,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(
        JSON.stringify({ error: "Errore nel salvataggio dei dati" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Lead saved successfully");
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Errore interno del server" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
