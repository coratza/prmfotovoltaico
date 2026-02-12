import { Phone } from "lucide-react";

const MobileCallBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <a
        href="tel:+393356117388"
        className="flex items-center justify-center gap-3 bg-cta text-cta-foreground py-4 px-6 font-semibold text-lg shadow-strong hover:bg-cta-hover transition-colors"
      >
        <Phone className="w-5 h-5" />
        Chiama Ora: 335 611 7388
      </a>
    </div>
  );
};

export default MobileCallBar;
