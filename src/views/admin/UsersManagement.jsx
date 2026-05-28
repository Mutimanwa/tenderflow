import Button from '../../components/ui/Button';

const users = [
  { name: 'Alice Martin', role: 'Acheteur', status: 'Actif' },
  { name: 'Julien Roy', role: 'Fournisseur', status: 'Actif' },
  { name: 'Sofia Leclerc', role: 'Administrateur', status: 'Verrouillé' },
];

export default function UsersManagement() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">Gestion des utilisateurs</p>
        <h1 className="text-3xl font-bold text-slate-900">Utilisateurs</h1>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-2 py-4 text-sm font-semibold text-slate-600">
          <div>Nom</div>
          <div>Rôle</div>
          <div>Statut</div>
          <div></div>
        </div>
        <div className="divide-y divide-slate-200">
          {users.map((user) => (
            <div key={user.name} className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-2 py-4 items-center text-sm text-slate-700">
              <div>{user.name}</div>
              <div>{user.role}</div>
              <div>{user.status}</div>
              <div>
                <Button variant="secondary">Modifier</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
