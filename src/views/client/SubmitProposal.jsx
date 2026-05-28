import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function SubmitProposal() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">Nouvelle soumission d'offre</p>
        <h1 className="text-3xl font-bold text-slate-900">Envoyer une proposition</h1>
      </div>
      <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Input label="Titre de la proposition" type="text" placeholder="Proposition pour maintenance réseau" />
        <Input label="Montant proposé" type="text" placeholder="€ 110 000" />
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Résumé de la proposition</label>
          <textarea className="w-full min-h-[180px] rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Résumé de l'offre et points forts..."></textarea>
        </div>
        <div className="space-y-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Téléversement de fichiers</p>
          <p>Glissez et déposez vos documents ou cliquez pour sélectionner des fichiers.</p>
        </div>
        <Button className="w-full">Soumettre ma proposition</Button>
      </form>
    </div>
  );
}
