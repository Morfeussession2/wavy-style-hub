import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
  { id: 1, title: "Rotina simples para definição", excerpt: "Dicas práticas para definir seus cachos sem pesar.", tag: "Rotina" },
  { id: 2, title: "Hidratação x Nutrição x Reconstrução", excerpt: "Como identificar a necessidade dos seus fios.", tag: "Tratamentos" },
  { id: 3, title: "Corte para valorizar o volume", excerpt: "Entenda o caimento e o desenho do corte em camadas.", tag: "Corte" },
];

const Novidades = () => {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Novidades & Dicas</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <Card key={p.id} className="hover-scale">
            <CardHeader>
              <span className="text-xs bg-secondary/50 px-2 py-1 rounded-md">{p.tag}</span>
              <CardTitle className="mt-2">{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70">{p.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Novidades;
