import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/393356117388?text=Buongiorno%2C%20vorrei%20informazioni%20sul%20fotovoltaico."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      onClick={() => trackWhatsAppClick("whatsapp_floating")}
      className="fixed bottom-16 md:bottom-6 right-4 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-strong transition-transform hover:scale-110 active:scale-95"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
