import React from 'react';
import { BookOpenCheck, ChevronLeft, ShieldCheck } from 'lucide-react';

const policySections = [
    {
        title: '1. Quem somos',
        paragraphs: [
            'A RedaLine e uma plataforma educacional focada em apoio a estudantes, professores, escolas e redes de ensino na avaliacao e aprimoramento de redacoes, especialmente em contextos de preparacao para o ENEM e outros vestibulares.',
            'Esta Politica de Privacidade explica como dados pessoais podem ser coletados, utilizados, armazenados e compartilhados durante o uso do site institucional, da plataforma de correcao e dos canais de atendimento da startup.',
        ],
    },
    {
        title: '2. Dados que podemos coletar',
        paragraphs: [
            'Podemos coletar dados cadastrais e de contato, como nome, e-mail, instituicao, funcao, telefone e informacoes fornecidas em formularios de demonstracao, suporte ou criacao de conta.',
            'Tambem podemos tratar dados de uso da plataforma, como acessos, interacoes, historico de correcoes, metadados de navegacao, cookies, endereco IP, informacoes do dispositivo e registros tecnicos para seguranca e melhoria do servico.',
            'Quando a pessoa usuaria envia redacoes, imagens, temas e comentarios, esse conteudo pode ser processado para gerar nota, apontamentos, sugestoes de melhoria, relatorios e analises pedagogicas.',
        ],
    },
    {
        title: '3. Finalidades do tratamento',
        paragraphs: [
            'Usamos os dados para disponibilizar a plataforma, autenticar acessos, corrigir redacoes, gerar feedback personalizado, acompanhar evolucao de desempenho, oferecer demonstracoes, responder solicitacoes e cumprir obrigacoes legais e regulatiorias.',
            'Em contexto institucional, os dados tambem podem ser utilizados para disponibilizar paineis de acompanhamento, indicadores agregados, relatorios de turma e suporte operacional para escolas, professores e gestores.',
        ],
    },
    {
        title: '4. Bases legais e contexto educacional',
        paragraphs: [
            'O tratamento de dados pessoais pode ocorrer com fundamento na execucao de contrato, em procedimentos preliminares relacionados a contratacao, no legitimo interesse para operacao e seguranca da plataforma, no cumprimento de obrigacoes legais e, quando aplicavel, no consentimento.',
            'Quando houver tratamento de dados de criancas e adolescentes, a RedaLine adotara medidas proporcionais ao melhor interesse do menor, observando a legislacao aplicavel, o contexto escolar e as orientacoes da instituicao contratante ou do responsavel legal, quando necessario.',
        ],
    },
    {
        title: '5. Compartilhamento de dados',
        paragraphs: [
            'Os dados podem ser compartilhados com provedores de hospedagem, autenticacao, analise, atendimento, envio de e-mails, processamento de IA e infraestrutura em nuvem, sempre dentro do necessario para operacao da plataforma.',
            'Tambem pode haver compartilhamento com escolas, professores, coordenadores ou redes de ensino vinculadas a conta, conforme o perfil de acesso e a finalidade educacional do servico.',
            'Nao comercializamos dados pessoais. Qualquer compartilhamento fora das hipoteses acima dependera de base legal adequada.',
        ],
    },
    {
        title: '6. Retencao e seguranca',
        paragraphs: [
            'Mantemos os dados pelo periodo necessario para cumprir as finalidades desta politica, atender obrigacoes legais, exercer direitos em processos administrativos ou judiciais e preservar a continuidade do servico para a pessoa usuaria ou instituicao contratante.',
            'Adotamos medidas tecnicas e organizacionais razoaveis para reduzir riscos de acesso nao autorizado, vazamento, alteracao indevida e indisponibilidade, incluindo controle de acesso, monitoramento, registros de auditoria e segregacao de ambientes quando aplicavel.',
        ],
    },
    {
        title: '7. Direitos da pessoa titular',
        paragraphs: [
            'Nos termos da LGPD, a pessoa titular pode solicitar confirmacao da existencia de tratamento, acesso, correcao, anonimização, bloqueio, eliminacao, portabilidade, informacao sobre compartilhamentos e revisao de decisoes automatizadas quando aplicavel.',
            'Solicitacoes podem ser enviadas pelos canais oficiais de contato e serao analisadas considerando a identidade do solicitante, a viabilidade tecnica, a relacao contratual existente e as obrigacoes legais de retencao.',
        ],
    },
    {
        title: '8. Cookies e analytics',
        paragraphs: [
            'O site e a plataforma podem utilizar cookies e tecnologias semelhantes para autenticacao, seguranca, preferencia de idioma, mensuracao de uso, desempenho e melhoria da experiencia.',
            'Sempre que possivel, a pessoa usuaria podera gerenciar cookies pelo navegador, ciente de que a desativacao pode afetar funcionalidades essenciais.',
        ],
    },
    {
        title: '9. Transferencias internacionais',
        paragraphs: [
            'Alguns fornecedores de tecnologia podem armazenar ou processar dados em servidores localizados fora do Brasil. Nesses casos, a RedaLine buscara adotar salvaguardas contratuais e praticas compativeis com a legislacao aplicavel.',
        ],
    },
    {
        title: '10. Atualizacoes e contato',
        paragraphs: [
            'Esta politica pode ser atualizada periodicamente para refletir evolucoes do produto, exigencias legais e melhorias operacionais. Recomendamos revisao regular desta pagina.',
            'Para duvidas, exercicio de direitos ou solicitacoes relacionadas a privacidade, entre em contato pelo e-mail contato@redaline.app.',
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-brand-light text-brand-dark">
            <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                    <a href="/" className="inline-flex items-center gap-2 text-brand-dark font-bold text-xl tracking-tight">
                        <BookOpenCheck className="text-brand-green w-7 h-7" />
                        RedaLine<span className="text-brand-green"></span>
                    </a>
                    <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-dark transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        Voltar ao site
                    </a>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-card mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold uppercase tracking-[0.18em] mb-5">
                        Politica de privacidade
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacidade e protecao de dados</h1>
                            <p className="text-brand-gray text-lg leading-relaxed">Na RedaLine, a privacidade e a seguranca dos dados de nossos usuarios sao prioridades absolutas. Esta politica de privacidade descreve como coletamos, usamos, armazenamos e protegemos as informacoes pessoais que voce nos fornece ao utilizar nossa plataforma de correcao de redacoes e outros servicos relacionados. Ao acessar ou usar nossos servicos, voce concorda com os termos desta politica e com o tratamento de seus dados conforme descrito aqui:
                            </p>
                        </div>
                        <div className="bg-brand-dark text-white rounded-3xl px-5 py-4 min-w-[220px]">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldCheck className="w-5 h-5 text-brand-green" />
                                <span className="font-semibold">Versao atual</span>
                            </div>
                            <p className="text-sm text-white/80">Atualizada em 15 de marco de 2026.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {policySections.map((section) => (
                        <section key={section.title} className="bg-white border border-slate-200 rounded-[1.5rem] p-7 md:p-9 shadow-card">
                            <h2 className="text-2xl font-bold text-brand-dark mb-4">{section.title}</h2>
                            <div className="space-y-4 text-brand-gray leading-relaxed">
                                {section.paragraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}