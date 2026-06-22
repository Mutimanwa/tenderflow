import { 
  FileText, CheckCircle2, Clock, Archive, SlidersHorizontal, 
  Plus, Calendar, Pencil, Trash2, ChevronLeft, ChevronRight, Lightbulb 
} from 'lucide-react';
import useOffers from '../../hooks/useOffers';
import { useNavigate } from 'react-router-dom';

export default function ManageOffers() {
  const { offers, loading, error, removeOffer } = useOffers();
  const navigate = useNavigate();

  // If API returns at top-level an object with `offers`, use that. Already handled in hook.

  const offersList = offers && offers.length ? offers : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Gestion des Appels d'Offres
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Supervisez, modifiez et créez de nouvelles opportunités de marché.
          </p>
        </div>
        <button onClick={() => navigate('/app/admin/new-offer')} className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Nouveau Dossier
        </button>
      </div>

      {/* 1. Ligne de KPIs / Compteurs (4 Colonnes) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
            <FileText className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Offres</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">124</h2>
          <span className="text-[10px] font-bold text-green-600 mt-1 block">↗ +12% ce mois</span>
        </div>

        {/* Ouvertes */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ouvertes</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">42</h2>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">Actives en ce moment</span>
        </div>

        {/* En Révision */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">En Révision</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">18</h2>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">Attente validation</span>
        </div>

        {/* Clôturées */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
            <Archive className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clôturées</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">64</h2>
          <span className="text-[10px] font-medium text-slate-400 mt-1 block">Archives historiques</span>
        </div>
      </div>

      {/* 2. Barre d'outils & Filtres */}
      <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filtres
          </button>
          
          {/* Badges de tri rapide */}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="px-3 py-1 bg-orange-100 text-[#b45f06] rounded-full text-xs font-bold cursor-pointer">Tous</span>
            <span className="px-3 py-1 text-slate-500 hover:bg-slate-50 rounded-full text-xs font-medium cursor-pointer">Actifs</span>
            <span className="px-3 py-1 text-slate-500 hover:bg-slate-50 rounded-full text-xs font-medium cursor-pointer">Urgents</span>
          </div>
        </div>
        
        <span className="text-xs font-medium text-slate-400 self-end sm:self-auto">
          Affichage de <strong className="text-slate-700">1-10</strong> sur 124 résultats
        </span>
      </div>

      {/* 3. Tableau principal des Appels d'Offres */}
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
              {!loading && !offersList.length && !error && (
                <tr>
                  <td colSpan="5" className="py-6 px-6 text-center text-slate-500">Aucune offre disponible</td>
                </tr>
              )}
              {offersList.map((offer, index) => {
                const id = offer._id || offer.id || index;
                const title = offer.title || offer.name || 'Sans titre';
                const category = offer.sector || offer.category || offer.type || '—';
                const deadline = offer.deadline ? new Date(offer.deadline).toLocaleDateString() : (offer.deadline || '—');
                const budget = offer.budget ? (typeof offer.budget === 'number' ? offer.budget.toLocaleString() + ' €' : offer.budget) : '—';
                const status = offer.status || (offer.closed ? 'Fermé' : 'Ouvert');
                const isUrgent = offer.isUrgent || false;
                const statusStyle = status === 'Ouvert' ? 'bg-green-50 text-green-700 border-green-200' : status === 'En révision' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-slate-100 text-slate-600 border-slate-200';

                return (
                  <tr key={id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6 max-w-md">
                      <h4 className="font-bold text-slate-800 text-sm leading-snug">{title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Réf: <span className="font-semibold">{offer.reference || id}</span> • {category}
                      </p>
                    </td>

                    <td className="py-4 px-4 font-medium text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className={`w-4 h-4 ${isUrgent ? 'text-red-500' : 'text-slate-400'}`} />
                        <span className={isUrgent ? 'text-red-600 font-bold' : ''}>{deadline}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'Ouvert' ? 'bg-green-500' : status === 'En révision' ? 'bg-orange-500' : 'bg-slate-400'}`} />
                        {status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right font-bold text-slate-700">
                      {budget}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => navigate(`/app/admin/edit-offer/${id}`)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors" title="Modifier">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={async ()=>{ if(window.confirm('Supprimer cette offre ?')){ try{ await removeOffer(id); } catch(err){ console.error(err); alert('Erreur suppression'); } } }} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
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

        {/* Pagination du tableau */}
        <div className="bg-slate-50/50 border-t border-slate-100 p-4 flex items-center justify-between text-xs font-medium text-slate-500">
          <button className="inline-flex items-center gap-1 px-2 py-1 hover:text-slate-800 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Précédent
          </button>
          <div className="flex items-center gap-1">
            <span className="w-7 h-7 bg-[#b45f06] text-white font-bold flex items-center justify-center rounded-lg shadow-sm">1</span>
            <span className="w-7 h-7 hover:bg-slate-200 flex items-center justify-center rounded-lg cursor-pointer transition-colors">2</span>
            <span className="w-7 h-7 hover:bg-slate-200 flex items-center justify-center rounded-lg cursor-pointer transition-colors">3</span>
            <span className="px-1 text-slate-400">...</span>
            <span className="w-7 h-7 hover:bg-slate-200 flex items-center justify-center rounded-lg cursor-pointer transition-colors">12</span>
          </div>
          <button className="inline-flex items-center gap-1 px-2 py-1 hover:text-slate-800 transition-colors">
            Suivant <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Section basse : Guide & Légende (2 Blocs asymétriques) */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Guide de Publication */}
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

        {/* Légende des Statuts */}
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
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">La date limite est passée, les dossiers sont en cours d'analyse par la commission.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}