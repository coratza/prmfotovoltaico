import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded routes (not needed for initial paint)
const CalcolaPreventivo = lazy(() => import("./pages/CalcolaPreventivo"));
const FotovoltaicoPrivati = lazy(() => import("./pages/FotovoltaicoPrivati"));
const FotovoltaicoAziende = lazy(() => import("./pages/FotovoltaicoAziende"));
const LavoriRealizzati = lazy(() => import("./pages/LavoriRealizzati"));
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));
const Contatti = lazy(() => import("./pages/Contatti"));
const Agevolazioni = lazy(() => import("./pages/Agevolazioni"));
const DetrazioniPrivati = lazy(() => import("./pages/agevolazioni/DetrazioniPrivati"));
const DetrazioniPrivatiBologna = lazy(() => import("./pages/agevolazioni/DetrazioniPrivatiBologna"));
const DetrazioniPrivatiModena = lazy(() => import("./pages/agevolazioni/DetrazioniPrivatiModena"));
const DetrazioniPrivatiFerrara = lazy(() => import("./pages/agevolazioni/DetrazioniPrivatiFerrara"));
const DetrazioniPrivatiRavenna = lazy(() => import("./pages/agevolazioni/DetrazioniPrivatiRavenna"));
const AgevolazioniAziende = lazy(() => import("./pages/agevolazioni/AgevolazioniAziende"));
const AgevolazioniAziendeBologna = lazy(() => import("./pages/agevolazioni/AgevolazioniAziendeBologna"));
const AgevolazioniAziendeModena = lazy(() => import("./pages/agevolazioni/AgevolazioniAziendeModena"));
const AgevolazioniAziendeFerrara = lazy(() => import("./pages/agevolazioni/AgevolazioniAziendeFerrara"));
const AgevolazioniAziendeRavenna = lazy(() => import("./pages/agevolazioni/AgevolazioniAziendeRavenna"));
const Admin = lazy(() => import("./pages/Admin"));
const PreventivoBologna = lazy(() => import("./pages/PreventivoBologna"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
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
            <Route path="/preventivo-bologna" element={<PreventivoBologna />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
