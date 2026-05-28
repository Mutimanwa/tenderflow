import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function DashboardAdmin() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">Tableau de bord acheteur</p>
          <h1 className="text-3xl font-bold text-slate-900">Bienvenue Nelson</h1>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Appels d'offres ouverts">
          <p className="text-4xl font-black text-slate-900">18</p>
        </Card>
        <Card title="Soumissions en attente">
          <p className="text-4xl font-black text-slate-900">9</p>
        </Card>
        <Card title="Utilisateurs actifs">
          <p className="text-4xl font-black text-slate-900">124</p>
        </Card>
      </div>
      <Card title="Appels d'offres récents">
        <div className="space-y-4">
          {[
            { title: 'Construction centre culturel', status: 'open' },
            { title: 'Maintenance réseau', status: 'inProgress' },
            { title: 'Fourniture mobilier', status: 'accepted' },
          ].map((offer) => (
            <div key={offer.title} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 px-5 py-4">
              <div>
                <p className="font-semibold text-slate-900">{offer.title}</p>
                <p className="text-sm text-slate-500">Date de publication : 12 mai 2026</p>
              </div>
              <Badge label={offer.status === 'open' ? 'Ouvert' : offer.status === 'inProgress' ? 'En cours' : 'Accepté'} variant={offer.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
