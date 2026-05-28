import Button from '../../components/ui/Button';

const documents = [
  { name: 'Attestation responsabilité civile.pdf', updated: '12 mai 2026' },
  { name: 'Offre technique - projet A.pdf', updated: '20 mai 2026' },
  { name: 'Proposition financière.xlsx', updated: '22 mai 2026' },
];

export default function MyDocuments() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">Bibliothèque de documents</p>
        <h1 className="text-3xl font-bold text-slate-900">Mes documents</h1>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-600">Tous vos fichiers de soumission et preuves administratives en un seul endroit.</p>
          </div>
          <Button>Ajouter un document</Button>
        </div>
        <div className="mt-6 divide-y divide-slate-200">
          {documents.map((doc) => (
            <div key={doc.name} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{doc.name}</p>
                <p className="text-sm text-slate-500">Mis à jour le {doc.updated}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <Button variant="secondary">Ouvrir</Button>
                <Button variant="ghost">Supprimer</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
