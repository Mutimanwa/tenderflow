import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit3, Calendar, Users,  } from 'lucide-react';

export default function ManageOffers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');

  // Données fictives calquées sur ton fichier "Appels d'offres.png"
  const initialOffers = [
    { id: 'AO-2026-001', title: "Refonte Site E-commerce Magento Enterprise", sector: "Informatique", submissions: 12, budget: "25 000 €", deadline: "2026-06-15", status: "Ouvert", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: 'AO-2026-002', title: "Campagne Social Ads & Growth Hacking", sector: "Marketing", submissions: 8, budget: "12 000 €", deadline: "2026-06-20", status: "Ouvert", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: 'AO-2026-003', title: "Audit Sécurité Cloud & Infrastructure AWS", sector: "Informatique", submissions: 19, budget: "10 000 €", deadline: "2026-06-02", status: "En révision", statusColor: "bg-amber-50 text-amber-600 border-amber-200" },
    { id: 'AO-2026-004', title: "Optimisation de la Supply Chain Globale v4.0", sector: "Logistique", submissions: 5, budget: "50 000 €", deadline: "2026-05-25", status: "Clôturé", statusColor: "bg-slate-100 text-slate-600 border-slate-200" },
    { id: 'AO-2026-005', title: "Fourniture de postes de travail de développement", sector: "Infrastructures", submissions: 14, budget: "18 500 €", deadline: "2026-06-30", status: "Ouvert", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  ];

  // Filtrage dynamique
  const filteredOffers = initialOffers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) || offer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* En-tête avec bouton d'action principale */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight">
            Gestion des Appels d'Offres
          </h1>
          <p className="text-xs text-third mt-0.5">
            Suivez, modifiez et analysez les dossiers de consultation lancés sur la plateforme.
          </p>
        </div>
        <button
          onClick={() => navigate('/app/new-offer')}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-5 rounded-xl text-xs shadow-xl shadow-primary/10 flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Publier une offre
        </button>
      </div>

      {/* Barre d'outils : Filtres & Recherche */}
      <div className="bg-white p-4 border border-slate-100 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        {/* Input de recherche */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutralLight absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par ID, mot clé..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtres par boutons de statuts */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-third/70 mr-2 hidden lg:inline flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtrer par :
          </span>
          {['Tous', 'Ouvert', 'En révision', 'Clôturé'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === status
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-slate-50 text-third border border-slate-100 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau des offres */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-secondary uppercase tracking-wider">
                <th className="py-4 px-6">Identifiant & Titre</th>
                <th className="py-4 px-4">Secteur</th>
                <th className="py-4 px-4 text-center">Soumissions</th>
                <th className="py-4 px-4 text-right">Budget estimé</th>
                <th className="py-4 px-4 text-center">Date limite</th>
                <th className="py-4 px-4 text-center">Statut</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-slate-50/40 transition-colors group">
                    {/* ID + Titre */}
                    <td className="py-4 px-6 max-w-xs md:max-w-md">
                      <span className="text-[10px] font-extrabold text-primary bg-orange-50 px-2 py-0.5 rounded-md">
                        {offer.id}
                      </span>
                      <div className="font-bold text-secondary text-sm mt-1.5 line-clamp-1 group-hover:text-primary transition-colors">
                        {offer.title}
                      </div>
                    </td>
                    
                    {/* Secteur */}
                    <td className="py-4 px-4 font-medium text-third">
                      {offer.sector}
                    </td>
                    
                    {/* Soumissions reçues */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 font-bold text-secondary rounded-lg">
                        <Users className="w-3 h-3 text-third" /> {offer.submissions}
                      </span>
                    </td>
                    
                    {/* Budget */}
                    <td className="py-4 px-4 text-right font-extrabold text-secondary">
                      {offer.budget}
                    </td>
                    
                    {/* Date Limite */}
                    <td className="py-4 px-4 text-center font-medium text-third">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-neutralLight" />
                        <span>{offer.deadline}</span>
                      </div>
                    </td>
                    
                    {/* Statut avec badge bordé */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold border ${offer.statusColor}`}>
                        {offer.status}
                      </span>
                    </td>
                    
                    {/* Actions de contrôle */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          title="Voir le dossier"
                          className="p-2 text-third hover:text-primary hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          title="Modifier"
                          className="p-2 text-third hover:text-secondary hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-third font-medium bg-slate-50/20">
                    Aucun appel d'offres ne correspond à vos critères de recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de table / Info pagination */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-third/70 px-6">
          <span>Affichage de <strong>{filteredOffers.length}</strong> sur 5 offres publiques</span>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded disabled:opacity-50" disabled>Précédent</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded disabled:opacity-50" disabled>Suivant</button>
          </div>
        </div>
      </div>

    </div>
  );
}