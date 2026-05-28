import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function OfferDetails() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">Détails de l'offre</p>
        <h1 className="text-3xl font-bold text-slate-900">Maintenance réseau et sécurité</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Client</p>
              <p className="mt-1 font-semibold text-slate-900">Centre Hospitalier Sud</p>
            </div>
            <Badge label="Ouvert" variant="open" />
          </div>
          <div className="space-y-4">
            <p className="text-sm leading-7 text-slate-600">
              Cet appel d'offres vise la mise à jour et la sécurisation de l'infrastructure réseau sur l'ensemble des sites, avec une attention particulière à la conformité RGPD et aux solutions de sauvegarde.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Budget</p>
                <p className="mt-2 font-semibold text-slate-900">120 000 €</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Date limite</p>
                <p className="mt-2 font-semibold text-slate-900">28 juin 2026</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Documents requis</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Offre technique</li>
              <li>• Offre financière</li>
              <li>• Attestations et certificats</li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-500">Actions</p>
            <Button className="w-full">Soumettre une proposition</Button>
            <Button variant="secondary" className="w-full">Télécharger le dossier</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
