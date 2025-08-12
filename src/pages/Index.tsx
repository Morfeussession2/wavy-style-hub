import Hero from "@/components/site/Hero";


import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <Hero />

        <section className="container mx-auto py-16">
          <h2 className="text-3xl font-bold mb-8">Serviços em destaque</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[{title:'Corte & Finalização', desc:'Seu corte pensado para valorizar seus cachos.'}, {title:'Hidratação potente', desc:'Tratamentos que devolvem brilho e definição.'}, {title:'Coloração cuidadosa', desc:'Cor vibrante respeitando a saúde dos fios.'}].map((s, i) => (
              <Card key={i} className="hover-scale">
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/70 mb-4">{s.desc}</p>
                  <Button asChild>
                    <Link to="/agendar">Agendar</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto py-16">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Nossa cultura</h3>
              <p className="text-foreground/80 leading-relaxed">
                Celebramos texturas naturais com atendimento acolhedor, técnica apurada e muito aprendizado sobre cachos. Educação, autoestima e cuidado andam juntos por aqui.
              </p>
            </div>
            <Card className="hover-scale glass-card border-white/20">
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-foreground/80">
                  <li>• Atendimento humanizado e consultivo</li>
                  <li>• Produtos selecionados para cachos</li>
                  <li>• Conteúdo educativo e atual</li>
                </ul>
                <Button asChild className="mt-6" variant="outline"><Link to="/sobre">Ler mais</Link></Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default Index;