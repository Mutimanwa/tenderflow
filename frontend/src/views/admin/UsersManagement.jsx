import  { useEffect, useState } from 'react';
import { Search, ShieldCheck, UserMinus, UserCheck, Mail, Shield, Building2, Trash2 } from 'lucide-react';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  // Données fictives issues de la logique de ta maquette Utilisateur.png
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getUsers();
      setUsers(Array.isArray(data) ? data : (data.users || []));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  // Action pour modifier le statut d'un utilisateur
  const toggleUserStatus = async (id, currentStatus) => {
    // Map frontend statuses to backend values
    const next = currentStatus === 'En attente' || currentStatus === 'suspended' || currentStatus === 'pending' ? 'active' : (currentStatus === 'Actif' || currentStatus === 'active' ? 'suspended' : 'active');
    try {
      await api.updateUser(id, { status: next }, token);
      await load();
    } catch (err) {
      console.error(err);
      alert('Erreur');
    }
  };

  const filteredUsers = users.filter(u => (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (u.company || '').toLowerCase().includes(searchTerm.toLowerCase()));

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
              {loading && <tr><td colSpan={5} className="py-6 text-center text-slate-500">Chargement…</td></tr>}
              {error && <tr><td colSpan={5} className="py-6 text-center text-red-600">Erreur</td></tr>}
              {filteredUsers.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-slate-50/40 transition-colors group">
                  
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
                      (user.role || '').toLowerCase() === 'buyer' || (user.role==='Acheteur') ? 'bg-blue-50 text-secondary' : 'bg-orange-50 text-primary'
                    }`}>
                      <Shield className="w-2.5 h-2.5" /> {user.role || '—'}
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
                      {user.status === 'pending' || user.status === 'En attente' ? (
                        <button
                          onClick={() => toggleUserStatus(user._id || user.id, 'pending')}
                          className="bg-primary text-white font-bold px-3 py-1.5 rounded-lg text-[10px] hover:bg-primary-hover transition-all flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3 h-3" /> Approuver
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleUserStatus(user._id || user.id, user.status)}
                          className={`p-2 rounded-xl transition-all ${
                            (user.status === 'active' || user.status === 'Actif')
                              ? 'text-rose-500 hover:bg-rose-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={(user.status === 'active' || user.status === 'Actif') ? "Suspendre l'accès" : "Réactiver l'accès"}
                        >
                          {(user.status === 'active' || user.status === 'Actif') ? <UserMinus className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                      )}
                      <button onClick={async ()=>{ if(!window.confirm('Supprimer cet utilisateur ?')) return; try{ await api.deleteUser(user._id || user.id, token); await load(); }catch(e){ console.error(e); alert('Erreur'); } }} className="p-2 rounded-xl text-rose-500 hover:bg-rose-50" title="Supprimer"><Trash2 className="w-4 h-4"/></button>
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