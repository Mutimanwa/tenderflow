import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function DashboardClient() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">Tableau de bord fournisseur</p>
        <h1 className="text-3xl font-bold text-slate-900">Bonjour Daniel</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Offres disponibles">
          <p className="text-4xl font-black text-slate-900">12</p>
        </Card>
        <Card title="Soumissions déposées">
          <p className="text-4xl font-black text-slate-900">7</p>
        </Card>
        <Card title="Documents partagés">
          <p className="text-4xl font-black text-slate-900">23</p>
        </Card>
      </div>
      <Card title="Offres récentes">
        <div className="space-y-4">
          {[
            { title: 'Appel d’offres digitalisation', status: 'open' },
            { title: 'Maintenance informatique', status: 'inProgress' },
          ].map((offer) => (
            <div key={offer.title} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 px-5 py-4">
              <div>
                <p className="font-semibold text-slate-900">{offer.title}</p>
                <p className="text-sm text-slate-500">À consulter avant le 30 juin</p>
              </div>
              <Badge label={offer.status === 'open' ? 'Ouvert' : 'En cours'} variant={offer.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
