import React, { useEffect, useRef, useState } from 'react';
import type { Service } from '../types';
import { EngineeringSafetyIcon, OccupationalHealthIcon, DocumentCheckIcon, PresentationChartBarIcon } from './icons/Icons';


const servicesData: Service[] = [
  {
    icon: <EngineeringSafetyIcon />,
    title: 'Engenharia de Segurança',
    description: 'PGR, LTCAT, Laudos de Insalubridade/Periculosidade, AET, Mapas de Risco e mais.',
  },
  {
    icon: <OccupationalHealthIcon />,
    title: 'Medicina do Trabalho',
    description: 'PCMSO, Exames Ocupacionais (ASO), Complementares, Avaliações Clínicas e gestão de saúde.',
  },
  {
    icon: <DocumentCheckIcon />,
    title: 'Gestão eSocial SST',
    description: 'Gerenciamento dos envios S-2210, S-2220 e S-2240, garantindo conformidade legal.',
  },
    {
    icon: <PresentationChartBarIcon />,
    title: 'Treinamentos e NRs',
    description: 'Capacitação de equipes com treinamentos para NRs 01, 05, 06, 11, 12, 33, 35 e mais.',
  },
];

const ServiceCard: React.FC<Service> = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-transform duration-300 ease-in-out h-full text-center">
        <div className="inline-block text-cyan-600 mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">Nossos Serviços</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Conteúdo técnico e humano para satisfazer os aspectos legais e promover um novo perfil de saúde global e atenção social na sua empresa.</p>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service, index) => (
                <div 
                  key={service.title} 
                  className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                    <ServiceCard {...service} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;