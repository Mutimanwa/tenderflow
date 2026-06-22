import { Users, Gavel, FileText, TrendingUp, Clock, Zap, ChevronDown, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardAdmin() {
  // recentActivities will be populated from API
  const [stats, setStats] = useState({ usersCount: 0, offersCount: 0, submissionsCount: 0, documentsCount: 0, recentOffers: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await (await import('../../api/client')).getAdminStats();
        if (!mounted) return;
        setStats(data || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const recentActivities = (stats.recentOffers || []).map((o, i) => ({ id: i, ref: o._id || o.id, objet: o.title, client: '-', date: new Date(o.createdAt).toLocaleString(), status: o.status || 'OUVERT', statusColor: 'bg-green-100 text-green-700' }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Tableau de Bord
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Bienvenue, voici un aperçu de l'activité de TenderFlow aujourd'hui.
        </p>
      </div>

      {/* 1. Cartes de Statistiques (3 colonnes) */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Carte Utilisateurs */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-[#b45f06]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Utilisateurs</p>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-1">1,240</h2>
            <p className="text-xs font-bold text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12% ce mois
            </p>
          </div>
        </div>

        {/* Carte Appels d'offres */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <Gavel className="w-6 h-6 text-[#b45f06]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Appels d'offres actifs</p>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-1">42</h2>
            <p className="text-xs font-bold text-[#b45f06] flex items-center gap-1 mt-1">
              <Clock className="w-3.5 h-3.5" /> 5 expirent bientôt
            </p>
          </div>
        </div>

        {/* Carte Soumissions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-[#b45f06]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Soumissions reçues</p>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-1">156</h2>
            <p className="text-xs font-bold text-green-600 flex items-center gap-1 mt-1">
              <Zap className="w-3.5 h-3.5" /> +24 depuis hier
            </p>
          </div>
        </div>
      </div>

      {/* 2. Section Graphiques (Grille 2/3 - 1/3) */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Graphique d'évolution (Prend 2 colonnes) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">Activité des Soumissions</h3>
              <p className="text-xs text-slate-500 mt-0.5">Volume mensuel sur l'année en cours</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600 transition-colors">
              2025 <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {/* Simulation du graphique en ligne via SVG */}
          <div className="flex-1 relative w-full h-48 mt-4">
            <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Ligne directrice */}
              <path 
                d="M 0 150 L 133 100 L 266 50 L 400 120 L 533 150 L 666 180 L 800 180" 
                fill="none" 
                stroke="#f97316" 
                strokeWidth="3" 
                vectorEffect="non-scaling-stroke" 
              />
              {/* Remplissage sous la courbe */}
              <path 
                d="M 0 150 L 133 100 L 266 50 L 400 120 L 533 150 L 666 180 L 800 180 L 800 200 L 0 200 Z" 
                fill="url(#chartGradient)" 
              />
              {/* Points sur la courbe (Les zéros de ta maquette) */}
              {[
                { x: 133, y: 100 }, { x: 266, y: 50 }, { x: 400, y: 120 }, { x: 533, y: 150 }, { x: 666, y: 180 }
              ].map((point, i) => (
                <g key={i}>
                  <circle cx={point.x} cy={point.y} r="4" fill="white" stroke="#f97316" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <text x={point.x} y={point.y - 15} fontSize="12" fontWeight="bold" fill="#f97316" textAnchor="middle">0</text>
                </g>
              ))}
            </svg>
            
            {/* Labels de l'axe X */}
            <div className="absolute bottom-0 w-full flex justify-between text-[10px] font-bold text-slate-400">
              <span>JAN</span><span>FÉV</span><span>MAR</span><span>AVR</span><span>MAI</span><span>JUN</span><span>JUL</span>
            </div>
          </div>
        </div>

        {/* Graphique Donut (Prend 1 colonne) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-6">Répartition par Catégorie</h3>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Cercle avec CSS Conic Gradient pour simuler le Donut Chart */}
            <div className="relative w-40 h-40 rounded-full flex items-center justify-center" 
                 style={{ background: 'conic-gradient(#BFDBFE 0% 25%, #9A3412 25% 70%, #F97316 70% 100%)' }}>
              <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-2xl font-extrabold text-slate-800">42</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
              </div>
            </div>

            {/* Légendes */}
            <div className="w-full space-y-3 mt-8">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <div className="w-3 h-3 rounded-full bg-[#9A3412]"></div> Construction
                </div>
                <span className="font-bold text-slate-800">45%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <div className="w-3 h-3 rounded-full bg-[#F97316]"></div> IT & Services
                </div>
                <span className="font-bold text-slate-800">30%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <div className="w-3 h-3 rounded-full bg-[#BFDBFE]"></div> Logistique
                </div>
                <span className="font-bold text-slate-800">25%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Section Activité Récente (Tableau) */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-base font-bold text-slate-800">Activité Récente</h3>
          <button className="text-xs font-bold text-[#b45f06] hover:underline">
            Voir tout
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Référence</th>
                <th className="py-4 px-6">Objet</th>
                <th className="py-4 px-6">Client</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recentActivities.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 font-bold text-[#b45f06]">{item.ref}</td>
                  <td className="py-4 px-6 text-slate-700 font-medium">{item.objet}</td>
                  <td className="py-4 px-6 text-slate-600">{item.client}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{item.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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