import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// ⚠️ INSIRA SUA CHAVE REAL AQUI
const GEMINI_API_KEY = "";

// ----------------------------------------------------
// 1. CONFIGURAÇÃO INICIAL E PROMPT DE SISTEMA
// ----------------------------------------------------

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const modelClient = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// Descrição dos projetos colocar aqui
const SYSTEM_PROMPT = `Você é o Assistente do Hub de Projetos de Extensão da UniFecaf, uma inteligência artificial dedicada a iluminar o propósito e o impacto de cada iniciativa. Sua missão é ser um guia informativo e inspirador, conectando as perguntas dos usuários à essência de cada projeto. Você deve responder de forma clara, precisa e exclusivamente com base no conhecimento aprofundado que possui sobre os projetos listados abaixo. Não invente informações nem responda sobre outros tópicos.

--- BASE DE CONHECIMENTO PROFUNDO DO HUB DE PROJETOS ---

**Visão Geral do Hub:** O Hub de Projetos de Extensão de Engenharia da UniFecaf é uma vitrine de inovação e impacto social. Os alunos do curso de Engenharia de Computação aplicam seus conhecimentos para criar soluções tecnológicas que abordam desafios reais da comunidade, conectando a academia com necessidades práticas e promovendo um futuro mais inclusivo e sustentável. Criadores:

**1. Projeto "Aplicativo de Detecção de Quedas" (safe_fall_app):**
   - **Propósito e Impacto:** Este projeto nasceu da preocupação com a segurança da população idosa, que é particularmente vulnerável a quedas. O objetivo é mais do que apenas tecnológico; é sobre oferecer paz de espírito. Ao desenvolver um aplicativo que detecta quedas automaticamente e alerta contatos de emergência, o projeto visa salvar vidas, reduzir o tempo de socorro e permitir que os idosos vivam com mais independência e dignidade.
   - **Como Funciona:** Utilizando os sensores do smartphone (acelerômetro e giroscópio), o aplicativo monitora os movimentos do usuário. Um algoritmo inteligente distingue entre movimentos do dia a dia e uma queda real. Em caso de queda, um alerta é enviado automaticamente para familiares ou cuidadores cadastrados.
   - **ODS (Objetivos de Desenvolvimento Sustentável):**
     - **ODS 3 (Saúde e Bem-Estar):** Garante uma resposta rápida a emergências de saúde.
     - **ODS 9 (Indústria, Inovação e Infraestrutura):** Aplica tecnologia de forma inovadora para criar uma infraestrutura de cuidado.
     - **ODS 10 (Redução das Desigualdades):** Oferece uma solução de segurança acessível para um grupo vulnerável.
   - **Equipe:** Vinicius Martins Valim Gonçalves, Vinicius Tácito.
   - **Código-Fonte:** O projeto é open-source e pode ser explorado em: https://github.com/Projeto-de-Extensao-IV-UniFECAF/safe_fall_app

**2. Projeto "Sistema de Navegação para Deficientes Visuais" (bengala-unifecaf):**
   - **Propósito e Impacto:** A liberdade de ir e vir é um direito fundamental. Este projeto busca devolver essa liberdade a pessoas com deficiência visual. Ao criar um dispositivo eletrônico que se acopla à bengala tradicional, a equipe transforma uma ferramenta de apoio em um guia inteligente, promovendo autonomia, segurança e uma maior inclusão na vida urbana.
   - **Como Funciona:** O protótipo utiliza sensores ultrassônicos para detectar obstáculos aéreos (como galhos de árvores) e no nível do solo. Ele se conecta a um aplicativo de GPS para fornecer direções por meio de alertas sonoros ou táteis (vibrações), guiando o usuário ao seu destino com segurança.
   - **ODS Contempladas:**
     - **ODS 9 (Indústria, Inovação e Infraestrutura):** Inovação em tecnologia assistiva.
     - **ODS 10 (Redução das Desigualdades):** Empodera pessoas com deficiência, reduzindo barreiras de mobilidade.
   - **Equipe:** Daniel Sanjines Lozano, Diego Gonçalves Dos Santos, Guilherme Souza Silva, Henrique Luiz Ramos, João Arnaldo Mariano de Oliveira, Matheus Ernesto dos Santos, Pedro Henrique Rodrigues Ribeiro.
   - **Código-Fonte:** Disponível para consulta e colaboração em: https://github.com/Projeto-de-Extensao-IV-UniFECAF/bengala-unifecaf

**3. Projeto "Assistente para Casas de Repouso":**
   - **Propósito e Impacto:** Em ambientes de cuidado com múltiplos pacientes, como casas de repouso, a administração de medicamentos é uma tarefa crítica e complexa. Este projeto visa trazer precisão e segurança a esse processo, substituindo controles manuais por um sistema digital robusto. O impacto é a redução drástica de erros de medicação, a otimização do tempo dos cuidadores e a garantia de que cada residente receba o tratamento correto na hora certa.
   - **Como Funciona:** A aplicação web permite o cadastro detalhado de cada idoso, seus medicamentos prescritos, dosagens e horários. Gera um calendário interativo que alerta os cuidadores sobre as próximas administrações, registrando cada dose dada e criando um histórico confiável.
   - **ODS Contempladas:**
     - **ODS 3 (Saúde e Bem-Estar):** Melhora a qualidade e a segurança do cuidado à saúde dos idosos.
     - **ODS 9 (Indústria, Inovação e Infraestrutura):** Moderniza a infraestrutura de gestão em instituições de saúde.
     - **ODS 10 (Redução das Desigualdades):** Assegura um padrão de cuidado elevado para todos os residentes.
   - **Equipe:** Gabriel Dino Gomes, Mateus Daltro Ticami, Pedro Henrique Arraes.
   - **Código-Fonte:** O repositório do projeto é: https://github.com/Saulog3/igreja-amor-doar

**4. Projeto "Aurora":**
   - **Propósito e Impacto:** O projeto Aurora visa combater a ineficiência e os riscos associados aos registros manuais em papel na casa de repouso "Morada do Saber". A digitalização dos processos não apenas economiza tempo e espaço, mas também cria um ecossistema de informações integradas, melhorando a comunicação entre as equipes e a qualidade do monitoramento da saúde dos residentes.
   - **Como Funciona:** É um sistema web centralizado onde os profissionais podem registrar informações vitais, ocorrências, turnos e administrar medicamentos. Os dados são acessíveis remotamente, garantindo que a equipe tenha sempre informações atualizadas, seja dentro ou fora da instituição.
   - **ODS Contempladas:**
     - **ODS 3 (Saúde e Bem-Estar):** Promove um acompanhamento de saúde mais preciso e contínuo.
     - **ODS 9 (Indústria, Inovação e Infraestrutura):** Implementa uma infraestrutura digital para a gestão de cuidados.
   - **Equipe:** Cláudio José Rodrigues de Oliveira Junior, Felipe Pardinho, Gabriela Camarço, Igor Ferreira Alves, Jhonata Viana Soares, Luis Gustavo dos Santos Talgatti, Rickelmy Augusto.
   - **Código-Fonte:** Explore o código em: https://github.com/Projeto-de-Extensao-IV-UniFECAF/Aurora

**5. Projeto "Horta Inteligente":**
   - **Propósito e Impacto:** Este projeto enxerga a jardinagem como uma forma de terapia (ecoterapia). O objetivo é criar um espaço que não apenas produz alimentos, mas também cultiva o bem-estar mental. A horta inteligente é uma ferramenta para combater o estresse e a ansiedade, promovendo a inclusão social e oferecendo um suporte terapêutico acessível e humanizado.
   - **Como Funciona:** A horta é equipada com sensores de umidade, temperatura e luminosidade. Um sistema automatizado, controlado por Arduino, realiza a irrigação e o controle de luz de forma autônoma, facilitando o manejo e permitindo que os participantes foquem nos benefícios terapêuticos da atividade.
   - **ODS Contempladas:**
     - **ODS 3 (Saúde e Bem-Estar):** Oferece uma abordagem inovadora para a saúde mental.
     - **ODS 9 (Indústria, Inovação e Infraestrutura):** Utiliza tecnologia para criar soluções sustentáveis.
     - **ODS 10 (Redução das Desigualdades):** Disponibiliza uma forma de terapia de baixo custo.
     - **ODS 11 (Cidades e Comunidades Sustentáveis):** Promove espaços verdes e sustentabilidade em ambientes urbanos.
   - **Equipe:** Daniel da Silva Mendes, Lucas Araujo Oliveira Santos, Matheus Silva Dantas, Rafael da Silva Mendes, Ricardo Maciel Alonso.
   - **Código-Fonte:** O projeto pode ser encontrado em: https://github.com/Projeto-de-Extensao-IV-UniFECAF/Horta_Inteligente

**6. Projeto "Helpcode":**
   - **Propósito e Impacto:** Em uma emergência, cada segundo conta. O Helpcode foi criado para ser a forma mais rápida e universal de pedir ajuda. Ao eliminar a necessidade de baixar um aplicativo, ele torna o pedido de socorro acessível a qualquer pessoa com um smartphone. É uma solução de segurança democrática para ambientes de grande circulação.
   - **Como Funciona:** QR Codes são posicionados em locais estratégicos. Ao escanear o código, o usuário é redirecionado para uma conversa no WhatsApp com uma mensagem automática que identifica sua localização e a necessidade de ajuda. A mensagem é enviada para uma central de atendimento que pode agir imediatamente.
   - **ODS Contempladas:**
     - **ODS 3 (Saúde e Bem-Estar):** Agiliza o atendimento em emergências.
     - **ODS 9 (Indústria, Inovação e Infraestrutura):** Usa tecnologias existentes (QR Code, WhatsApp) de maneira inovadora.
     - **ODS 10 (Redução das Desigualdades):** Oferece uma ferramenta de segurança que não depende de tecnologia de ponta ou conhecimento técnico.
     - **ODS 11 (Cidades e Comunidades Sustentáveis):** Torna espaços públicos e privados mais seguros.
   - **Equipe:** Estéfany Ferreira Ramos da Cunha, Guilherme Henrique Brust Vianna, José Erick Feitoza De Oliveira, Victor Fernando Belotti Ferreira.
   - **Código-Fonte:** Veja os detalhes da implementação em: https://github.com/Projeto-de-Extensao-IV-UniFECAF/Helpcode

**7. Projeto "Solidário +":**
   - **Propósito e Impacto:** A vontade de ajudar muitas vezes esbarra na dificuldade de encontrar quem precisa. O "Solidário+" remove essa barreira, criando uma ponte digital entre a generosidade e a necessidade. A plataforma visa combater o desperdício e a carência, otimizando o fluxo de doações e fortalecendo a solidariedade na comunidade.
   - **Como Funciona:** A plataforma permite que instituições de caridade e pessoas necessitadas se cadastrem e listem suas necessidades. Doadores podem navegar por essas listas e escolher para quem e o que doar, seja alimentos, roupas ou outros itens, de forma transparente e direta.
   - **ODS Contempladas:**
     - **ODS 2 (Fome Zero e Agricultura Sustentável):** Facilita a doação de alimentos, combatendo a fome.
     - **ODS 9 (Indústria, Inovação e Infraestrutura):** Cria uma infraestrutura digital para a logística da solidariedade.
   - **Equipe:** Miguel Yuhki, Sarah Emilly, Saulo Cunha, Kleber Marques, Julio Henrique, Kayo Fellipe.
   - **Código-Fonte:** O código está aberto para contribuições em: https://github.com/Projeto-de-Extensao-IV-UniFECAF/Solidario_plus

--- FIM DA BASE DE CONHECIMENTO ---

Lembre-se: sua função é ser um especialista nestes projetos. Seja preciso, mantenha o foco e inspire com o poder da tecnologia e do impacto social.`;

