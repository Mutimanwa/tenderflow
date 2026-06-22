import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) return alert('Les mots de passe ne correspondent pas');
    if (!email || !password || !name) return alert('Veuillez remplir les champs requis');
    setLoading(true);
    try {
      const res = await register({ name, email, password, company, phone });
      if (res?.token) navigate('/app/client/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.body?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mt-5">
        <h4 className="text-2xl font-bold text-slate-900">Créer votre compte</h4>
        <p className="w-full mt-3 text-sm text-slate-600">Commencez à gérer vos appels d’offres et soumissions en toute simplicité.</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nom complet" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nelson Blessing" />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@exemple.com" />
          <Input label="Nom de l'entreprise" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Shop" />
          <Input label="Numero de téléphone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+257 000 000" />
        </div>
        <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <Input label="Confirmer le mot de passe" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />

        <Button className="w-96 ms-20" type="submit" disabled={loading}>{loading ? 'Création...' : 'Créer mon compte'}</Button>
      </form>

      <div className="relative text-center mt-8 w-96 ms-20">
        <span className="bg-white px-2 -mt-3 text-sm text-slate-500 absolute left-1/2 transform -translate-x-1/2">ou</span>
        <div className="border-t border-slate-300 mt-4"></div>
      </div>

      <a href="/auth/login">
        <Button variant='ghost' className="w-96 ms-20 mt-8 border border-primary text-primary hover:bg-primary/10">Se connecter</Button>
      </a>
    </div>
  );
}
