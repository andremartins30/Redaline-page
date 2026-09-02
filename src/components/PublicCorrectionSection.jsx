import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Edit3,
  Lock,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Check,
  BookOpen,
  Download,
  Image as ImageIcon,
  Printer,
  Target,
  Zap,
  ShieldCheck,
  Share2,
  X
} from 'lucide-react';
import { exportToPdf, exportToImage } from '../utils/exportCorrection.js';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');

const ENEM_SUGGESTED_THEMES = [
  'Desafios para a valorização da herança africana no Brasil',
  'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
  'O estigma associado às doenças mentais na sociedade brasileira',
  'Democratização do acesso ao cinema no Brasil',
  'Manipulação do comportamento do usuário pelo controle de dados na internet',
  'Caminhos para combater a intolerância religiosa no Brasil',
];

const COMPETENCY_DESCRIPTIONS = {
  c1: { title: 'C1 – Norma Culta', desc: 'Domínio da modalidade escrita formal da língua portuguesa' },
  c2: { title: 'C2 – Compreensão Temática', desc: 'Compreensão da proposta e aplicação de repertório sociocultural produtivo' },
  c3: { title: 'C3 – Projeto de Texto & Argumentação', desc: 'Seleção, relação, organização e interpretação de informações e argumentos' },
  c4: { title: 'C4 – Coesão Textual', desc: 'Demonstração de conhecimento dos mecanismos linguísticos de coesão' },
  c5: { title: 'C5 – Proposta de Intervenção', desc: 'Elaboração de proposta de intervenção para o problema, respeitando direitos humanos' },
};

