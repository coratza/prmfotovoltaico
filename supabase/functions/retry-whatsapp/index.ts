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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify admin via JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { leadId } = await req.json();
    if (!leadId) {
      return new Response(JSON.stringify({ error: "leadId richiesto" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: lead, error: leadErr } = await supabase
      .from("leads_preventivo")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadErr || !lead) {
      return new Response(JSON.stringify({ error: "Lead non trovato" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const phone = Deno.env.get("WHATSAPP_PHONE");
    const apikey = Deno.env.get("CALLMEBOT_APIKEY");

    if (!phone || !apikey) {
      await supabase
        .from("leads_preventivo")
        .update({
          whatsapp_status: "not_configured",
          whatsapp_error: "WHATSAPP_PHONE o CALLMEBOT_APIKEY non configurati",
        })
        .eq("id", leadId);
      return new Response(
        JSON.stringify({ error: "Credenziali WhatsApp non configurate" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const msg = [
      "🔔 *Nuovo Lead PRM (retry)!*",
      "",
      `👤 *Nome:* ${lead.nome}`,
      `📞 *Tel:* ${lead.telefono}`,
      `📧 *Email:* ${lead.email || "N/D"}`,
      `🏷 *Tipo:* ${lead.tipologia}`,
      `📍 *Provincia:* ${lead.provincia}`,
      `🏠 *Immobile:* ${lead.tipo_immobile}`,
      "",
      `⚡ *kWp:* ${lead.kwp_calcolati || "N/D"}`,
      `💰 *Risparmio/anno:* €${lead.risparmio_annuo ? Number(lead.risparmio_annuo).toLocaleString("it-IT") : "N/D"}`,
      `📊 *Payback:* ${lead.payback_anni ? `${lead.payback_anni} anni` : "N/D"}`,
      `🎯 *Qualifica 180%:* ${lead.qualifica_180 || "N/D"}`,
    ].join("\n");

    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(msg)}&apikey=${apikey}`;
    const res = await fetch(url);
    const text = await res.text();

    const lower = text.toLowerCase();
    const success = res.status === 200 && (lower.includes("queued") || lower.includes("sent") || lower.includes("message"));

    await supabase
      .from("leads_preventivo")
      .update({
        whatsapp_status: success ? "sent" : "failed",
        whatsapp_sent_at: success ? new Date().toISOString() : null,
        whatsapp_response: text.slice(0, 1000),
        whatsapp_error: success ? null : `HTTP ${res.status}: ${text.slice(0, 500)}`,
      })
      .eq("id", leadId);

    return new Response(
      JSON.stringify({ success, response: text.slice(0, 500) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Retry WhatsApp error:", errMsg);
    return new Response(
      JSON.stringify({ error: errMsg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
