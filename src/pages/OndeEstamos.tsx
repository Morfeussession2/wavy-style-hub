import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";

const locations = [
  {
    id: 1,
    name: "Unidade Centro",
    address: "Rua das Flores, 123 - Centro",
    city: "São Paulo - SP",
    phone: "(11) 99999-9999",
    email: "centro@gabgomes.com.br",
    hours: "Segunda à Sexta: 8h às 18h | Sábado: 8h às 16h",
    coordinates: { lat: -23.5505, lng: -46.6333 }
  },
  {
    id: 2,
    name: "Unidade Shopping",
    address: "Av. Paulista, 1000 - Bela Vista",
    city: "São Paulo - SP", 
    phone: "(11) 88888-8888",
    email: "shopping@gabgomes.com.br",
    hours: "Segunda à Sábado: 10h às 22h | Domingo: 12h às 18h",
    coordinates: { lat: -23.5616, lng: -46.6563 }
  },
  {
    id: 3,
    name: "Unidade Zona Sul",
    address: "Rua Augusta, 2500 - Jardins",
    city: "São Paulo - SP",
    phone: "(11) 77777-7777", 
    email: "zonasul@gabgomes.com.br",
    hours: "Segunda à Sexta: 9h às 19h | Sábado: 8h às 17h",
    coordinates: { lat: -23.5557, lng: -46.6612 }
  }
];

const OndeEstamos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Onde Estamos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre a unidade mais próxima de você e venha viver uma experiência única de cuidado capilar
          </p>
        </div>

        {/* Mapa */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Nossas Unidades</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <GoogleMap locations={locations} />
            </CardContent>
          </Card>
        </div>

        {/* Lista de Unidades */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {locations.map((location) => (
            <Card key={location.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {location.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm">{location.address}</p>
                    <p className="text-sm text-muted-foreground">{location.city}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a 
                    href={`tel:${location.phone.replace(/\D/g, '')}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a 
                    href={`mailto:${location.email}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {location.email}
                  </a>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground mt-1" />
                  <p className="text-sm">{location.hours}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 text-center">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Como Chegar</h3>
              <p className="text-muted-foreground mb-4">
                Todas as nossas unidades estão localizadas em pontos de fácil acesso, próximas ao transporte público e com estacionamento disponível.
              </p>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div>
                  <h4 className="font-medium mb-2">🚇 Transporte Público</h4>
                  <p className="text-muted-foreground">Próximo a estações de metrô e pontos de ônibus</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🚗 Estacionamento</h4>
                  <p className="text-muted-foreground">Vagas disponíveis em todas as unidades</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">♿ Acessibilidade</h4>
                  <p className="text-muted-foreground">Ambientes totalmente acessíveis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OndeEstamos;