import { Phone } from "lucide-react";
import { trackPhoneCall } from "@/lib/tracking";

const MobileCallBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
      <a
        href="tel:+393356117388"
        onClick={() => trackPhoneCall("mobile_call_bar")}
        className="flex items-center justify-center gap-3 bg-cta text-cta-foreground py-3.5 px-6 font-semibold text-base shadow-strong hover:bg-cta-hover transition-colors"
      >
        <Phone className="w-5 h-5 flex-shrink-0" />
        Chiama Ora: 335 611 7388
      </a>
    </div>
  );
};

export default MobileCallBar;
