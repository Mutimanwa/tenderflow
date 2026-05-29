import  { useState } from 'react';
import { Search, ShieldCheck, UserMinus, UserCheck, Mail, Shield, Building2 } from 'lucide-react';

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  // Données fictives issues de la logique de ta maquette Utilisateur.png
  const [users, setUsers] = useState([
    { id: 'USR-001', name: "Daniel Luc", email: "daniel.luc@techsolutions.bi", company: "Tech Solutions Ltd", role: "Fournisseur", status: "Actif", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: 'USR-002', name: "Alain Ndikumana", email: "a.ndi@innovmarketing.com", company: "Innov'Marketing", role: "Fournisseur", status: "Actif", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: 'USR-003', name: "Marie Kaneza", email: "m.kaneza@cybersec.bi", company: "Global CyberSec", role: "Fournisseur", status: "En attente", statusColor: "bg-amber-50 text-amber-600 border-amber-200" },
    { id: 'USR-004', name: "Nelson Blessing", email: "nelson@tenderflow.gov", company: "Ministère Énergie / Admin", role: "Acheteur", status: "Actif", statusColor: "bg-blue-50 text-secondary border-blue-200" },
    { id: 'USR-005', name: "Jean-Marie Buje", email: "jm.buje@logix.bi", company: "Logix Transports", role: "Fournisseur", status: "Suspendu", statusColor: "bg-rose-50 text-rose-600 border-rose-200" },
  ]);

  // Action pour modifier le statut d'un utilisateur
  const toggleUserStatus = (id, currentStatus) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        const nextStatus = currentStatus === 'Actif' ? 'Suspendu' : 'Actif';
        const nextColor = nextStatus === 'Actif' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200';
        return { ...user, status: nextStatus, statusColor: nextColor };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* En-tête de la page */}
      <div>
        <h1 className="text-2xl font-extrabold text-secondary tracking-tight">
          Gestion des Utilisateurs
        </h1>
        <p className="text-xs text-third mt-0.5">
          Contrôlez les accès à la plateforme, validez les nouveaux comptes et gérez les droits des acheteurs et fournisseurs.
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white p-4 border border-slate-100 rounded-2xl shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutralLight absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par nom, entreprise..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-secondary uppercase tracking-wider">
                <th className="py-4 px-6">Utilisateur & Contact</th>
                <th className="py-4 px-4">Entreprise rattachée</th>
                <th className="py-4 px-4">Rôle</th>
                <th className="py-4 px-4 text-center">Statut du compte</th>
                <th className="py-4 px-6 text-center">Actions d'accès</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/40 transition-colors group">
                  
                  {/* Utilisateur & Email */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-secondary text-sm">{user.name}</div>
                    <div className="text-[10px] font-medium text-third/70 mt-0.5 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {user.email}
                    </div>
                  </td>

                  {/* Entreprise */}
                  <td className="py-4 px-4 font-semibold text-third">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-neutralLight" />
                      <span>{user.company}</span>
                    </div>
                  </td>

                  {/* Rôle */}
                  <td className="py-4 px-4 font-medium text-third">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] ${
                      user.role === 'Acheteur' ? 'bg-blue-50 text-secondary' : 'bg-orange-50 text-primary'
                    }`}>
                      <Shield className="w-2.5 h-2.5" /> {user.role}
                    </span>
                  </td>

                  {/* Statut avec badge bordé */}
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold border ${user.statusColor}`}>
                      {user.status}
                    </span>
                  </td>

                  {/* Actions de contrôle directes */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {user.status === 'En attente' ? (
                        <button
                          onClick={() => toggleUserStatus(user.id, 'Suspendu')}
                          className="bg-primary text-white font-bold px-3 py-1.5 rounded-lg text-[10px] hover:bg-primary-hover transition-all flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3 h-3" /> Approuver le compte
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          className={`p-2 rounded-xl transition-all ${
                            user.status === 'Actif'
                              ? 'text-rose-500 hover:bg-rose-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={user.status === 'Actif' ? "Suspendre l'accès" : "Réactiver l'accès"}
                        >
                          {user.status === 'Actif' ? <UserMinus className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}