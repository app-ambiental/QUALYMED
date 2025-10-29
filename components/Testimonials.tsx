import React, { useEffect, useRef, useState } from 'react';
import type { Testimonial } from '../types';

const testimonialsData: Testimonial[] = [
  {
    quote: 'A Qualymed transformou nossa gestão de SST. A equipe é proativa e extremamente competente. Recomendo fortemente.',
    name: 'Ana Costa',
    role: 'Gerente de RH, Indústria Metalúrgica',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
  {
    quote: 'Desde que contratamos a Qualymed, nossos processos de segurança estão mais eficientes e alinhados com a legislação.',
    name: 'Marcos Lima',
    role: 'Diretor, Empresa de Logística',
    avatar: 'https://picsum.photos/100/100?random=3',
  },
  {
    quote: 'O acompanhamento e os treinamentos foram essenciais para reduzir acidentes e aumentar a conscientização da nossa equipe.',
    name: 'Beatriz Souza',
    role: 'Coordenadora de Segurança, Construtora',
    avatar: 'https://picsum.photos/100/100?random=4',
  },
];

const TestimonialCard: React.FC<Testimonial> = ({ quote, name, role, avatar }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center h-full">
        <img src={avatar} alt={name} className="w-20 h-20 rounded-full mb-4 border-4 border-cyan-200" />
        <p className="text-gray-600 italic mb-6 flex-grow">"{quote}"</p>
        <div>
            <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
            <p className="text-cyan-600 font-medium">{role}</p>
        </div>
    </div>
)

const Testimonials: React.FC = () => {
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
    <section id="testimonials" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">A Confiança de Nossos Clientes</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">O sucesso dos nossos parceiros é o nosso maior indicador de qualidade e compromisso.</p>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
                <div key={testimonial.name} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <TestimonialCard {...testimonial} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;