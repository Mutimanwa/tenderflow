import { useEffect, useState } from 'react';
import { 
  FileText, Send, CheckCircle2, XCircle, MoreVertical, 
  Loader2, Briefcase 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

export default function ProviderDashboard() {
  const { user, token } = useAuth();
  
  // États de stockage des données d'API
  const [offersCount, setOffersCount] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Appels parallèles pour optimiser le temps de chargement
        const [offersData, submissionsData] = await Promise.all([
          api.getOffers(),
          api.getSubmissions(null, token)
        ]);

        const totalOffers = Array.isArray(offersData) ? offersData.length : (offersData?.offers?.length || 0);
        const subsArray = Array.isArray(submissionsData) ? submissionsData : (submissionsData?.submissions || []);

        setOffersCount(totalOffers);
        setSubmissions(subsArray);
      } catch (err) {
        console.error('Erreur lors de la récupération des données du dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchDashboardData();
  }, [token]);

  // Calcul dynamique des indicateurs clés (KPIs)
  const totalSubmissions = submissions.length;
  const acceptedCount = submissions.filter(s => ['approved', 'accepted', 'ACCEPTÉE', 'Gagné'].includes(s.status)).length;
  const rejectedCount = submissions.filter(s => ['rejected', 'REFUSÉE', 'Refusé'].includes(s.status)).length;

  // Formatteur de styles et labels pour s'adapter à toutes les réponses d'API
  const getStatusDetails = (status) => {
    switch (String(status).toLowerCase()) {
      case 'approved':
      case 'accepted':
      case 'acceptée':
        return { label: 'ACCEPTÉE', style: 'bg-green-50 text-green-700 border-green-200' };
      case 'rejected':
      case 'refusée':
      case 'refusé':
        return { label: 'REFUSÉE', style: 'bg-red-50 text-red-700 border-red-200' };
      case 'pending':
      case 'en cours':
        return { label: 'EN COURS', style: 'bg-amber-50 text-amber-700 border-amber-200' };
      default:
        return { label: String(status).toUpperCase() || 'SOUMIS', style: 'bg-slate-100 text-slate-600 border-slate-300' };
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#b45f06]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Message de Bienvenue */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Bonjour, {user?.name || 'Daniel luc'}</h1>
        <p className="text-sm text-slate-500 mt-1">Voici un aperçu de vos activités de soumission pour aujourd'hui.</p>
      </div>

      {/* Grille des KPIs (4 Colonnes) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Offres Disponibles */}
        <div className="bg-[#964f05] rounded-2xl p-5 text-white shadow-lg flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">Offres disponibles</p>
            <h2 className="text-3xl font-black mt-0.5">{offersCount}</h2>
          </div>
        </div>

        {/* Mes Soumissions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-36">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mes soumissions</p>
            <h2 className="text-3xl font-black text-slate-800 mt-0.5">{totalSubmissions}</h2>
          </div>
        </div>

        {/* Acceptées */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-36">
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Acceptées</p>
            <h2 className="text-3xl font-black text-slate-800 mt-0.5">{acceptedCount}</h2>
          </div>
        </div>

        {/* Refusées */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-36">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <XCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Refusées</p>
            <h2 className="text-3xl font-black text-slate-800 mt-0.5">{rejectedCount}</h2>
          </div>
        </div>
      </div>

      {/* Tableau : Dernières soumissions */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-800">Dernières soumissions</h3>
          <span className="text-xs text-slate-400">{submissions.length} au total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Titre de l'offre</th>
                <th className="py-4 px-4">Référence / ID</th>
                <th className="py-4 px-4">Statut</th>
                <th className="py-4 px-4">Date de dépôt</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-xs font-semibold text-slate-400">
                    Aucune soumission effectuée pour le moment.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => {
                  const statusInfo = getStatusDetails(sub.status);
                  return (
                    <tr key={sub._id || sub.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-50 text-orange-600">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            {/* Gestion du titre imbriqué si l'offre a été populée par la base de données */}
                            <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                              {sub.offer?.title || sub.title || 'Intitulé non spécifié'}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {sub.offer?.company || sub.client || 'Entreprise émettrice'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-slate-500">
                        {sub.offer?._id?.substring(0, 8).toUpperCase() || sub._id?.substring(0, 8).toUpperCase() || 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border tracking-wider ${statusInfo.style}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-slate-500">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }) : 'Récemment'}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button type="button" className="p-1 text-slate-400 hover:text-slate-700 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}