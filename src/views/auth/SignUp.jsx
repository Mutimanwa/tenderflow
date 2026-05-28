import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function SignUp() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Créer un compte</h1>
        <p className="mt-3 text-sm text-slate-600">Inscrivez-vous pour commencer à gérer vos offres et vos documents.</p>
      </div>
      <form className="space-y-6">
        <Input label="Nom complet" type="text" placeholder="Jean Dupont" />
        <Input label="Email" type="email" placeholder="votre@exemple.com" />
        <Input label="Mot de passe" type="password" placeholder="••••••••" />
        <Input label="Confirmer le mot de passe" type="password" placeholder="••••••••" />
        <Button className="w-full">Créer mon compte</Button>
      </form>
      <p className="text-sm text-slate-600">
        Déjà inscrit ? <a href="/auth/login" className="font-semibold text-primary hover:text-secondary">Se connecter</a>
      </p>
    </div>
  );
}
