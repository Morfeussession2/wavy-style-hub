import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PHONE = "5599999999999"; // Atualize com seu número

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const services = [
  { id: "corte", label: "Corte & Finalização" },
  { id: "hidratacao", label: "Hidratação Potente" },
  { id: "coloracao", label: "Coloração Cuidadosa" },
  { id: "tratamento", label: "Tratamento Antifrizz" },
];

const professionals = [
  { id: "gab", name: "Gab Gomes", specialty: "Especialista em coloração e cortes" },
  { id: "ana", name: "Ana Silva", specialty: "Expert em tratamentos capilares" },
  { id: "carlos", name: "Carlos Santos", specialty: "Mestre em cortes masculinos" },
  { id: "mariana", name: "Mariana Costa", specialty: "Specialist em cabelos cacheados" },
];

const Agendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slot, setSlot] = useState<string | undefined>();
  const [service, setService] = useState<string>(services[0].id);
  const [professional, setProfessional] = useState<string>("none");

  const openWhatsApp = () => {
    if (!date || !slot) return;
    const s = services.find((x) => x.id === service)?.label;
    const p = professional && professional !== "none" 
      ? professionals.find((x) => x.id === professional)?.name 
      : "Sem preferência";
    const d = date.toLocaleDateString("pt-BR");
    const message = `Olá! Quero agendar: ${s} em ${d} às ${slot}. Profissional: ${p}.`;
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto py-12 flex-1">
        <h1 className="text-3xl font-bold mb-8">Agende seu horário</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Escolha a data</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Detalhes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Serviço</label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Profissional (opcional)</label>
                  <Select value={professional} onValueChange={setProfessional}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um profissional" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border">
                      <SelectItem value="none">Sem preferência</SelectItem>
                      {professionals.map((prof) => (
                        <SelectItem key={prof.id} value={prof.id}>
                          <div>
                            <div className="font-medium">{prof.name}</div>
                            <div className="text-xs text-muted-foreground">{prof.specialty}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Horário</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSlot(t)}
                        className={`px-3 py-2 rounded-md border text-sm transition-colors ${
                          slot === t ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={openWhatsApp} disabled={!date || !slot}>Confirmar no WhatsApp</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Agendamento personalizado pelo WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 mb-4">
                Prefere explicar seu cabelo, rotina e objetivo? Fale com a gente e montamos juntos a melhor opção.
              </p>
              <Button asChild variant="secondary">
                <a href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Quero um agendamento personalizado.")}`} target="_blank" rel="noreferrer">
                  Conversar no WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Agendar;