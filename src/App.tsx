import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CalcolaPreventivo from "./pages/CalcolaPreventivo";
import FotovoltaicoPrivati from "./pages/FotovoltaicoPrivati";
import FotovoltaicoAziende from "./pages/FotovoltaicoAziende";
import LavoriRealizzati from "./pages/LavoriRealizzati";
import ChiSiamo from "./pages/ChiSiamo";
import Contatti from "./pages/Contatti";
import Agevolazioni from "./pages/Agevolazioni";
import DetrazioniPrivati from "./pages/agevolazioni/DetrazioniPrivati";
import DetrazioniPrivatiBologna from "./pages/agevolazioni/DetrazioniPrivatiBologna";
import DetrazioniPrivatiModena from "./pages/agevolazioni/DetrazioniPrivatiModena";
import DetrazioniPrivatiFerrara from "./pages/agevolazioni/DetrazioniPrivatiFerrara";
import DetrazioniPrivatiRavenna from "./pages/agevolazioni/DetrazioniPrivatiRavenna";
import AgevolazioniAziende from "./pages/agevolazioni/AgevolazioniAziende";
import AgevolazioniAziendeBologna from "./pages/agevolazioni/AgevolazioniAziendeBologna";
import AgevolazioniAziendeModena from "./pages/agevolazioni/AgevolazioniAziendeModena";
import AgevolazioniAziendeFerrara from "./pages/agevolazioni/AgevolazioniAziendeFerrara";
import AgevolazioniAziendeRavenna from "./pages/agevolazioni/AgevolazioniAziendeRavenna";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calcola-rendimento" element={<CalcolaPreventivo />} />
          <Route path="/fotovoltaico-privati" element={<FotovoltaicoPrivati />} />
          <Route path="/fotovoltaico-aziende" element={<FotovoltaicoAziende />} />
          <Route path="/lavori-realizzati" element={<LavoriRealizzati />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/agevolazioni" element={<Agevolazioni />} />
          <Route path="/agevolazioni/detrazioni-privati" element={<DetrazioniPrivati />} />
          <Route path="/agevolazioni/detrazioni-privati-bologna" element={<DetrazioniPrivatiBologna />} />
          <Route path="/agevolazioni/detrazioni-privati-modena" element={<DetrazioniPrivatiModena />} />
          <Route path="/agevolazioni/detrazioni-privati-ferrara" element={<DetrazioniPrivatiFerrara />} />
          <Route path="/agevolazioni/detrazioni-privati-ravenna" element={<DetrazioniPrivatiRavenna />} />
          <Route path="/agevolazioni/agevolazioni-aziende" element={<AgevolazioniAziende />} />
          <Route path="/agevolazioni/agevolazioni-aziende-bologna" element={<AgevolazioniAziendeBologna />} />
          <Route path="/agevolazioni/agevolazioni-aziende-modena" element={<AgevolazioniAziendeModena />} />
          <Route path="/agevolazioni/agevolazioni-aziende-ferrara" element={<AgevolazioniAziendeFerrara />} />
          <Route path="/agevolazioni/agevolazioni-aziende-ravenna" element={<AgevolazioniAziendeRavenna />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
