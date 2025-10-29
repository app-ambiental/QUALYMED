import React, { useEffect, useRef, useState } from 'react';
import type { Feature } from '../types';
import { ShieldCheckIcon, HandshakeIcon, LightBulbIcon } from './icons/Icons';

const featuresData: Feature[] = [
  {
    icon: <ShieldCheckIcon />,
    title: 'Qualidade & Compromisso',
    description: 'A mais alta qualidade em nossos serviços, com total compromisso com os resultados da sua empresa.',
  },
  {
    icon: <HandshakeIcon />,
    title: 'Ética & Confiabilidade',
    description: 'Atuamos com total ética e transparência, construindo relações de confiança e duradouras.',
  },
  {
    icon: <LightBulbIcon />,
    title: 'Respeito & Evolução',
    description: 'Respeitamos clientes e colaboradores, buscando evoluir constantemente em tecnologia e processos.',
  },
];

const WhyChooseUs: React.FC = () => {
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
      { threshold: 0.2 }
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
    <section id="why-us" ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className={`lg:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
                <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2070&auto=format&fit=crop" alt="Profissional de saúde analisando dados em um tablet, simbolizando a modernidade e a gestão de saúde ocupacional." className="rounded-xl shadow-2xl w-full h-auto object-cover"/>
            </div>
            <div className={`lg:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`} style={{ transitionDelay: '200ms' }}>
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Nossa Missão é o seu sucesso</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Ajudamos a tornar os negócios mais sustentáveis, prósperos e seguros. Garantimos a perenidade das empresas através da gestão preventiva dos riscos ocupacionais, com credibilidade e confiança.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {featuresData.map((feature, index) => (
                        <div key={feature.title} className={`flex items-start space-x-4 transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${400 + index * 150}ms` }}>
                            <div className="flex-shrink-0 bg-cyan-100 text-cyan-700 rounded-full p-3 mt-1">
                                {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;