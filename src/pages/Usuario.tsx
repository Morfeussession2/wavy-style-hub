import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Tipagem e validação básica da Ficha de Anamnese
const formSchema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  telefone: z.string().min(8, "Informe um telefone"),
  idade: z.string().optional(),
  endereco: z.string().optional(),
  comoConheceu: z.enum(["instagram", "google", "indicacao", "outro"]).optional(),
  cabeloTipo: z.enum(["2A","2B","2C","3A","3B","3C","4A","4B","4C"]).optional(),
  couro: z.enum(["normal","seco","oleoso","misto"]).optional(),
  porosidade: z.enum(["baixa","media","alta"]).optional(),
  elasticidade: z.enum(["baixa","media","alta"]).optional(),
  densidade: z.enum(["baixa","media","alta","muito_alta"]).optional(),
  quimica: z.array(z.enum(["nenhum","alisamento","coloracao","soltura","relaxamento","mechas","outros"]).optional()).optional(),
  alergia: z.boolean().optional(),
  alergiaDescricao: z.string().optional(),
  praticaEsporte: z.enum(["sim","nao"]).optional(),
  frequenciaCalor: z.enum(["sim","nao"]).optional(),
  queixas: z.string().optional(),
  produtosCasa: z.array(z.enum(["basico","mascara","creme","finalizadores"]).optional()).optional(),
});

const servicePoints: Record<string, number> = {
  "Corte & Finalização": 50,
  "Hidratação potente": 30,
  "Coloração cuidadosa": 70,
  "Reconstrução": 60,
  "Nutrição": 40,
};

interface HistoryItem {
  id: string;
  data: string; // ISO
  servico: keyof typeof servicePoints | string;
  valor: number;
  pontos: number;
}

const defaultHistory: HistoryItem[] = [
  { id: "1", data: "2025-06-20", servico: "Corte & Finalização", valor: 180, pontos: servicePoints["Corte & Finalização"] },
  { id: "2", data: "2025-07-15", servico: "Hidratação potente", valor: 120, pontos: servicePoints["Hidratação potente"] },
];

