import React, { useState } from 'react';
import { Menu, X, CheckCircle2, Layers, BookOpenCheck, LineChart, Target, Zap, Clock, BookOpen, Users, Building2, PenTool, BarChart3 } from 'lucide-react';

const platformScreens = [
  {
    src: '/Screenshot_51.png',
    alt: 'Tela do corretor de redações com editor e nota geral',
    title: 'Correção em segundos',
    description: 'Editor para digitar ou enviar imagem, contagem de palavras e nota geral com apontamentos automáticos.',
  },
  {
    src: '/Screenshot_53.png',
    alt: 'Tela com apontamentos detalhados e competências da redação',
    title: 'Apontamentos por competência',
    description: 'Visualização de trechos destacados, filtros por gravidade e painel lateral com as 5 competências do ENEM.',
  },
  {
    src: '/Screenshot_54.png',
    alt: 'Tela de feedback qualitativo da redação',
    title: 'Feedback orientado',
    description: 'Sugestões práticas de reescrita, exemplos corrigidos e análise qualitativa para acelerar a evolução do aluno.',
  },
  {
    src: '/Screenshot_55.png',
    alt: 'Tela de sugestões de melhoria da redação',
    title: 'Sugestões acionáveis',
    description: 'Lista objetiva de melhorias com prioridade, foco em repertório, argumentação e proposta de intervenção.',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 bg-brand-dark border-b border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Lado Esquerdo - Logo */}
        <div className="flex items-center gap-2 text-white font-bold text-xl md:text-2xl tracking-tight">
          <BookOpenCheck className="text-brand-green w-6 h-6 md:w-8 md:h-8" />
          RedaLine<span className="text-brand-green"></span>
        </div>

        {/* Lado Direito - Links e Botão */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8 text-brand-light font-medium text-sm">
            <a href="#proposta" className="hover:text-brand-green transition-colors">Proposta</a>
            <a href="#demo" className="hover:text-brand-green transition-colors">Demonstração</a>
            <a href="#programa" className="hover:text-brand-green transition-colors">O Programa</a>
            <a href="#pricing" className="hover:text-brand-green transition-colors">Planos</a>
          </div>

          <a href="https://portal.redaline.app/" className="btn-primary text-xs md:text-sm py-2 px-4 md:px-6 hover:!bg-brand-green hover:!text-brand-dark hover:!shadow-brand-green/40">
            Acessar<span className="hidden sm:inline">&nbsp;a plataforma</span>
          </a>

          <button className="md:hidden text-white hover:text-brand-green transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 flex flex-col items-center py-4 gap-4 shadow-xl overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 border-t border-white/10 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
        <a href="#proposta" onClick={() => setIsOpen(false)} className="text-brand-light font-medium hover:text-brand-green transition-colors w-full text-center py-2">Proposta</a>
        <a href="#demo" onClick={() => setIsOpen(false)} className="text-brand-light font-medium hover:text-brand-green transition-colors w-full text-center py-2">Demonstração</a>
        <a href="#programa" onClick={() => setIsOpen(false)} className="text-brand-light font-medium hover:text-brand-green transition-colors w-full text-center py-2">O Programa</a>
        <a href="#pricing" onClick={() => setIsOpen(false)} className="text-brand-light font-medium hover:text-brand-green transition-colors w-full text-center py-2">Planos</a>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-32 md:pt-40 md:pb-56 px-6 bg-brand-dark text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 mb-6 rounded-full text-brand-green font-semibold text-xs tracking-[0.2em] border border-brand-green/30 uppercase">
            Corretor Inteligente de Redações
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
            Sua evolução <br />
            na escrita <br />
            <span className="text-brand-green">começa aqui..</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-light/80 mb-8 leading-relaxed font-light max-w-lg">
            Envie sua redação e receba em segundos uma análise completa nas 5 competências do ENEM.
          </p>

          <ul className="space-y-4 mb-10 text-sm md:text-base text-brand-light/90">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Nota detalhada nas 5 competências do ENEM</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Feedback personalizado com IA avançada</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Apontamentos diretos no seu texto</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-green w-5 h-5 shrink-0" /> Histórico completo de evoluções</li>
          </ul>

          <a href="#pricing" className="btn-accent text-lg w-full sm:w-auto">
            Criar conta gratuita
          </a>
        </div>

        <div className="relative hidden lg:block h-full min-h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/50 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop"
            alt="Estudante sorrindo"
            className="absolute inset-0 w-full h-full object-cover object-right"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}
          />
        </div>
      </div>
    </section>
  );
};

