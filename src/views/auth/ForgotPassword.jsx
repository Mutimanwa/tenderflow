import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ForgotPassword() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Mot de passe oublié</h1>
        <p className="mt-3 text-sm text-slate-600">Saisissez votre email pour recevoir un lien de réinitialisation.</p>
      </div>
      <form className="space-y-6">
        <Input label="Email" type="email" placeholder="votre@exemple.com" />
        <Button className="w-full">Envoyer le lien</Button>
      </form>
      <p className="text-sm text-slate-600">
        Retour à la connexion ? <a href="/auth/login" className="font-semibold text-primary hover:text-secondary">Se connecter</a>
      </p>
    </div>
  );
}
