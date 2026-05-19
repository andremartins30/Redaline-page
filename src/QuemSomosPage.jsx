import React, { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Mail, MapPin, Building2, GraduationCap, Heart, Lightbulb, Users, ArrowLeft, ZoomIn } from 'lucide-react';

const brandSymbolSrc = '/new/Logo_RedaLine-removebg-preview.png';

const BrandLockup = ({ compact = false }) => {
  const iconSize = compact ? 'h-12 w-12 md:h-11 md:w-11' : 'h-24 w-24 md:h-20 md:w-20';
  const titleSize = compact ? 'text-lg md:text-xl' : 'text-3xl md:text-[2.15rem]';
  const subtitleSize = compact ? 'text-[0.55rem] md:text-[0.62rem]' : 'text-[0.62rem] md:text-[0.7rem]';

  return (
    <span className="inline-flex items-center gap-3 md:gap-4">
      <span className="grid place-items-center rounded-xl p-2 shadow-sm">
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

const navLinks = [
  { label: 'Plataforma', href: '/' },
  { label: 'Como Funciona', href: '/#proposta' },
  { label: 'Demonstração', href: '/#demo' },
  { label: 'Planos', href: '/#pricing' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-1.5 bg-brand-dark border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" aria-label="Voltar à home" className="inline-flex items-center">
          <BrandLockup compact />
        </a>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8 text-brand-light font-medium text-sm">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-brand-green transition-colors text-white/80">
                {item.label}
              </a>
            ))}
          </div>
          <a href="https://portal.redaline.app/" className="btn-primary text-xs md:text-sm py-2 px-4 md:px-6">
            Acessar<span className="hidden sm:inline">&nbsp;a plataforma</span>
          </a>
          <button className="md:hidden text-white hover:text-brand-green transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 flex flex-col items-center py-4 gap-4 shadow-xl overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 border-t border-white/10 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
        {navLinks.map((item) => (
          <a key={item.label} href={item.href} className="text-white/80 font-medium hover:text-brand-green transition-colors w-full text-center py-2">
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

const values = [
  {
    icon: GraduationCap,
    title: 'Educação como missão',
    description: 'Acreditamos que o acesso a um feedback pedagógico de qualidade é um direito, não um privilégio. Nossa tecnologia existe para democratizar esse acesso.',
  },
  {
    icon: Lightbulb,
    title: 'Inovação com propósito',
    description: 'Desenvolvemos soluções em IA com responsabilidade pedagógica. Cada funcionalidade é pensada para realmente contribuir com a evolução do aluno.',
  },
  {
    icon: Heart,
    title: 'Tecnologia humanizada',
    description: 'A tecnologia potencializa o ensino, mas o educador permanece central. Somos parceiros dos professores, não seus substitutos.',
  },
];

const team = [
  {
    name: 'Aoliabe Martins',
    role: 'CEO & Co-fundador',
    photo: '/team/aoliabe.jpg',
    bio: 'Bacharel em Ciência e Tecnologia pela UFMT, foi o idealizador do projeto que originou a RedaLine. Lidera a visão estratégica da empresa, as parcerias institucionais e o desenvolvimento de negócios, com foco em escalar o impacto da IA educacional no Brasil.',
    skills: 'Conselheiro · Gestão Multissetorial · Comercial · Pessoas · Auditoria',
    linkedin: 'https://www.linkedin.com/in/aoliabe-martins-edtech/',
    email: 'aoliabemartins@redaline.com.br',
    location: 'Cuiabá, MT',
    tags: ['Estratégia', 'EdTech', 'Negócios'],
  },
  {
    name: 'André Martins',
    role: 'CTO & Co-fundador',
    photo: '/team/andre.jpeg',
    bio: 'Bacharel em Engenharia de Software - UFMT, com experiência em sistemas distribuídos e inteligência artificial. Responsável por toda a arquitetura técnica da RedaLine — do pipeline de correção com IA à infraestrutura escalável que garante análises em menos de 30 segundos para estudantes em todo o Brasil.',
    skills: 'Engenharia de Software · Sistemas Distribuídos · Inteligência Artificial · Desenvolvimento Web & Mobile · Arquitetura de APIs',
    linkedin: 'https://www.linkedin.com/in/andremartins30',
    email: 'andre.martins@redaline.com.br',
    location: 'Cuiabá, MT',
    tags: ['Engenharia', 'IA', 'Full Stack'],
  },
  {
    name: 'Alif Maluf',
    role: 'CPO & Co-fundador',
    photo: '/team/alif.png',
    bio: 'Bacharel em Ciência e Tecnologia pela UFMT, designer de produto e especialista em TI com passagem por projetos de tecnologia educacional em universidades. Na RedaLine, lidera a experiência do produto — garantindo que a interface, os feedbacks e os fluxos pedagógicos sejam intuitivos, eficazes e verdadeiramente úteis para alunos, professores e gestores.',
    skills: 'Design de Produto · UX/UI · TI · Tecnologia Educacional',
    linkedin: 'https://www.linkedin.com/in/alifdepaulamaluf/',
    email: 'alifmaluf@redaline.com.br',
    location: 'Cuiabá, MT',
    tags: ['Produto', 'UX/UI', 'EdTech'],
  },
];

const storyParagraphs = [
  'A RedaLine nasceu dentro da Universidade Federal de Mato Grosso, a partir de um projeto acadêmico do curso de Ciência e Tecnologia, com um propósito claro: transformar a forma como redações são corrigidas no Brasil e tornar o feedback pedagógico mais acessível, rápido e eficiente para alunos e professores.',
  'O que começou como uma iniciativa universitária ganhou força ao percebermos um problema real vivido diariamente nas escolas e cursinhos: a sobrecarga dos professores, o tempo elevado para correções e a dificuldade dos estudantes em receber orientações detalhadas que realmente contribuam para sua evolução na escrita.',
  'Com o apoio de professores, instituições de ensino, alunos e parceiros do ecossistema de inovação, o projeto evoluiu para uma solução tecnológica educacional focada em correção inteligente de redações, unindo Inteligência Artificial e metodologia pedagógica humanizada.',
  'Hoje, a Martins Tecnologia atua no desenvolvimento de soluções em Inteligência Artificial aplicada à educação, realizando pesquisas e criando ferramentas que aproximam inovação tecnológica e desenvolvimento pedagógico.',
  'Nosso primeiro produto, a RedaLine, representa o início dessa missão: democratizar o acesso a correções de redação de qualidade, oferecendo feedback detalhado, acompanhamento de evolução e recursos que auxiliam alunos, professores e instituições de ensino a alcançarem melhores resultados.',
  'Acreditamos que a tecnologia não substitui o educador — ela potencializa o ensino, amplia oportunidades e ajuda a construir uma educação mais acessível, personalizada e eficiente para todos.',
];

const TeamSection = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    if (!activePhoto) return undefined;
    const handleKey = (e) => { if (e.key === 'Escape') setActivePhoto(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activePhoto]);

  return (
    <section className="py-20 md:py-28 px-6 bg-brand-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-brand-moss/10 text-brand-moss text-xs font-semibold uppercase tracking-[0.18em]">
            <Users className="w-3.5 h-3.5" />
            Time fundador
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">As pessoas por trás da RedaLine</h2>
          <p className="text-brand-gray max-w-xl mx-auto text-base md:text-lg">
            Um time multidisciplinar unido pelo mesmo propósito: tornar a educação mais eficiente e acessível para todos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <article key={member.name} className="bg-white rounded-[2rem] border border-slate-100 shadow-card overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

              {/* Área da foto */}
              <div className="relative h-56 bg-brand-dark overflow-hidden shrink-0">
                {/* Backdrop desfocado */}
                <img
                  src={member.photo}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top scale-110 blur-2xl opacity-35 saturate-150"
                />
                {/* Foto circular clicável */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setActivePhoto(member)}
                    aria-label={`Ampliar foto de ${member.name}`}
                    className="relative cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brand-green/60 rounded-full"
                  >
                    <img
                      src={member.photo}
                      alt={`Foto de ${member.name}`}
                      className="h-40 w-40 rounded-full object-cover object-top ring-4 ring-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                    </span>
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/10 pointer-events-none" />
                {/* Tags */}
                <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5 pointer-events-none">
                  {member.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-brand-green/90 text-brand-dark text-[0.62rem] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-brand-dark mb-0.5">{member.name}</h3>
                <p className="text-brand-moss text-sm font-semibold mb-1">{member.role}</p>
                <div className="flex items-center gap-1.5 text-brand-gray text-xs mb-5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {member.location}
                </div>

                <p className="text-brand-gray text-sm leading-relaxed mb-4 flex-1">{member.bio}</p>
                <p className="text-brand-gray/60 text-xs leading-relaxed mb-6 italic">{member.skills}</p>

                {/* Botões empilhados para não transbordar */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`LinkedIn de ${member.name}`}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-dark text-white text-xs font-semibold hover:bg-brand-green hover:text-brand-dark transition-all duration-200"
                  >
                    <Linkedin className="w-3.5 h-3.5 shrink-0" />
                    LinkedIn
                  </a>
                  <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 min-w-0">
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Enviar email para ${member.name}`}
                      className="shrink-0 text-brand-gray hover:text-brand-green transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-brand-gray text-xs font-semibold select-text break-all">{member.email}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal de foto */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center px-4 py-6"
          onClick={() => setActivePhoto(null)}
          role="presentation"
        >
          <div
            className="relative max-w-sm w-full rounded-[2rem] bg-brand-dark overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto de ${activePhoto.name}`}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white hover:bg-brand-green hover:text-brand-dark transition-colors"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={activePhoto.photo}
              alt={`Foto de ${activePhoto.name}`}
              className="w-full object-cover object-top max-h-[70vh]"
            />
            <div className="px-6 py-4 border-t border-white/10">
              <p className="font-bold text-white">{activePhoto.name}</p>
              <p className="text-brand-green text-sm font-semibold">{activePhoto.role}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default function QuemSomosPage() {
  return (
    <div className="w-full bg-brand-light font-sans text-brand-dark selection:bg-brand-green selection:text-brand-dark overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-24 md:pt-40 md:pb-32 px-6 bg-brand-dark text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-moss/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[300px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative text-center">
          <a href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-brand-green transition-colors text-sm mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao site
          </a>

          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-brand-green font-semibold text-xs tracking-[0.2em] border border-brand-green/30 uppercase">
            Nossa história
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
            Quem{' '}
            <span className="text-brand-green">Somos</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Uma startup nascida na universidade, com a missão de democratizar o acesso à educação de qualidade por meio da tecnologia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4 text-brand-green" />
              Cuiabá, Mato Grosso
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <GraduationCap className="w-4 h-4 text-brand-green" />
              Nascida na UFMT
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Building2 className="w-4 h-4 text-brand-green" />
              Martins Tecnologia
            </div>
          </div>
        </div>
      </section>

      {/* Nossa história */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-moss/10 text-brand-moss text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              Nossa origem
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-6">
              Do projeto acadêmico à plataforma nacional
            </h2>

            <div className="space-y-4">
              <div className="bg-brand-dark rounded-2xl p-5">
                <div className="text-brand-green text-2xl font-extrabold mb-1">+1000</div>
                <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">Redações avaliadas</div>
              </div>
              <div className="bg-brand-green rounded-2xl p-5">
                <div className="text-brand-dark text-2xl font-extrabold mb-1">30s</div>
                <div className="text-brand-dark/70 text-xs font-semibold uppercase tracking-wider">Tempo médio de correção</div>
              </div>
              <div className="bg-brand-light rounded-2xl p-5 border border-slate-200">
                <div className="text-brand-dark text-2xl font-extrabold mb-1">5</div>
                <div className="text-brand-gray text-xs font-semibold uppercase tracking-wider">Competências do ENEM</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {storyParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`leading-relaxed ${index === 0 ? 'text-xl text-brand-dark font-medium' : 'text-base text-brand-gray'}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Missão e Valores */}
      <section className="py-20 md:py-24 px-6 bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-brand-green/30 text-brand-green text-xs font-semibold uppercase tracking-[0.18em]">
              O que nos move
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">Nossos valores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/8 hover:border-brand-green/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                  <value.icon className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <TeamSection />

      {/* CTA */}
      <section className="py-20 px-6 bg-brand-green">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-5">
            Vamos construir juntos uma educação melhor?
          </h2>
          <p className="text-brand-dark/70 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Se você é uma instituição de ensino, professor, parceiro ou investidor interessado em nossa missão, fale com a gente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contato@redaline.app?subject=Contato%20Institucional%20RedaLine"
              className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-dark/30 text-sm"
            >
              <Mail className="w-4 h-4" />
              contato@redaline.app
            </a>
            <a
              href="https://portal.redaline.app/"
              className="inline-flex items-center gap-2 border-2 border-brand-dark text-brand-dark font-bold py-3.5 px-8 rounded-xl transition-all duration-300 hover:bg-brand-dark hover:text-white text-sm"
            >
              Acessar a plataforma
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-sm w-full">
            <div className="inline-flex items-center mb-4">
              <BrandLockup />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Mentoria inteligente em redação que gera evolução real e mensurável para os estudantes em todo o Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20">
            <div>
              <h4 className="font-bold text-white mb-6">Plataforma</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a href="/#proposta" className="hover:text-brand-green transition-colors">Como funciona</a></li>
                <li><a href="/#demo" className="hover:text-brand-green transition-colors">Demonstração</a></li>
                <li><a href="/#pricing" className="hover:text-brand-green transition-colors">Planos e Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Empresa</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a href="/quem-somos" className="hover:text-brand-green transition-colors text-brand-green font-semibold">Quem Somos</a></li>
                <li><a href="/politica-de-privacidade.html" className="hover:text-brand-green transition-colors">Política de Privacidade</a></li>
                <li><a href="mailto:contato@redaline.app" className="hover:text-brand-green transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/20 text-center text-xs text-white/50">
          © 2026 RedaLine · Martins Tecnologia. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
