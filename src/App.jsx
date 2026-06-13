import React, { useEffect, useState } from 'react';
import { Menu, X, CheckCircle2, Layers, LineChart, Target, Zap, Clock, BookOpen, Users, Building2, PenTool, BarChart3 } from 'lucide-react';
import CheckoutModal from './components/CheckoutModal.jsx';

const heroLinks = [
  { label: 'Proposta', href: '#proposta' },
  { label: 'Demonstração', href: '#demo' },
  { label: 'O Programa', href: '#programa' },
  { label: 'Planos', href: '#pricing' },
];

const brandSymbolSrc = '/new/Logo_RedaLine-removebg-preview.png';

const BrandLockup = ({ compact = false }) => {
  const iconSize = compact ? 'h-10 w-10 md:h-10 md:w-10' : 'h-24 w-24 md:h-20 md:w-20';
  const titleSize = compact ? 'text-sm md:text-lg' : 'text-3xl md:text-[2.15rem]';
  const subtitleSize = compact ? 'text-[0.44rem] md:text-[0.58rem]' : 'text-[0.62rem] md:text-[0.7rem]';

  return (
    <span className="inline-flex items-center gap-2.5 md:gap-4">
      <span className="grid place-items-center rounded-xl p-1.5 md:p-2 shadow-sm">
        <img src={brandSymbolSrc} alt="Símbolo RedaLine" className={`${iconSize} object-contain`} loading="eager" />
      </span>

      <span className="leading-none">
        <span className={`block font-extrabold tracking-tight text-white ${titleSize}`}>
          Reda<span className="text-brand-green">Line</span>
        </span>
        <span className={`mt-1 block uppercase tracking-[0.16em] text-white/78 ${subtitleSize}`}>
          Tecnologia que Ensina
        </span>
      </span>
    </span>
  );
};

const studentCards = [
  {
    src: 'https://www.sapicua.com.br/sites/default/files/articles/03%20Quase%2050%20mil%20pessoas%20fizeram%20o%20Exame%20Certificador%20da%20EJA%20em%20Mato%20Grosso.jpg',
    alt: 'Estudante sorrindo com fundo azul',
    bg: '#0f2d57',
    height: 'h-[15rem] sm:h-[18rem] lg:h-[20rem]',
    offset: 'mt-4',
    objectPosition: '48% 18%',
  },
  {
    src: '/images/Gemini_Generated_Image_wza8xxwza8xxwza8.png',
    alt: 'Estudante sorrindo com fundo amarelo',
    bg: '#9eff1f',
    height: 'h-[17rem] sm:h-[20rem] lg:h-[22rem]',
    offset: 'mt-0',
    objectPosition: '60% 5%',
  },
  {
    src: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/06/estudante-escrevendo-redacao.jpg?w=1200&h=1200&crop=1',
    alt: 'Estudante com fundo azul claro',
    bg: '#457a00',
    height: 'h-[15rem] sm:h-[18rem] lg:h-[20rem]',
    offset: 'mt-3',
    objectPosition: '50% 20%',
  },
  {
    src: '/images/Gemini_Generated_Image_mbaf26mbaf26mbaf.png',

    alt: 'Estudante com livros e fundo rosa',
    bg: '#2b5204',
    height: 'h-[16rem] sm:h-[19rem] lg:h-[21rem]',
    offset: '-mt-2',
    objectPosition: '50% 16%',
  },
  {
    src: 'https://s2-g1.glbimg.com/Xj68sqHfDif5h11G9PFGCw0Hx2w=/0x0:800x533/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/f/D/AyjdvAQKuErAXUF2rOuA/22671-4a2af4c3-5249-e644-92da-7b3c69f0f4de.jpg',
    alt: 'Estudante com fundo verde',
    bg: '#76bd12',
    height: 'h-[20rem] sm:h-[22rem] lg:h-[23rem]',
    offset: 'mt-0',
    objectPosition: '50% 18%',
  },
  {
    src: 'https://assets.b9.com.br/wp-content/uploads/2018/11/enem-resultado.jpg',
    alt: 'Estudante com fundo lilás',
    bg: '#153f79',
    height: 'h-[17rem] sm:h-[19rem] lg:h-[21rem]',
    offset: '-mt-3',
    objectPosition: '50% 12%',
  },
];

