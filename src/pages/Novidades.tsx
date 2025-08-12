import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Instagram } from "lucide-react";

const posts = [
  { id: 1, title: "Rotina simples para definição", excerpt: "Dicas práticas para definir seus cachos sem pesar.", tag: "Rotina" },
  { id: 2, title: "Hidratação x Nutrição x Reconstrução", excerpt: "Como identificar a necessidade dos seus fios.", tag: "Tratamentos" },
  { id: 3, title: "Corte para valorizar o volume", excerpt: "Entenda o caimento e o desenho do corte em camadas.", tag: "Corte" },
];

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  thumbnail_url: string;
  permalink: string;
  timestamp: string;
  media_type: string;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

const Novidades = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('instagram-posts');
        
        if (error) {
          console.error('Error fetching Instagram posts:', error);
          return;
        }

        if (data?.posts) {
          setInstagramPosts(data.posts);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);
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
        
        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : instagramPosts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {instagramPosts.map((post) => (
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
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Posts do Instagram serão carregados em breve.</p>
          </div>
        )}
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
