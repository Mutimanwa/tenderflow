import { 
  Layers, Clock, CheckCircle, XCircle, SlidersHorizontal, 
  Download, Eye, MoreVertical, ChevronLeft, ChevronRight, TrendingUp 
} from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function ManageSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSubmissions();
      setSubmissions(Array.isArray(data) ? data : (data.submissions || []));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette soumission ?')) return;
    try {
      await api.deleteSubmission(id, token);
      setSubmissions((s) => s.filter((x) => (x._id || x.id) !== id));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* En-tête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
            <span>Dashboard</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#b45f06] font-semibold">Gestion des Soumissions</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Gestion des Soumissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Consultez et gérez les offres reçues pour vos appels d'offres en cours.
          </p>
        </div>
        
        {/* Actions d'en-tête */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filtrer
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Exporter CSV
          </button>
        </div>
      </div>

      {/* 1. Compteurs / Blocs KPI supérieurs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Soumissions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm relative">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
            <Layers className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Soumissions</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">1,284</h2>
          <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md">+12%</span>
        </div>

        {/* À réviser */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm relative">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">À réviser</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">42</h2>
          <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md">En attente</span>
        </div>

        {/* Acceptées */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center mb-3">
            <CheckCircle className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Acceptées</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">856</h2>
        </div>

        {/* Refusées */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mb-3">
            <XCircle className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Refusées</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-0.5">386</h2>
        </div>
      </div>

      {/* 2. Tableau principal */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Entreprise</th>
                <th className="py-4 px-4">Appel d'offre lié</th>
                <th className="py-4 px-4 text-center">Montant proposé</th>
                <th className="py-4 px-4">Date de dépôt</th>
                <th className="py-4 px-4">Statut</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {submissions.map((sub, index) => (
                <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                  {/* Entreprise avec Avatar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${sub.avatarBg}`}>
                        {sub.avatarText}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{sub.company}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">ID: #{sub.id}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Appel d'offre lié */}
                  <td className="py-4 px-4">
                    <h5 className="font-semibold text-slate-700 text-xs">{sub.tender}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sub.category}</p>
                  </td>
                  
                  {/* Montant Proposé */}
                  <td className="py-4 px-4 text-center font-bold text-slate-800">
                    {sub.amount}
                  </td>
                  
                  {/* Date de dépôt */}
                  <td className="py-4 px-4 text-slate-500 text-xs font-medium">
                    {sub.date}
                  </td>
                  
                  {/* Statut */}
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${sub.statusStyle}`}>
                      {sub.status}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-[#b45f06] hover:bg-slate-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-slate-50/40 border-t border-slate-100 p-4 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Affichage de 1 à 10 sur 1,284 résultats</span>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:text-slate-800 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="w-6 h-6 bg-[#b45f06] text-white font-bold flex items-center justify-center rounded-md shadow-sm">1</span>
            <span className="w-6 h-6 hover:bg-slate-200 flex items-center justify-center rounded-md cursor-pointer transition-colors">2</span>
            <span className="w-6 h-6 hover:bg-slate-200 flex items-center justify-center rounded-md cursor-pointer transition-colors">3</span>
            <span className="px-1 text-slate-400">...</span>
            <span className="w-6 h-6 hover:bg-slate-200 flex items-center justify-center rounded-md cursor-pointer transition-colors">129</span>
            <button className="p-1 hover:text-slate-800 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Section basse : Analyse comparative & Bloc Téléchargement */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Analyse comparative des coûts */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3 max-w-xl">
            <h3 className="font-bold text-sm text-slate-800">Analyse comparative des coûts</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              L'écart moyen entre les offres pour les projets d'infrastructure est actuellement de 8.4%. Nous recommandons de privilégier les soumissions avec un score de fiabilité supérieur à 85%.
            </p>
          </div>
          
          {/* Petites métriques en bas de l'analyse */}
          <div className="flex gap-6 mt-6 border-t border-slate-50 pt-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Écart Min/Max</p>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">15.2%</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Délai moyen</p>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">14 jours</p>
            </div>
          </div>

          {/* Flèche d'analyse graphique en arrière-plan (simulée via SVG) */}
          <div className="absolute bottom-4 right-6 text-slate-100 pointer-events-none hidden sm:block">
            <TrendingUp className="w-24 h-24 stroke-[0.5]" />
          </div>
        </div>

        {/* Rapport Mensuel (Teinte marron caractéristique) */}
        <div className="lg:col-span-4 bg-[#964f05] rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-sm">Rapport Mensuel</h3>
            <p className="text-xs text-white/80 leading-relaxed font-medium">
              Générez automatiquement la synthèse des soumissions validées ce mois-ci.
            </p>
          </div>
          
          <button className="w-full bg-white hover:bg-slate-50 text-[#b45f06] font-bold py-2.5 px-4 rounded-xl text-xs transition-all mt-6 shadow-sm text-center">
            Télécharger le PDF
          </button>
        </div>
      </div>

    </div>
  );
}