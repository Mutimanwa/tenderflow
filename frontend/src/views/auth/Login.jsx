import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // État pour gérer les messages d'erreur

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null); // Réinitialise l'erreur à chaque tentative

    // Validation simple côté client avant d'appeler l'API
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      setLoading(false);
      return;
    }

    try {
      const res = await login(email, password);
      if (res && res.token) {
        // Redirection selon le rôle
        const role = res.user?.role || 'buyer';
        if (role === 'admin') {
          navigate('/app/admin/dashboard');
        } else {
          navigate('/app/client/dashboard');
        }
      }
    } catch (err) {
      console.error(err);
      // Adaptation selon la structure de vos erreurs API (body, response.data, ou message)
      const errorMessage = 
        err.body?.message || 
        err.response?.data?.message || 
        err.message || 
        'Identifiants incorrects ou erreur de connexion';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Fonction pour vider l'erreur dès que l'utilisateur recommence à saisir
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h4 className="text-3xl font-bold text-slate-900">Bon retour sur TenderFlow</h4>
        <p className="mt-3 text-sm text-slate-600">Simplifiez la gestion des appels d’offres et soumissions.</p>
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

        <Input 
          label="Email" 
          type="email" 
          value={email} 
          onChange={handleEmailChange} 
          placeholder="votre@exemple.com" 
        />
        
        <Input 
          label="Mot de passe" 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="••••••••" 
        />

        {/* <div className="flex items-center justify-between text-sm text-slate-600">
          <label className="inline-flex items-center gap-2"></label>
          <a href="/auth/forgot-password" className="font-semibold text-secondary" style={{ textDecoration: 'underline' }}>
            Mot de passe oublié ?
          </a>
        </div> */}

        <Button className="w-96 ms-20 mt-5" type="submit" disabled={loading}>
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </form>

      {/* le ---ou-- */}
      <div className="w-96 ms-20 relative text-center mt-8">
        <span className="bg-white px-2 -mt-3 text-sm text-slate-500 absolute left-1/2 transform -translate-x-1/2">ou</span>
        <div className="border-t border-slate-300 mt-4"></div>
      </div>

      {/* le bouton de création de compte */}
      <div className="flex justify-start">
        <a href="/auth/signup" className="w-full">
          <Button variant="ghost" className="w-96 ms-20 mt-8 border border-primary text-primary hover:bg-primary/10">
            Créer un compte
          </Button>
        </a>
      </div>
    </div>
  );
}