const FloatingStatsCard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 relative z-20 -mt-16 md:-mt-28 mb-16 md:mb-24">
      <div className="bg-brand-green rounded-[2rem] p-8 md:p-12 shadow-card flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-brand-dark text-white p-3 rounded-2xl">
              <Zap className="w-8 h-8 text-brand-green" />
            </div>
            <h2 className="text-2xl font-bold text-brand-dark">Acelerador de Aprendizagem</h2>
          </div>
          <p className="text-brand-dark/80 text-sm font-medium leading-relaxed max-w-xl">
            A inteligência artificial RedaLine é o primeiro sistema focado exclusivamente no ENEM reconhecido por
            reduzir o tempo de correção e acelerar o domínio da escrita para aprovação.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="bg-white/40 p-5 rounded-2xl text-brand-dark min-w-[160px]">
            <div className="text-3xl font-bold mb-1">+1000<span className="text-lg"></span></div>
            <div className="text-xs font-semibold uppercase opacity-70">Redações<br />Avaliadas</div>
          </div>
          <div className="bg-white/40 p-5 rounded-2xl text-brand-dark min-w-[160px]">
            <div className="text-3xl font-bold mb-1">30<span className="text-lg">s</span></div>
            <div className="text-xs font-semibold uppercase opacity-70">Tempo Médio<br />de Correção</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProposalSection = () => {
  return (
    <section id="proposta" className="py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-light text-brand-dark mb-2">Conheça a nossa proposta para</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark">impulsionar a aprendizagem<span className="text-brand-gray font-light block md:inline"> na sua rotina.</span></h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="text-brand-blue shrink-0">
                <LineChart className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-dark mb-2">Baseada em dados</h4>
                <p className="text-brand-gray text-sm leading-relaxed">Dados que permitem a personalização do estudo de acordo com necessidades individuais dos estudantes nos 5 critérios de avaliação.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-brand-blue shrink-0">
                <Target className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-dark mb-2">Alto engajamento dos alunos</h4>
                <p className="text-brand-gray text-sm leading-relaxed">Experiência interativa, rápida e lúdica que abrange revisão de desvios, compreensão textual e evolução de notas ao longo do tempo.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-brand-blue shrink-0">
                <Clock className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-dark mb-2">Mais liberdade e tempo</h4>
                <p className="text-brand-gray text-sm leading-relaxed">Acompanhamento em tempo real. Menos tempo gasto na espera por correções, mais tempo praticando técnicas de redação.</p>
              </div>
            </div>
            <a href="#demo" className="btn-primary mt-4">Ver a plataforma</a>
          </div>

          <div className="relative">
            {/* Laptop Mockup */}
            <div className="bg-brand-gray rounded-t-3xl pt-6 px-6 relative border-b-4 border-brand-dark shadow-2xl overflow-hidden aspect-video flex flex-col">
              <div className="bg-white flex-1 rounded-t-xl overflow-hidden relative border border-brand-gray/20">
                {/* Fake App Interface */}
                <div className="h-10 bg-brand-light flex items-center px-4 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6 bg-white flex h-full gap-6">
                  <div className="w-1/4 bg-brand-light rounded-lg border border-gray-100 p-4 hidden md:block">
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-3"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-8"></div>
                    <div className="w-full h-8 bg-brand-blue/10 rounded-md mb-2"></div>
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
                    {/* Floating green correction box */}
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

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 md:py-28 px-6 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            Tela real da plataforma
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">Demonstração do fluxo de correção</h2>
          <p className="text-brand-gray text-base md:text-lg leading-relaxed max-w-2xl">
            Abaixo estão telas reais do corretor da RedaLine, com visão do editor, painel por competências, feedback qualitativo e sugestões acionáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {platformScreens.map((screen) => (
            <article key={screen.src} className="bg-brand-light rounded-[2rem] border border-slate-200 overflow-hidden shadow-card">
              <div className="aspect-[16/10] bg-slate-100">
                <img src={screen.src} alt={screen.alt} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-3">{screen.title}</h3>
                <p className="text-brand-gray leading-relaxed">{screen.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const TargetAudience = () => {
  return (
    <section id="programa" className="py-20 md:py-32 px-6 bg-brand-dark text-white pt-16 md:pt-24 mt-12 md:mt-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Um pouco mais sobre nosso programa</h2>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Card Alunos */}
        <div className="bg-white text-brand-dark rounded-[2rem] p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-brand-blue/10 rounded-3xl aspect-square flex items-center justify-center p-6"><BookOpen className="w-full h-full text-brand-blue opacity-80" /></div>
            <div className="bg-brand-green/20 rounded-3xl aspect-square flex items-center justify-center p-6"><PenTool className="w-full h-full text-brand-green opacity-80" /></div>
            <div className="col-span-2 relative h-40 rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Aluno estudando" />
            </div>
          </div>
          <div className="flex-[1.5]">
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-brand-blue w-8 h-8" />
              <h3 className="text-3xl font-bold">Alunos</h3>
            </div>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-4 items-start"><CheckCircle2 className="w-6 h-6 shrink-0 text-brand-dark" /> <span><strong>Devolutivas imediatas</strong> por meio de inteligência artificial de alta precisão.</span></li>
              <li className="flex gap-4 items-start"><CheckCircle2 className="w-6 h-6 shrink-0 text-brand-dark" /> <span><strong>Comentários e notas</strong> atribuídos por competência e texto em geral, simulando o ENEM.</span></li>
              <li className="flex gap-4 items-start"><CheckCircle2 className="w-6 h-6 shrink-0 text-brand-dark" /> <span><strong>Repertório atualizado</strong> de acordo com interesses e os temas mais pedidos nos vestibulares.</span></li>
              <li className="flex gap-4 items-start"><CheckCircle2 className="w-6 h-6 shrink-0 text-brand-dark" /> <span><strong>Verificação inteligente</strong> - Redação zerada automaticamente em casos de fuga ao tema.</span></li>
            </ul>
            <a href="#pricing" className="btn-primary mt-8">Ver os planos</a>
          </div>
        </div>

        {/* Card Professores e Gestores */}
        <div className="bg-white text-brand-dark rounded-[2rem] p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-[1.5] order-2 md:order-1">
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="text-brand-blue w-8 h-8" />
              <h3 className="text-3xl font-bold">Professores e Escolas</h3>
            </div>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-4 items-start"><CheckCircle2 className="w-6 h-6 shrink-0 text-brand-dark" /> <span>Relatórios com <strong>dados de desempenho da turma</strong> em tempo real.</span></li>
              <li className="flex gap-4 items-start"><CheckCircle2 className="w-6 h-6 shrink-0 text-brand-dark" /> <span>Análise de engajamento por turma e por estudante individualmente.</span></li>
              <li className="flex gap-4 items-start"><CheckCircle2 className="w-6 h-6 shrink-0 text-brand-dark" /> <span>Apontamento das oportunidades de <strong>evolução dos estudantes</strong>.</span></li>
              <li className="flex gap-4 items-start"><CheckCircle2 className="w-6 h-6 shrink-0 text-brand-dark" /> <span><strong>Autonomia</strong> para complementar as devolutivas e notas oferecidas pela IA.</span></li>
            </ul>
            <a href="#pricing" className="btn-primary mt-8">Falar com consultor</a>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 order-1 md:order-2">
            <div className="col-span-2 relative h-40 rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Professor" />
            </div>
            <div className="bg-brand-blue/10 rounded-3xl aspect-square flex items-center justify-center p-6"><BarChart3 className="w-full h-full text-brand-blue opacity-80" /></div>
            <div className="bg-brand-dark/10 rounded-3xl aspect-square flex items-center justify-center p-6"><Layers className="w-full h-full text-brand-dark opacity-80" /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTAStrip = () => {
  return (
    <div className="bg-brand-blue text-white py-12 px-6 border-b border-brand-dark/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/10 hidden md:flex items-center justify-center shrink-0">
            <Building2 className="w-12 h-12 text-brand-green" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Você é gestor de uma rede?</h3>
            <p className="text-white/90">Conheça o programa na prática e veja todos os benefícios que a IA educacional pode oferecer para sua escola.</p>
          </div>
        </div>
        <a href="#demo" className="btn-accent whitespace-nowrap">
          Ver demonstração
        </a>
      </div>
    </div>
  );
}

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 px-6 bg-brand-light">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">Planos Para Sua Aprovação</h2>
          <p className="text-brand-gray text-lg max-w-2xl mx-auto">Escolha o plano ideal para acelerar sua preparação. Correção profissional ao seu alcance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
          {/* Plano Essencial */}
          <div className="bg-white rounded-[2rem] p-10 shadow-card border border-gray-100 flex flex-col">
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Essencial</h3>
            <p className="text-brand-gray text-sm mb-8 pb-8 border-b border-gray-100">Para estudantes que praticam toda semana.</p>
            <div className="text-5xl font-extrabold text-brand-dark mb-8">R$ 19<span className="text-xl font-medium text-brand-gray">/mês</span></div>
            <ul className="space-y-4 text-sm text-brand-gray mb-10 flex-1">
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" /> <strong>4 correções</strong> por mês</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" /> Análise detalhada de 5 competências</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" /> Nota estimada formato ENEM</li>
              <li className="flex gap-3 items-center opacity-50"><CheckCircle2 className="w-5 h-5 shrink-0" /> Sem limite de acessos ao painel</li>
            </ul>
            <button className="w-full py-4 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-blue/30 rounded-xl font-bold">
              Assinar Essencial
            </button>
          </div>

          {/* Plano Intensivo */}
          <div className="bg-brand-dark text-white rounded-[2rem] p-10 shadow-2xl relative border-2 border-brand-green transform md:-translate-y-4 flex flex-col">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-brand-green text-brand-dark px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Recomendado
            </div>
            <h3 className="text-2xl font-bold mb-2">Intensivo</h3>
            <p className="text-brand-light/70 text-sm mb-8 pb-8 border-b border-white/10">Para a máxima performance na redação.</p>
            <div className="text-5xl font-extrabold mb-8">R$ 39<span className="text-xl font-medium opacity-70">/mês</span></div>
            <ul className="space-y-4 text-sm text-brand-light mt-2 mb-10 flex-1">
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" /> <span className="text-brand-green font-bold">Correções Ilimitadas</span></li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" /> Banco de redações Nota 1000</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" /> Gráficos de evolução diária</li>
              <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" /> Sugestões de reescrita da IA</li>
            </ul>
            <button className="w-full py-4 bg-brand-green text-brand-dark hover:bg-emerald-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-brand-green/40 rounded-xl font-bold shadow-lg shadow-brand-green/20">
              Assinar Intensivo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white pt-20 md:pt-24 pb-10 px-6 mt-[-2rem] md:mt-[-4rem] relative z-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16 pt-12 md:pt-16">
        <div className="max-w-sm w-full">
          <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight mb-4">
            <BookOpenCheck className="text-brand-green w-8 h-8" />
            RedaLine<span className="text-brand-green"></span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            A tecnologia em avaliação de escrita com Inteligência Artificial que gera impacto real nas notas dos estudantes em todo o Brasil.
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
            <h4 className="font-bold text-white mb-6">Ajuda</h4>
            <ul className="space-y-4 text-sm text-white/80">
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
    <div className="w-full bg-brand-light font-sans text-brand-dark selection:bg-brand-green selection:text-brand-dark overflow-x-hidden">
      <Navbar />
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
