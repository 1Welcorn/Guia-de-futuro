export interface Question {
  id: number;
  text: string;
  category: 'personality' | 'skill' | 'interest';
  options: {
    id: 'a' | 'b' | 'c' | 'd';
    text: string;
  }[];
}

export const questions: Question[] = [
  // Original Personality Questions (1-20)
  {
    id: 1,
    category: 'interest',
    text: "Na escola, você prefere assuntos ligados a:",
    options: [
      { id: 'a', text: "Arte, esportes e atividades extracurriculares" },
      { id: 'b', text: "Biologia e genética" },
      { id: 'c', text: "Ciências humanas, idiomas" },
      { id: 'd', text: "Ciências exatas" }
    ]
  },
  {
    id: 2,
    category: 'personality',
    text: "Você prefere levar sua vida:",
    options: [
      { id: 'a', text: "Com pouca rotina e poucas regras" },
      { id: 'b', text: "Com regras definidas e disciplina" },
      { id: 'c', text: "Interagindo com todo tipo de pessoa" },
      { id: 'd', text: "Com muita autonomia: 'na sua'" }
    ]
  },
  {
    id: 3,
    category: 'personality',
    text: "Você se descreveria como uma pessoa:",
    options: [
      { id: 'a', text: "Impulsiva e um tanto aventureira" },
      { id: 'b', text: "Cautelosa e responsável" },
      { id: 'c', text: "Entusiasmada e muito amiga" },
      { id: 'd', text: "Calma e diferente da maioria" }
    ]
  },
  {
    id: 4,
    category: 'skill',
    text: "Você se considera uma pessoa:",
    options: [
      { id: 'a', text: "Prática e hábil para improvisar" },
      { id: 'b', text: "Batalhadora, que sabe o que quer" },
      { id: 'c', text: "Preocupada com questões humanas" },
      { id: 'd', text: "Capacitada para criar e inventar" }
    ]
  },
  {
    id: 5,
    category: 'personality',
    text: "De quais características suas você sente orgulho:",
    options: [
      { id: 'a', text: "Audácia e facilidade para lidar com o inesperado" },
      { id: 'b', text: "Senso de dever e capacidade de dar exemplo" },
      { id: 'c', text: "Idealismo e disposição para compreender os outros" },
      { id: 'd', text: "Engenhosidade e rapidez mental" }
    ]
  },
  {
    id: 6,
    category: 'skill',
    text: "Costuma confiar mais em:",
    options: [
      { id: 'a', text: "Percepção imediata" },
      { id: 'b', text: "Costumes e tradições" },
      { id: 'c', text: "Intuição" },
      { id: 'd', text: "Razão e lógica" }
    ]
  },
  {
    id: 7,
    category: 'interest',
    text: "Quase sempre, você gosta de:",
    options: [
      { id: 'a', text: "Causar impacto: os 'holofotes' o atraem" },
      { id: 'b', text: "Ser visto como membro valioso de um grupo" },
      { id: 'c', text: "Sonhar em transformar o mundo" },
      { id: 'd', text: "Desvendar um enigma ou inventar algo útil" }
    ]
  },
  {
    id: 8,
    category: 'personality',
    text: "A vida é mais interessante quando você tem:",
    options: [
      { id: 'a', text: "Desafios, situações cambiantes" },
      { id: 'b', text: "Segurança, emprego garantido, integração social" },
      { id: 'c', text: "Possibilidade de fazer algo para mudar o mundo" },
      { id: 'd', text: "Possibilidade de ir além do que já é conhecido" }
    ]
  },
  {
    id: 9,
    category: 'interest',
    text: "Você gostaria de ser:",
    options: [
      { id: 'a', text: "Um craque na profissão que escolher" },
      { id: 'b', text: "Um executivo bem-sucedido" },
      { id: 'c', text: "Um profissional de prestígio" },
      { id: 'd', text: "Um especialista ou um cientista" }
    ]
  },
  {
    id: 10,
    category: 'skill',
    text: "Você é muito bom lidando com:",
    options: [
      { id: 'a', text: "Ferramentas, instrumentos e equipamentos" },
      { id: 'b', text: "Controle do tempo, comando e execução" },
      { id: 'c', text: "Pessoas de todos os níveis sociais e culturais" },
      { id: 'd', text: "Sistemas e construção (material ou mental)" }
    ]
  },
  {
    id: 11,
    category: 'personality',
    text: "Antes de agir, você analisa:",
    options: [
      { id: 'a', text: "As vantagens imediatas" },
      { id: 'b', text: "As experiências já vividas" },
      { id: 'c', text: "As possibilidades futuras" },
      { id: 'd', text: "As condições e consequências" }
    ]
  },
  {
    id: 12,
    category: 'personality',
    text: "Gosta quando as pessoas:",
    options: [
      { id: 'a', text: "O surpreendem com um presente" },
      { id: 'b', text: "Expressam gratidão por algo que fez" },
      { id: 'c', text: "Reconhecem sua personalidade singular" },
      { id: 'd', text: "Reconhecem sua inteligência" }
    ]
  },
  {
    id: 13,
    category: 'personality',
    text: "Você costuma abraçar um novo projeto:",
    options: [
      { id: 'a', text: "Com a cara e a coragem" },
      { id: 'b', text: "Guiado pela experiência" },
      { id: 'c', text: "Confiando na intuição e na criatividade" },
      { id: 'd', text: "Depois de verificar todas as variáveis" }
    ]
  },
  {
    id: 14,
    category: 'personality',
    text: "Geralmente, você prefere agir:",
    options: [
      { id: 'a', text: "No calor do momento" },
      { id: 'b', text: "Com segurança e conforme o costume" },
      { id: 'c', text: "Quando está inspirado" },
      { id: 'd', text: "Quando um problema o desafia" }
    ]
  },
  {
    id: 15,
    category: 'personality',
    text: "Você fica motivado quando:",
    options: [
      { id: 'a', text: "Tem a oportunidade de superar obstáculos" },
      { id: 'b', text: "Experimenta estabilidade na vida profissional" },
      { id: 'c', text: "Harmonia e inspiração guiam a atividade" },
      { id: 'd', text: "Há liberdade para projetar o futuro" }
    ]
  },
  {
    id: 16,
    category: 'personality',
    text: "Em atividades em grupo, você prefere:",
    options: [
      { id: 'a', text: "As desafiadoras, que exigem ação rápida" },
      { id: 'b', text: "Administrar os recursos disponíveis" },
      { id: 'c', text: "Motivar as pessoas para darem o melhor de si" },
      { id: 'd', text: "Descartar logo o que não funciona" }
    ]
  },
  {
    id: 17,
    category: 'personality',
    text: "Liderar é uma atividade que gosta de exercer:",
    options: [
      { id: 'a', text: "Por pouco tempo e dependendo da situação" },
      { id: 'b', text: "Quando pode comandar do começo ao fim" },
      { id: 'c', text: "Quando é preciso identificar e reunir talentos" },
      { id: 'd', text: "Quando o raciocínio estratégico é necessário" }
    ]
  },
  {
    id: 18,
    category: 'interest',
    text: "Em uma escola, você gostaria de ser:",
    options: [
      { id: 'a', text: "Professor de educação física" },
      { id: 'b', text: "Diretor" },
      { id: 'c', text: "Professor de literatura" },
      { id: 'd', text: "Professor de matemática ou física" }
    ]
  },
  {
    id: 19,
    category: 'personality',
    text: "É um elogio quando se referem a você como:",
    options: [
      { id: 'a', text: "Corajoso, otimista e divertido" },
      { id: 'b', text: "Cauteloso, responsável e aplicado" },
      { id: 'c', text: "Harmonizador, íntegro e sábio" },
      { id: 'd', text: "Uma mente brilhante" }
    ]
  },
  {
    id: 20,
    category: 'personality',
    text: "Frase que tem a ver com você:",
    options: [
      { id: 'a', text: "\"Deixo a vida me levar...\"" },
      { id: 'b', text: "\"Manda quem pode; obedece quem tem juízo\"" },
      { id: 'c', text: "\"Para seu próprio interesse, seja verdadeiro\"" },
      { id: 'd', text: "\"Penso, logo existo\"" }
    ]
  },
  // New Skill & Interest Questions (21-30)
  {
    id: 21,
    category: 'skill',
    text: "Se um computador ou celular trava, você geralmente:",
    options: [
      { id: 'a', text: "Tenta mexer em tudo até voltar a funcionar" },
      { id: 'b', text: "Leva para alguém que entende ou segue um manual" },
      { id: 'c', text: "Pede ajuda para um amigo e aproveita para conversar" },
      { id: 'd', text: "Pesquisa a causa lógica do erro e tenta consertar sozinho" }
    ]
  },
  {
    id: 22,
    category: 'interest',
    text: "Qual dessas atividades extras mais te atrai?",
    options: [
      { id: 'a', text: "Teatro, dança ou esportes coletivos" },
      { id: 'b', text: "Grêmio estudantil ou organização de eventos" },
      { id: 'c', text: "Trabalho voluntário ou projetos sociais" },
      { id: 'd', text: "Clube de robótica, xadrez ou programação" }
    ]
  },
  {
    id: 23,
    category: 'skill',
    text: "Ao planejar uma viagem com amigos, você é quem:",
    options: [
      { id: 'a', text: "Decide os passeios mais divertidos na hora" },
      { id: 'b', text: "Faz a planilha de custos e horários" },
      { id: 'c', text: "Garante que todos estejam se sentindo bem e incluídos" },
      { id: 'd', text: "Estuda o mapa e a história do lugar antes de ir" }
    ]
  },
  {
    id: 24,
    category: 'interest',
    text: "Se você pudesse criar um aplicativo, ele seria para:",
    options: [
      { id: 'a', text: "Compartilhar vídeos de manobras ou arte" },
      { id: 'b', text: "Gerenciar tarefas e produtividade" },
      { id: 'c', text: "Conectar pessoas que precisam de ajuda" },
      { id: 'd', text: "Resolver cálculos complexos ou automatizar casas" }
    ]
  },
  {
    id: 25,
    category: 'skill',
    text: "Como você lida com números e lógica?",
    options: [
      { id: 'a', text: "Uso para coisas práticas, como contar dinheiro rápido" },
      { id: 'b', text: "Gosto de ver tudo organizado em tabelas" },
      { id: 'c', text: "Prefiro quando os números contam histórias sobre pessoas" },
      { id: 'd', text: "Adoro desafios matemáticos e enigmas lógicos" }
    ]
  },
  {
    id: 26,
    category: 'interest',
    text: "Em um museu, qual ala você visitaria primeiro?",
    options: [
      { id: 'a', text: "Arte Moderna e instalações interativas" },
      { id: 'b', text: "História das Civilizações e Grandes Líderes" },
      { id: 'c', text: "Evolução Humana e Antropologia" },
      { id: 'd', text: "Ciência, Tecnologia e Espaço" }
    ]
  },
  {
    id: 27,
    category: 'skill',
    text: "Sua maior facilidade é:",
    options: [
      { id: 'a', text: "Aprender fazendo (mão na massa)" },
      { id: 'b', text: "Organizar o caos e dar ordens" },
      { id: 'c', text: "Ouvir e aconselhar pessoas" },
      { id: 'd', text: "Analisar dados e encontrar padrões" }
    ]
  },
  {
    id: 28,
    category: 'interest',
    text: "O que você mais gosta de ler ou assistir?",
    options: [
      { id: 'a', text: "Aventura, esportes e reality shows" },
      { id: 'b', text: "Documentários sobre negócios ou política" },
      { id: 'c', text: "Dramas, biografias e histórias de superação" },
      { id: 'd', text: "Ficção científica, tutoriais e descobertas científicas" }
    ]
  },
  {
    id: 29,
    category: 'skill',
    text: "Em um debate, você se destaca por:",
    options: [
      { id: 'a', text: "Argumentos rápidos e exemplos práticos" },
      { id: 'b', text: "Defender regras e a ordem do debate" },
      { id: 'c', text: "Tentar chegar a um consenso entre todos" },
      { id: 'd', text: "Apresentar fatos, dados e lógica inquestionável" }
    ]
  },
  {
    id: 30,
    category: 'interest',
    text: "Seu ambiente de trabalho ideal seria:",
    options: [
      { id: 'a', text: "Ao ar livre ou em movimento constante" },
      { id: 'b', text: "Um escritório organizado com metas claras" },
      { id: 'c', text: "Um lugar onde eu possa ajudar muitas pessoas" },
      { id: 'd', text: "Um laboratório ou estúdio tecnológico" }
    ]
  },
  {
    id: 31,
    category: 'skill',
    text: "Quando você recebe uma tarefa difícil, sua primeira reação é:",
    options: [
      { id: 'a', text: "Começar logo e descobrir como fazer no caminho" },
      { id: 'b', text: "Delegar partes ou organizar um plano de ação" },
      { id: 'c', text: "Conversar com alguém para trocar ideias" },
      { id: 'd', text: "Analisar o problema de todos os ângulos antes de começar" }
    ]
  },
  {
    id: 32,
    category: 'interest',
    text: "Qual dessas áreas da tecnologia mais te fascina?",
    options: [
      { id: 'a', text: "Drones, câmeras e equipamentos de ação" },
      { id: 'b', text: "Sistemas de gestão e segurança empresarial" },
      { id: 'c', text: "Redes sociais e plataformas de ensino" },
      { id: 'd', text: "Inteligência Artificial e Realidade Virtual" }
    ]
  },
  {
    id: 33,
    category: 'personality',
    text: "Em um final de semana ideal, você prefere:",
    options: [
      { id: 'a', text: "Praticar um esporte radical ou viajar para um lugar novo" },
      { id: 'b', text: "Organizar suas coisas e planejar a semana seguinte" },
      { id: 'c', text: "Reunir amigos para um jantar ou evento social" },
      { id: 'd', text: "Ficar em casa lendo, jogando ou aprendendo algo novo" }
    ]
  },
  {
    id: 34,
    category: 'skill',
    text: "Sua forma de resolver conflitos é:",
    options: [
      { id: 'a', text: "Sendo direto e prático para resolver logo" },
      { id: 'b', text: "Apelando para as regras e o que é justo" },
      { id: 'c', text: "Ouvindo os dois lados e buscando harmonia" },
      { id: 'd', text: "Analisando os fatos de forma imparcial" }
    ]
  },
  {
    id: 35,
    category: 'interest',
    text: "Se você fosse escrever um livro, o tema seria:",
    options: [
      { id: 'a', text: "Um guia de sobrevivência ou aventuras reais" },
      { id: 'b', text: "Como gerir grandes empresas e pessoas" },
      { id: 'c', text: "A psicologia por trás das relações humanas" },
      { id: 'd', text: "O futuro da humanidade e novas tecnologias" }
    ]
  }
];

