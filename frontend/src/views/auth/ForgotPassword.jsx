import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return alert('Veuillez saisir un email');
    setLoading(true);
    try {
      // Backend reset not implemented yet — simulate success
      await new Promise((r) => setTimeout(r, 800));
      setSent(true);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'envoi du lien');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Mot de passe oublié</h1>
        <p className="mt-3 text-sm text-slate-600">Saisissez votre email pour recevoir un lien de réinitialisation.</p>
      </div>
      {!sent ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@exemple.com" />
          <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Envoi...' : 'Envoyer le lien'}</Button>
        </form>
      ) : (
        <div className="rounded-2xl bg-slate-50 p-6">
          <p className="text-sm text-slate-700">Un lien de réinitialisation a été envoyé si l'email existe dans notre base. Vérifiez votre boîte de réception.</p>
        </div>
      )}
      <p className="text-sm text-slate-600">Retour à la connexion ? <a href="/auth/login" className="font-semibold text-primary hover:text-secondary">Se connecter</a></p>
    </div>
  );
}
