import { SlidersHorizontal, Calendar, FileText, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';

export default function AvailableTenders() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOffers()
      .then((data) => setOffers(data || []))
      .catch((err) => {
        console.error('Failed to load offers', err);
        setOffers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const navigate = useNavigate();

  if (loading) return <div className="p-8 text-center">Chargement des offres...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Appels d'offres ouverts</h1>
          <p className="text-xs text-slate-500 mt-0.5">Consultez les opportunités actuelles et gérez vos soumissions.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filtrer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example immersive card kept as static */}
        <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-end p-6 min-h-[320px] bg-slate-900">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" alt="Conseil en Stratégie" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="relative z-10 space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-white font-bold text-base leading-snug">Conseil en Stratégie Durable</h3>
              <p className="text-slate-300 text-xs font-medium leading-relaxed">Accompagnement pour la transition écologique des bâtiments publics.</p>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#964f05] hover:bg-amber-800 text-white font-bold text-xs rounded-xl transition-colors shadow-md">Voir détails</button>
          </div>
        </div>

        {offers.map((item) => (
          <div key={item._id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[320px] hover:border-slate-200 transition-all group">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-extrabold tracking-wider">{item.category || 'Général'}</span>
              <span className="text-base font-black text-slate-800">{item.budget || 'N/A'}</span>
            </div>
            <div className="space-y-2 my-4 flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-[#b45f06] transition-colors">{item.title}</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">{item.description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 border-t border-slate-50 pt-3">
                <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /><span>{new Date(item.deadline || item.date || Date.now()).toLocaleDateString()}</span></div>
                <div className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /><span>{item.docs || '0 Docs'}</span></div>
              </div>
              <button onClick={() => navigate(`/app/client/offer/${item._id}`)} className="w-full bg-blue-50/60 hover:bg-[#b45f06] text-blue-700 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1">Voir détails <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}