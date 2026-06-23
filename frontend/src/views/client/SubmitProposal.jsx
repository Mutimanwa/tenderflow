import { Search, SlidersHorizontal, Download, Calendar, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

export default function MySubmissions() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour la recherche, les filtres et la pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Nombre d'éléments par page

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await api.getSubmissions(null, token);
        if (!mounted) return;
        // Ton backend renvoie directement le tableau d'objets peuplés
        setSubmissions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setSubmissions([]);
      } finally { 
        setLoading(false); 
      }
    }
    load();
    return () => { mounted = false; };
  }, [token]);

  // Formattage dynamique selon l'enum de ton modèle Mongoose Submission.js
  const getStatusBadge = (status) => {
    switch (String(status).toLowerCase()) {
      case 'accepted':
        return { label: 'ACCEPTÉE', style: 'bg-green-50 text-green-700 border-green-200' };
      case 'rejected':
        return { label: 'REFUSÉE', style: 'bg-red-50 text-red-700 border-red-200' };
      case 'review':
        return { label: 'EN EXAMEN', style: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'pending':
      default:
        return { label: 'EN ATTENTE', style: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  };

  // 1. Filtrage combiné (Recherche textuelle + Filtre de statut Mongoose)
  const filteredSubmissions = submissions.filter(row => {
    // Correspondance avec le titre de l'offre imbriquée ou l'ID de la soumission
    const offerTitle = row.offer?.title || '';
    const submissionId = row._id || '';
    const offerLower = String(offerTitle).toLowerCase();
    const submissionLower = String(submissionId).toLowerCase();
    const queryLower = String(searchTerm || '').toLowerCase();
    const matchesSearch = offerLower.includes(queryLower) || submissionLower.includes(queryLower);
    
    const matchesStatus = statusFilter === 'all' || String(row.status || '').toLowerCase() === String(statusFilter || '').toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination reset is handled inline in the input/select handlers to avoid unnecessary effect re-renders

  // 2. Calculs mathématiques pour la pagination
  const totalItems = filteredSubmissions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Tableau découpé correspondant uniquement à la page active
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  // Génération de la liste des numéros de pages à afficher
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Mes Soumissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Suivez l'état et l'historique de vos propositions déposées.
          </p>
        </div>
        
        {/* Actions d'en-tête */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-blue-100 bg-blue-50/50 hover:bg-blue-50 rounded-xl text-xs font-bold text-blue-700 transition-colors shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filtres avancés
          </button>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Exporter CSV
          </button>
        </div>
      </div>

      {/* Barre de Recherche & Filtres Rapides */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Recherche par mot clé */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recherche</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-amber-600 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Rechercher par ID ou titre de l'offre..." 
              className="w-full bg-transparent border-none outline-none text-xs text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Filtre de Statut (Connecté à ton énumération Submission) */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Statut</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-0.5">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-transparent border-none outline-none text-xs font-semibold text-slate-700 py-1.5 cursor-pointer"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente (Pending)</option>
              <option value="review">En examen (Review)</option>
              <option value="accepted">Acceptées (Accepted)</option>
              <option value="rejected">Refusées (Rejected)</option>
            </select>
          </div>
        </div>

        {/* Filtre Temporel */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Période</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <Calendar className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <span className="w-full text-xs font-semibold text-slate-700">Tous les dépôts</span>
          </div>
        </div>
      </div>

      {/* Tableau des Soumissions */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Offre</th>
                <th className="py-4 px-6">Date de dépôt</th>
                <th className="py-4 px-6">Budget proposé</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {loading && (
                <tr><td colSpan={5} className="py-10 text-center text-slate-400 font-semibold">Chargement des soumissions…</td></tr>
              )}
              
              {!loading && currentItems.length === 0 && (
                <tr><td colSpan={5} className="py-10 text-center text-slate-400 font-semibold">Aucune soumission trouvée.</td></tr>
              )}

              {!loading && currentItems.map((row, idx) => {
                const statusDetails = getStatusBadge(row.status);
                return (
                  <tr key={row._id || idx} className="hover:bg-slate-50/40 transition-colors group">
                    {/* Titre de l'offre liée via .populate('offer') */}
                    <td className="py-4 px-6 max-w-xs sm:max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-[#b45f06] transition-colors">
                            {row.offer?.title || 'Offre supprimée ou indisponible'}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">ID Soumission: {row._id}</span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Date */}
                    <td className="py-4 px-6 text-slate-500 font-semibold">
                      {row.createdAt ? new Date(row.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      }) : '—'}
                    </td>
                    
                    {/* Budget */}
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {row.amount ? `${row.amount}` : '—'}
                    </td>
                    
                    {/* Statut avec Badge synchronisé */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-extrabold tracking-wider ${statusDetails.style}`}>
                        {statusDetails.label}
                      </span>
                    </td>
                    
                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => navigate(`/app/client/submissions/${row._id}`)} className="text-xs font-bold text-[#b45f06] hover:underline">
                        Voir détails
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Barre de Pagination Active Dynamique */}
        {totalPages > 0 && (
          <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-xs text-slate-400 font-semibold bg-slate-50/20">
            <span>
              Affichage de {totalItems === 0 ? 0 : indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} sur {totalItems} soumission(s)
            </span>
            
            <div className="flex items-center gap-1">
              {/* Bouton Précédent */}
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-100 bg-white text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              
              {/* Numéros de page dynamiques */}
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center text-xs transition-colors ${
                    currentPage === number 
                      ? 'bg-amber-800 text-white shadow-sm' 
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {number}
                </button>
              ))}

              {/* Bouton Suivant */}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-100 bg-white text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}