import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const offers = [
  { title: 'Fourniture de mobilier', client: 'Ville de Lyon', deadline: '28 juin', status: 'open' },
  { title: 'Refonte intranet', client: 'Agence Immo', deadline: '02 juillet', status: 'open' },
  { title: 'Sécurisation réseau', client: 'Hôpitaux Sud', deadline: '15 juillet', status: 'open' },
];

export default function AvailableOffers() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Offres disponibles</p>
          <h1 className="text-3xl font-bold text-slate-900">Appels d'offres ouverts</h1>
        </div>
        <Button variant="secondary">Filtrer</Button>
      </div>
      <div className="grid gap-6">
        {offers.map((offer) => (
          <div key={offer.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{offer.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{offer.client} • Date limite {offer.deadline}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge label="Ouvert" variant="open" />
                <Button variant="secondary">Voir</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
