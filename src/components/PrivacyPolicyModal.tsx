
import React, { useEffect } from 'react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const privacyPolicyText = {
    title: "Política de Privacidade",
    lastUpdated: "24 de Julho de 2024",
    sections: [
        {
            title: "1. Coleta de Informações",
            content: "Coletamos informações pessoais que você nos fornece voluntariamente ao entrar em contato conosco, como nome, e-mail e telefone. Também podemos coletar dados de navegação através de cookies para melhorar sua experiência em nosso site."
        },
        {
            title: "2. Uso das Informações",
            content: "As informações coletadas são utilizadas para responder às suas solicitações, fornecer nossos serviços, melhorar nosso site e comunicar novidades e promoções. Não compartilhamos suas informações com terceiros sem o seu consentimento, exceto quando exigido por lei."
        },
        {
            title: "3. Cookies",
            content: "Nosso site utiliza cookies para personalizar o conteúdo e analisar nosso tráfego. Você pode optar por aceitar ou recusar os cookies. A recusa pode impedir que você aproveite todas as funcionalidades do site."
        },
        {
            title: "4. Segurança das Informações",
            content: "Adotamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração ou destruição. No entanto, nenhum método de transmissão pela internet é 100% seguro."
        },
        {
            title: "5. Seus Direitos",
            content: "Você tem o direito de solicitar acesso, correção ou exclusão de suas informações pessoais. Para exercer esses direitos, entre em contato conosco pelos canais fornecidos neste site."
        }
    ]
};

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{privacyPolicyText.title}</h2>
        <p className="text-sm text-gray-500 mb-6">Última atualização: {privacyPolicyText.lastUpdated}</p>
        
        <div className="space-y-4 text-gray-600">
            {privacyPolicyText.sections.map(section => (
                <div key={section.title}>
                    <h3 className="font-semibold text-gray-700">{section.title}</h3>
                    <p>{section.content}</p>
                </div>
            ))}
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-700 transition-colors duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;