import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function Login() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Connexion</h1>
        <p className="mt-3 text-sm text-slate-600">Entrez vos identifiants pour accéder à votre espace TenderFlow.</p>
      </div>
      <form className="space-y-6">
        <Input label="Email" type="email" placeholder="votre@exemple.com" />
        <Input label="Mot de passe" type="password" placeholder="••••••••" />
        <div className="flex items-center justify-between text-sm text-slate-600">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
            Se souvenir de moi
          </label>
          <a href="/auth/forgot-password" className="font-semibold text-primary hover:text-secondary">Mot de passe oublié ?</a>
        </div>
        <Button className="w-full">Se connecter</Button>
      </form>
      <p className="text-sm text-slate-600">
        Pas encore de compte ? <a href="/auth/signup" className="font-semibold text-primary hover:text-secondary">Créer un compte</a>
      </p>
    </div>
  );
}
