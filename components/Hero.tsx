
import React from 'react';

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gray-800 text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-6 py-32 md:py-48 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
                Soluções completas para a <span className="text-cyan-400">segurança e saúde</span> do seu negócio.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in-up">
                Somos uma empresa inovadora, com profissionais especializados em Medicina e Segurança do Trabalho, prontos para atender de forma individualizada a sua empresa.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in-up">
                <a href="https://wa.me/5521995607848" target="_blank" rel="noopener noreferrer" className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                    Solicitar Proposta
                </a>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                    Nossos Serviços
                </a>
            </div>
        </div>
    </section>
  );
};

export default Hero;