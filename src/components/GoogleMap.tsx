import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Declaração de tipos do Google Maps para TypeScript
declare global {
  interface Window {
    google: typeof google;
  }
}

interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
}

interface GoogleMapProps {
  locations: Location[];
}

const GoogleMap = ({ locations }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState(true);
  const [error, setError] = useState<string>('');

  const initializeMap = async (key: string) => {
    try {
      const loader = new Loader({
        apiKey: key,
        version: 'weekly',
        libraries: ['places']
      });

      await loader.load();

      if (!mapRef.current) return;

      // Criar o mapa centrado em São Paulo
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: -23.5505, lng: -46.6333 },
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Adicionar marcadores para cada localização
      const bounds = new google.maps.LatLngBounds();
      
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location.coordinates,
          map: mapInstance,
          title: location.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#6FA6FF',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1d1d1d; font-size: 16px; font-weight: bold;">${location.name}</h3>
              <p style="margin: 0 0 4px 0; color: #666; font-size: 14px;">${location.address}</p>
              <p style="margin: 0; color: #666; font-size: 14px;">${location.city}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
        });

        bounds.extend(location.coordinates);
      });

      // Ajustar o zoom para mostrar todos os marcadores
      mapInstance.fitBounds(bounds);
      setMap(mapInstance);
      setShowKeyInput(false);
      setError('');
    } catch (err) {
      setError('Erro ao carregar o mapa. Verifique se a API key está correta.');
      console.error('Erro ao inicializar o mapa:', err);
    }
  };

  const handleSubmitKey = () => {
    if (!apiKey.trim()) {
      setError('Por favor, insira uma API key válida.');
      return;
    }
    initializeMap(apiKey);
  };

  if (showKeyInput) {
    return (
      <div className="p-6 text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Configure o Google Maps</h3>
          <p className="text-sm text-muted-foreground">
            Para visualizar o mapa, insira sua API key do Google Maps.
          </p>
          <p className="text-xs text-muted-foreground">
            Obtenha sua chave em:{' '}
            <a 
              href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
        </div>
        
        <div className="max-w-md mx-auto space-y-2">
          <Input
            type="password"
            placeholder="Insira sua Google Maps API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitKey()}
          />
          <Button onClick={handleSubmitKey} className="w-full">
            Carregar Mapa
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Nota:</strong> Este projeto tem Supabase conectado.</p>
          <p>Recomendamos adicionar a API key nas Edge Function Secrets do Supabase para maior segurança.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg"
        style={{ minHeight: '400px' }}
      />
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default GoogleMap;