import Button from '../../components/ui/Button';

const offers = [
  { id: 1, tag: 'Informatique', title: 'Refonte Site E-commerce Magento', budget: '25 000€', duration: 'Expire dans 3 jours', color: 'bg-orange-50 text-primary' },
    { id: 2, tag: 'Marketing', title: 'Campagne Social Ads Internationale', budget: '12 000€', duration: 'Expire dans 10 jours', color: 'bg-blue-50 text-secondary' },
    { id: 3, tag: 'Informatique', title: 'Audit Sécurité Cloud & Infrastructure', budget: '10 000€', duration: 'Expire dans 2 jours', color: 'bg-orange-50 text-primary' },
    { id: 4, tag: 'Logistique', title: 'Optimisation Supply Chain v4.0', budget: '50 000€', duration: 'Expire dans 5 jours', color: 'bg-emerald-50 text-emerald-600' },
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

      {/*  */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between">
                   <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-md mb-4 ${offer.color}`}>{offer.tag}</span>
                   <span className='text-[11] font-bold text-primary-hover'>{offer.budget}</span>
                </div>
                <h3 className="font-bold text-secondary text-base leading-snug mb-2 line-clamp-2">{offer.title}</h3>               
                <p className="text-xs text-rose-500 font-medium mb-6">{offer.duration}</p>
              </div>
              <button className="w-full py-2.5 text-center text-sm font-semibold border border-neutralLight text-secondary rounded-xl hover:border-primary hover:text-primary transition-colors">Voir l'offre</button>
            </div>
          ))}
        </div>
      {/*  */}
    </div>
  );
}