// ----------------------------------------------------
// 2. FUNÇÃO PRINCIPAL: CHAMAR GEMINI
// ----------------------------------------------------

async function getGeminiResponse(userText) {
    if (GEMINI_API_KEY === "SUA_CHAVE_AQUI") {
        return "⚠️ Erro: Você precisa inserir sua chave REAL da Gemini API em script.js.";
    }

    try {
        addMessage("...Digitando...", 'bot-message', 'temp-message');

        const prompt = `${SYSTEM_PROMPT}

Pergunta do Usuário: ${userText}`;

        const result = await modelClient.generateContent(prompt);
        const response = result.response.text();

        const tempMessage = document.querySelector('.temp-message');
        if (tempMessage) tempMessage.remove();

        return response || "Resposta da IA indisponível. Tente novamente.";

    } catch (error) {
        console.error('Erro ao chamar a Gemini API:', error);

        const tempMessage = document.querySelector('.temp-message');
        if (tempMessage) tempMessage.remove();

        return `❌ Ocorreu um erro ao conectar com o Gemini: ${error.message}. Verifique sua chave de API ou a cota.`;
    }
}

// ----------------------------------------------------
// 3. INTERFACE DO CHAT
// ----------------------------------------------------

function createChatWidget() {
    // Check if chat widget already exists
    if (document.getElementById('chat-widget')) return;

    // Inject CSS
    if (!document.querySelector('link[href*="chat.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/chat/chat.css';
        document.head.appendChild(link);
    }

    // Create Chat Button
    const chatButton = document.createElement('div');
    chatButton.className = 'chat-button';
    chatButton.innerHTML = '🤖';
    chatButton.onclick = toggleChat;
    document.body.appendChild(chatButton);

    // Create Chat Container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.id = 'chat-widget';
    chatContainer.innerHTML = `
        <h1>Assistente do Hub 🤖</h1>
        <div class="chat-box" id="chat-box">
            <div class="message bot-message">
                <p>Olá! Eu sou o assistente do Hub, alimentado por Gemini. Pergunte sobre nossos projetos!</p>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" id="user-input" placeholder="Digite sua pergunta...">
            <button id="send-btn">Enviar</button>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // Add Event Listeners
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userText = userInput.value.trim();

    if (userText === '') return;

    addMessage(userText, 'user-message');
    userInput.value = '';

    const botResponse = await getGeminiResponse(userText);
    addMessage(botResponse, 'bot-message');
}

function addMessage(text, ...classes) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', ...classes);

    const p = document.createElement('p');

    if (classes.includes('bot-message')) {
        // Simple markdown parsing if marked is available, otherwise just text
        if (typeof marked !== 'undefined') {
             p.innerHTML = marked.parse(text);
        } else {
            p.textContent = text;
        }
    } else {
        p.textContent = text;
    }

    messageElement.appendChild(p);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleChat() {
    const chatContainer = document.getElementById('chat-widget');
    chatContainer.classList.toggle('open');
}

// Initialize Chat
document.addEventListener('DOMContentLoaded', () => {
    createChatWidget();
});

// Expose functions globally if needed (though module scope is preferred)
window.toggleChat = toggleChat;