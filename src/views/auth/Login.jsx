import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function Login() {
  return (
    <div className="space-y-8">
      <div className='text-center'>
        <h4 className="text-3xl font-bold text-slate-900">Bon retour sur TenderFlow</h4>
        <p className="mt-3 text-sm text-slate-600">Simplifiez la gestion des appels d’offres et soumissions.</p>
      </div>
      <form className="space-y-6" action={'/app/client/dashboard'}>
        <Input label="Email" type="email" placeholder="votre@exemple.com" />
        <Input label="Mot de passe" type="password" placeholder="••••••••" />
        <div className="flex items-center justify-between text-sm text-slate-600">
          <label className="inline-flex items-center gap-2">
          </label>
          <a href="/auth/forgot-password" className="font-semibold text-secondary " style={{ textDecoration: 'underline' }}>Mot de passe oublié ?</a>
        </div>

        <Button className="w-96 ms-20 mt-5">
          Se connecter
        </Button>

      </form>
      {/* le ---ou-- */}
      <div className="w-96 ms-20 relative text-center mt-8">
        <span className="bg-white px-2 -mt-3 text-sm text-slate-500 absolute left-1/2 transform -translate-x-1/2">ou</span>
        <div className="border-t border-slate-300 mt-4"></div>
      </div>
      {/* le bouton de creation de compte  */}
      <a href="/auth/signup">
      <Button variant='ghost' className="w-96 ms-20 mt-8 border border-primary text-primary hover:bg-primary/10">
        Créer un compte
      </Button>
       </a>
    </div>
  );
}
