// Google Ads / GTM tracking utilities
// Sends events to dataLayer for GTM (GTM-5J8J6VVJ) and Google Ads (AW-17965756122)

const CONVERSION_ID = "AW-17965756122";
const CONVERSION_LABEL = "-seBCPTI4JMcENrd3vZC";

type DataLayerEvent = Record<string, unknown> & { event: string };

const pushToDataLayer = (payload: DataLayerEvent) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
};

/** Triggered after a successful lead form submission. */
export const trackLeadSubmission = (extra?: Record<string, unknown>) => {
  pushToDataLayer({
    event: "form_submission",
    conversionId: CONVERSION_ID,
    conversionLabel: CONVERSION_LABEL,
    ...extra,
  });
};

/** Triggered when the user clicks any phone-call link / button. */
export const trackPhoneCall = (source: string) => {
  pushToDataLayer({
    event: "phone_call",
    conversionId: CONVERSION_ID,
    conversionLabel: CONVERSION_LABEL,
    source,
  });
};

/** Triggered when the user clicks the WhatsApp button. */
export const trackWhatsAppClick = (source = "whatsapp_floating") => {
  pushToDataLayer({
    event: "whatsapp_click",
    conversionId: CONVERSION_ID,
    conversionLabel: CONVERSION_LABEL,
    source,
  });
};

/** Generic CTA click tracking (buttons that scroll to form, navigate, etc). */
export const trackCtaClick = (label: string, location?: string) => {
  pushToDataLayer({
    event: "cta_click",
    cta_label: label,
    cta_location: location,
  });
};
