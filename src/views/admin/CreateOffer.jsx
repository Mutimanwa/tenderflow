import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function CreateOffer() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">Créer un nouvel appel d'offres</p>
        <h1 className="text-3xl font-bold text-slate-900">Nouvelle offre</h1>
      </div>
      <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <Input label="Titre de l'offre" type="text" placeholder="Nom de l'appel d'offres" />
          <Input label="Lieu" type="text" placeholder="Ville ou région" />
          <Input label="Budget estimé" type="text" placeholder="€ 40 000" />
          <Input label="Date limite" type="date" />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea className="w-full min-h-[180px] rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Rédigez les besoins du projet..."></textarea>
        </div>
        <Button className="w-full">Publier l'offre</Button>
      </form>
    </div>
  );
}
