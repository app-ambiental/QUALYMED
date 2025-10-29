import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { ChatBubbleIcon, CloseIcon, SendIcon, WhatsappIcon } from './icons/Icons';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const knowledgeBase: { keywords: string[]; response: string }[] = [
    // === SAUDAÇÕES E INTERAÇÕES GERAIS ===
    {
        keywords: ['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'e aí', 'tudo bem'],
        response: 'Olá! 👋 Sou o assistente virtual da Qualymed. Como posso ajudar você hoje?',
    },
    {
        keywords: ['obrigado', 'valeu', 'tchau', 'até mais', 'grato', 'vlw'],
        response: 'De nada! Se precisar de mais alguma coisa, estarei por aqui. A **Qualymed** agradece seu contato! 😊',
    },
    {
        keywords: ['ajuda', 'preciso de ajuda', 'socorro', 'help'],
        response: 'Estou aqui para ajudar! Pode me dizer qual é a sua dúvida sobre nossos serviços de **Saúde e Segurança do Trabalho**?'
    },
    {
        keywords: ['como você está', 'tudo certo'],
        response: 'Estou ótimo, pronto para ajudar! Em que posso ser útil?'
    },

    // === INFORMAÇÕES GERAIS SOBRE A QUALYMED ===
    {
        keywords: ['quem são', 'sobre a qualymed', 'o que é a qualymed', 'fale sobre a empresa'],
        response: 'Somos a **Qualymed**, uma empresa inovadora com profissionais especializados em Saúde e Segurança do Trabalho. Nossa equipe tem grande experiência e está preparada para atender sua empresa de forma individualizada, com foco na gestão preventiva de riscos.',
    },
     {
        keywords: ['missão', 'propósito', 'qual a missão'],
        response: 'Nossa missão é ajudar os negócios a se tornarem mais sustentáveis, prósperos e seguros, garantindo a perenidade das empresas através da **gestão preventiva dos riscos ocupacionais**. Buscamos ser referência com credibilidade e confiança.',
    },
    {
        keywords: ['visão', 'futuro da empresa', 'qual a visão'],
        response: 'Nossa visão é **evoluir constantemente em tecnologia** e nos processos de gestão para nos mantermos como referência no mercado de Medicina e Engenharia de Segurança do Trabalho.',
    },
    {
        keywords: ['valores', 'princípios'],
        response: 'Nossos valores fundamentais são: **Qualidade**, **Ética**, **Compromisso**, **Confiabilidade** e **Respeito**.',
    },
    {
        keywords: ['serviços', 'fazem', 'oferecem', 'trabalham', 'atuação'],
        response: 'Oferecemos soluções completas com conteúdo técnico e humano, visando não apenas os aspectos legais, mas a saúde global dos colaboradores. Nossos principais serviços são **Engenharia de Segurança**, **Medicina do Trabalho**, **Gestão eSocial SST** e **Treinamentos de NRs**. Sobre qual deles você gostaria de saber mais?',
    },
    {
        keywords: ['diferencial', 'por que escolher', 'vantagem'],
        response: 'Nosso maior diferencial é a **parceria**. Não apenas entregamos documentos, nós oferecemos uma gestão completa e consultiva, usando **tecnologia** e **atendimento personalizado** para garantir o sucesso do seu negócio.',
    },
    {
        keywords: ['endereço', 'localização', 'onde ficam', 'unidade', 'ir até aí'],
        response: 'Nossa unidade fica em **Rio Bonito / RJ**, na rua Dr Mattos, 44 – 4º Andar – Centro, bem ao lado da rodoviária da cidade. Será um prazer receber sua visita!',
    },
    {
        keywords: ['horário', 'funcionamento', 'abertos', 'que horas abre'],
        response: 'Nosso horário de atendimento é de **segunda a sexta-feira, das 8h às 18h**.',
    },
    {
        keywords: ['contato', 'telefone', 'falar com', 'zap', 'whatsapp', 'número'],
        response: 'Para agendamentos, o número é (21) 99756-7806. Para assuntos comerciais, o melhor caminho é pelo nosso WhatsApp. É só clicar no botão. [BOTÃO_WHATSAPP]',
    },

    // === DÚVIDAS INICIAIS (LEIGAS) ===
    {
        keywords: ['documento de segurança', 'papelada da empresa', 'documentação obrigatória', 'o que minha empresa precisa'],
        response: 'Entendo perfeitamente! Toda empresa precisa de alguns documentos básicos de SST. Os principais são o **PGR** (Programa de Gerenciamento de Riscos) e o **PCMSO** (Programa de Controle Médico de Saúde Ocupacional). Nós cuidamos de tudo isso para você!',
    },
    {
        keywords: ['exame de funcionário', 'tenho que fazer exame nos funcionários', 'exame para contratar'],
        response: 'Sim, é obrigatório! O **exame admissional** é fundamental antes de contratar. Além dele, existem os **periódicos**, **demissionais**, entre outros. Todos eles são gerenciados pelo **PCMSO**, um programa que nós elaboramos para sua empresa.',
    },
    {
        keywords: ['papel para o inss', 'documento de aposentadoria', 'laudo para se aposentar'],
        response: 'Você provavelmente está falando do **LTCAT** ou do **PPP**. O **LTCAT** é o laudo que avalia as condições do ambiente de trabalho, e o **PPP** é o Perfil Profissiográfico Previdenciário do funcionário. Nós elaboramos o LTCAT, que é a base para tudo!',
    },
    {
        keywords: ['curso de segurança', 'treinamento obrigatório', 'dar curso para funcionário'],
        response: 'Sim, muitos treinamentos são obrigatórios! Eles são baseados nas **Normas Regulamentadoras (NRs)**. Oferecemos vários, como o de **trabalho em altura (NR-35)**, **uso de EPIs (NR-06)** e muitos outros. Qual você precisa?',
    },
    {
        keywords: ['evitar multa', 'fiscalização do trabalho', 'deixar a empresa em dia'],
        response: 'Ótima preocupação! Para evitar multas e ficar em dia, sua empresa precisa ter a gestão de SST completa: **PGR**, **PCMSO**, **LTCAT**, **envios para o eSocial** e **treinamentos**. Nós somos especialistas em deixar tudo 100% regularizado para você. Quer começar? [BOTÃO_WHATSAPP]',
    },

    // === ENGENHARIA DE SEGURANÇA ===
    {
        keywords: ['engenharia', 'segurança'],
        response: 'Claro! Em **Engenharia de Segurança**, nosso foco é identificar, avaliar e controlar os riscos no ambiente de trabalho. Elaboramos documentos essenciais como o **PGR**, **LTCAT**, Laudos, AET e muito mais. O que você precisa?',
    },
    {
        keywords: ['pgr', 'programa de gerenciamento de riscos'],
        response: 'O **PGR (Programa de Gerenciamento de Riscos)** é o documento principal de segurança (NR-01). Ele inclui o Inventário de Riscos e o Plano de Ação. Nós também realizamos o acompanhamento do cronograma de ações para garantir que tudo seja implementado.',
    },
    {
        keywords: ['ltcat', 'laudo técnico das condições do ambiente de trabalho'],
        response: 'O **LTCAT** é um laudo conclusivo sobre a exposição do trabalhador a agentes nocivos, fundamental para fins de **aposentadoria especial** junto ao INSS. Ele serve de base para o preenchimento do PPP.',
    },
    {
        keywords: ['insalubridade', 'laudo de insalubridade'],
        response: 'O **Laudo de Insalubridade** (baseado na NR-15) avalia se o ambiente de trabalho expõe os funcionários a agentes nocivos acima dos limites de tolerância, o que pode gerar o direito ao **adicional de insalubridade**.',
    },
    {
        keywords: ['periculosidade', 'laudo de periculosidade'],
        response: 'O **Laudo de Periculosidade** (baseado na NR-16) identifica atividades ou operações perigosas, como trabalho com explosivos, inflamáveis ou eletricidade, que garantem o **adicional de periculosidade** ao trabalhador.',
    },
    {
        keywords: ['aet', 'análise ergonômica', 'ergonomia', 'nr-17', 'laudo ergonômico'],
        response: 'A **AET (Análise Ergonômica do Trabalho)**, exigida pela NR-17, avalia a adaptação das condições de trabalho às características psicofisiológicas dos trabalhadores, visando conforto, segurança e desempenho eficiente.',
    },
    {
        keywords: ['higiene ocupacional', 'avaliações ambientais', 'dosimetria', 'vibração', 'químicas', 'ibutg', 'luximetria'],
        response: 'Sim, realizamos o gerenciamento completo da **Higiene Ocupacional**, que inclui avaliações ambientais quantitativas como Dosimetria de ruído, Avaliações Químicas, Vibração, medição de calor (IBUTG), Luximetria e outras.',
    },
    {
        keywords: ['pca', 'programa de proteção auditiva'],
        response: 'O **PCA (Programa de Conservação Auditiva)** é um conjunto de ações para prevenir perdas auditivas em trabalhadores expostos a ruído. Ele está integrado ao PCMSO e inclui desde exames de audiometria até ações de conscientização.',
    },
    {
        keywords: ['ppr', 'programa de proteção respiratória'],
        response: 'O **PPR (Programa de Proteção Respiratória)** é fundamental para empresas com exposição a riscos respiratórios (poeiras, gases, etc.). Ele estabelece procedimentos para a seleção, uso e manutenção de respiradores adequados.',
    },
     {
        keywords: ['apr', 'análise preliminar de risco'],
        response: 'A **APR (Análise Preliminar de Risco)** é uma ferramenta que utilizamos para identificar e mitigar riscos em tarefas específicas antes que elas comecem. É essencial para atividades não rotineiras.'
    },
    {
        keywords: ['dds', 'diálogo diário de segurança'],
        response: 'Sim, auxiliamos no desenvolvimento e acompanhamento do **DDS (Diálogo Diário de Segurança)**, uma ferramenta importante para reforçar a cultura de segurança no dia a dia da empresa.',
    },
    {
        keywords: ['mapa de riscos', 'mapa de risco'],
        response: 'Elaboramos e auxiliamos na divulgação do **Mapa de Riscos** por setor, uma representação gráfica que ajuda a identificar os riscos existentes nos locais de trabalho, conforme a NR-05.',
    },
    {
        keywords: ['sipat', 'semana interna de prevenção'],
        response: 'Oferecemos suporte completo na elaboração e acompanhamento da **SIPAT (Semana Interna de Prevenção de Acidentes do Trabalho)**, promovendo a conscientização sobre segurança e saúde.',
    },
    {
        keywords: ['epi', 'equipamento de proteção', 'ficha de epi'],
        response: 'Sim, fornecemos orientação legal completa sobre a entrega de EPIs (Equipamentos de Proteção Individual), incluindo o controle e o registro em fichas, conforme a NR-06.'
    },
    {
        keywords: ['inspeção', 'visita técnica', 'relatório de segurança'],
        response: 'Realizamos inspeções periódicas (semanais, quinzenais ou mensais) na sua empresa, com envio de relatórios detalhados para acompanhar a implementação do PGR e garantir a conformidade contínua.'
    },
    {
        keywords: ['perícia', 'pericia judicial', 'acompanhamento de perícia'],
        response: 'Sim, oferecemos o acompanhamento de perícias judiciais com nossos especialistas, tanto na área Médica quanto na de Engenharia de Segurança, para dar o suporte técnico necessário à sua empresa.',
    },
    {
        keywords: ['terceirização', 'alocação de profissional', 'tst na empresa'],
        response: 'Sim, oferecemos o serviço de **terceirização de profissionais**, como Técnico de Segurança do Trabalho, Técnico de Enfermagem, Médico do Trabalho e Fonoaudiólogo, para atuar diretamente na sua empresa.',
    },
    {
        keywords: ['cipa', 'comissão interna de prevenção de acidentes', 'eleição da cipa'],
        response: 'A **CIPA** é fundamental para a prevenção de acidentes. Nós oferecemos toda a assessoria para o processo eleitoral, registro, além do treinamento obrigatório para os membros eleitos, conforme a **NR-05**.',
    },
    
    // === MEDICINA DO TRABALHO ===
    {
        keywords: ['medicina', 'saúde ocupacional', 'médico do trabalho'],
        response: 'Na área de **Medicina do Trabalho**, nosso objetivo é promover e preservar a saúde dos seus colaboradores. O principal programa que gerenciamos é o **PCMSO**. Gostaria de saber mais sobre ele?',
    },
    {
        keywords: ['pcmso', 'programa de controle médico', 'o que é pcmso'],
        response: 'O **PCMSO (Programa de Controle Médico de Saúde Ocupacional)** é um programa obrigatório (NR-07) que estabelece os **exames médicos** (admissionais, periódicos, etc.) que cada funcionário deve realizar para monitorar sua saúde.',
    },
    {
        keywords: ['aso', 'atestado', 'atestados', 'atestado de saúde ocupacional', 'exame ocupacional'],
        response: 'O **ASO (Atestado de Saúde Ocupacional)** é o documento que atesta se o funcionário está apto ou inapto para a função. Nós realizamos a emissão dos ASOs para todos os tipos de exames (admissionais, periódicos, etc.) e oferecemos a comodidade de realizá-los **in loco (na sua empresa)** ou em nossas unidades.',
    },
    {
        keywords: ['exame admissional', 'exame para contratar'],
        response: 'O **exame admissional** deve ser realizado **antes** que o trabalhador assuma suas atividades. Ele é essencial para garantir que o novo colaborador está apto para a função.',
    },
    {
        keywords: ['exame demissional', 'exame para sair da empresa'],
        response: 'O **exame demissional** é obrigatório e deve ser realizado em até **10 dias** contados a partir do término do contrato de trabalho, para avaliar as condições de saúde do colaborador no desligamento.',
    },
    {
        keywords: ['exame periódico', 'exame anual'],
        response: 'O **exame periódico** é realizado em intervalos definidos pelo **PCMSO** (geralmente anual ou bienal), para monitorar a saúde do trabalhador ao longo do tempo.',
    },
    {
        keywords: ['mudança de risco', 'mudança de função', 'exame de mudança'],
        response: 'Sim, existe o **exame de mudança de risco ocupacional**. Ele é obrigatório sempre que um funcionário for transferido para uma função com exposição a riscos diferentes.',
    },
    {
        keywords: ['retorno ao trabalho', 'voltar de afastamento', 'exame de retorno'],
        response: 'O **exame de retorno ao trabalho** é necessário para todo funcionário que ficou afastado por 30 dias ou mais, por motivo de doença, acidente ou parto. Ele deve ser feito no primeiro dia da volta.',
    },
    {
        keywords: ['exames complementares', 'audiometria', 'espirometria', 'eeg', 'ecg', 'psicossocial', 'rx'],
        response: 'Sim, o PCMSO pode indicar **exames complementares** de acordo com os riscos. Realizamos uma vasta gama, como **Audiometria**, **EEG**, **ECG**, **Espirometria**, **Acuidade Visual**, **Avaliação Psicossocial**, exames laboratoriais, **Raio-X** e outros.',
    },
    {
        keywords: ['agendar exame', 'marcar aso', 'onde faz o exame'],
        response: 'Para agendamento de exames, o contato de WhatsApp é (21) 99756-7806. Nossa equipe irá te ajudar a encontrar o melhor horário!',
    },
    {
        keywords: ['in loco', 'na minha empresa', 'atendimento na empresa'],
        response: 'Sim, oferecemos a possibilidade de realizar os **Atestados de Saúde Ocupacional (ASO)** e exames clínicos diretamente na sua empresa (*in loco*), proporcionando mais comodidade e otimizando o tempo dos seus colaboradores.',
    },
    {
        keywords: ['concurso', 'exame para concurso', 'avaliação para curso'],
        response: 'Sim, realizamos **Avaliações Clínicas** e emitimos atestados para candidatos de concursos públicos e para a matrícula em cursos em geral.'
    },

    // === ESOCIAL SST ===
    {
        keywords: ['esocial', 'sst', 'social', 'e-social', 'gestão dos envios'],
        response: 'Sim, cuidamos de toda a **Gestão do eSocial SST**! Gerenciamos os envios dos eventos **S-2210** (CAT), **S-2220** (ASO), **S-2221** (Toxicológico) e **S-2240** (Agentes Nocivos) para garantir que sua empresa esteja sempre em conformidade e evite multas. Quer saber mais? [BOTÃO_WHATSAPP]',
    },
    {
        keywords: ['s-2210', 'cat', 'comunicação de acidente', 'acidente de trabalho'],
        response: 'O evento **S-2210** é a **Comunicação de Acidente de Trabalho (CAT)**. Ele deve ser enviado ao eSocial até o primeiro dia útil seguinte ao da ocorrência e, em caso de morte, de imediato.',
    },
    {
        keywords: ['s-2220', 'monitoramento da saúde', 'enviar aso pro esocial'],
        response: 'O evento **S-2220** se refere ao **Monitoramento da Saúde do Trabalhador**. Basicamente, as informações do ASO (Atestado de Saúde Ocupacional) e seus exames complementares são enviadas por meio dele.',
    },
    {
        keywords: ['s-2240', 'agentes nocivos', 'enviar pgr pro esocial', 'enviar ltcat'],
        response: 'O evento **S-2240** (Condições Ambientais do Trabalho - Agentes Nocivos) é crucial. Ele detalha a exposição dos trabalhadores a agentes nocivos, com base no LTCAT, e é fundamental para a aposentadoria especial.',
    },

    // === TREINAMENTOS E NRs ===
    {
        keywords: ['treinamentos', 'nr', 'normas regulamentadoras', 'curso', 'capacitação', 'palestras'],
        response: 'Oferecemos diversos **treinamentos, cursos e palestras**, tanto para NRs de segurança (NR-01, NR-05 CIPA, NR-06 EPI, NR-33, NR-35, etc.) quanto para temas de saúde, como primeiros socorros e ergonomia. Capacitar sua equipe é fundamental!',
    },
    {
        keywords: ['nr-33', 'espaço confinado'],
        response: 'A **NR-33** estabelece os requisitos para a gestão de segurança e saúde nos trabalhos em **espaços confinados**. Oferecemos treinamento tanto para trabalhadores autorizados quanto para vigias.',
    },
    {
        keywords: ['nr-35', 'trabalho em altura'],
        response: 'O treinamento da **NR-35** é obrigatório para qualquer trabalho executado acima de 2 metros do nível inferior, onde haja risco de queda. A segurança em altura é uma prioridade absoluta!',
    },

    // === COMERCIAL E PROCESSOS ===
    {
        keywords: ['proposta', 'orçamento', 'preço', 'cotação', 'valor', 'comercial', 'contratar', 'quanto custa', 'valores'],
        response: 'Que ótimo! Para solicitar uma proposta comercial, por favor, fale com nossa equipe de especialistas no WhatsApp. Eles estão prontos para te ajudar! [BOTÃO_WHATSAPP]',
    },
    {
        keywords: ['pequena empresa', 'mei', 'poucos funcionários', 'microempresa'],
        response: 'Com certeza! Atendemos empresas de **todos os portes**, desde MEI e pequenas empresas até grandes corporações. Nossas soluções são personalizadas para a sua necessidade.',
    },

    // === DÚVIDAS FREQUENTES ADICIONAIS ===
    {
        keywords: ['ppp', 'perfil profissiográfico previdenciário'],
        response: 'O **PPP (Perfil Profissiográfico Previdenciário)** é um documento histórico-laboral do trabalhador. Nós fornecemos as informações técnicas, com base no LTCAT, e a orientação necessária para que sua empresa possa preenchê-lo corretamente.',
    },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        role: 'model',
        text: 'Olá! Sou o assistente virtual da Qualymed. Como posso te ajudar a conhecer nossos serviços de **segurança e saúde no trabalho**?',
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const lowerCaseInput = input.toLowerCase();
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let responseText = "Desculpe, não entendi sua pergunta. Poderia reformular? Lembre-se que posso te ajudar com informações sobre nossos serviços, como **PGR**, **PCMSO**, **eSocial** e **Treinamentos**.";

      const foundResponse = knowledgeBase.find(item =>
        item.keywords.some(keyword => lowerCaseInput.includes(keyword))
      );

      if (foundResponse) {
        responseText = foundResponse.response;
      }
      
      const modelMessage: Message = { role: 'model', text: responseText };
      setMessages((prev) => [...prev, modelMessage]);
      setIsLoading(false);
    }, 800);
  };

  const renderMessageContent = (text: string) => {
    const buttonPlaceholder = '[BOTÃO_WHATSAPP]';
    const parts = text.split(new RegExp(`(${buttonPlaceholder.replace(/[[\]]/g, '\\$&')})`, 'g'));

    return (
      <>
        {parts.map((part, index) => {
          if (part === buttonPlaceholder) {
            return (
              <a
                key={index}
                href="https://wa.me/5521995607848"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors w-full"
              >
                <div className="flex items-center justify-center">
                  <WhatsappIcon className="w-5 h-5 mr-2" />
                  <span>Falar no WhatsApp</span>
                </div>
              </a>
            );
          }
          
          const boldParts = part.split(/(\*\*.*?\*\*)/g);
          return (
            <span key={index}>
              {boldParts.map((boldPart, boldIndex) => {
                if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                  return <strong key={boldIndex}>{boldPart.slice(2, -2)}</strong>;
                }
                return <React.Fragment key={boldIndex}>{boldPart}</React.Fragment>;
              })}
            </span>
          );
        })}
      </>
    );
  };


  return (
    <>
      <div className={`fixed bottom-0 right-0 p-4 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-cyan-600 text-white p-4 rounded-full shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-110"
          aria-label="Abrir chat"
        >
          <ChatBubbleIcon className="w-8 h-8" />
        </button>
      </div>

      <div
        className={`fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <header className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Assistente Qualymed</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800" aria-label="Fechar chat">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <div className="flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm md:text-base break-words ${
                    msg.role === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                  }`}
                >
                   {msg.role === 'model' ? renderMessageContent(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="bg-white text-gray-800 shadow-sm rounded-bl-none p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce"></span>
                      </div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <footer className="p-3 border-t bg-white rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-cyan-600 text-white p-3 rounded-full hover:bg-cyan-700 disabled:bg-gray-300 transition-colors"
              disabled={!input.trim() || isLoading}
              aria-label="Enviar mensagem"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </footer>
      </div>
    </>
  );
};

export default Chatbot;