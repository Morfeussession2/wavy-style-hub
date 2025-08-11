import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import shampoo from "@/assets/products/shampoo.jpg";
import conditioner from "@/assets/products/conditioner.jpg";
import cream from "@/assets/products/cream.jpg";

const PHONE = "5599999999999"; // Atualize com seu número

const products = [
  { id: "shampoo", title: "Shampoo Cachos Leves", price: "R$ 59,90", img: shampoo },
  { id: "conditioner", title: "Condicionador Definição", price: "R$ 64,90", img: conditioner },
  { id: "cream", title: "Creme Definidor", price: "R$ 69,90", img: cream },
];

const Produtos = () => {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Produtos</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((p) => (
          <Card key={p.id} className="hover-scale">
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={p.img} alt={`${p.title} para cabelos cacheados`} className="rounded-md mb-4 w-full h-48 object-cover" loading="lazy" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">{p.price}</span>
                <Button asChild>
                  <a
                    href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Quero comprar: ${p.title} (${p.price})`)}`}
                    target="_blank" rel="noreferrer"
                  >
                    Comprar no WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Produtos;
