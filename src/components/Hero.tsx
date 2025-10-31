
import React, { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop', // Engenheiros de segurança com tablet em ambiente industrial
  'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=2070&auto=format&fit=crop', // Equipe de profissionais analisando dados de saúde em uma reunião
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop', // Equipe em reunião de consultoria ou treinamento
];

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
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(150 - Math.random() * 50);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toRotate = ["Engenharia de Segurança", "Medicina do Trabalho", "Gestão eSocial SST", "Treinamentos e NRs"];
  const period = 2000;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta]);
  
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Muda a imagem a cada 5 segundos

    return () => clearInterval(slideInterval);
  }, []);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150 - Math.random() * 50);
    }
  };


  return (
    <section id="home" className="relative bg-gray-800 text-white h-[90vh] min-h-[600px] overflow-hidden">
        {/* Imagens do Slider */}
        {images.map((src, index) => (
            <div
                key={src}
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url('${src}')` }}
            />
        ))}

        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center relative z-10 text-center">
            <div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8 animate-fade-in-down h-28 md:h-40 flex flex-col justify-center items-center">
                    <span>Soluções completas em</span>
                    <span className="text-cyan-400 whitespace-nowrap border-r-4 border-cyan-400 animate-blink pr-1 min-h-[1.2em]">{text}</span>
                    <span>para o seu negócio.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in-up">
                    Somos uma empresa inovadora, com profissionais especializados em Medicina e Segurança do Trabalho, prontos para atender de forma individualizada a sua empresa.
                </p>
                <div className="flex justify-center space-x-4 animate-fade-in-up">
                    <a href="https://wa.me/5521995607848" target="_blank" rel="noopener noreferrer" className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base md:text-lg">
                        Solicitar Proposta
                    </a>
                    <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base md:text-lg">
                        Nossos Serviços
                    </a>
                </div>
            </div>
            {/* Pontos de Navegação */}
            <div className="absolute bottom-8 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Ir para o slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    </section>
  );
};

export default Hero;