function formatPhone(val) {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export default function PublicCorrectionSection() {
  // Expansion state
  const [isExpanded, setIsExpanded] = useState(false);
  const formContainerRef = useRef(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [theme, setTheme] = useState('');
  const [inputMethod, setInputMethod] = useState('text'); // 'text' | 'upload'
  const [essayText, setEssayText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Workflow states: 'form' | 'ocr_loading' | 'ocr_review' | 'submitting' | 'processing' | 'result' | 'already_used' | 'error'
  const [step, setStep] = useState('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [ocrFileName, setOcrFileName] = useState('');

  // Processing & Polling states
  const [publicToken, setPublicToken] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMsg, setProgressMsg] = useState('Enviando redação...');
  const [pollIntervalId, setPollIntervalId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Export states
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);

  // Result state
  const [resultData, setResultData] = useState(null);
  const [activeTab, setActiveTab] = useState('competencias'); // 'competencias' | 'texto' | 'feedback'

  // Capture UTMs on mount
  const [utms, setUtms] = useState({});
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUtms({
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_content: params.get('utm_content') || undefined,
        utm_term: params.get('utm_term') || undefined,
      });

      // Restore session if user was waiting for correction
      const savedToken = localStorage.getItem('redaline_public_token');
      if (savedToken) {
        setPublicToken(savedToken);
        setIsExpanded(true);
        setStep('processing');
        startPolling(savedToken);
      }
    }
  }, []);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalId) clearInterval(pollIntervalId);
    };
  }, [pollIntervalId]);

  // Handle Open/Close Toggle
  const handleToggleExpand = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState) {
      setTimeout(() => {
        const section = document.getElementById('correcao-gratis');
        if (section) {
          const navbar = document.getElementById('main-navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 70;
          const targetTop = section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(targetTop - navbarHeight - 10, 0),
            behavior: 'smooth',
          });
        }
      }, 50);
    }
  };

  // Handle OCR file upload
  const handleFileUpload = async (file) => {
    if (!file) return;

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowed.includes(file.type.toLowerCase())) {
      setErrorMessage('Por favor, envie um arquivo de imagem (JPG, PNG, WEBP) ou PDF.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('O arquivo excede o limite de 10 MB.');
      return;
    }

    setSelectedFile(file);
    setOcrFileName(file.name);
    setErrorMessage('');
    setStep('ocr_loading');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/api/public-correction/ocr`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Falha ao processar OCR da imagem.');
      }

      setEssayText(data.data.text || '');
      setStep('ocr_review');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Erro ao processar OCR. Você pode digitar sua redação manualmente.');
      setStep('form');
    }
  };

  // Submit correction
  const handleSubmitCorrection = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor, informe um e-mail válido.');
      return;
    }
    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setErrorMessage('Por favor, informe seu telefone com DDD (ex: 65 99999-8888).');
      return;
    }
    if (!theme || !theme.trim()) {
      setErrorMessage('Por favor, informe o tema da redação.');
      return;
    }
    if (!essayText || !essayText.trim() || essayText.trim().length < 50) {
      setErrorMessage('A redação é obrigatória e deve conter pelo menos 50 caracteres para ser avaliada.');
      return;
    }
    if (!privacyAccepted) {
      setErrorMessage('Você deve aceitar a Política de Privacidade para prosseguir.');
      return;
    }
    if (!marketingConsent) {
      setErrorMessage('Você deve marcar a opção de recebimento de comunicações para efetuar a correção gratuita.');
      return;
    }

    setStep('submitting');
    setProgressPercent(10);
    setProgressMsg('Enviando redação para a fila de correção...');

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        theme: theme.trim(),
        essay_text: essayText.trim(),
        input_method: inputMethod,
        original_file_name: ocrFileName || undefined,
        consent_marketing: marketingConsent,
        privacy_policy_accepted: true,
        ...utms,
      };

      const res = await fetch(`${API_URL}/api/public-correction/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 403 || data.code === 'ALREADY_USED') {
        setStep('already_used');
        return;
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao enviar redação.');
      }

      const token = data.data.public_token;
      setPublicToken(token);
      localStorage.setItem('redaline_public_token', token);

      setStep('processing');
      startPolling(token);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Ocorreu um erro ao enviar. Tente novamente.');
      setStep('form');
    }
  };

  // Start polling for status
  const startPolling = (token) => {
    if (pollIntervalId) clearInterval(pollIntervalId);

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/api/public-correction/${token}/status`);
        const data = await res.json();

        if (res.ok && data.success) {
          const status = data.data.status;
          setProgressPercent(data.data.progresso_percent || 20);
          setProgressMsg(data.data.progresso_msg || 'Analisando sua redação...');

          if (status === 'concluida') {
            clearInterval(interval);
            fetchResult(token);
          } else if (status === 'erro') {
            clearInterval(interval);
            localStorage.removeItem('redaline_public_token');
            const serverMsg = data.data.erro_msg || '';
            const isTechnical = /gemini|api|key|chave|token|sql|server|500|exception|timeout/i.test(serverMsg);
            setErrorMessage(isTechnical || !serverMsg ? 'Estamos com instabilidade no momento, tente novamente mais tarde.' : serverMsg);
            setStep('error');
          }
        }
      } catch (err) {
        console.warn('Erro transitório no polling:', err);
      }
    }, 3000);

    setPollIntervalId(interval);
  };

  // Fetch full results
  const fetchResult = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/public-correction/${token}/result`);
      const data = await res.json();

      if (res.ok && data.success) {
        setResultData(data.data);
        localStorage.removeItem('redaline_public_token');
        setStep('result');
      } else {
        throw new Error('Resultado não disponível.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Erro ao carregar o resultado da correção.');
      setStep('error');
    }
  };

  // Cancel correction handler
  const handleCancelCorrection = async () => {
    if (!publicToken) {
      if (pollIntervalId) clearInterval(pollIntervalId);
      setStep('form');
      return;
    }

    if (!window.confirm('Deseja realmente cancelar a avaliação da redação? Você poderá editá-la e enviá-la novamente.')) {
      return;
    }

    setIsCancelling(true);
    try {
      if (pollIntervalId) clearInterval(pollIntervalId);
      localStorage.removeItem('redaline_public_token');

      await fetch(`${API_URL}/api/public-correction/${publicToken}/cancel`, {
        method: 'POST',
      });

      setPublicToken(null);
      setProgressPercent(0);
      setProgressMsg('Correção cancelada.');
      setStep('form');
    } catch (err) {
      console.warn('Erro ao cancelar correção:', err);
      setStep('form');
    } finally {
      setIsCancelling(false);
    }
  };

  // Export handlers
  const handleExportPdf = async () => {
    if (!resultData || isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      await exportToPdf(resultData);
    } catch (err) {
      console.error('Falha ao exportar PDF:', err);
      alert('Erro ao gerar PDF para impressão.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportImage = async () => {
    if (!resultData || isExportingImage) return;
    setIsExportingImage(true);
    try {
      await exportToImage(resultData, 'redaline-shareable-card');
    } catch (err) {
      console.error('Falha ao exportar imagem:', err);
      alert('Erro ao gerar imagem para download.');
    } finally {
      setIsExportingImage(false);
    }
  };

  const wordCount = essayText.split(/\s+/).filter(Boolean).length;
  const charCount = essayText.length;

  return (
    <section id="correcao-gratis" className="w-full py-16 md:py-24 px-4 sm:px-6 bg-brand-dark text-white relative overflow-hidden border-y border-white/10 scroll-mt-20">
      {/* Luzes decorativas ambientais em harmonia com a Landing Page */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] md:w-[650px] md:h-[650px] bg-brand-moss/25 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] md:w-[550px] md:h-[550px] bg-brand-green/15 rounded-full blur-3xl -translate-x-1/2 translate-y-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── CABEÇALHO NO PADRÃO EXATO DA LANDING PAGE ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">


          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Corrija sua redação <span className="text-brand-green">gratuitamente</span>
          </h2>

          <p className="text-brand-light/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Receba em segundos uma análise completa nas 5 competências do ENEM pela Metodologia RedaLine. Sem necessidade de cartão ou cadastro prévio.
          </p>

          {/* Destaques curtos de benefícios em cards translúcidos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-8 text-left">
            <div className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs font-semibold text-brand-light transition backdrop-blur-sm">
              <Target className="w-4 h-4 text-brand-green shrink-0" />
              <span>Nota oficial de 0 a 1000</span>
            </div>
            <div className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs font-semibold text-brand-light transition backdrop-blur-sm">
              <BarChart3 className="w-4 h-4 text-brand-green shrink-0" />
              <span>5 Competências ENEM</span>
            </div>
            <div className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs font-semibold text-brand-light transition backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-brand-green shrink-0" />
              <span>Apontamentos no texto</span>
            </div>
            <div className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs font-semibold text-brand-light transition backdrop-blur-sm">
              <Zap className="w-4 h-4 text-brand-green shrink-0" />
              <span>Resultado em segundos</span>
            </div>
            <div className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs font-semibold text-brand-light transition backdrop-blur-sm col-span-2 sm:col-span-1">
              <FileText className="w-4 h-4 text-brand-green shrink-0" />
              <span>Texto, foto ou PDF</span>
            </div>
          </div>

          {/* Botão de Abertura / Expansão */}
          {!isExpanded && step === 'form' && (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleToggleExpand}
                aria-expanded={isExpanded}
                aria-controls="public-correction-form-container"
                className="btn-accent py-4 px-8 text-base sm:text-lg font-extrabold shadow-lg shadow-brand-green/20 hover:shadow-brand-green/40 hover:scale-105 transition flex items-center justify-center gap-3 rounded-2xl mx-auto w-full sm:w-auto"
              >
                <Sparkles className="w-5 h-5 text-brand-dark" />
                Corrija sua redação aqui! (sem compromisso)
                <ChevronDown className="w-5 h-5 text-brand-dark" />
              </button>
              <p className="text-xs text-white/60 mt-3 font-light">
                Rápido • Sem compromisso • Análise oficial no padrão ENEM
              </p>
            </div>
          )}

          {/* Botão sutil de Ocultar formulário se estiver aberto em modo de preenchimento */}
          {isExpanded && step === 'form' && (
            <div className="pt-1 pb-2 flex justify-center">
              <button
                type="button"
                onClick={handleToggleExpand}
                aria-expanded={isExpanded}
                className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-brand-green font-bold underline transition"
              >
                <ChevronUp className="w-4 h-4" />
                Ocultar formulário
              </button>
            </div>
          )}
        </div>

        {/* ── ÁREA DO FORMULÁRIO E RESULTADOS EXPANSÍVEL ── */}
        <div
          id="public-correction-form-container"
          ref={formContainerRef}
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'mt-4 opacity-100' : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'}`}
        >
          <div className="bg-white text-brand-dark rounded-[2rem] shadow-2xl border border-white/10 p-6 sm:p-8 md:p-12 max-w-5xl mx-auto">

            {/* ================= ESTADO 1: FORMULÁRIO INICIAL / OCR REVIEW ================= */}
            {(step === 'form' || step === 'ocr_review') && (
              <form onSubmit={handleSubmitCorrection} className="space-y-8">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-700 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* BLOCO 1: DADOS DO LEAD */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-brand-moss text-white flex items-center justify-center font-bold text-xs">1</div>
                    <h3 className="font-bold text-brand-dark text-lg">Seus dados para envio do resultado</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Maria Silva"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-moss focus:ring-2 focus:ring-brand-moss/20 outline-none text-sm transition font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">E-mail *</label>
                      <input
                        type="email"
                        required
                        placeholder="seu.email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-moss focus:ring-2 focus:ring-brand-moss/20 outline-none text-sm transition font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">WhatsApp / Celular *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(99) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-moss focus:ring-2 focus:ring-brand-moss/20 outline-none text-sm transition font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* BLOCO 2: TEMA DA REDAÇÃO */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-brand-moss text-white flex items-center justify-center font-bold text-xs">2</div>
                    <h3 className="font-bold text-brand-dark text-lg">Tema da Redação ENEM</h3>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Digite ou selecione o tema da redação..."
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-moss focus:ring-2 focus:ring-brand-moss/20 outline-none text-sm transition font-medium font-sans"
                    />
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-gray-500 mr-1 font-sans">Sugestões:</span>
                      {ENEM_SUGGESTED_THEMES.slice(0, 3).map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTheme(item)}
                          className="text-xs bg-gray-100 hover:bg-brand-moss/15 text-gray-700 hover:text-brand-dark px-2.5 py-1 rounded-lg transition font-sans"
                        >
                          {item.length > 40 ? `${item.slice(0, 40)}...` : item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BLOCO 3: TEXTO / UPLOAD OCR */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-moss text-white flex items-center justify-center font-bold text-xs">3</div>
                      <h3 className="font-bold text-brand-dark text-lg">Redação</h3>
                    </div>

                    <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold font-sans">
                      <button
                        type="button"
                        onClick={() => setInputMethod('text')}
                        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${inputMethod === 'text' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-600 hover:text-brand-dark'}`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Digitar texto
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputMethod('upload')}
                        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${inputMethod === 'upload' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-600 hover:text-brand-dark'}`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Enviar foto / PDF
                      </button>
                    </div>
                  </div>

                  {inputMethod === 'upload' && step !== 'ocr_review' ? (
                    <div className="border-2 border-dashed border-gray-300 hover:border-brand-moss/60 rounded-2xl p-8 text-center bg-gray-50/50 hover:bg-brand-moss/5 transition cursor-pointer relative">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={(e) => handleFileUpload(e.target.files?.[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-10 h-10 text-brand-moss mx-auto mb-3 opacity-80" />
                      <p className="font-bold text-brand-dark text-sm mb-1 font-sans">
                        Clique ou arraste a imagem manuscrita ou PDF da sua redação
                      </p>
                      <p className="text-xs text-gray-500 font-sans">
                        Suporta JPG, JPEG, PNG, WEBP ou PDF até 10 MB. O texto será extraído pelo nosso OCR para sua revisão.
                      </p>
                    </div>
                  ) : (
                    <div>
                      {step === 'ocr_review' && (
                        <div className="mb-3 p-3 bg-brand-moss/10 border border-brand-moss/30 rounded-xl flex items-center justify-between text-xs text-brand-dark font-sans">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-moss shrink-0" />
                            <span>Texto extraído via OCR de <strong>{ocrFileName}</strong>. Confira e ajuste se necessário antes de corrigir.</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setStep('form'); setInputMethod('upload'); setSelectedFile(null); }}
                            className="underline hover:text-brand-moss font-semibold shrink-0 ml-2"
                          >
                            Enviar outro arquivo
                          </button>
                        </div>
                      )}
                      <textarea
                        rows={12}
                        required
                        placeholder="Cole ou digite sua redação aqui (mínimo de 50 caracteres)..."
                        value={essayText}
                        onChange={(e) => setEssayText(e.target.value)}
                        className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brand-moss focus:ring-2 focus:ring-brand-moss/20 outline-none text-sm leading-relaxed transition font-serif"
                      />
                      <div className="mt-1.5 flex justify-between items-center text-xs text-gray-500 px-1 font-sans">
                        <span>{charCount} caracteres • {wordCount} palavras</span>
                        <span>Mínimo: 50 caracteres</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* BLOCO 4: LGPD & CONSENTIMENTO (OBRIGATÓRIOS) */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-700 font-sans">
                    <input
                      type="checkbox"
                      required
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-brand-moss focus:ring-brand-moss"
                    />
                    <span>
                      Concordo com o processamento da minha redação conforme a{' '}
                      <a href="/politica-de-privacidade.html" target="_blank" rel="noreferrer" className="text-brand-moss font-semibold underline">
                        Política de Privacidade
                      </a>. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-700 font-sans">
                    <input
                      type="checkbox"
                      required
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-brand-moss focus:ring-brand-moss"
                    />
                    <span>
                      Concordo em receber a devolutiva, dicas de redação, novidades e ofertas exclusivas da RedaLine pelo WhatsApp e e-mail. *
                    </span>
                  </label>
                </div>

                {/* BOTÃO DE ENVIO */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full btn-accent py-4 text-base font-extrabold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 rounded-2xl"
                  >
                    <Sparkles className="w-5 h-5 text-brand-dark" />
                    Enviar Redação para Correção Gratuita
                    <ArrowRight className="w-5 h-5 text-brand-dark" />
                  </button>
                  <p className="text-center text-[11px] text-gray-400 mt-2.5 font-sans">
                    1 correção gratuita por pessoa • Análise de 5 competências do ENEM • Sem compromisso
                  </p>
                </div>
              </form>
            )}

            {/* ================= ESTADO 2: PROCESSANDO OCR ================= */}
            {step === 'ocr_loading' && (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-moss/20 flex items-center justify-center mx-auto animate-spin">
                  <RefreshCw className="w-8 h-8 text-brand-moss" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark">Transcrevendo sua redação...</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto font-sans">
                  Nosso motor OCR está lendo o manuscrito e organizando o texto. Em instantes você poderá revisar o conteúdo.
                </p>
              </div>
            )}

            {/* ================= ESTADO 3: PROCESSANDO CORREÇÃO (POLLING) ================= */}
            {(step === 'submitting' || step === 'processing') && (
              <div className="py-12 md:py-16 text-center space-y-6 max-w-xl mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-brand-moss text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-moss/30 animate-pulse">
                  <Sparkles className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                    Avaliando sua redação ENEM
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 font-sans">
                    Nossa inteligência pedagógica está analisando seu texto em tempo real.
                  </p>
                </div>

                {/* Barra de Progresso */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-brand-moss h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 font-medium font-sans">
                    <span className="text-brand-moss font-bold">{progressMsg}</span>
                    <span>{progressPercent}%</span>
                  </div>
                </div>

                {/* Etapas Visuais */}
                <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-500 pt-4 border-t border-gray-100 font-sans">
                  <div className={`p-2 rounded-xl border ${progressPercent >= 30 ? 'bg-brand-moss/10 border-brand-moss/40 text-brand-dark font-bold' : 'bg-gray-50 border-gray-200'}`}>
                    1. Competências
                  </div>
                  <div className={`p-2 rounded-xl border ${progressPercent >= 60 ? 'bg-brand-moss/10 border-brand-moss/40 text-brand-dark font-bold' : 'bg-gray-50 border-gray-200'}`}>
                    2. Gramática & Coesão
                  </div>
                  <div className={`p-2 rounded-xl border ${progressPercent >= 90 ? 'bg-brand-moss/10 border-brand-moss/40 text-brand-dark font-bold' : 'bg-gray-50 border-gray-200'}`}>
                    3. Feedback & Nota
                  </div>
                </div>

                {/* Botão de Cancelamento */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCancelCorrection}
                    disabled={isCancelling}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 transition font-sans"
                  >
                    <X className="w-3.5 h-3.5" />
                    {isCancelling ? 'Cancelando...' : 'Cancelar correção'}
                  </button>
                </div>
              </div>
            )}

            {/* ================= ESTADO 4: JÁ UTILIZOU CORREÇÃO ================= */}
            {step === 'already_used' && (
              <div className="py-12 text-center space-y-6 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                    Você já utilizou sua correção gratuita
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed font-sans">
                    A campanha permite <strong>1 correção gratuita por pessoa</strong>. Para continuar evoluindo suas redações com correções ilimitadas e planos de estudo, conheça a plataforma RedaLine.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center font-sans">
                  <a
                    href="#pricing"
                    className="btn-accent py-3.5 px-6 font-bold text-sm shadow-md"
                  >
                    Conhecer os planos
                  </a>
                  <button
                    type="button"
                    onClick={() => { setStep('form'); setIsExpanded(false); }}
                    className="py-3.5 px-6 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}

            {/* ================= ESTADO 5: ERRO ================= */}
            {step === 'error' && (
              <div className="py-12 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark">Não foi possível concluir a correção</h3>
                <p className="text-sm text-gray-600 font-sans">
                  {errorMessage || 'Estamos com instabilidade no momento, tente novamente mais tarde.'}
                </p>
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="btn-accent py-3 px-6 font-bold text-sm rounded-xl inline-flex items-center gap-2 font-sans"
                >
                  <RefreshCw className="w-4 h-4" />
                  Tentar novamente
                </button>
              </div>
            )}

            {/* ================= ESTADO 6: RESULTADO COMPLETO ================= */}
            {step === 'result' && resultData && (
              <div className="space-y-8 animate-fadeIn">

                {/* CABEÇALHO DO RESULTADO */}
                <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green font-bold text-xs uppercase mb-2 border border-brand-green/30 font-sans">
                      <Sparkles className="w-3.5 h-3.5" />
                      Avaliação Concluída
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black">
                      Parabéns, {resultData.name || 'Estudante'}!
                    </h3>
                    <p className="text-white/80 text-sm mt-1 max-w-xl font-sans">
                      Tema: <strong>{resultData.theme}</strong>
                    </p>
                  </div>

                  {/* NOTA TOTAL GAUGE */}
                  <div className="text-center bg-white/10 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/20 shrink-0">
                    <div className="text-xs uppercase tracking-wider text-brand-green font-bold mb-1 font-sans">Nota Estimada ENEM</div>
                    <div className="text-5xl font-black tracking-tight text-white font-sans">
                      {resultData.score_total ?? 0}
                      <span className="text-xl text-white/60 font-normal"> /1000</span>
                    </div>
                  </div>
                </div>

                {/* ── BARRA DE EXPORTAÇÃO E UTILITÁRIOS ── */}
                <div className="bg-brand-light p-5 rounded-2xl border border-brand-moss/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                  <div className="flex items-center gap-2 text-brand-dark">
                    <Download className="w-5 h-5 text-brand-moss shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Salve sua correção</h4>
                      <p className="text-xs text-gray-500">Baixe o relatório completo oficial ou um resumo para redes sociais.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleExportPdf}
                      disabled={isExportingPdf}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-brand-moss hover:bg-brand-moss/10 text-brand-dark rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      <Printer className="w-4 h-4 text-brand-moss" />
                      {isExportingPdf ? 'Gerando...' : 'Baixar PDF'}
                    </button>
                    <button
                      type="button"
                      onClick={handleExportImage}
                      disabled={isExportingImage}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-brand-moss hover:bg-brand-moss/10 text-brand-dark rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      <ImageIcon className="w-4 h-4 text-brand-moss" />
                      {isExportingImage ? 'Gerando...' : 'Baixar Imagem (JPG)'}
                    </button>
                  </div>
                </div>

                {/* TABS DE NAVEGAÇÃO DO RESULTADO */}
                <div className="flex border-b border-gray-200 font-sans">
                  <button
                    type="button"
                    onClick={() => setActiveTab('competencias')}
                    className={`py-3 px-5 text-sm font-bold border-b-2 flex items-center gap-2 transition ${activeTab === 'competencias' ? 'border-brand-moss text-brand-moss' : 'border-transparent text-gray-500 hover:text-brand-dark'}`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Competências (C1–C5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('texto')}
                    className={`py-3 px-5 text-sm font-bold border-b-2 flex items-center gap-2 transition ${activeTab === 'texto' ? 'border-brand-moss text-brand-moss' : 'border-transparent text-gray-500 hover:text-brand-dark'}`}
                  >
                    <FileText className="w-4 h-4" />
                    Redação & Apontamentos
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('feedback')}
                    className={`py-3 px-5 text-sm font-bold border-b-2 flex items-center gap-2 transition ${activeTab === 'feedback' ? 'border-brand-moss text-brand-moss' : 'border-transparent text-gray-500 hover:text-brand-dark'}`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Parecer & Sugestões
                  </button>
                </div>

                {/* CONTEÚDO DA ABA 1: COMPETÊNCIAS */}
                {activeTab === 'competencias' && (
                  <div className="space-y-4 font-sans">
                    {['c1', 'c2', 'c3', 'c4', 'c5'].map((compKey) => {
                      const score = resultData[`score_${compKey}`] ?? 0;
                      const meta = COMPETENCY_DESCRIPTIONS[compKey];
                      const geminiBlock = resultData.result?.analiseGemini?.[`competencia${compKey[1]}`];

                      return (
                        <div key={compKey} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-md transition">
                          <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                            <div>
                              <h4 className="font-bold text-brand-dark text-base">{meta.title}</h4>
                              <p className="text-xs text-gray-500">{meta.desc}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-2xl font-black text-brand-dark">{score}</span>
                              <span className="text-xs text-gray-500"> /200</span>
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden mb-3">
                            <div
                              className="bg-brand-moss h-full rounded-full"
                              style={{ width: `${(score / 200) * 100}%` }}
                            />
                          </div>

                          {geminiBlock?.pontosFortes && geminiBlock.pontosFortes.length > 0 && (
                            <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl flex items-start gap-2">
                              <Check className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                              <span><strong>Ponto forte:</strong> {geminiBlock.pontosFortes.join(' ')}</span>
                            </div>
                          )}
                          {geminiBlock?.pontosFrageis && geminiBlock.pontosFrageis.length > 0 && (
                            <div className="mt-1.5 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                              <span><strong>Atenção:</strong> {geminiBlock.pontosFrageis.join(' ')}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CONTEÚDO DA ABA 2: REDAÇÃO & APONTAMENTOS */}
                {activeTab === 'texto' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                    <div className="md:col-span-2 p-6 rounded-2xl border border-gray-200 bg-white font-serif text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
                      {resultData.essay_text}
                    </div>

                    <div className="space-y-3 font-sans">
                      <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider">
                        Apontamentos Identificados ({resultData.result?.issues?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                        {resultData.result?.issues && resultData.result.issues.length > 0 ? (
                          resultData.result.issues.map((issue, idx) => (
                            <div key={idx} className="p-3 rounded-xl border border-gray-200 bg-gray-50 text-xs space-y-1">
                              <div className="flex items-center justify-between font-bold text-brand-dark">
                                <span>#{issue.ordem || idx + 1} • {issue.competency || 'Geral'}</span>
                                <span className="text-[10px] bg-brand-moss/20 text-brand-dark px-1.5 py-0.5 rounded">{issue.category || 'Observação'}</span>
                              </div>
                              {issue.offending_text && (
                                <p className="italic text-gray-600">"{issue.offending_text}"</p>
                              )}
                              <p className="text-gray-800">{issue.teacher_feedback || issue.comentario}</p>
                              {issue.rewrite_suggestion && (
                                <p className="text-emerald-700 bg-emerald-50 p-1.5 rounded font-sans">
                                  💡 <strong>Sugestão:</strong> {issue.rewrite_suggestion}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 italic">Nenhum desvio crítico apontado no texto.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTEÚDO DA ABA 3: PARECER GERAL & SUGESTÕES */}
                {activeTab === 'feedback' && (
                  <div className="space-y-6 font-sans">
                    {resultData.result?.analiseGemini?.analiseQualitativa && (
                      <div className="p-6 rounded-2xl bg-brand-moss/10 border border-brand-moss/30">
                        <h4 className="font-bold text-brand-dark text-base mb-2">Diagnóstico Geral da RedaLine</h4>
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {resultData.result.analiseGemini.analiseQualitativa}
                        </p>
                      </div>
                    )}

                    {resultData.result?.analiseGemini?.sugestoesDetalhadas && resultData.result.analiseGemini.sugestoesDetalhadas.length > 0 && (
                      <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-3">
                        <h4 className="font-bold text-brand-dark text-base">Sugestões Pedagógicas para Evoluir</h4>
                        <ul className="space-y-2">
                          {resultData.result.analiseGemini.sugestoesDetalhadas.map((sug, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <span className="w-5 h-5 rounded-full bg-brand-moss text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{sug}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* ── CARD COMERCIAL DE CONVERSÃO / CTA FINAL ── */}
                <div className="mt-10 p-8 sm:p-10 rounded-3xl bg-brand-dark text-white text-center space-y-6 shadow-2xl relative overflow-hidden font-sans border border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-brand-green" />
                  </div>

                  <div className="space-y-2 max-w-xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                      Quer continuar evoluindo suas redações com a RedaLine?
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      Assine um de nossos planos para ter correções detalhadas ilimitadas, relatórios de evolução semanais e acesso completo ao banco de propostas.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <a
                      href="#pricing"
                      className="btn-accent py-4 px-8 text-base font-extrabold shadow-xl hover:scale-105 transition"
                    >
                      Criar minha conta para continuar evoluindo
                    </a>
                    <a
                      href="#pricing"
                      className="inline-flex items-center justify-center py-4 px-6 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition"
                    >
                      Conhecer todos os Planos
                    </a>
                  </div>
                </div>

                {/* ── ELEMENTO OCULTO PARA CAPTURA DE IMAGEM JPG DE ALTA QUALIDADE ── */}
                <div className="fixed -left-[9999px] top-0 pointer-events-none">
                  <div
                    id="redaline-shareable-card"
                    style={{ width: '800px', backgroundColor: '#001B3D', color: '#FFFFFF', padding: '40px', fontFamily: 'Inter, sans-serif' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid rgba(255,255,255,0.15)', paddingBottom: '20px', marginBottom: '24px' }}>
                      <div>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: '#FFFFFF' }}>Reda<span style={{ color: '#9EFF1F' }}>Line</span></div>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.7)', fontWeight: '700' }}>Tecnologia que Ensina</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9EFF1F', fontWeight: '800' }}>Nota Estimada ENEM</div>
                        <div style={{ fontSize: '48px', fontWeight: '900', color: '#FFFFFF', lineHeight: '1' }}>{resultData.score_total ?? 0}<span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)' }}>/1000</span></div>
                      </div>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '16px 20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: '700' }}>Estudante</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>{resultData.name || 'Estudante'}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: '700' }}>Tema</div>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: '#FFFFFF' }}>{resultData.theme}</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '24px' }}>
                      {['c1', 'c2', 'c3', 'c4', 'c5'].map((ck) => (
                        <div key={ck} style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '12px 10px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <div style={{ fontSize: '11px', fontWeight: '800', color: '#9EFF1F', textTransform: 'uppercase' }}>{ck.toUpperCase()}</div>
                          <div style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', margin: '4px 0' }}>{resultData[`score_${ck}`] ?? 0}</div>
                          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>/200</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                      <div>Correção Gratuita gerada por <strong>RedaLine</strong></div>
                      <div style={{ color: '#9EFF1F', fontWeight: '700' }}>redaline.com.br</div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
