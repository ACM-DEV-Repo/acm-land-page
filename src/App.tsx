import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LandingPageV2 from "./pages/LandingPageV2";
import LandingPagesV2 from "./pages/admin/LandingPagesV2";
import LPEditorV2 from "./pages/admin/landpage/LPEditorV2";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Tela de entrada — lista de LPs */}
          <Route path="/" element={<Navigate to="/admin/lps" replace />} />
          {/* LP publica */}
          <Route path="/l/:slug" element={<LandingPageV2 />} />
          {/* Admin */}
          <Route path="/admin/lps" element={<LandingPagesV2 />} />
          <Route path="/admin/lps/:lpKey" element={<LPEditorV2 />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
