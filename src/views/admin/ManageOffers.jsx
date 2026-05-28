import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const offers = [
  { title: 'Appel d’offres site web', location: 'Paris', deadline: '25 juin', status: 'open' },
  { title: 'Entretien parc auto', location: 'Lyon', deadline: '30 juin', status: 'inProgress' },
  { title: 'Rénovation école', location: 'Marseille', deadline: '14 juillet', status: 'accepted' },
];

export default function ManageOffers() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Gérer les appels d'offres</p>
          <h1 className="text-3xl font-bold text-slate-900">Appels d'offres</h1>
        </div>
        <Button>Nouvel appel d'offres</Button>
      </div>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{offer.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{offer.location} • Date limite {offer.deadline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge label={offer.status === 'open' ? 'Ouvert' : offer.status === 'inProgress' ? 'En cours' : 'Accepté'} variant={offer.status} />
                <Button variant="secondary">Voir</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
