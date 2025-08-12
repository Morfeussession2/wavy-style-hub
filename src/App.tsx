import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Agendar from "./pages/Agendar";
import Produtos from "./pages/Produtos";
import Novidades from "./pages/Novidades";
import Sobre from "./pages/Sobre";
import OndeEstamos from "./pages/OndeEstamos";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Usuario from "./pages/Usuario";
import SplashScreen from "./components/ui/splashscreen";

const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento inicial (ex: fetch, assets, etc)
    const timer = setTimeout(() => {
      setLoading(false); // quando "carregar", esconde splash
    }, 2500); // 2.5s por exemplo

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <SplashScreen
          isLoading={loading}
          onComplete={() => setLoading(false)} // só pra garantir
        />
      )}

      {!loading && (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/agendar" element={<Agendar />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/novidades" element={<Novidades />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/onde-estamos" element={<OndeEstamos />} />
                <Route path="/usuario" element={<Usuario />} />
                {/* Rotas customizadas acima */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      )}
    </>
  );
}

export default App;