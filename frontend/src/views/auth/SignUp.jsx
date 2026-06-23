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
  const [error, setError] = useState(null); // État pour centraliser les messages d'erreur

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); // Réinitialise l'erreur avant une nouvelle tentative

    // 1. Validation des champs obligatoires
    if (!email || !password || !name) {
      setError('Veuillez remplir tous les champs requis (*).');
      return;
    }

    // 2. Validation de la correspondance des mots de passe
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const res = await register({ name, email, password, company, phone });
      if (res?.token) {
        navigate('/app/client/dashboard');
      }
    } catch (err) {
      console.error(err);
      // Extraction adaptative du message d'erreur de l'API
      const errorMessage = 
        err.body?.message || 
        err.response?.data?.message || 
        err.message || 
        "Une erreur est survenue lors de l'inscription.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Fonction générique pour mettre à jour les champs et effacer l'erreur au fur et à mesure
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mt-5">
        <h4 className="text-2xl font-bold text-slate-900">Créer votre compte</h4>
        <p className="w-full mt-3 text-sm text-slate-600">Commencez à gérer vos appels d’offres et soumissions en toute simplicité.</p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Zone de Feedback d'erreur stylisée */}
        {error && (
          <div className="w-96 ms-20 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3.5 text-xs font-medium animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nom complet *" type="text" value={name} onChange={handleInputChange(setName)} placeholder="Nelson Blessing" />
          <Input label="Email *" type="email" value={email} onChange={handleInputChange(setEmail)} placeholder="votre@exemple.com" />
          <Input label="Nom de l'entreprise" type="text" value={company} onChange={handleInputChange(setCompany)} placeholder="Shop" />
          <Input label="Numéro de téléphone" type="tel" value={phone} onChange={handleInputChange(setPhone)} placeholder="+257 000 000" />
        </div>
        
        <Input label="Mot de passe *" type="password" value={password} onChange={handleInputChange(setPassword)} placeholder="••••••••" />
        <Input label="Confirmer le mot de passe *" type="password" value={confirm} onChange={handleInputChange(setConfirm)} placeholder="••••••••" />

        <Button className="w-96 ms-20 mt-2" type="submit" disabled={loading}>
          {loading ? 'Création du compte...' : 'Créer mon compte'}
        </Button>
      </form>

      {/* le ---ou-- */}
      <div className="relative text-center mt-8 w-96 ms-20">
        <span className="bg-white px-2 -mt-3 text-sm text-slate-500 absolute left-1/2 transform -translate-x-1/2">ou</span>
        <div className="border-t border-slate-300 mt-4"></div>
      </div>

      {/* le bouton de connexion */}
      <a href="/auth/login">
        <Button variant='ghost' className="w-96 ms-20 mt-8 border border-primary text-primary hover:bg-primary/10">
          Se connecter
        </Button>
      </a>
    </div>
  );
}