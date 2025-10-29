import React, { useEffect, useRef } from 'react';
import { MapPinIcon, PhoneIcon, BriefcaseIcon } from './icons/Icons';


// Declara a variável global 'L' do Leaflet para o TypeScript
declare var L: any;

const ContactMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null); // Para guardar a instância do mapa

  useEffect(() => {
    // Garante que o código só rode no cliente, uma vez, e que o container do mapa exista
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Coordenadas para Rio Bonito
      const position: [number, number] = [-22.7135, -42.6175];
      
      // Inicializa o mapa
      const map = L.map(mapContainerRef.current).setView(position, 16);
      mapInstanceRef.current = map; // Armazena a instância para evitar reinicialização

      // Adiciona a camada de tiles do OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Adiciona um marcador na localização
      L.marker(position).addTo(map)
        .bindPopup('<b>Qualymed Rio Bonito</b><br>Dr Mattos, 44 – 4º Andar – Centro.')
        .openPopup();
    }
    
    // Função de limpeza para quando o componente for desmontado
    return () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
    };
  }, []); // O array vazio garante que o efeito rode apenas uma vez

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800">Onde Estamos</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Visite nossa unidade em Rio Bonito ou entre em contato pelos nossos canais de atendimento.</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-gray-50 p-8 rounded-xl shadow-lg">
            {/* Informações de Contato */}
            <div className="lg:w-1/3 w-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Unidade Rio Bonito</h3>
                <address className="space-y-5 text-gray-700 not-italic">
                    <div className="flex items-start">
                        <MapPinIcon className="mt-1 mr-4 text-cyan-600 w-6 h-6 flex-shrink-0"/>
                        <div>
                            <span>Dr Mattos, 44 – 4º Andar – Centro, Rio Bonito / RJ</span><br/>
                            <small className="text-gray-500">Ao lado da Rodoviária da Cidade.</small>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <PhoneIcon className="mt-1 mr-4 text-cyan-600 w-6 h-6 flex-shrink-0"/>
                        <div>
                            <strong>Agendamentos e Contatos:</strong><br/>
                            <a href="https://wa.me/5521997567806" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-700">(21) 99756-7806</a>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <BriefcaseIcon className="mt-1 mr-4 text-cyan-600 w-6 h-6 flex-shrink-0"/>
                         <div>
                            <strong>Comercial Exclusivo:</strong><br/>
                            <a href="https://wa.me/5521995607848" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-700">(21) 99560-7848</a>
                         </div>
                    </div>
                </address>
            </div>
            
            {/* Mapa */}
            <div className="lg:w-2/3 w-full h-96 min-h-[300px] rounded-lg shadow-md overflow-hidden z-10" ref={mapContainerRef}>
                {/* O mapa será renderizado aqui pelo Leaflet */}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;