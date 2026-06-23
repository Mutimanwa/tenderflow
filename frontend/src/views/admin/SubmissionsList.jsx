import {
  Layers, Clock, CheckCircle, XCircle, SlidersHorizontal,
  Download, Eye, ChevronLeft, ChevronRight, TrendingUp, Trash2, Loader2, MoreVertical
} from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function ManageSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null); // Stocke l'ID de la ligne dont le menu est ouvert
  const { token } = useAuth();

  // --- GESTION PROFESSIONNELLE ET PROPRE DU CLIC EXTÉRIEUR ---
  useEffect(() => {
    function handleClickOutside(event) {
      // Si le clic est en dehors de n'importe quel bloc d'action de dropdown, on ferme tout
      if (!event.target.closest('.dropdown-actions-container')) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let mounted = true;
    const doLoad = async () => {
      if (!mounted) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getSubmissions(null, token);
        if (!mounted) return;
        setSubmissions(Array.isArray(data) ? data : (data.submissions || []));
      } catch (err) {
        console.error('Failed loading submissions', err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    doLoad();
    return () => { mounted = false; };
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateSubmissionStatus(id, { status: newStatus }, token);
      setSubmissions((prev) =>
        prev.map((sub) => ((sub._id || sub.id) === id ? { ...sub, status: newStatus } : sub))
      );
      setActiveDropdown(null);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la modification du statut');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer définitivement cette soumission ?')) return;
    try {
      await api.deleteSubmission(id, token);
      setSubmissions((s) => s.filter((x) => (x._id || x.id) !== id));
      setActiveDropdown(null);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression de la soumission');
    }
  };

  const totalCount = submissions.length;
  const reviewCount = submissions.filter(s => s.status === 'pending' || s.status === 'review').length;
  const acceptedCount = submissions.filter(s => s.status === 'accepted').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

  const getStatusDetails = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'En attente', style: 'bg-amber-50 text-amber-700 border-amber-100/70' };
      case 'review':
        return { text: 'En révision', style: 'bg-blue-50 text-blue-700 border-blue-100/70' };
      case 'accepted':
        return { text: 'Acceptée', style: 'bg-emerald-50 text-emerald-700 border-emerald-100/70' };
      case 'rejected':
        return { text: 'Refusée', style: 'bg-rose-50 text-rose-700 border-rose-100/70' };
      default:
        return { text: status || 'Inconnu', style: 'bg-slate-50 text-slate-600 border-slate-200' };
    }
  };

  const getAvatarConfig = (name) => {
    if (!name) return { text: '??', bg: 'bg-slate-100 text-slate-600' };
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const charCode = name.charCodeAt(0) || 0;
    const backgrounds = [
      'bg-orange-50 text-orange-700 border border-orange-100',
      'bg-blue-50 text-blue-700 border border-blue-100',
      'bg-emerald-50 text-emerald-700 border border-emerald-100',
      'bg-purple-50 text-purple-700 border border-purple-100',
      'bg-amber-50 text-amber-700 border border-amber-100'
    ];
    return { text: initials, bg: backgrounds[charCode % backgrounds.length] };
  };

  const formatAmount = (amt) => {
    if (!amt) return 'Non spécifié';
    const num = parseFloat(String(amt).replace(/[^\d.-]/g, ''));
    if (isNaN(num)) return amt;
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'BIF', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4">
      {/* En-tête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
            <span>Dashboard</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#b45f06] font-semibold">Gestion des Soumissions</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Gestion des Soumissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Consultez et gérez les propositions reçues en temps réel pour l'ensemble des appels d'offres.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filtrer
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Exporter CSV
          </button>
        </div>
      </div>

      {/* Blocs KPI Supérieurs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm relative">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-2 border border-orange-100/40">
            <Layers className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Soumissions</p>
          <h2 className="text-xl font-black text-slate-900 mt-0.5">{loading ? '...' : totalCount}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm relative">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-2 border border-blue-100/40">
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">À réviser / Attente</p>
          <h2 className="text-xl font-black text-slate-900 mt-0.5">{loading ? '...' : reviewCount}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 border border-emerald-100/40">
            <CheckCircle className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Acceptées</p>
          <h2 className="text-xl font-black text-slate-900 mt-0.5">{loading ? '...' : acceptedCount}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-2 border border-rose-100/40">
            <XCircle className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Refusées</p>
          <h2 className="text-xl font-black text-slate-900 mt-0.5">{loading ? '...' : rejectedCount}</h2>
        </div>
      </div>

      {/* Tableau Principal */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
        {/* CORRECTIF 1 : Ajout d'une hauteur minimale (min-h-[260px]) pour éviter le rognage vertical */}
        <div className="overflow-x-auto min-h-[260px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/40 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Entreprise / Candidat</th>
                <th className="py-4 px-4">Appel d'offre lié</th>
                <th className="py-4 px-4 text-center">Montant proposé</th>
                <th className="py-4 px-4">Date de dépôt</th>
                <th className="py-4 px-4">Statut</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#b45f06]" />
                      <span>Récupération des soumissions...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-rose-500 font-bold">
                    Une erreur est survenue lors du chargement des données.
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Aucune soumission enregistrée pour le moment.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => {
                  const subId = sub._id || sub.id;
                  const userName = sub.user?.name || 'Utilisateur inconnu';
                  const userEmail = sub.user?.email || '';
                  const offerTitle = sub.offer?.title || 'Marché indisponible';
                  const offerCategory = sub.offer?.category || 'Secteur Général';
                  const avatar = getAvatarConfig(userName);
                  const statusInfo = getStatusDetails(sub.status);
                  const isDropdownOpen = activeDropdown === subId;

                  return (
                    /* CORRECTIF 2 : Elévation dynamique du z-index (relative z-30) uniquement sur la ligne active */
                    <tr 
                      key={subId} 
                      className={`hover:bg-slate-50/40 transition-colors group ${isDropdownOpen ? 'relative z-30 bg-slate-50/80' : ''}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${avatar.bg}`}>
                            {avatar.text}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-800 truncate max-w-[180px]">{userName}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[180px]">{userEmail}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <h5 className="font-bold text-slate-700 truncate" title={offerTitle}>{offerTitle}</h5>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{offerCategory}</p>
                      </td>

                      <td className="py-4 px-4 text-center font-black text-slate-800">
                        {formatAmount(sub.amount)}
                      </td>

                      <td className="py-4 px-4 text-slate-500 text-xs font-semibold">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black border tracking-wide uppercase ${statusInfo.style}`}>
                          {statusInfo.text}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            className="p-1.5 text-slate-400 hover:text-[#b45f06] hover:bg-slate-50 rounded-lg transition-colors"
                            title="Voir les détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* CORRECTIF 3 : Utilisation de la classe 'dropdown-actions-container' pour le clic extérieur */}
                          <div className="relative dropdown-actions-container">
                            <button
                              onClick={() => setActiveDropdown(isDropdownOpen ? null : subId)}
                              className={`p-1.5 rounded-lg transition-colors ${isDropdownOpen ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
                              title="Changer le statut / Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* Boîte de choix de statut flottante */}
                            {isDropdownOpen && (
                              /* Ajout d'un mt-1 et ombre portée prononcée pour l'esthétique */
                              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-1 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                                <div className="px-3 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-50">
                                  Changer le statut
                                </div>
                                <button
                                  onClick={() => handleStatusChange(subId, 'pending')}
                                  className="w-full px-3 py-2 text-slate-600 hover:bg-slate-50 font-bold flex items-center gap-2 text-left"
                                >
                                  <div className="w-2 h-2 rounded-full bg-amber-500" /> En attente
                                </button>
                                <button
                                  onClick={() => handleStatusChange(subId, 'review')}
                                  className="w-full px-3 py-2 text-slate-600 hover:bg-slate-50 font-bold flex items-center gap-2 text-left"
                                >
                                  <div className="w-2 h-2 rounded-full bg-blue-500" /> En révision
                                </button>
                                <button
                                  onClick={() => handleStatusChange(subId, 'accepted')}
                                  className="w-full px-3 py-2 text-slate-600 hover:bg-slate-50 font-bold flex items-center gap-2 text-left"
                                >
                                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> Accepter l'offre
                                </button>
                                <button
                                  onClick={() => handleStatusChange(subId, 'rejected')}
                                  className="w-full px-3 py-2 text-slate-600 hover:bg-slate-50 font-bold flex items-center gap-2 text-left"
                                >
                                  <div className="w-2 h-2 rounded-full bg-rose-500" /> Refuser l'offre
                                </button>
                                <div className="border-t border-slate-100 my-1"></div>
                                <button
                                  onClick={() => handleDelete(subId)}
                                  className="w-full px-3 py-2 text-rose-600 hover:bg-rose-50 font-black flex items-center gap-2 text-left"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Supprimer
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="bg-slate-50/30 border-t border-slate-100 p-4 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Affichage de 1 à {submissions.length} sur {totalCount} résultats</span>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:text-slate-800 transition-colors disabled:opacity-40" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-6 h-6 bg-[#b45f06] text-white font-bold flex items-center justify-center rounded-md shadow-sm">1</span>
              <button className="p-1 hover:text-slate-800 transition-colors disabled:opacity-40" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Basse d'Analyses */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3 max-w-xl">
            <h3 className="font-black text-xs text-slate-400 uppercase tracking-wider">Analyse comparative des coûts</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              L'écart moyen constaté entre les propositions financières pour les marchés récents s'équilibre. Nous recommandons de valider en priorité les dossiers complets contenant des garanties de livraison claires et des scores de conformité validés.
            </p>
          </div>

          <div className="flex gap-6 mt-6 border-t border-slate-100 pt-4">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Taux d'acceptation</p>
              <p className="text-sm font-black text-emerald-600 mt-0.5">
                {totalCount ? Math.round((acceptedCount / totalCount) * 100) : 0}%
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Dossiers à traiter</p>
              <p className="text-sm font-black text-amber-600 mt-0.5">{reviewCount} en attente</p>
            </div>
          </div>

          <div className="absolute bottom-4 right-6 text-slate-100/70 pointer-events-none hidden sm:block">
            <TrendingUp className="w-20 h-20 stroke-[1]" />
          </div>
        </div>

        <div className="lg:col-span-4 bg-[#964f05] rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-black text-xs uppercase tracking-wider text-white/90">Rapport Mensuel</h3>
            <p className="text-xs text-white/80 leading-relaxed font-semibold">
              Générez automatiquement un document de synthèse complet contenant les statistiques clés de toutes les soumissions validées ce mois-ci.
            </p>
          </div>

          <button className="w-full bg-white hover:bg-slate-50 text-[#b45f06] font-black py-2.5 px-4 rounded-xl text-xs transition-all mt-6 shadow-sm text-center">
            Télécharger la synthèse PDF
          </button>
        </div>
      </div>
    </div>
  );
}