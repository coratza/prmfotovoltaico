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
      className="fixed bottom-20 md:bottom-8 right-4 md:right-6 z-50 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-strong transition-transform hover:scale-110 active:scale-95"
    >
      <img
        src={whatsappLogo}
        alt="WhatsApp"
        className="w-full h-full object-cover"
        width={80}
        height={80}
        loading="lazy"
      />
    </a>
  );
};

export default WhatsAppButton;
