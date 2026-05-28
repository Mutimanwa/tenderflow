import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const submissions = [
  { company: 'Alpha Services', offer: 'Entretien parc auto', date: '18 mai', status: 'inProgress' },
  { company: 'BTP Groupe', offer: 'Rénovation école', date: '15 mai', status: 'open' },
  { company: 'Expert Solutions', offer: 'Site web municipal', date: '13 mai', status: 'accepted' },
];

export default function SubmissionsList() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">Soumissions reçues</p>
        <h1 className="text-3xl font-bold text-slate-900">Gestion des réponses</h1>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-sm font-semibold uppercase text-slate-500">
          <div>Entreprise</div>
          <div>Offre</div>
          <div>Date</div>
          <div>Statut</div>
        </div>
        <div className="divide-y divide-slate-200">
          {submissions.map((item) => (
            <div key={item.company} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-5 items-center text-sm text-slate-700">
              <div>{item.company}</div>
              <div>{item.offer}</div>
              <div>{item.date}</div>
              <div className="flex items-center justify-between gap-4">
                <Badge label={item.status === 'open' ? 'Ouvert' : item.status === 'inProgress' ? 'En cours' : 'Accepté'} variant={item.status} />
                <Button variant="ghost">Voir</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
