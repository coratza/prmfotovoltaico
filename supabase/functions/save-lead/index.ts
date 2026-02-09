import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Anti-spam validation
function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9) return "Telefono troppo corto";
  if (/^(\d)\1+$/.test(digits)) return "Telefono non valido";
  for (let len = 1; len <= 4; len++) {
    const pattern = digits.substring(0, len);
    if (pattern.repeat(Math.ceil(digits.length / len)).substring(0, digits.length) === digits) {
      return "Telefono non valido";
    }
  }
  return null;
}

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "tempmail.com", "guerrillamail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "dispostable.com", "trashmail.com",
  "fakeinbox.com", "maildrop.cc", "10minutemail.com", "temp-mail.org", "getnada.com",
];

const FAKE_EMAIL_PATTERNS = [
  /^test@test\./i, /^aaa@aaa\./i, /^abc@abc\./i, /^fake@/i, /^asdf@/i, /^qwerty@/i, /^no@no\./i,
];

function validateEmail(email: string): string | null {
  if (!email) return null;
  const domain = email.split("@")[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domain)) return "Email temporanea non accettata";
  for (const p of FAKE_EMAIL_PATTERNS) {
    if (p.test(email)) return "Email non valida";
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Received lead data:", JSON.stringify(body));

    // Validate required fields (common)
    const required = ["nome", "telefono", "tipologia", "provincia", "tipo_immobile", "consumo_annuo", "spesa_annua"];
    for (const field of required) {
      if (!body[field] && body[field] !== 0) {
        return new Response(
          JSON.stringify({ error: `Campo obbligatorio mancante: ${field}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Azienda-specific required fields
    if (body.tipologia === "azienda") {
      for (const field of ["mq_tetto", "profilo_attivita"]) {
        if (!body[field] && body[field] !== 0) {
          return new Response(
            JSON.stringify({ error: `Campo obbligatorio per aziende: ${field}` }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }

    // Anti-spam validation
    const phoneErr = validatePhone(body.telefono);
    if (phoneErr) {
      return new Response(
        JSON.stringify({ error: phoneErr }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.email) {
      const emailErr = validateEmail(body.email);
      if (emailErr) {
        return new Response(
          JSON.stringify({ error: emailErr }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // String length validation
    if (typeof body.nome === "string" && body.nome.length > 200) {
      return new Response(
        JSON.stringify({ error: "Nome troppo lungo (max 200 caratteri)" }),
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
      consumo_annuo: body.consumo_annuo,
      spesa_annua: body.spesa_annua,
      // Azienda-specific
      mq_tetto: body.mq_tetto || null,
      profilo_attivita: body.profilo_attivita || null,
      ha_impianto_esistente: body.ha_impianto_esistente || false,
      // Calculated fields
      kwp_calcolati: body.kwp_calcolati,
      produzione_annua: body.produzione_annua,
      autoconsumo_pct: body.autoconsumo_pct,
      autoconsumo_kwh: body.autoconsumo_kwh,
      immissione_kwh: body.immissione_kwh,
      prezzo_variabile: body.prezzo_variabile,
      capex_stimato: body.capex_stimato,
      risparmio_annuo: body.risparmio_annuo,
      ricavo_immissione: body.ricavo_immissione,
      irr_base: body.irr_base,
      irr_max: body.irr_max,
      beneficio_incentivi: body.beneficio_incentivi,
      costo_lordo: body.costo_lordo,
      costo_netto: body.costo_netto,
      payback_anni: body.payback_anni,
      qualifica_180: body.qualifica_180 || null,
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
