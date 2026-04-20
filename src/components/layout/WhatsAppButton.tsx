import whatsappLogo from "@/assets/whatsapp-round.png";
import { trackWhatsAppClick } from "@/lib/tracking";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/393356117388?text=Buongiorno%2C%20vorrei%20informazioni%20sul%20fotovoltaico."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      onClick={() => trackWhatsAppClick("whatsapp_floating")}
      className="fixed bottom-16 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full shadow-strong transition-transform hover:scale-110 active:scale-95"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="w-full h-full object-contain" width={56} height={56} />
    </a>
  );
};

export default WhatsAppButton;