const platformScreens = [
  {
    src: '/new/painel-do-aluno.jpeg',
    alt: 'Painel do aluno com indicadores de desempenho e evolução',
    title: 'Painel do aluno',
    description: 'Visão completa da evolução, nota, competências e foco da semana em uma interface clara e visual.',
  },
  {
    src: '/new/painel-do-professor.jpeg',
    alt: 'Painel do professor com diagnóstico institucional e turmas',
    title: 'Painel do professor',
    description: 'Leitura rápida da instituição, turmas prioritárias, diagnósticos e competências que mais derrubam nota.',
  },
  {
    src: '/new/painel-do-gestor.jpeg',
    alt: 'Painel do gestor com visão consolidada institucional',
    title: 'Painel do gestor',
    description: 'Visão consolidada de desempenho, evolução institucional, alertas pedagógicos e ranking de turmas.',
  },
];

const correctionScreens = [
  {
    src: '/Screenshot_51.png',
    alt: 'Tela de correção com pontuação geral e lista de apontamentos',
    title: 'Correção geral',
    description: 'Visão inicial do corretor com nota, métricas de texto e acesso rápido aos apontamentos principais.',
  },
  {
    src: '/Screenshot_53.png',
    alt: 'Tela de texto com marcações destacadas e painel lateral de competências',
    title: 'Texto com apontamentos',
    description: 'Trechos destacados no texto e painel lateral com o detalhamento por competência.',
  },
  {
    src: '/Screenshot_54.png',
    alt: 'Tela de feedback qualitativo da redação',
    title: 'Feedback qualitativo',
    description: 'Avaliação escrita com pontos fortes, melhorias e orientações para reescrita.',
  },
  {
    src: '/Screenshot_55.png',
    alt: 'Tela de sugestões de melhoria da redação',
    title: 'Sugestões acionáveis',
    description: 'Lista objetiva de ajustes com foco em clareza, coesão e proposta de intervenção.',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setIsOpen(false);

    const target = document.querySelector(href);
    if (!target) return;

    const navbarHeight = document.getElementById('main-navbar')?.offsetHeight ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const safeOffset = 0;

    window.scrollTo({
      top: Math.max(targetTop - navbarHeight - safeOffset, 0),
      behavior: 'smooth',
    });
  };

  return (
    <nav id="main-navbar" className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-2 md:py-1.5 bg-brand-dark border-b border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-3 w-full md:w-auto">
          <a href="#topo" aria-label="Voltar ao topo" className="inline-flex items-center shrink-0">
            <BrandLockup compact />
          </a>

          <button className="md:hidden inline-flex items-center justify-center text-white hover:text-brand-green transition-colors rounded-xl p-2.5" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8 text-brand-light font-medium text-sm">
            {heroLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                aria-label={`Ir para ${item.label}`}
                className="hover:text-brand-green transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a href="https://portal.redaline.com.br/login" className="btn-primary hidden md:inline-flex text-xs md:text-sm py-3 px-4 md:px-6">
            Entrar
          </a>

          <a href="https://portal.redaline.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="btn-accent text-xs md:text-sm py-2 px-4 md:px-6">
            Teste grátis
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full md:hidden">
          <a href="https://portal.redaline.com.br/login" className="btn-primary h-11 text-sm whitespace-nowrap flex items-center justify-center">
            Entrar
          </a>

          <a href="https://portal.redaline.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="btn-accent h-11 text-sm whitespace-nowrap flex items-center justify-center">
            Teste grátis
          </a>
        </div>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 flex flex-col items-center py-4 gap-4 shadow-xl overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 border-t border-white/10 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
        {heroLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(event) => handleNavClick(event, item.href)}
            aria-label={`Ir para ${item.label}`}
            className="text-brand-light font-medium hover:text-brand-green transition-colors w-full text-center py-2"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-20 pb-12 md:pt-24 md:pb-56 px-6 bg-brand-dark text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-brand-moss/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute left-0 top-0 w-[320px] h-[320px] md:w-[680px] md:h-[680px] bg-brand-green/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 items-center relative">
        <div className="max-w-2xl lg:py-1 lg:self-center">
          <Navbar />

          <div className="inline-block px-3 py-1 mt-1 mb-4 rounded-full text-brand-green font-semibold text-xs tracking-[0.2em] border border-brand-green/30 uppercase">
            Tecnologia que Ensina Redação
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.08] mb-5 tracking-tight">
            Sua evolução <br />
            na escrita <br />
            <span className="text-brand-green">começa aqui.</span>
          </h1>

          <p className="text-base md:text-xl text-brand-light/80 mb-6 leading-relaxed font-light max-w-lg">
            Envie sua redação e receba em segundos uma análise completa nas 5 competências do ENEM.
          </p>

          <ul className="space-y-3 mb-8 text-sm md:text-base text-brand-light/90">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Análise completa nas 5 competências do ENEM</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Nota estimada no formato ENEM em segundos</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Feedback que explica o erro e ensina a corrigir</li>
            <li className="hidden sm:flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Apontamentos direto no seu texto</li>
            <li className="hidden sm:flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Acompanhamento da sua evolução ao longo do tempo</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://portal.redaline.com.br/cadastro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent text-base sm:text-lg w-full sm:w-auto text-center min-h-[52px] flex items-center justify-center"
            >
              Faça o seu teste grátis
            </a>
            <a
              href="#pricing"
              className="btn-primary text-base sm:text-lg w-full sm:w-auto text-center min-h-[52px] flex items-center justify-center"
            >
              Ver os planos
            </a>
          </div>
        </div>

        <div className="hidden md:flex relative justify-center lg:justify-end lg:self-center">
          <div className="relative w-full max-w-[620px]">
            <div className="absolute left-10 top-12 h-7 w-7 rounded-full bg-brand-moss" />
            <div className="absolute right-12 top-0 h-10 w-10 rounded-full bg-brand-green" />
            <div className="absolute left-16 bottom-28 h-8 w-8 rounded-full bg-brand-green/80" />
            <div className="absolute right-0 bottom-36 h-7 w-7 rounded-full bg-brand-light/70" />

            <div className="grid grid-cols-3 gap-4 sm:gap-5">
              {studentCards.map((card) => (
                <div
                  key={card.src}
                  className={`relative overflow-hidden rounded-[2.35rem] ${card.height} ${card.offset}`}
                  style={{ backgroundColor: card.bg }}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="absolute inset-x-0 bottom-0 top-5 h-[calc(100%-1.25rem)] w-full object-cover"
                    style={{ objectPosition: card.objectPosition }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingStatsCard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 relative z-20 mt-4 md:-mt-28 mb-12 md:mb-24">
      <div className="bg-brand-green rounded-[2rem] p-6 md:p-12 shadow-card flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="bg-brand-dark text-white p-2.5 md:p-3 rounded-2xl shrink-0">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-brand-green" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-brand-dark">Metodologia que acelera a evolução da sua escrita</h2>
          </div>
          <p className="text-brand-dark/80 text-sm font-medium leading-relaxed max-w-xl">
            A RedaLine combina inteligência artificial com uma metodologia desenvolvida por especialistas e validada em mais de 10 anos de experiência no ENEM.
          </p>
        </div>
        <div className="flex flex-row gap-4 w-full md:w-auto">
          <div className="bg-white/40 p-4 md:p-5 rounded-2xl text-brand-dark flex-1 md:min-w-[160px]">
            <div className="text-2xl md:text-3xl font-bold mb-1">+1000</div>
            <div className="text-xs font-semibold uppercase opacity-70">Redações<br />Avaliadas</div>
          </div>
          <div className="bg-white/40 p-4 md:p-5 rounded-2xl text-brand-dark flex-1 md:min-w-[160px]">
            <div className="text-2xl md:text-3xl font-bold mb-1">2<span className="text-base md:text-lg">min</span></div>
            <div className="text-xs font-semibold uppercase opacity-70">Tempo Médio<br />de Correção</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProposalSection = () => {
  return (
    <section id="proposta" className="py-14 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-xl md:text-4xl font-light text-brand-dark mb-2">Conheça a nossa proposta para</h2>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-dark">impulsionar a aprendizagem<span className="text-brand-gray font-light block md:inline"> na sua rotina.</span></h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8 md:space-y-12">
            <div className="flex gap-4 md:gap-6">
              <div className="text-brand-moss shrink-0 mt-0.5">
                <LineChart className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-brand-dark mb-1.5">Baseada em dados</h4>
                <p className="text-brand-gray text-sm leading-relaxed">Dados que permitem a personalização do estudo de acordo com necessidades individuais dos estudantes nos 5 critérios de avaliação.</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6">
              <div className="text-brand-moss shrink-0 mt-0.5">
                <Target className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-brand-dark mb-1.5">Alto engajamento dos alunos</h4>
                <p className="text-brand-gray text-sm leading-relaxed">Experiência interativa, rápida e lúdica que abrange revisão de desvios, compreensão textual e evolução de notas ao longo do tempo.</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6">
              <div className="text-brand-moss shrink-0 mt-0.5">
                <Clock className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-brand-dark mb-1.5">Mais liberdade e tempo</h4>
                <p className="text-brand-gray text-sm leading-relaxed">Acompanhamento em tempo real. Menos tempo gasto na espera por correções, mais tempo praticando técnicas de redação.</p>
              </div>
            </div>
            <a href="#demo" className="btn-primary inline-flex items-center min-h-[48px]">Ver a plataforma</a>
          </div>

          {/* Mock browser — visível apenas em telas médias+ */}
          <div className="relative hidden md:block">
            <div className="bg-brand-gray rounded-t-3xl pt-6 px-6 relative border-b-4 border-brand-dark shadow-2xl overflow-hidden aspect-video flex flex-col">
              <div className="bg-white flex-1 rounded-t-xl overflow-hidden relative border border-brand-gray/20">
                <div className="h-10 bg-brand-light flex items-center px-4 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6 bg-white flex h-full gap-6">
                  <div className="w-1/4 bg-brand-light rounded-lg border border-gray-100 p-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-3"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-8"></div>
                    <div className="w-full h-8 bg-brand-moss/10 rounded-md mb-2"></div>
                    <div className="w-full h-8 bg-brand-light rounded-md mb-2 border border-gray-100"></div>
                    <div className="w-full h-8 bg-brand-light rounded-md mb-2 border border-gray-100"></div>
                  </div>
                  <div className="flex-1 p-4 border border-gray-100 rounded-lg relative overflow-hidden">
                    <h5 className="font-bold text-brand-dark mb-4 text-sm">Correção: Os impactos da Inteligência Artificial</h5>
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-brand-light rounded-full"></div>
                      <div className="w-full h-2 bg-brand-light rounded-full"></div>
                      <div className="w-full h-2 bg-brand-light rounded-full"></div>
                      <div className="w-5/6 h-2 bg-brand-light rounded-full"></div>
                      <br />
                      <div className="w-full h-2 bg-brand-light rounded-full"></div>
                      <div className="w-4/5 h-2 bg-brand-light rounded-full"></div>
                    </div>
                    <div className="absolute right-4 top-14 bg-brand-green/20 border border-brand-green p-3 rounded-lg w-40 backdrop-blur-sm">
                      <div className="text-[10px] font-bold text-brand-dark mb-1">Competência 1</div>
                      <div className="w-full h-1 bg-brand-green/50 rounded-full mb-1"></div>
                      <div className="w-2/3 h-1 bg-brand-green/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-4 bg-brand-dark rounded-b-xl mx-auto shadow-xl relative z-10 w-[105%] -ml-[2.5%]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PLANS_CONFIG = {
  essencial: { id: 'essencial', name: 'Essencial', price: 29.90, credits: 12 },
  intensivo: { id: 'intensivo', name: 'Intensivo', price: 59.90, credits: 30 },
  professor: { id: 'professor', name: 'Professor', price: 249.90, credits: 150 },
};

const Pricing = () => {
  const [pricingTab, setPricingTab] = useState('students');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const openCheckout = (planId) => {
    setSelectedPlan(PLANS_CONFIG[planId]);
    setModalOpen(true);
  };

  const isStudentsTab = pricingTab === 'students';
  const isTeachersTab = pricingTab === 'teachers';
  const isCompaniesTab = pricingTab === 'companies';

  return (
    <section id="pricing" className="px-6 py-16 md:pt-8 bg-brand-light">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8 flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-brand-dark md:text-5xl">Planos Para Sua Aprovação</h2>
            <p className="text-base text-brand-gray md:text-lg">Escolha o plano ideal para acelerar sua preparação. Correção profissional ao seu alcance.</p>
          </div>

          <div className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm sm:w-auto">
            <button
              type="button"
              onClick={() => setPricingTab('students')}
              className={`flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:flex-none ${isStudentsTab ? 'bg-brand-dark text-white shadow-md' : 'text-brand-gray hover:text-brand-dark'}`}
            >
              Estudantes
            </button>
            <button
              type="button"
              onClick={() => setPricingTab('teachers')}
              className={`flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:flex-none ${isTeachersTab ? 'bg-brand-dark text-white shadow-md' : 'text-brand-gray hover:text-brand-dark'}`}
            >
              Professores
            </button>
            <button
              type="button"
              onClick={() => setPricingTab('companies')}
              className={`flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:flex-none ${isCompaniesTab ? 'bg-brand-dark text-white shadow-md' : 'text-brand-gray hover:text-brand-dark'}`}
            >
              <span className="sm:hidden">Escolas</span>
              <span className="hidden sm:inline">Escolas e instituições</span>
            </button>
          </div>
        </div>

        {isStudentsTab ? (
          <div className="mx-auto max-w-5xl mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[1.5rem] border-2 border-brand-green/60 bg-brand-green/10 px-6 py-5">
              <div>
                <p className="font-bold text-brand-dark text-base">Quer experimentar antes de assinar?</p>
                <p className="text-brand-gray text-sm mt-0.5">Crie sua conta grátis e ganhe <strong>1 correção gratuita</strong> para testar a plataforma.</p>
              </div>
              <a
                href="https://portal.redaline.com.br/cadastro"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-xl bg-brand-green px-6 py-3 text-sm font-bold text-brand-dark shadow-md shadow-brand-green/20 transition-all hover:scale-[1.03] hover:bg-emerald-400 whitespace-nowrap"
              >
                Faça o seu teste grátis
              </a>
            </div>
          </div>
        ) : null}

        {isStudentsTab ? (
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            <div className="flex h-full flex-col rounded-[2rem] border border-gray-100 bg-white p-6 shadow-card md:p-8">
              <h3 className="mb-2 text-xl font-bold text-brand-dark md:text-2xl">Essencial</h3>
              <p className="mb-5 border-b border-gray-100 pb-5 text-sm text-brand-gray">Para estudantes que praticam toda semana.</p>
              <div className="mb-6 text-4xl font-extrabold text-brand-dark md:text-5xl">R$ 29,90<span className="text-base font-medium text-brand-gray md:text-xl">/mês</span></div>
              <ul className="mb-6 flex-1 space-y-3 text-sm text-brand-gray">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-moss" /> <strong>4 correções</strong> por mês</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-moss" /> Análise detalhada de 5 competências</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-moss" /> Nota estimada formato ENEM</li>
                <li className="flex items-center gap-3 opacity-50"><CheckCircle2 className="h-5 w-5 shrink-0" /> Sem limite de acessos ao painel</li>
              </ul>
              <button onClick={() => openCheckout('essencial')} className="w-full rounded-xl border-2 border-brand-blue px-4 py-3.5 text-sm font-bold text-brand-blue transition-all duration-300 hover:-translate-y-1 hover:bg-brand-blue hover:text-white hover:shadow-lg hover:shadow-brand-blue/30 md:text-base">
                Assinar Essencial
              </button>
            </div>

            <div className="relative flex h-full flex-col rounded-[2rem] border-2 border-brand-green bg-brand-dark p-6 text-white shadow-2xl md:p-8 lg:-translate-y-2">
              <div className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-brand-green px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
                Recomendado
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">Intensivo</h3>
              <p className="mb-5 border-b border-white/10 pb-5 text-sm text-brand-light/70">Para a máxima performance na redação.</p>
              <div className="mb-6 text-4xl font-extrabold md:text-5xl">R$ 59,90<span className="text-base font-medium opacity-70 md:text-xl">/mês</span></div>
              <ul className="mb-6 flex-1 space-y-3 text-sm text-brand-light">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" /> <strong>10 correções</strong> por mês</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" /> Banco de repertórios e banco de temas para exercício</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" /> Gráficos de evolução diária</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" /> Sugestões de reescrita da IA</li>
              </ul>
              <button onClick={() => openCheckout('intensivo')} className="w-full rounded-xl bg-brand-green px-4 py-3.5 text-sm font-bold text-brand-dark shadow-lg shadow-brand-green/20 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-400 hover:shadow-brand-green/40 md:text-base">
                Assinar Intensivo
              </button>
            </div>
          </div>
        ) : isTeachersTab ? (
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto flex h-full w-full max-w-[36rem] flex-col rounded-[2rem] border-2 border-brand-blue bg-white p-6 shadow-2xl shadow-brand-blue/10 md:p-10">

              <h3 className="mb-2 text-xl font-bold text-brand-dark md:text-2xl">Plano Professor</h3>
              <p className="mb-5 border-b border-gray-100 pb-5 text-sm text-brand-gray">Para professores que precisam corrigir mais rápido, acompanhar turmas privadas e acompanhar a evolução dos alunos com clareza.</p>
              <div className="mb-6 text-4xl font-extrabold text-brand-dark md:text-5xl">R$ 249,90<span className="text-base font-medium text-brand-gray md:text-xl">/mês</span></div>
              <ul className="mb-6 flex-1 space-y-3 text-sm text-brand-gray">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" /> <strong>50 correções</strong> por mês</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" /> Gestão de turmas privadas</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" /> Análise de evolução dos alunos</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" /> Relatórios por turma, aluno e período</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" /> Feedback pedagógico com apontamentos organizados</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" /> Suporte para uso individual em sala ou cursinho</li>
              </ul>
              <button onClick={() => openCheckout('professor')} className="w-full rounded-xl bg-brand-blue px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-brand-blue/40 md:text-base">
                Quero o plano Professor
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto flex h-full w-full max-w-[34rem] flex-col rounded-[2rem] border-2 border-brand-green bg-brand-dark p-6 text-white shadow-2xl md:p-10">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">Plano Corporativo</h3>
              <p className="mb-5 border-b border-white/10 pb-5 text-sm text-brand-light/80">Para escolas, cursinhos e redes de ensino que querem escalar resultados com acompanhamento inteligente.</p>
              <div className="mb-6 text-3xl font-extrabold text-brand-green md:text-5xl">Contate-nos</div>
              <ul className="mb-6 flex-1 space-y-3 text-sm text-brand-light">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" /> Gestão de turmas e relatórios por desempenho</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" /> Dashboard com métricas pedagógicas em tempo real</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" /> Suporte para implantação institucional</li>
              </ul>
              <a
                href="https://wa.me/?text=Ol%C3%A1%2C%20quero%20conhecer%20o%20plano%20corporativo%20da%20RedaLine."
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-xl bg-brand-green px-4 py-3.5 text-center text-sm font-bold text-brand-dark shadow-lg shadow-brand-green/20 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-400 hover:shadow-brand-green/40 md:text-base"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
      />
    </section>
  );
};

const DemoSection = () => {
  const [activeScreen, setActiveScreen] = useState(null);

  useEffect(() => {
    if (!activeScreen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveScreen(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeScreen]);

  return (
    <section id="demo" className="py-12 md:py-20 px-6 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-moss/10 text-brand-moss text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            Dashboards reais da plataforma
          </div>
          <h2 className="text-2xl md:text-5xl font-bold text-brand-dark mb-3">Demonstração dos painéis da RedaLine</h2>
          <p className="text-brand-gray text-sm md:text-lg leading-relaxed max-w-2xl">
            Abaixo estão três telas reais dos dashboards da RedaLine, com visões pensadas para aluno, professor e gestor.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {platformScreens.map((screen) => (
            <article key={screen.src} className="bg-brand-light rounded-[2rem] border border-slate-200 overflow-hidden shadow-card">
              <div className="aspect-[16/10] bg-white p-2">
                <button
                  type="button"
                  onClick={() => setActiveScreen(screen)}
                  className="block w-full h-full cursor-zoom-in overflow-hidden rounded-[1.35rem] focus:outline-none focus:ring-2 focus:ring-brand-green/60"
                  aria-label={`Ampliar ${screen.title}`}
                >
                  <img src={screen.src} alt={screen.alt} className="w-full h-full object-contain transition-transform duration-300 hover:scale-[1.02]" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-3">{screen.title}</h3>
                <p className="text-brand-gray leading-relaxed">{screen.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <div className="max-w-3xl mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-moss/10 text-brand-moss text-xs font-semibold uppercase tracking-[0.18em] mb-4">
              Tela de correção
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-brand-dark mb-4">Detalhamento da análise da redação</h3>
            <p className="text-brand-gray text-base md:text-lg leading-relaxed max-w-2xl">
              Essas telas mostram como a RedaLine evidencia os trechos analisados, os comentários e as sugestões de melhoria com clareza.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {correctionScreens.map((screen) => (
              <article key={screen.src} className="bg-brand-light rounded-[2rem] border border-slate-200 overflow-hidden shadow-card">
                <div className="aspect-[16/10] bg-white p-2">
                  <button
                    type="button"
                    onClick={() => setActiveScreen(screen)}
                    className="block w-full h-full cursor-zoom-in overflow-hidden rounded-[1.35rem] focus:outline-none focus:ring-2 focus:ring-brand-green/60"
                    aria-label={`Ampliar ${screen.title}`}
                  >
                    <img src={screen.src} alt={screen.alt} className="w-full h-full object-contain transition-transform duration-300 hover:scale-[1.02]" />
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-brand-dark mb-3">{screen.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{screen.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {activeScreen && (
          <div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm px-4 py-6 md:px-6 flex items-center justify-center"
            onClick={() => setActiveScreen(null)}
            role="presentation"
          >
            <div className="relative w-full max-w-6xl max-h-[90vh] rounded-[2rem] bg-white shadow-2xl overflow-hidden" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={activeScreen.title}>
              <button
                type="button"
                onClick={() => setActiveScreen(null)}
                className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-brand-dark text-white shadow-lg hover:bg-brand-green hover:text-brand-dark transition-colors"
                aria-label="Fechar imagem ampliada"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="max-h-[90vh] overflow-auto bg-brand-light p-3 md:p-4">
                <img src={activeScreen.src} alt={activeScreen.alt} className="w-full h-auto object-contain rounded-[1.4rem] bg-white" />
              </div>
              <div className="border-t border-slate-200 px-5 py-4 md:px-6 md:py-5 bg-white">
                <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-1">{activeScreen.title}</h3>
                <p className="text-sm md:text-base text-brand-gray">{activeScreen.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const TargetAudience = () => {
  return (
    <section id="programa" className="pt-14 pb-20 px-6 bg-brand-dark text-white">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight">Um pouco mais sobre nosso programa</h2>
      </div>

      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        {/* Card Alunos */}
        <div className="bg-white text-brand-dark rounded-[2rem] p-6 md:p-12 shadow-xl flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="hidden md:grid flex-1 grid-cols-2 gap-4">
            <div className="bg-brand-moss/10 rounded-3xl aspect-square flex items-center justify-center p-6"><BookOpen className="w-full h-full text-brand-moss opacity-80" /></div>
            <div className="bg-brand-green/20 rounded-3xl aspect-square flex items-center justify-center p-6"><PenTool className="w-full h-full text-brand-green opacity-80" /></div>
            <div className="col-span-2 relative h-40 rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Aluno estudando" loading="lazy" />
            </div>
          </div>
          <div className="flex-[1.5]">
            <div className="flex items-center gap-3 mb-5 md:mb-8">
              <Users className="text-brand-moss w-7 h-7 md:w-8 md:h-8 shrink-0" />
              <h3 className="text-2xl md:text-3xl font-bold">Alunos</h3>
            </div>
            <ul className="space-y-4 md:space-y-5 text-sm">
              <li className="flex gap-3 md:gap-4 items-start"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-dark mt-0.5" /> <span><strong>Devolutivas imediatas</strong> por meio de inteligência artificial de alta precisão.</span></li>
              <li className="flex gap-3 md:gap-4 items-start"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-dark mt-0.5" /> <span><strong>Comentários e notas</strong> atribuídos por competência e texto em geral, simulando o ENEM.</span></li>
              <li className="flex gap-3 md:gap-4 items-start"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-dark mt-0.5" /> <span><strong>Repertório atualizado</strong> de acordo com interesses e os temas mais pedidos nos vestibulares.</span></li>
              <li className="flex gap-3 md:gap-4 items-start"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-dark mt-0.5" /> <span><strong>Verificação inteligente</strong> — redação zerada automaticamente em casos de fuga ao tema.</span></li>
            </ul>
            <a href="#pricing" className="btn-primary mt-6 md:mt-8 inline-flex items-center min-h-[48px]">Ver os planos</a>
          </div>
        </div>

        {/* Card Professores e Gestores */}
        <div className="bg-white text-brand-dark rounded-[2rem] p-6 md:p-12 shadow-xl flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex-[1.5] order-1 md:order-1">
            <div className="flex items-center gap-3 mb-5 md:mb-8">
              <Building2 className="text-brand-moss w-7 h-7 md:w-8 md:h-8 shrink-0" />
              <h3 className="text-2xl md:text-3xl font-bold">Professores e Escolas</h3>
            </div>
            <ul className="space-y-4 md:space-y-5 text-sm">
              <li className="flex gap-3 md:gap-4 items-start"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-dark mt-0.5" /> <span>Relatórios com <strong>dados de desempenho da turma</strong> em tempo real.</span></li>
              <li className="flex gap-3 md:gap-4 items-start"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-dark mt-0.5" /> <span>Análise de engajamento por turma e por estudante individualmente.</span></li>
              <li className="flex gap-3 md:gap-4 items-start"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-dark mt-0.5" /> <span>Apontamento das oportunidades de <strong>evolução dos estudantes</strong>.</span></li>
              <li className="flex gap-3 md:gap-4 items-start"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-dark mt-0.5" /> <span><strong>Autonomia</strong> para complementar as devolutivas e notas oferecidas pela IA.</span></li>
            </ul>
            <a href="#pricing" className="btn-primary mt-6 md:mt-8 inline-flex items-center min-h-[48px]">Falar com consultor</a>
          </div>
          <div className="hidden md:grid flex-1 grid-cols-2 gap-4 order-2">
            <div className="col-span-2 relative h-40 rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Professor" loading="lazy" />
            </div>
            <div className="bg-brand-moss/10 rounded-3xl aspect-square flex items-center justify-center p-6"><BarChart3 className="w-full h-full text-brand-moss opacity-80" /></div>
            <div className="bg-brand-dark/10 rounded-3xl aspect-square flex items-center justify-center p-6"><Layers className="w-full h-full text-brand-dark opacity-80" /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTAStrip = () => {
  return (
    <div className="bg-brand-dark text-white py-10 md:py-12 px-6 border-b border-brand-moss/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Building2 className="w-8 h-8 md:w-12 md:h-12 text-brand-green" />
          </div>
          <div>
            <h3 className="text-xl md:text-3xl font-bold mb-1.5">Você é gestor de uma rede?</h3>
            <p className="text-white/80 text-sm md:text-base">Conheça o programa na prática e veja todos os benefícios que a IA educacional pode oferecer para sua escola.</p>
          </div>
        </div>
        <a href="#demo" className="btn-accent whitespace-nowrap min-h-[48px] flex items-center">
          Ver demonstração
        </a>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-10 md:pt-20 pb-10 px-6 relative z-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16 pt-12 md:pt-16">
        <div className="max-w-sm w-full">
          <div className="inline-flex items-center mb-4">
            <BrandLockup />
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            Mentoria inteligente em redação que gera evolução real e mensurável para os estudantes em todo o Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-24 w-full md:w-auto">
          <div>
            <h4 className="font-bold text-white mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><a href="#proposta" className="hover:text-brand-green transition-colors">Como funciona</a></li>
              <li><a href="#demo" className="hover:text-brand-green transition-colors">Demonstração</a></li>
              <li><a href="#programa" className="hover:text-brand-green transition-colors">Para Alunos</a></li>
              <li><a href="#programa" className="hover:text-brand-green transition-colors">Para Escolas</a></li>
              <li><a href="#pricing" className="hover:text-brand-green transition-colors">Planos e Preços</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><a href="/quem-somos" className="hover:text-brand-green transition-colors">Quem Somos</a></li>
              <li><a href="mailto:contato@redaline.app" className="hover:text-brand-green transition-colors">Central de Ajuda</a></li>
              <li><a href="/politica-de-privacidade.html" className="hover:text-brand-green transition-colors">Política de Privacidade</a></li>
              <li><a href="mailto:contato@redaline.app?subject=Contato%20Institucional%20RedaLine%20AI" className="hover:text-brand-green transition-colors">Contato Institucional</a></li>
            </ul>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="bg-brand-dark p-6 rounded-2xl border border-white/10">
              <h4 className="font-bold text-white mb-2">Contato</h4>
              <p className="text-sm text-white/70 mb-4">contato@redaline.app<br />Mato Grosso, Brasil</p>
              <a href="mailto:contato@redaline.app" className="btn-accent text-sm w-full py-2">Falar Conosco</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/20 text-center text-xs text-white/60">
        © 2026 RedaLine - Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div id="topo" className="w-full bg-brand-light font-sans text-brand-dark selection:bg-brand-green selection:text-brand-dark overflow-x-hidden">
      <Hero />
      <FloatingStatsCard />
      <ProposalSection />
      <DemoSection />
      <TargetAudience />
      <CTAStrip />
      <Pricing />
      <Footer />
    </div>
  );
}
