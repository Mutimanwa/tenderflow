import { 
  FileText, CheckCircle2, Clock, Archive, 
  Plus, Calendar, Pencil, Trash2, ChevronLeft, ChevronRight, Lightbulb, Search 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import useOffers from '../../hooks/useOffers';
import { useNavigate } from 'react-router-dom';

export default function ManageOffers() {
  const { offers, loading, error, removeOffer, fetchOffers } = useOffers();
  const navigate = useNavigate();

  // ✅ État pour les filtres et la pagination
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Recharger les données si nécessaire
  useEffect(() => {
    if (!offers.length) {
      fetchOffers();
    }
  }, []);

  const offersList = offers && offers.length ? offers : [];

  // ✅ KPIs dynamiques
  const totalOffers = offersList.length;
  const openOffers = offersList.filter(o => o.status === 'open').length;
  const inProgressOffers = offersList.filter(o => o.status === 'inProgress').length;
  const closedOffers = offersList.filter(o => o.status === 'closed' || o.status === 'accepted').length;

  // ✅ Filtrage dynamique
  const filteredOffers = offersList.filter(offer => {
    // Filtre par statut
    if (filterStatus !== 'all' && offer.status !== filterStatus) return false;
    
    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const title = (offer.title || '').toLowerCase();
      const id = (offer._id || '').toLowerCase();
      const ref = (offer.reference || '').toLowerCase();
      return title.includes(term) || id.includes(term) || ref.includes(term);
    }
    
    return true;
  });

  // ✅ Pagination dynamique
  const totalItems = filteredOffers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Génération des numéros de page
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getStatusLabel = (status) => {
    const map = {
      'open': 'Ouvert',
      'inProgress': 'En révision',
      'accepted': 'Accepté',
      'closed': 'Fermé'
    };
    return map[status] || status || '—';
  };

  const getStatusStyle = (status) => {
    const map = {
      'open': 'bg-green-50 text-green-700 border-green-200',
      'inProgress': 'bg-orange-50 text-orange-700 border-orange-200',
      'accepted': 'bg-blue-50 text-blue-700 border-blue-200',
      'closed': 'bg-slate-100 text-slate-600 border-slate-200'
    };
    return map[status] || 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const formatDate = (date) => {
    if (!date) return '—';
    try {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return '—';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Gestion des Appels d'Offres
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Supervisez, modifiez et créez de nouvelles opportunités de marché.
          </p>
        </div>
        <button 
          onClick={() => navigate('/app/admin/new-offer')} 
          className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Nouveau Dossier
        </button>
      </div>

      {/* ✅ KPIs Dynamiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
            <FileText className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Offres</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">{totalOffers}</h2>
          <span className="text-[10px] font-bold text-green-600 mt-1 block">
            {totalOffers > 0 ? '↗ Actives' : 'Aucune offre'}
          </span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ouvertes</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">{openOffers}</h2>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">
            {openOffers > 0 ? 'Actives en ce moment' : 'Aucune ouverte'}
          </span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">En Révision</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">{inProgressOffers}</h2>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">
            {inProgressOffers > 0 ? 'Attente validation' : 'Aucune en révision'}
          </span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
            <Archive className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clôturées</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">{closedOffers}</h2>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">
            {closedOffers > 0 ? 'Archives' : 'Aucune clôturée'}
          </span>
        </div>
      </div>

      {/* ✅ Barre d'outils avec filtres fonctionnels */}
      <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Barre de recherche */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-orange-500 w-full sm:w-40"
            />
          </div>
          
          {/* ✅ Filtres fonctionnels */}
          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => { setFilterStatus('all'); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                filterStatus === 'all' 
                  ? 'bg-orange-100 text-[#b45f06]' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => { setFilterStatus('open'); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                filterStatus === 'open' 
                  ? 'bg-orange-100 text-[#b45f06]' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Ouverts
            </button>
            <button
              onClick={() => { setFilterStatus('inProgress'); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                filterStatus === 'inProgress' 
                  ? 'bg-orange-100 text-[#b45f06]' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              En révision
            </button>
          </div>
        </div>
        
        <span className="text-xs font-medium text-slate-400 self-end sm:self-auto">
          Affichage de {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} résultats
        </span>
      </div>

      {/* ✅ Tableau avec pagination dynamique */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Titre de l'offre</th>
                <th className="py-4 px-4">Date limite</th>
                <th className="py-4 px-4">Statut</th>
                <th className="py-4 px-4 text-right">Budget Est.</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading && (
                <tr>
                  <td colSpan="5" className="py-6 px-6 text-center text-slate-500">Chargement des appels d'offres…</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan="5" className="py-6 px-6 text-center text-red-600">Erreur lors du chargement des offres</td>
                </tr>
              )}
              {!loading && !paginatedOffers.length && !error && (
                <tr>
                  <td colSpan="5" className="py-6 px-6 text-center text-slate-500">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Aucune offre ne correspond aux filtres appliqués.'
                      : 'Aucune offre disponible'}
                  </td>
                </tr>
              )}
              {paginatedOffers.map((offer, index) => {
                const id = offer._id || offer.id || index;
                const title = offer.title || offer.name || 'Sans titre';
                const budget = offer.budget ? (typeof offer.budget === 'number' ? offer.budget.toLocaleString() + ' €' : offer.budget) : '—';
                const status = getStatusLabel(offer.status);
                const statusStyle = getStatusStyle(offer.status);
                const deadline = offer.timeline?.deadline || offer.deadline;
                const formattedDeadline = formatDate(deadline);

                return (
                  <tr key={id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6 max-w-md">
                      <h4 className="font-bold text-slate-800 text-sm leading-snug">{title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Réf: <span className="font-semibold">{offer.reference || id.slice(-6).toUpperCase()}</span> • {offer.entity || '—'}
                      </p>
                    </td>

                    <td className="py-4 px-4 font-medium text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{formattedDeadline}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          status === 'Ouvert' ? 'bg-green-500' : 
                          status === 'En révision' ? 'bg-orange-500' : 
                          status === 'Accepté' ? 'bg-blue-500' : 'bg-slate-400'
                        }`} />
                        {status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right font-bold text-slate-700">
                      {budget}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => navigate(`/app/admin/edit-offer/${id}`)} 
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors" 
                          title="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={async () => { 
                            if (window.confirm('Supprimer cette offre ?')) { 
                              try { 
                                await removeOffer(id); 
                              } catch(err) { 
                                console.error(err); 
                                alert('Erreur suppression'); 
                              } 
                            } 
                          }} 
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination dynamique */}
        {totalPages > 1 && (
          <div className="bg-slate-50/50 border-t border-slate-100 p-4 flex items-center justify-between text-xs font-medium text-slate-500">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-2 py-1 hover:text-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>
            
            <div className="flex items-center gap-1">
              {getPageNumbers().map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
                    currentPage === num 
                      ? 'bg-[#b45f06] text-white font-bold shadow-sm' 
                      : 'hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-2 py-1 hover:text-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Section basse */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#b45f06]">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-bold text-sm text-slate-800">Guide de Publication</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Pour garantir une visibilité maximale de vos appels d'offres, assurez-vous que tous les documents techniques sont joints et que la date limite respecte le délai légal de 45 jours pour les marchés publics européens.
            </p>
          </div>
          <button className="text-xs font-bold text-[#b45f06] hover:underline text-left mt-4 block">
            Consulter les directives →
          </button>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-800">Légende des Statuts</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-700">Ouvert</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">L'offre est active et accepte de nouvelles soumissions.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-700">En Révision</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">La date limite est passée, les dossiers sont en cours d'analyse.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-700">Accepté / Clôturé</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">L'offre a été attribuée ou le processus est terminé.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}