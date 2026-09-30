export const navigation = [
  ["Início", "/"],
  ["Como funciona", "/como-funciona"],
  ["Recursos", "/recursos"],
  ["Arquitetura", "/arquitetura"],
  ["Demonstração", "/demonstracao"],
  ["Tecnologias", "/#tecnologias"],
  ["Documentação", "/documentacao"],
  ["Sobre", "/sobre"],
];
export const features = [
  [
    "Monitoramento",
    "CPU, memória, disco, rede e atividade. O estado das máquinas em uma única visão.",
    "Activity",
  ],
  [
    "Diagnóstico",
    "Identifique consumo elevado, máquinas indisponíveis e necessidades de manutenção.",
    "ScanLine",
  ],
  [
    "Gerenciamento remoto",
    "Selecione computadores e acompanhe ações executadas pelos agentes.",
    "Terminal",
  ],
  [
    "Relatórios",
    "Consulte indicadores de uso, disponibilidade e histórico de operações.",
    "ChartNoAxesCombined",
  ],
  [
    "Inteligência artificial",
    "Interprete solicitações em linguagem natural, com validação pelo sistema.",
    "Sparkles",
  ],
  [
    "Alertas e eventos",
    "Encontre os pontos que precisam de atenção e consulte o histórico do laboratório.",
    "Bell",
  ],
  [
    "Laboratórios",
    "Organize os computadores por laboratório e posição física.",
    "Network",
  ],
  [
    "Usuários",
    "Gerencie usuários e permissões de acesso ao ambiente.",
    "Users",
  ],
  [
    "Distribuição de programas",
    "Envie solicitações de instalação e acompanhe a execução local.",
    "Package",
  ],
  [
    "Voz",
    "Interaja em linguagem natural para consultar informações e solicitar ações.",
    "Mic",
  ],
  [
    "Automação",
    "Centralize solicitações para uma ou várias máquinas e acompanhe seus resultados.",
    "Workflow",
  ],
];
export const architecture = [
  {
    name: "Computadores",
    sub: "Estações Windows",
    text: "Os computadores são organizados por laboratório e posição. Cada estação Windows executa um Agent para fornecer informações e receber ações.",
  },
  {
    name: "Agent Python",
    sub: "Coleta e execução",
    text: "Executado em segundo plano, coleta CPU, RAM, disco, rede, processos e atividade. Envia telemetria periodicamente, consulta comandos e devolve os resultados da execução local.",
  },
  {
    name: "Servidor FastAPI",
    sub: "Orquestração central",
    text: "Recebe a telemetria por APIs REST/HTTP, valida solicitações, gerencia a fila de comandos e disponibiliza informações ao dashboard. Uvicorn executa a aplicação FastAPI.",
  },
  {
    name: "Banco de dados",
    sub: "SQLite + SQLAlchemy",
    text: "Armazena os registros de máquinas, telemetria, eventos e comandos. SQLAlchemy faz a interface entre o servidor e o banco SQLite.",
  },
  {
    name: "Dashboard Web",
    sub: "Visibilidade e controle",
    text: "Acessível pelo navegador, apresenta os laboratórios, indicadores, alertas e histórico. Permite selecionar uma ou várias máquinas e solicitar ações ao servidor.",
  },
  {
    name: "Administrador",
    sub: "Decisão e operação",
    text: "O professor ou administrador acompanha o ambiente, identifica problemas e solicita ações conforme suas permissões de acesso.",
  },
];
export const steps = [
  "O Agent inicia com o computador",
  "O Agent registra-se no servidor",
  "A telemetria é enviada periodicamente",
  "O servidor armazena e processa os dados",
  "O dashboard apresenta as informações",
  "O administrador seleciona uma máquina",
  "O administrador solicita um comando",
  "O Agent consulta e recebe o comando",
  "Python executa a ação localmente",
  "O resultado retorna ao servidor",
];
export const evolution = [
  ["Assistente individual", "Monitoramento de apenas uma máquina."],
  [
    "Ampliação do escopo",
    "A necessidade passou a ser acompanhar laboratórios inteiros.",
  ],
  [
    "Arquitetura centralizada",
    "Agent, servidor e dashboard passam a compor o sistema.",
  ],
  [
    "Gerenciamento remoto",
    "Execução de ações nas máquinas a partir de um ponto central.",
  ],
  ["IA e voz", "Interação em linguagem natural como apoio à operação."],
  ["A.D.A.M.", "Plataforma centralizada para gerenciamento de laboratórios."],
];
export const technologies = [
  "Python",
  "FastAPI",
  "SQLAlchemy",
  "SQLite",
  "HTML",
  "CSS",
  "JavaScript",
  "OpenAI API",
  "REST API",
  "HTTP",
  "Windows",
  "Linux",
];
export const docs = [
  [
    "Visão geral",
    "O A.D.A.M. centraliza o monitoramento, o diagnóstico e o gerenciamento de computadores em laboratórios de informática. Este site é uma apresentação pública com demonstrações locais.",
  ],
  [
    "Arquitetura",
    "Estações Windows executam Agents Python. Os Agents se comunicam com o servidor FastAPI por REST/HTTP. O servidor persiste informações com SQLAlchemy e SQLite e as disponibiliza ao dashboard.",
  ],
  [
    "Servidor",
    "Python, FastAPI e Uvicorn compõem o servidor central. Ele recebe telemetria, valida solicitações e gerencia comandos. Parâmetros de instalação e endpoints serão incluídos na documentação do sistema.",
  ],
  [
    "Agent",
    "O Agent roda em segundo plano em cada computador Windows. Coleta métricas, envia dados periodicamente, consulta a fila, executa ações em Python e retorna os resultados.",
  ],
  [
    "Laboratórios",
    "Computadores são agrupados por laboratório e posição, como Laboratório 01 / PC-01. A organização facilita a localização física e a seleção de máquinas.",
  ],
  [
    "Monitoramento",
    "CPU, memória RAM, armazenamento, rede, processos, sistema, tempo ligado e atividade formam a telemetria. Os valores deste site são ilustrativos.",
  ],
  [
    "Comandos",
    "O administrador solicita uma ação. O servidor valida e cria o comando. O Agent consulta, recebe e executa localmente, devolvendo o resultado. Este site não envia comandos reais.",
  ],
  [
    "IA",
    "A integração externa com a OpenAI interpreta a intenção. O A.D.A.M. valida a solicitação antes de criar comandos. A IA interpreta; Python executa. Nenhuma chave de API é necessária neste site.",
  ],
  [
    "Voz",
    "A interação por voz oferece uma entrada em linguagem natural. A demonstração reproduz uma conversa predefinida e não acessa o microfone.",
  ],
  [
    "Relatórios",
    "Indicadores agregados de CPU, RAM, disponibilidade, comandos e eventos apoiam o acompanhamento. Períodos e critérios de agregação do sistema serão documentados posteriormente.",
  ],
  [
    "Segurança",
    "O projeto prevê operação em rede local, autenticação, controle de acesso, separação por laboratório, histórico e validação de comandos. A configuração institucional e as permissões precisam ser definidas na implantação.",
  ],
];