export interface CareerDetail {
  name: string;
  dailyActivities: string;
  marketOutlook: string;
  whereToStudy: string;
  specializations: string[];
}

export interface TechCourse {
  name: string;
  whatYouLearn: string;
  duration: string;
  jobOpportunities: string;
  whereToFind: string;
}

export interface Profile {
  id: 'a' | 'b' | 'c' | 'd';
  title: string;
  description: string;
  characteristics: string;
  careers: string[]; // Keep for backward compatibility or simple list
  detailedCareers: CareerDetail[];
  techCourses: TechCourse[];
  color: string;
}

export const profiles: Record<'a' | 'b' | 'c' | 'd', Profile> = {
  a: {
    id: 'a',
    title: "Explorador Dinâmico",
    description: "Prioriza a liberdade de expressão e a agilidade. Alunos cinestésicos que aprendem na prática e evitam monotonia.",
    characteristics: "Audácia, facilidade com o inesperado, praticidade e habilidade para improvisar.",
    careers: ["Chef de Cozinha", "Piloto", "Jornalista", "Estilista", "Fotógrafo de Aventura", "Organizador de Eventos"],
    detailedCareers: [
      {
        name: "Chef de Cozinha",
        dailyActivities: "Criação de cardápios, gestão de equipe de cozinha, controle de estoque e preparo de pratos de alta complexidade.",
        marketOutlook: "Mercado em alta com o crescimento do turismo e gastronomia autoral no Brasil. Oportunidades em hotéis, cruzeiros e restaurantes próprios.",
        whereToStudy: "SENAC, Institutos Federais (Gastronomia), Universidades como Anhembi Morumbi.",
        specializations: ["Confeitaria", "Cozinha Internacional", "Gestão de Restaurantes"]
      },
      {
        name: "Jornalista",
        dailyActivities: "Apuração de notícias, redação de textos, realização de entrevistas e cobertura de eventos em tempo real.",
        marketOutlook: "Transição para o digital. Grande demanda por produtores de conteúdo multimídia e jornalismo de dados.",
        whereToStudy: "ECA-USP, Cásper Líbero, Institutos Federais.",
        specializations: ["Jornalismo Investigativo", "Mídias Digitais", "Assessoria de Imprensa"]
      },
      {
        name: "Piloto de Aeronaves",
        dailyActivities: "Planejamento de voo, operação de sistemas de navegação, comunicação com torres de controle e transporte seguro de passageiros ou carga.",
        marketOutlook: "Setor de aviação civil em recuperação e expansão no Brasil, com demanda por novos pilotos em linhas aéreas e aviação executiva.",
        whereToStudy: "Escolas de Aviação Civil, Faculdades de Ciências Aeronáuticas (PUC-RS, Anhembi Morumbi).",
        specializations: ["Aviação Comercial", "Instrução de Voo", "Aviação Agrícola"]
      },
      {
        name: "Fotógrafo de Aventura",
        dailyActivities: "Captura de imagens em ambientes externos desafiadores, edição digital, planejamento de expedições e venda de licenças para mídias.",
        marketOutlook: "Crescente com o marketing de experiência e redes sociais. Oportunidades em revistas de viagem, marcas de outdoor e bancos de imagem.",
        whereToStudy: "Cursos de Fotografia (SENAC, Panamericana), Workshops especializados.",
        specializations: ["Fotografia de Natureza", "Drone Photography", "Edição Avançada"]
      }
    ],
    techCourses: [
      {
        name: "Técnico em Cozinha",
        whatYouLearn: "Técnicas de corte, preparo de alimentos, higiene e segurança alimentar, organização de praça.",
        duration: "800 a 1200 horas (aprox. 1 ano)",
        jobOpportunities: "Cozinheiro, auxiliar de cozinha, empreendedor gastronômico.",
        whereToFind: "SENAC, ETECs (SP), Institutos Federais."
      },
      {
        name: "Técnico em Guia de Turismo",
        whatYouLearn: "História da arte, geografia turística, condução de grupos, primeiros socorros.",
        duration: "800 horas",
        jobOpportunities: "Guia regional, guia de excursões nacionais e internacionais.",
        whereToFind: "SENAC, Institutos Federais."
      }
    ],
    color: "bg-orange-500"
  },
  b: {
    id: 'b',
    title: "Líder Estratégico",
    description: "Focado em ordem e pragmatismo. Valoriza hierarquia clara e metas tangíveis em grupo.",
    characteristics: "Senso de dever, cautela, responsabilidade e foco em resultados.",
    careers: ["Administrador", "Advogado", "Engenheiro", "Policial", "Analista de Investimentos", "Gestor de Operações"],
    detailedCareers: [
      {
        name: "Administrador",
        dailyActivities: "Planejamento estratégico, gestão financeira, coordenação de equipes e análise de processos organizacionais.",
        marketOutlook: "Sempre estável. Alta demanda por gestores com foco em sustentabilidade e transformação digital.",
        whereToStudy: "FGV, USP, Institutos Federais (Administração).",
        specializations: ["Finanças", "Logística", "Recursos Humanos"]
      },
      {
        name: "Engenheiro de Produção",
        dailyActivities: "Otimização de linhas de produção, controle de qualidade, gestão de suprimentos e redução de custos.",
        marketOutlook: "Essencial para a indústria 4.0 no Brasil. Oportunidades em fábricas, bancos e consultorias.",
        whereToStudy: "Poli-USP, UNICAMP, Institutos Federais.",
        specializations: ["Gestão da Qualidade", "Engenharia Econômica", "Supply Chain"]
      },
      {
        name: "Gestor de Projetos",
        dailyActivities: "Planejamento de cronogramas, gestão de recursos, liderança de equipes e garantia da entrega de resultados dentro do prazo.",
        marketOutlook: "Essencial em todos os setores, especialmente tecnologia e construção civil. Alta valorização de profissionais certificados.",
        whereToStudy: "Fundação Getúlio Vargas (FGV), SENAC, Institutos Federais.",
        specializations: ["Metodologias Ágeis", "Gestão de Riscos", "PMP"]
      },
      {
        name: "Analista de Investimentos",
        dailyActivities: "Análise de mercado financeiro, avaliação de empresas, recomendação de compra/venda de ativos e gestão de carteiras.",
        marketOutlook: "Setor financeiro em constante busca por talentos analíticos. Alta remuneração e bônus por performance.",
        whereToStudy: "Economia ou Administração (USP, FGV, Insper).",
        specializations: ["Equity Research", "Wealth Management", "Análise Técnica"]
      }
    ],
    techCourses: [
      {
        name: "Técnico em Administração",
        whatYouLearn: "Rotinas administrativas, contabilidade básica, gestão de pessoas e marketing.",
        duration: "800 a 1000 horas",
        jobOpportunities: "Assistente administrativo, auxiliar de RH, assistente de logística.",
        whereToFind: "SENAI, SENAC, Institutos Federais, ETECs."
      },
      {
        name: "Técnico em Logística",
        whatYouLearn: "Armazenagem, transporte, distribuição e gestão de estoques.",
        duration: "800 horas",
        jobOpportunities: "Auxiliar de logística, conferente, assistente de expedição.",
        whereToFind: "SENAI, SENAC, Institutos Federais."
      }
    ],
    color: "bg-blue-600"
  },
  c: {
    id: 'c',
    title: "Conector Humanista",
    description: "Demonstra alta inteligência interpessoal e empatia. Movido por causas sociais e intuição.",
    characteristics: "Idealismo, disposição para compreender os outros, entusiasmo e harmonia.",
    careers: ["Psicólogo", "Professor", "Escritor", "Sociólogo", "Relações Públicas", "Mediador de Conflitos"],
    detailedCareers: [
      {
        name: "Psicólogo",
        dailyActivities: "Atendimento clínico, aplicação de testes, orientação profissional e intervenções em grupos ou empresas.",
        marketOutlook: "Crescimento exponencial devido à conscientização sobre saúde mental. Expansão no setor corporativo (RH).",
        whereToStudy: "USP, PUC, Universidades Federais.",
        specializations: ["Psicologia Clínica", "Psicologia Organizacional", "Neuropsicologia"]
      },
      {
        name: "Professor / Pedagogo",
        dailyActivities: "Planejamento de aulas, mediação de aprendizagem, avaliação de alunos e desenvolvimento de projetos educativos.",
        marketOutlook: "Demanda constante por professores qualificados, especialmente em áreas de exatas e educação especial.",
        whereToStudy: "Institutos Federais (Licenciaturas), USP, UNESP.",
        specializations: ["Gestão Escolar", "Educação Inclusiva", "Tecnologias Educacionais"]
      },
      {
        name: "Assistente Social",
        dailyActivities: "Planejamento e execução de políticas sociais, orientação a famílias em vulnerabilidade e defesa de direitos humanos.",
        marketOutlook: "Atuação em órgãos públicos (CRAS, CREAS), ONGs e hospitais. Foco em políticas de inclusão e proteção social.",
        whereToStudy: "Universidades Federais, Institutos Federais, PUC.",
        specializations: ["Gestão de Políticas Públicas", "Saúde da Família", "Direitos da Criança e Adolescente"]
      },
      {
        name: "Relações Públicas",
        dailyActivities: "Gestão da imagem de empresas ou pessoas, organização de eventos, relacionamento com a mídia e comunicação interna.",
        marketOutlook: "Essencial para a reputação de marcas no ambiente digital. Alta demanda por gestores de crise e influência.",
        whereToStudy: "Comunicação Social (USP, Cásper Líbero, PUC).",
        specializations: ["Comunicação Corporativa", "Gestão de Crise", "Branding"]
      }
    ],
    techCourses: [
      {
        name: "Técnico em Recursos Humanos",
        whatYouLearn: "Recrutamento e seleção, treinamento, folha de pagamento e legislação trabalhista.",
        duration: "800 horas",
        jobOpportunities: "Assistente de RH, auxiliar de departamento pessoal.",
        whereToFind: "SENAC, Institutos Federais, ETECs."
      },
      {
        name: "Técnico em Enfermagem",
        whatYouLearn: "Cuidados diretos ao paciente, administração de medicamentos, primeiros socorros e ética em saúde.",
        duration: "1200 a 1600 horas",
        jobOpportunities: "Técnico em hospitais, clínicas, postos de saúde e home care.",
        whereToFind: "SENAC, Institutos Federais, Escolas Técnicas Estaduais."
      }
    ],
    color: "bg-emerald-500"
  },
  d: {
    id: 'd',
    title: "Inovador Analítico",
    description: "Reflete uma personalidade curiosa e lógica. Valoriza autonomia intelectual e tecnologia.",
    characteristics: "Engenhosidade, rapidez mental, razão, lógica e curiosidade intelectual.",
    careers: ["Arquiteto", "Analista de Sistemas", "Físico", "Matemático", "UX Designer", "Arquiteto de Cloud"],
    detailedCareers: [
      {
        name: "Analista de Sistemas / Dev",
        dailyActivities: "Desenvolvimento de software, análise de requisitos, manutenção de bancos de dados e resolução de problemas lógicos.",
        marketOutlook: "O mercado mais aquecido do Brasil e do mundo. Déficit de profissionais qualificados garante altos salários.",
        whereToStudy: "Institutos Federais (Análise de Sistemas), USP, UNICAMP.",
        specializations: ["Inteligência Artificial", "Cibersegurança", "Desenvolvimento Mobile"]
      },
      {
        name: "Cientista de Dados",
        dailyActivities: "Coleta e limpeza de dados, criação de modelos preditivos e tradução de dados em insights de negócios.",
        marketOutlook: "Área em franca expansão. Empresas de todos os setores buscam profissionais que saibam ler dados.",
        whereToStudy: "Universidades Federais (Estatística/Matemática), Cursos de Tecnologia.",
        specializations: ["Machine Learning", "Big Data", "Visualização de Dados"]
      },
      {
        name: "Engenheiro de Software",
        dailyActivities: "Desenvolvimento de sistemas, arquitetura de software, resolução de problemas complexos e manutenção de aplicações escaláveis.",
        marketOutlook: "Um dos mercados mais aquecidos do mundo. Alta demanda por profissionais qualificados em diversas linguagens.",
        whereToStudy: "Institutos Federais, USP, UNICAMP, Cursos de Tecnologia (FIAP, Alura).",
        specializations: ["Arquitetura de Sistemas", "Segurança da Informação", "Cloud Computing"]
      },
      {
        name: "UX Designer",
        dailyActivities: "Pesquisa com usuários, criação de protótipos, testes de usabilidade e design de interfaces centradas no humano.",
        marketOutlook: "Fundamental para o sucesso de produtos digitais. Alta demanda em empresas de tecnologia e agências.",
        whereToStudy: "Design ou TI (USP, Belas Artes, Cursos Online como Alura/EBAC).",
        specializations: ["User Research", "Interaction Design", "Visual Design"]
      }
    ],
    techCourses: [
      {
        name: "Técnico em Desenvolvimento de Sistemas",
        whatYouLearn: "Lógica de programação, bancos de dados, desenvolvimento web e mobile.",
        duration: "1000 a 1200 horas",
        jobOpportunities: "Programador júnior, suporte técnico, desenvolvedor web.",
        whereToFind: "SENAI, Institutos Federais, ETECs."
      },
      {
        name: "Técnico em Mecatrônica",
        whatYouLearn: "Mecânica, eletrônica, automação industrial e robótica.",
        duration: "1200 horas",
        jobOpportunities: "Técnico em manutenção industrial, operador de sistemas automatizados.",
        whereToFind: "SENAI, Institutos Federais."
      }
    ],
    color: "bg-indigo-600"
  }
};

