export const data = {
  name: "MATHEUS MARQUES EIRAS",
  title: "Desenvolvedor Full Stack",
  about: {
    greeting: "Desenvolvendo novas soluções para desafios complexos.",
    headline: "TRANSFORMANDO CÓDIGO EM EXPERIÊNCIA",
    description: [
      "Sou estudante de Ciência da Computação no Instituto Federal do Paraná, focado no desenvolvimento de sistemas robustos e escaláveis.",
      "Especializado no desenvolvimento de backends robustos, foco na resolução de problemas complexos de lógica e na criação de APIs que servem de alicerce para experiências digitais de alto impacto.",
      "Busco minha primeira oportunidade para aplicar conhecimentos em Python, JavaScript, SQL e arquiteturas de sistemas reais."
    ],
    status: "Construindo infraestruturas robustas e APIs eficientes",
    education: "Graduação em Ciência da Computação - IFPR (Previsão Dez/2026)"
  },
  contact: {
    email: "matheus.eiras2002@gmail.com",
    phone: "(41) 98503-2002",
    location: "Paraná, Brasil",
    github: "https://github.com/matheusmarqueseiras",
    linkedin: "https://linkedin.com/in/matheusmarqueseiras",
    huggingface: "https://huggingface.co/matheusmarqueseiras",
  },
  stacks: [
    // Linguagens
    { name: "Python", category: "Linguagens", icon: "SiPython" },
    { name: "JavaScript", category: "Linguagens", icon: "SiJavascript" },
    { name: "C/C++", category: "Linguagens", icon: "SiCplusplus" },
    { name: "Rust", category: "Linguagens", icon: "SiRust" },
    // Web & Frameworks
    { name: "React", category: "Web & Frameworks", icon: "SiReact" },
    { name: "Flask", category: "Web & Frameworks", icon: "SiFlask" },
    // Ferramentas & Infraestrutura
    { name: "Git", category: "Ferramentas & Infraestrutura", icon: "SiGit" },
    { name: "GitHub", category: "Ferramentas & Infraestrutura", icon: "SiGithub" },
    { name: "Docker", category: "Ferramentas & Infraestrutura", icon: "SiDocker" },
    { name: "Linux", category: "Ferramentas & Infraestrutura", icon: "SiLinux" },
    { name: "APIs REST", category: "Ferramentas & Infraestrutura", icon: "SiInsomnia" },
    // Banco de Dados
    { name: "SQL", category: "Banco de Dados", icon: "SiSqlite" },
    { name: "PostgreSQL", category: "Banco de Dados", icon: "SiPostgresql" },
    // Softwares & Produtividade
    { name: "Pacote Office", category: "Softwares & Produtividade", icon: "FaMicrosoft" },
  ],
  projects: [
    {
      title: "EmilIA",
      description: "Sistema de Inteligência Artificial desenvolvido para otimização de processos e interação inteligente.",
      tags: ["Python", "IA", "Machine Learning"],
      icons: ["SiPython", "TbBrain", "SiOllama"],
      image: "/EmilIA.jpg",
      link: "https://github.com/MatheusMarquesEiras/EmilIA#"
    },
    {
      title: "bigdata-NER",
      description: "Modelo de Named Entity Recognition (NER) para identificação de entidades em textos em português e multilíngues, utilizando spaCy e PyTorch com suporte a GPU.",
      tags: ["Python", "NLP", "PyTorch", "spaCy"],
      icons: ["SiPython", "SiPytorch", "SiSpacy", "SiNvidia"],
      image: "https://github.com/MatheusMarquesEiras/bigdata-NER/raw/main/NER.jpg",
      link: "https://github.com/MatheusMarquesEiras/bigdata-NER"
    },
    {
      title: "WorkerAnt",
      description: "Servidor robusto de upload de arquivos desenvolvido com Flask e PostgreSQL, focado em automação e containerização com Docker.",
      tags: ["Python", "Flask", "Docker", "PostgreSQL"],
      icons: ["SiPython", "SiFlask", "SiDocker", "SiPostgresql"],
      image: "/WorkerAnt.jpg",
      link: "https://github.com/MatheusMarquesEiras/WorkerAnt"
    },
    {
      title: "PROJETO EM DESENVOLVIMENTO",
      description: "Este projeto está em desenvolvimento e trará novas soluções em breve.",
      tags: ["?"],
      icons: ["TbQuestionMark"],
      image: "https://placehold.co/600x600/060e20/a1faff?text=EM+BREVE",
      link: "#"
    },
  ],
  languages: [
    { name: "Inglês", level: "Avançado" },
    { name: "Espanhol", level: "Básico" }
  ]
};
