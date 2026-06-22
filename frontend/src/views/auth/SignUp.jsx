import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function SignUp() {
  return (
    <div className="space-y-8">
      <div className="text-center mt-5">
        <h4 className="text-2xl font-bold text-slate-900">Créer votre compte</h4>
        <p className="w-full mt-3 text-sm text-slate-600">Commencez à gérer vos appels d’offres et soumissions en toute simplicité.</p>
      </div>
      <form className="space-y-6">
        <div className="flex gap-4">
          <div>
            <Input label="Nom complet" type="text" placeholder="Jean Dupont" />
        <Input label="Email" type="email" placeholder="votre@exemple.com" />
        </div>
          <div>
        <Input label="Nom de l'entreprise" type="text" placeholder="Shop" />
        <Input label="Numero de téléphone" type="tel" placeholder="+257 000 000" />
          </div>
        </div>
        <Input label="Mot de passe" type="password" placeholder="••••••••" />
        <Input label="Confirmer le mot de passe" type="password" placeholder="••••••••" />

           <Button className="w-96 ms-20">Créer mon compte</Button>  
      </form>
        {/* le ---ou-- */}
            <div className="relative text-center mt-8 w-96 ms-20">
              <span className="bg-white px-2 -mt-3 text-sm text-slate-500 absolute left-1/2 transform -translate-x-1/2">ou</span>
              <div className="border-t border-slate-300 mt-4"></div>
            </div>
            
            {/* le bouton de creation de compte  */}
            <a href="/auth/login">
            <Button variant='ghost' className="w-96 ms-20 mt-8 border border-primary text-primary hover:bg-primary/10">
              Se connecter
            </Button>
            </a>
    </div>
  );
}
