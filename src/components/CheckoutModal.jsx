// Redaline-page/src/components/CheckoutModal.jsx
import { useState } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function CheckoutModal({ isOpen, onClose, plan }) {
  const [step, setStep] = useState('email'); // 'email' | 'login' | 'register' | 'redirecting'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !plan) return null;

  const reset = () => {
    setStep('email');
    setEmail('');
    setName('');
    setPassword('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/checkout/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao verificar email');
      setStep(data.data.exists ? 'login' : 'register');
    } catch (err) {
      setError(err.message || 'Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginAndCheckout = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setStep('redirecting');
    try {
      const res = await fetch(`${API_URL}/api/checkout/login-and-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, plan_id: plan.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStep('login');
        setError(data.error || 'Email ou senha incorretos.');
        return;
      }
      window.location.href = data.data.init_point;
    } catch {
      setStep('login');
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAndCheckout = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setStep('redirecting');
    try {
      const res = await fetch(`${API_URL}/api/checkout/register-and-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password, plan_id: plan.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStep('register');
        setError(data.error || 'Erro ao criar conta. Tente novamente.');
        return;
      }
      window.location.href = data.data.init_point;
    } catch {
      setStep('register');
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        {step !== 'redirecting' && (
          <button
            onClick={handleClose}
            className="absolute right-5 top-5 rounded-full p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Cabeçalho com resumo do plano */}
        <div className="mb-6">
          <p className="text-sm font-medium text-brand-gray">Você selecionou</p>
          <h2 className="text-2xl font-bold text-brand-dark">{plan.name}</h2>
          <p className="text-lg font-semibold text-brand-blue">
            R$ {plan.price.toFixed(2).replace('.', ',')}
            <span className="ml-1 text-sm font-normal text-brand-gray">· {plan.credits} créditos</span>
          </p>
        </div>

        {/* Step: email */}
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-dark">Seu e-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark/90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continuar'}
            </button>
          </form>
        )}

        {/* Step: login (email já existe) */}
        {step === 'login' && (
          <form onSubmit={handleLoginAndCheckout} className="space-y-4">
            <p className="text-sm text-brand-gray">
              Encontramos uma conta com <strong>{email}</strong>. Insira sua senha para continuar.
            </p>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-dark">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark/90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Entrar e pagar'}
            </button>
            <button type="button" onClick={() => setStep('email')} className="w-full text-center text-sm text-brand-gray hover:text-brand-dark">
              ← Usar outro e-mail
            </button>
          </form>
        )}

        {/* Step: register (email novo) */}
        {step === 'register' && (
          <form onSubmit={handleRegisterAndCheckout} className="space-y-4">
            <p className="text-sm text-brand-gray">
              Crie sua conta para continuar. Leva menos de 1 minuto.
            </p>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-dark">Nome completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-dark">Senha</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark/90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Criar conta e pagar'}
            </button>
            <button type="button" onClick={() => setStep('email')} className="w-full text-center text-sm text-brand-gray hover:text-brand-dark">
              ← Usar outro e-mail
            </button>
          </form>
        )}

        {/* Step: redirecting */}
        {step === 'redirecting' && (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-brand-blue" />
            <p className="font-semibold text-brand-dark">Aguarde...</p>
            <p className="text-sm text-brand-gray">Redirecionando para o pagamento seguro.</p>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-gray-400">
          Pagamento processado com segurança pelo Mercado Pago
        </p>
      </div>
    </div>
  );
}
