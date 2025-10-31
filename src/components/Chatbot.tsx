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
        response: 'Somos a **Qualymed**, especialistas em Saúde e Segurança do Trabalho. Ajudamos empresas com uma gestão de riscos preventiva e atendimento individualizado.',
    },
     {
        keywords: ['missão', 'propósito', 'qual a missão'],
        response: 'Nossa missão é tornar os negócios mais seguros e sustentáveis através da **gestão preventiva de riscos ocupacionais**, com credibilidade e confiança.',
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
        response: 'Oferecemos soluções completas em **Engenharia de Segurança**, **Medicina do Trabalho**, **Gestão eSocial SST** e **Treinamentos de NRs**, focando na saúde global e conformidade legal. Sobre qual serviço você gostaria de saber mais?',
    },
    {
        keywords: ['diferencial', 'por que escolher', 'vantagem'],
        response: 'Nosso maior diferencial é a **parceria**. Não apenas entregamos documentos, oferecemos uma gestão completa e consultiva, usando **tecnologia** e **atendimento personalizado** para garantir o sucesso do seu negócio.',
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
        response: 'Toda empresa precisa de documentos básicos de SST, como o **PGR** (Programa de Gerenciamento de Riscos) e o **PCMSO** (Programa de Controle Médico de Saúde Ocupacional). Nós cuidamos de tudo isso para você!',
    },
    {
        keywords: ['exame de funcionário', 'tenho que fazer exame nos funcionários', 'exame para contratar'],
        response: 'Sim, os exames ocupacionais são obrigatórios. O **exame admissional** é feito antes da contratação, mas também existem os periódicos, demissionais, etc. Todos são gerenciados pelo **PCMSO**, que elaboramos para sua empresa.',
    },
    {
        keywords: ['papel para o inss', 'documento de aposentadoria', 'laudo para se aposentar'],
        response: 'Para fins de aposentadoria junto ao INSS, os documentos chave são o **LTCAT** e o **PPP**. Nós elaboramos o **LTCAT**, que é o laudo técnico que serve de base para o PPP do funcionário.',
    },
    {
        keywords: ['curso de segurança', 'treinamento obrigatório', 'dar curso para funcionário'],
        response: 'Sim, os treinamentos baseados nas **Normas Regulamentadoras (NRs)** são obrigatórios. Oferecemos capacitações para **trabalho em altura (NR-35)**, **uso de EPIs (NR-06)**, e muitas outras. Qual NR você precisa atender?',
    },
    {
        keywords: ['evitar multa', 'fiscalização do trabalho', 'deixar a empresa em dia'],
        response: 'Para evitar multas e manter sua empresa em dia, é essencial ter a gestão de SST completa: **PGR**, **PCMSO**, **LTCAT**, envios para o **eSocial** e **treinamentos**. Somos especialistas em regularizar tudo para você. Vamos começar? [BOTÃO_WHATSAPP]',
    },

    // === ENGENHARIA DE SEGURANÇA ===
    {
        keywords: ['engenharia', 'segurança'],
        response: 'Em **Engenharia de Segurança**, nosso foco é controlar os riscos no ambiente de trabalho. Elaboramos documentos essenciais como **PGR**, **LTCAT**, Laudos de Insalubridade/Periculosidade, AET e mais. Qual sua necessidade?',
    },
    {
        keywords: ['pgr', 'programa de gerenciamento de riscos'],
        response: 'O **PGR (Programa de Gerenciamento de Riscos)** é o principal documento de segurança (NR-01). Ele inclui o Inventário de Riscos e o Plano de Ação, e nós acompanhamos sua implementação para garantir a eficácia.',
    },
    {
        keywords: ['ltcat', 'laudo técnico das condições do ambiente de trabalho'],
        response: 'O **LTCAT** é um laudo conclusivo sobre a exposição do trabalhador a agentes nocivos, fundamental para fins de **aposentadoria especial** junto ao INSS. Ele serve de base para o preenchimento do PPP.',
    },
    {
        keywords: ['insalubridade', 'laudo de insalubridade'],
        response: 'O **Laudo de Insalubridade** (NR-15) avalia se o ambiente expõe os funcionários a agentes nocivos acima dos limites, o que pode gerar o direito ao **adicional de insalubridade**.',
    },
    {
        keywords: ['periculosidade', 'laudo de periculosidade'],
        response: 'O **Laudo de Periculosidade** (NR-16) identifica atividades perigosas (com inflamáveis, eletricidade, etc.) que garantem o **adicional de periculosidade** ao trabalhador.',
    },
    {
        keywords: ['aet', 'análise ergonômica', 'ergonomia', 'nr-17', 'laudo ergonômico'],
        response: 'A **AET (Análise Ergonômica do Trabalho)**, exigida pela NR-17, avalia a adaptação das condições de trabalho aos trabalhadores, visando conforto, segurança e desempenho.',
    },
    {
        keywords: ['higiene ocupacional', 'avaliações ambientais', 'dosimetria', 'vibração', 'químicas', 'ibutg', 'luximetria'],
        response: 'Sim, gerenciamos a **Higiene Ocupacional** com avaliações ambientais quantitativas de ruído (Dosimetria), agentes químicos, vibração, calor (IBUTG), entre outras.',
    },
    {
        keywords: ['pca', 'programa de proteção auditiva'],
        response: 'O **PCA (Programa de Conservação Auditiva)** previne perdas auditivas em trabalhadores expostos a ruído. É integrado ao PCMSO e inclui desde audiometrias até ações de conscientização.',
    },
    {
        keywords: ['ppr', 'programa de proteção respiratória'],
        response: 'O **PPR (Programa de Proteção Respiratória)** define procedimentos para seleção, uso e manutenção de respiradores em ambientes com poeiras, gases, etc.',
    },
     {
        keywords: ['apr', 'análise preliminar de risco'],
        response: 'A **APR (Análise Preliminar de Risco)** é uma ferramenta para identificar e mitigar riscos em tarefas específicas antes de seu início, especialmente as não rotineiras.',
    },
    {
        keywords: ['dds', 'diálogo diário de segurança'],
        response: 'Sim, auxiliamos no desenvolvimento do **DDS (Diálogo Diário de Segurança)**, uma ferramenta importante para reforçar a cultura de segurança na sua empresa.',
    },
    {
        keywords: ['mapa de riscos', 'mapa de risco'],
        response: 'Elaboramos o **Mapa de Riscos** por setor (NR-05), uma representação gráfica que ajuda os colaboradores a identificarem os riscos em seus locais de trabalho.',
    },
    {
        keywords: ['sipat', 'semana interna de prevenção'],
        response: 'Oferecemos suporte completo na organização da **SIPAT (Semana Interna de Prevenção de Acidentes do Trabalho)**, promovendo a conscientização sobre segurança e saúde.',
    },
    {
        keywords: ['epi', 'equipamento de proteção', 'ficha de epi'],
        response: 'Fornecemos orientação completa sobre a gestão de **EPIs (Equipamentos de Proteção Individual)**, incluindo o controle e o registro em fichas, conforme a NR-06.',
    },
    {
        keywords: ['inspeção', 'visita técnica', 'relatório de segurança'],
        response: 'Realizamos inspeções de segurança periódicas na sua empresa, com relatórios detalhados para acompanhar a implementação do PGR e garantir a conformidade contínua.'
    },
    {
        keywords: ['perícia', 'pericia judicial', 'acompanhamento de perícia'],
        response: 'Sim, oferecemos o acompanhamento de perícias judiciais com nossos especialistas, dando o suporte técnico necessário à sua empresa nas áreas Médica e de Engenharia.',
    },
    {
        keywords: ['terceirização', 'alocação de profissional', 'tst na empresa'],
        response: 'Sim, oferecemos o serviço de **terceirização de profissionais** de SST, como Técnico de Segurança, Médico do Trabalho, entre outros, para atuar diretamente na sua empresa.',
    },
    {
        keywords: ['cipa', 'comissão interna de prevenção de acidentes', 'eleição da cipa'],
        response: 'A **CIPA (NR-05)** é fundamental para a prevenção de acidentes. Oferecemos assessoria completa para o processo eleitoral, registro e treinamento obrigatório dos membros.',
    },
    
    // === MEDICINA DO TRABALHO ===
    {
        keywords: ['medicina', 'saúde ocupacional', 'médico do trabalho'],
        response: 'Em **Medicina do Trabalho**, nosso foco é preservar a saúde dos colaboradores. O programa central é o **PCMSO (NR-07)**. Gostaria de saber mais sobre ele?',
    },
    {
        keywords: ['pcmso', 'programa de controle médico', 'o que é pcmso'],
        response: 'O **PCMSO (Programa de Controle Médico de Saúde Ocupacional)** é um programa obrigatório (NR-07) que estabelece os **exames médicos** (admissionais, periódicos, etc.) que cada funcionário deve realizar para monitorar sua saúde.',
    },
    {
        keywords: ['aso', 'atestado', 'atestados', 'atestado de saúde ocupacional', 'exame ocupacional'],
        response: 'O **ASO (Atestado de Saúde Ocupacional)** é o documento que atesta a aptidão do funcionário para a função. Emitimos ASOs para todos os tipos de exames e podemos realizá-los **na sua empresa (in loco)** para maior comodidade.',
    },
    {
        keywords: ['exame admissional', 'exame para contratar'],
        response: 'O **exame admissional** é obrigatório e deve ser feito **antes** do início das atividades para garantir que o novo colaborador está apto para a função.',
    },
    {
        keywords: ['exame demissional', 'exame para sair da empresa'],
        response: 'O **exame demissional** é obrigatório e deve ser feito em até **10 dias** após o fim do contrato, para avaliar a saúde do colaborador no desligamento.',
    },
    {
        keywords: ['exame periódico', 'exame anual'],
        response: 'O **exame periódico** é realizado em intervalos definidos no **PCMSO** (geralmente anual ou bienal), para monitorar a saúde dos trabalhadores ao longo do tempo.',
    },
    {
        keywords: ['mudança de risco', 'mudança de função', 'exame de mudança'],
        response: 'O **exame de mudança de risco ocupacional** é obrigatório sempre que um funcionário for transferido para uma função com exposição a riscos diferentes da anterior.',
    },
    {
        keywords: ['retorno ao trabalho', 'voltar de afastamento', 'exame de retorno'],
        response: 'O **exame de retorno ao trabalho** é necessário para funcionários afastados por 30 dias ou mais (por doença, acidente ou parto). Deve ser feito no primeiro dia da volta.',
    },
    {
        keywords: ['exames complementares', 'audiometria', 'espirometria', 'eeg', 'ecg', 'psicossocial', 'rx'],
        response: 'Sim, realizamos diversos **exames complementares** indicados no PCMSO, como **Audiometria**, **EEG**, **ECG**, **Espirometria**, **Avaliação Psicossocial**, exames laboratoriais, **Raio-X** e outros.',
    },
    {
        keywords: ['agendar exame', 'marcar aso', 'onde faz o exame'],
        response: 'Para agendamento de exames, o contato de WhatsApp é (21) 99756-7806. Nossa equipe irá te ajudar a encontrar o melhor horário!',
    },
    {
        keywords: ['in loco', 'na minha empresa', 'atendimento na empresa'],
        response: 'Sim, oferecemos atendimento **in loco**, realizando os exames clínicos e a emissão dos **ASOs** diretamente na sua empresa, otimizando o tempo dos seus colaboradores.',
    },
    {
        keywords: ['concurso', 'exame para concurso', 'avaliação para curso'],
        response: 'Sim, realizamos **avaliações clínicas** e emitimos atestados de saúde para candidatos de concursos públicos e para matrícula em cursos.'
    },

    // === ESOCIAL SST ===
    {
        keywords: ['esocial', 'sst', 'social', 'e-social', 'gestão dos envios'],
        response: 'Sim, cuidamos de toda a **Gestão do eSocial SST**! Gerenciamos os envios dos eventos **S-2210** (CAT), **S-2220** (ASO) e **S-2240** (Agentes Nocivos) para garantir que sua empresa fique em dia e evite multas. Quer saber mais? [BOTÃO_WHATSAPP]',
    },
    {
        keywords: ['s-2210', 'cat', 'comunicação de acidente', 'acidente de trabalho'],
        response: 'O evento **S-2210** é a **Comunicação de Acidente de Trabalho (CAT)**. Deve ser enviado ao eSocial até o primeiro dia útil após a ocorrência ou imediatamente, em caso de morte.',
    },
    {
        keywords: ['s-2220', 'monitoramento da saúde', 'enviar aso pro esocial'],
        response: 'O evento **S-2220** detalha o **Monitoramento da Saúde do Trabalhador**. Por ele, são enviadas as informações do **ASO** (Atestado de Saúde Ocupacional) e dos exames complementares.',
    },
    {
        keywords: ['s-2240', 'agentes nocivos', 'enviar pgr pro esocial', 'enviar ltcat'],
        response: 'O evento **S-2240** descreve a exposição do trabalhador a **agentes nocivos**, com base no **LTCAT**. É uma informação essencial para a aposentadoria especial.',
    },

    // === TREINAMENTOS E NRs ===
    {
        keywords: ['treinamentos', 'nr', 'normas regulamentadoras', 'curso', 'capacitação', 'palestras'],
        response: 'Oferecemos diversos **treinamentos e cursos de NRs**, como **NR-05 (CIPA)**, **NR-06 (EPI)**, **NR-33 (Espaço Confinado)** e **NR-35 (Trabalho em Altura)**. Capacitar sua equipe é um investimento em segurança!',
    },
    {
        keywords: ['nr-33', 'espaço confinado'],
        response: 'O treinamento da **NR-33** é obrigatório para trabalhos em **espaços confinados**. Capacitamos tanto os trabalhadores autorizados quanto os vigias.',
    },
    {
        keywords: ['nr-35', 'trabalho em altura'],
        response: 'O treinamento da **NR-35** é obrigatório para qualquer trabalho executado acima de 2 metros de altura, onde haja risco de queda. A segurança em altura é prioridade!',
    },

    // === COMERCIAL E PROCESSOS ===
    {
        keywords: ['proposta', 'orçamento', 'preço', 'cotação', 'valor', 'comercial', 'contratar', 'quanto custa', 'valores'],
        response: 'Excelente! Para solicitar uma proposta comercial, fale com nossa equipe de especialistas no WhatsApp. Eles estão prontos para entender sua necessidade e ajudar! [BOTÃO_WHATSAPP]',
    },
    {
        keywords: ['pequena empresa', 'mei', 'poucos funcionários', 'microempresa'],
        response: 'Com certeza! Atendemos empresas de **todos os portes**, desde MEI e microempresas até grandes indústrias. Nossas soluções são sempre personalizadas para a sua necessidade.',
    },

    // === DÚVIDAS FREQUENTES ADICIONAIS ===
    {
        keywords: ['ppp', 'perfil profissiográfico previdenciário'],
        response: 'O **PPP (Perfil Profissiográfico Previdenciário)** é um documento histórico-laboral do trabalhador. Fornecemos as informações técnicas do **LTCAT** e a orientação necessária para que sua empresa possa preenchê-lo corretamente.',
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