import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram } from "lucide-react";

const posts = [
  { id: 1, title: "Rotina simples para definição", excerpt: "Dicas práticas para definir seus cachos sem pesar.", tag: "Rotina" },
  { id: 2, title: "Hidratação x Nutrição x Reconstrução", excerpt: "Como identificar a necessidade dos seus fios.", tag: "Tratamentos" },
  { id: 3, title: "Corte para valorizar o volume", excerpt: "Entenda o caimento e o desenho do corte em camadas.", tag: "Corte" },
];

// Dados mockados do Instagram
const mockInstagramPosts = [
  {
    id: "1",
    caption: "✨ Transformação incrível! Cachos definidos e hidratados com nossos produtos especiais. #cacheadas #cabelos #transformacao",
    media_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
    permalink: "https://www.instagram.com/p/example1/",
    timestamp: "2024-01-15T10:30:00Z",
    media_type: "IMAGE"
  },
  {
    id: "2", 
    caption: "📍 Nosso salão te espera! Ambiente acolhedor e profissionais especializados em cabelos cacheados e crespos 💫",
    media_url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop", 
    permalink: "https://www.instagram.com/p/example2/",
    timestamp: "2024-01-14T15:45:00Z",
    media_type: "IMAGE"
  },
  {
    id: "3",
    caption: "💡 Dica do dia: A finalização faz toda a diferença! Use nossos produtos para manter seus cachos perfeitos por mais tempo ✨",
    media_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    permalink: "https://www.instagram.com/p/example3/", 
    timestamp: "2024-01-13T12:20:00Z",
    media_type: "IMAGE"
  }
];

const Novidades = () => {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Novidades & Dicas</h1>
      
      {/* Instagram Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Instagram className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Do nosso Instagram</h2>
          <a 
            href="https://www.instagram.com/gabeleira_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline ml-auto"
          >
            @gabeleira_
          </a>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          {mockInstagramPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover-scale">
              <a 
                href={post.permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={post.thumbnail_url} 
                    alt={post.caption?.slice(0, 100) || "Instagram post"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-foreground/80 line-clamp-3">
                    {post.caption?.slice(0, 120)}
                    {post.caption && post.caption.length > 120 && '...'}
                  </p>
                  <time className="text-xs text-muted-foreground mt-2 block">
                    {new Date(post.timestamp).toLocaleDateString('pt-BR')}
                  </time>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Artigos & Dicas</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Card key={p.id} className="hover-scale">
              <CardHeader>
                <span className="text-xs bg-secondary/50 px-2 py-1 rounded-md w-fit">{p.tag}</span>
                <CardTitle className="mt-2">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">{p.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Novidades;