const Usuario = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem("gg_history");
    return saved ? JSON.parse(saved) : defaultHistory;
  });

  const totalPoints = useMemo(() => history.reduce((acc, h) => acc + h.pontos, 0), [history]);
  const tier = useMemo(() => (totalPoints >= 300 ? "Ouro" : totalPoints >= 160 ? "Prata" : "Bronze"), [totalPoints]);
  const nextTierAt = tier === "Bronze" ? 160 : tier === "Prata" ? 300 : 0;
  const progress = Math.min(100, Math.round((totalPoints / (nextTierAt || totalPoints || 1)) * 100));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: (() => {
      const saved = localStorage.getItem("gg_form");
      return saved ? JSON.parse(saved) : {
        nome: "",
        email: "",
        telefone: "",
        idade: "",
        endereco: "",
        comoConheceu: undefined,
        cabeloTipo: undefined,
        couro: undefined,
        porosidade: undefined,
        elasticidade: undefined,
        densidade: undefined,
        quimica: [],
        alergia: false,
        alergiaDescricao: "",
        praticaEsporte: undefined,
        frequenciaCalor: undefined,
        queixas: "",
        produtosCasa: [],
      };
    })(),
  });

  useEffect(() => {
    document.title = "Minha conta | Gab Gomes";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Perfil do usuário: ficha de anamnese, pontuação e histórico de serviços.");
  }, []);

  useEffect(() => {
    localStorage.setItem("gg_history", JSON.stringify(history));
  }, [history]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("gg_form", JSON.stringify(values));
    toast({ title: "Ficha salva", description: "Suas informações foram atualizadas.", duration: 3000 });
  };

  const handleRedeem = () => {
    if (totalPoints < 100) {
      toast({ title: "Pontos insuficientes", description: "Acumule 100+ pontos para resgatar.", duration: 3000 });
      return;
    }
    const code = `GAB-${Math.floor(1000 + Math.random() * 9000)}`;
    toast({ title: "Cupom gerado!", description: `Use o código ${code} para obter desconto.`, duration: 5000 });
  };

  return (
    <main className="container mx-auto py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Minha conta</h1>
        <p className="text-foreground/70">Gerencie sua ficha, acompanhe pontos e histórico de serviços.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 hover-scale">
          <CardHeader>
            <CardTitle>Seus pontos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-sm text-foreground/70">Total</p>
                <p className="text-4xl font-extrabold text-primary">{totalPoints}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground/70">Nível</p>
                <p className="text-xl font-semibold">{tier}</p>
              </div>
            </div>
            {nextTierAt > 0 && (
              <div>
                <div className="h-2 rounded bg-foreground/10 overflow-hidden">
                  <div className="h-2 bg-primary rounded" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-xs text-foreground/70">Faltam {Math.max(0, nextTierAt - totalPoints)} pts para o próximo nível.</p>
              </div>
            )}
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <p>• 100 pts = 10% off</p>
              <p>• 200 pts = 20% off</p>
              <p>• 300 pts = 30% off</p>
            </div>
            <Button className="mt-4 w-full" onClick={handleRedeem}>Resgatar desconto</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 hover-scale">
          <CardHeader>
            <CardTitle>Ficha de Anamnese</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" placeholder="Seu nome" {...form.register("nome")} />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="voce@email.com" {...form.register("email")} />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" {...form.register("telefone")} />
                </div>
                <div>
                  <Label htmlFor="idade">Idade</Label>
                  <Input id="idade" type="number" min={0} {...form.register("idade")} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" placeholder="Rua, número - bairro" {...form.register("endereco")} />
                </div>
              </div>

              <Separator />

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <Label>Como conheceu?</Label>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      { id: "instagram", label: "Instagram" },
                      { id: "google", label: "Google" },
                      { id: "indicacao", label: "Indicação" },
                      { id: "outro", label: "Outro" },
                    ].map((opt) => (
                      <label key={opt.id} className="cursor-pointer">
                        <input
                          type="radio"
                          className="sr-only peer"
                          value={opt.id}
                          {...form.register("comoConheceu")}
                        />
                        <div className="px-3 py-2 rounded-md border glass-subtle text-sm text-center transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-accent/50">
                          {opt.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Tipo de cacho</Label>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {["2A","2B","2C","3A","3B","3C","4A","4B","4C"].map((t) => (
                      <label key={t} className="cursor-pointer">
                        <input type="radio" className="sr-only peer" value={t} {...form.register("cabeloTipo")} />
                        <div className="px-3 py-2 rounded-md border glass-subtle text-sm text-center transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-accent/50">
                          {t}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <Label>Couro cabeludo</Label>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[{id:"normal",l:"Normal"},{id:"seco",l:"Seco"},{id:"oleoso",l:"Oleoso"},{id:"misto",l:"Misto"}].map(o => (
                      <label key={o.id} className="cursor-pointer">
                        <input type="radio" className="sr-only peer" value={o.id} {...form.register("couro")} />
                        <div className="px-3 py-2 rounded-md border glass-subtle text-sm text-center transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-accent/50">
                          {o.l}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 grid gap-6 md:grid-cols-3">
                  <div>
                    <Label>Porosidade</Label>
                    <div className="mt-3 grid grid-cols-1 gap-2">
                      {[{id:"baixa",l:"Baixa"},{id:"media",l:"Média"},{id:"alta",l:"Alta"}].map(o => (
                        <label key={o.id} className="cursor-pointer">
                          <input type="radio" className="sr-only peer" value={o.id} {...form.register("porosidade")} />
                          <div className="px-3 py-2 rounded-md border glass-subtle text-sm text-center transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-accent/50">
                            {o.l}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Elasticidade</Label>
                    <div className="mt-3 grid grid-cols-1 gap-2">
                      {[{id:"baixa",l:"Baixa"},{id:"media",l:"Média"},{id:"alta",l:"Alta"}].map(o => (
                        <label key={o.id} className="cursor-pointer">
                          <input type="radio" className="sr-only peer" value={o.id} {...form.register("elasticidade")} />
                          <div className="px-3 py-2 rounded-md border glass-subtle text-sm text-center transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-accent/50">
                            {o.l}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Densidade</Label>
                    <div className="mt-3 grid grid-cols-1 gap-2">
                      {[{id:"baixa",l:"Baixa"},{id:"media",l:"Média"},{id:"alta",l:"Alta"}].map(o => (
                        <label key={o.id} className="cursor-pointer">
                          <input type="radio" className="sr-only peer" value={o.id} {...form.register("densidade")} />
                          <div className="px-3 py-2 rounded-md border glass-subtle text-sm text-center transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-accent/50">
                            {o.l}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <Label>Procedimentos químicos (últimos 3 meses)</Label>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {id:"nenhum", l:"Nenhum"},
                      {id:"alisamento", l:"Alisamento"},
                      {id:"coloracao", l:"Coloração"},
                      {id:"soltura", l:"Soltura"},
                      {id:"relaxamento", l:"Relaxamento"},
                      {id:"mechas", l:"Mechas"},
                      {id:"outros", l:"Outros"},
                    ].map(o => (
                      <label key={o.id} className="flex items-center gap-3 p-3 rounded-md border glass-subtle cursor-pointer hover:bg-accent/30 transition-colors">
                        <Checkbox
                          checked={form.watch("quimica")?.includes(o.id as any) || false}
                          onCheckedChange={(checked) => {
                            const arr = new Set(form.getValues("quimica") || []);
                            checked ? arr.add(o.id as any) : arr.delete(o.id as any);
                            form.setValue("quimica", Array.from(arr));
                          }}
                        />
                        <span className="text-sm">{o.l}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="p-4 rounded-md border glass-subtle">
                    <Label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={form.watch("alergia") || false}
                        onCheckedChange={(v) => form.setValue("alergia", Boolean(v))}
                      /> 
                      <span>Possui alguma alergia?</span>
                    </Label>
                    {form.watch("alergia") && (
                      <Input className="mt-3" placeholder="Descreva suas alergias..." {...form.register("alergiaDescricao")} />
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <Label>Quais produtos costuma usar em casa?</Label>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {id:"basico", l:"Shampoo e condicionador"},
                      {id:"mascara", l:"Máscara"},
                      {id:"creme", l:"Creme de pentear"},
                      {id:"finalizadores", l:"Gelatina e mousse"},
                    ].map(o => (
                      <label key={o.id} className="flex items-center gap-3 p-3 rounded-md border glass-subtle cursor-pointer hover:bg-accent/30 transition-colors">
                        <Checkbox
                          checked={form.watch("produtosCasa")?.includes(o.id as any) || false}
                          onCheckedChange={(checked) => {
                            const arr = new Set(form.getValues("produtosCasa") || []);
                            checked ? arr.add(o.id as any) : arr.delete(o.id as any);
                            form.setValue("produtosCasa", Array.from(arr));
                          }}
                        />
                        <span className="text-sm">{o.l}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <Label htmlFor="queixas">Principais queixas</Label>
                  <Textarea 
                    id="queixas"
                    className="mt-3 min-h-24"
                    placeholder="Conte-nos suas principais queixas para personalizarmos seu atendimento..." 
                    {...form.register("queixas")} 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <Button type="submit" size="lg" className="flex-1 sm:flex-initial">Salvar ficha</Button>
                <Button type="button" variant="secondary" size="lg" className="flex-1 sm:flex-initial" onClick={() => {
                  localStorage.removeItem("gg_form");
                  form.reset();
                  toast({ title: "Ficha limpa", description: "Você pode preencher novamente.", duration: 2500 });
                }}>Limpar dados</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Histórico de serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {history.map((h) => (
                <li key={h.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{h.servico}</p>
                    <p className="text-xs text-foreground/70">{new Date(h.data).toLocaleDateString()} • R$ {h.valor.toFixed(2)}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">+{h.pontos} pts</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  const novo: HistoryItem = {
                    id: String(Date.now()),
                    data: new Date().toISOString(),
                    servico: "Reconstrução",
                    valor: 150,
                    pontos: servicePoints["Reconstrução"],
                  };
                  setHistory((prev) => [novo, ...prev]);
                  toast({ title: "Serviço adicionado", description: "+" + novo.pontos + " pontos.", duration: 2500 });
                }}
              >
                Adicionar exemplo
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  localStorage.removeItem("gg_history");
                  setHistory(defaultHistory);
                  toast({ title: "Histórico restaurado", duration: 2000 });
                }}
              >
                Restaurar padrão
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Usuario;