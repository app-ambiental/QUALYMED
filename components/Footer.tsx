

import React from 'react';
import { InstagramIcon, FacebookIcon } from './icons/Icons';

interface FooterProps {
  onOpenPolicy: () => void;
}

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

const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Qualymed Soluções em Segurança e Saúde Ocupacional</h3>
            <p className="text-gray-400">Gestão preventiva dos riscos ocupacionais para garantir a perenidade do seu negócio.</p>
             <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/qualymed.medicinadotrabalho?igsh=emZqanFnZzUzd3Jm&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/share/1A1GZtag7K/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FacebookIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="text-gray-400 hover:text-white">Serviços</a></li>
              <li><a href="#why-us" onClick={(e) => handleSmoothScroll(e, '#why-us')} className="text-gray-400 hover:text-white">Sobre Nós</a></li>
              <li><a href="#testimonials" onClick={(e) => handleSmoothScroll(e, '#testimonials')} className="text-gray-400 hover:text-white">Depoimentos</a></li>
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="text-gray-400 hover:text-white">Contato</a></li>
            </ul>
          </div>

        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Qualymed. Todos os direitos reservados.</p>
          <button onClick={onOpenPolicy} className="text-sm text-gray-400 hover:text-white underline mt-2">
            Política de Privacidade
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
