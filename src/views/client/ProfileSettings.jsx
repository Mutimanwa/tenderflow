import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ProfileSettings() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">Paramètres du profil</p>
        <h1 className="text-3xl font-bold text-slate-900">Mon profil</h1>
      </div>
      <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <Input label="Nom complet" type="text" placeholder="Daniel Luc" />
          <Input label="Email" type="email" placeholder="daniel@exemple.com" />
          <Input label="Téléphone" type="tel" placeholder="06 12 34 56 78" />
          <Input label="Entreprise" type="text" placeholder="Luc Fournitures" />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">À propos de moi</label>
          <textarea className="w-full min-h-[140px] rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Ajoutez une courte présentation..." />
        </div>
        <Button className="w-full">Enregistrer les modifications</Button>
      </form>
    </div>
  );
}
