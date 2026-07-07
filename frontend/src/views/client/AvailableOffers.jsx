import { SlidersHorizontal, Calendar, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';

export default function AvailableTenders() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api.getOffers()
      .then((data) => {
        if (mounted) {
          setOffers(Array.isArray(data) ? data : (data.offers || []));
        }
      })
      .catch((err) => {
        console.error('Failed to load offers', err);
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const formatDate = (date) => {
    if (!date) return '—';
    try {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '—';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-xs font-medium text-slate-500">Chargement des offres disponibles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p className="text-sm font-bold">Erreur lors du chargement des offres</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-xs text-orange-600 hover:underline">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Appels d'offres ouverts</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {offers.length} opportunités disponibles actuellement
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filtrer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white border border-slate-100 rounded-2xl">
            <p className="text-sm text-slate-500 font-medium">Aucun appel d'offres disponible pour le moment.</p>
            <p className="text-xs text-slate-400 mt-1">Revenez plus tard pour de nouvelles opportunités.</p>
          </div>
        ) : (
          offers.filter(offer => offer.status === 'open' || !offer.status).map((item) => {
            const id = item._id || item.id;
            const title = item.title || 'Sans titre';
            const budget = item.budget || 'N/A';
            const deadline = item.timeline?.deadline || item.deadline;
            const docsCount = item.docs?.length || 0;
            const category = item.category || item.contractType || 'Général';

            return (
              <div key={id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[320px] hover:border-slate-200 transition-all group">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-extrabold tracking-wider">
                    {category}
                  </span>
                  <span className="text-base font-black text-slate-800">{budget}</span>
                </div>
                
                <div className="space-y-2 my-4 flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-[#b45f06] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">
                    {item.description || 'Aucune description disponible.'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(deadline)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{docsCount} Doc{docsCount > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/app/client/offer/${id}`)} 
                    className="w-full bg-orange-50/60 hover:bg-[#b45f06] text-orange-700 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                  >
                    Voir détails <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}