
import React from 'react';

const CtaSection: React.FC = () => {
    return (
        <section id="cta" className="bg-cyan-800">
            <div className="container mx-auto px-6 py-16 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pronto para elevar a segurança da sua empresa?</h2>
                <p className="text-lg text-cyan-100 max-w-2xl mx-auto mb-8">
                    Nossa equipe de especialistas está pronta para desenvolver a solução ideal para o seu negócio. Entre em contato e solicite uma proposta.
                </p>
                <a href="https://wa.me/5521995607848" target="_blank" rel="noopener noreferrer" className="bg-white text-cyan-800 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                    Solicitar Proposta
                </a>
            </div>
        </section>
    );
};

export default CtaSection;