import { useOutletContext } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight,
  Plus,
  EllipsisVertical,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  // On récupère le rôle configuré dynamiquement dans la Topbar / AppLayout
  const [userRole] = useOutletContext();

  // --- DONNÉES SIMULÉES (MOCK) ---
  const statsData = {
    acheteur: [
      { id: 1, title: "Total Appels d'Offres", value: "12", subtext: "2 publiés ce mois-ci", icon: FileText, color: "bg-blue-50 text-secondary border-blue-100" },
      { id: 2, title: "Soumissions Reçues", value: "48", subtext: "+15% depuis la semaine dernière", icon: TrendingUp, color: "bg-orange-50 text-primary border-orange-100" },
      { id: 3, title: "Offres En Révision", value: "5", subtext: "Attente de validation", icon: Clock, color: "bg-amber-50 text-amber-600 border-amber-100" },
      { id: 4, title: "Projets Clôturés", value: "18", subtext: "Prestataires contractés", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    ],
    fournisseur: [
      { id: 1, title: "Offres Postulées", value: "7", subtext: "3 en attente de réponse", icon: FileText, color: "bg-blue-50 text-secondary border-blue-100" },
      { id: 2, title: "Soumissions Acceptées", value: "2", subtext: "Contrats en cours de rédaction", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
      { id: 3, title: "En cours d'examen", value: "4", subtext: "Dossier technique validé", icon: Clock, color: "bg-amber-50 text-amber-600 border-amber-100" },
      { id: 4, title: "Dossiers Rejetés", value: "1", subtext: "Critères non atteints", icon: AlertCircle, color: "bg-rose-50 text-rose-600 border-rose-100" },
    ]
  };

  const recentActivities = {
    acheteur: [
      { id: "TND-2026-001", title: "Modernisation Infrastructure Réseau", company: "Tech Solutions Ltd", date: "Aujourd'hui, 14:32", budget: "45 000 €", status: "En attente", statusStyle: "bg-amber-50 text-amber-700 border-amber-200" },
      { id: "TND-2026-003", title: "Refonte Site E-commerce Magento", company: "Digital Agency", date: "Hier, 11:15", budget: "24 000 €", status: "Validé", statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      { id: "TND-2026-004", title: "Campagne Marketing Social Ads", company: "Growth Media", date: "25 Mai 2026", budget: "12 500 €", status: "En révision", statusStyle: "bg-blue-50 text-blue-700 border-blue-200" },
    ],
    fournisseur: [
      { id: "TND-2026-001", title: "Modernisation Infrastructure Réseau", buyer: "Ministère de la Transition", date: "Soumis le 28/05/2026", budget: "45 000 €", status: "En examen", statusStyle: "bg-blue-50 text-blue-700 border-blue-200" },
      { id: "TND-2026-009", title: "Audit Sécurité Cloud AWS", buyer: "FinTech National Bank", date: "Soumis le 14/05/2026", budget: "18 000 €", status: "Accepté", statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      { id: "TND-2026-012", title: "Maintenance Logicielle ERP", buyer: "Global Logistics SA", date: "Soumis le 30/04/2026", budget: "60 000 €", status: "Décliné", statusStyle: "bg-rose-50 text-rose-700 border-rose-200" },
    ]
  };

  const currentStats = statsData[userRole] || statsData.fournisseur;
  const currentTable = recentActivities[userRole] || recentActivities.fournisseur;

  return (
    <div className="space-y-8">
      
      {/* HEADER DU DASHBOARD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight">
            Bonjour, Daniel luc
          </h1>
          <p className="text-sm text-third mt-1">
            Voici un aperçu de vos activités de soumission pour aujourd'hui.
          </p>
        </div>
        
        {/* Bouton d'action contextuel */}
        {userRole === 'acheteur' && (
          <button className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-3 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/10 transition-all self-start sm:self-center">
            <Plus className="w-4 h-4" /> Publier un Appel d'Offres
          </button>
        )}
      </div>

      {/* GRILLE DES CARTES STATISTIQUES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {currentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-third/80 block">{stat.title}</span>
                <span className="text-2xl font-extrabold text-secondary block">{stat.value}</span>
                <span className="text-[11px] font-medium text-slate-400 block">{stat.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ZONE DÉTAILLÉE : GRAPHIC & TABLEAU */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* TABLEAU DES SOUUMISSIONS RÉCENTES (Prend 8 colonnes sur 12) */}
        <div className="lg:col-span-12 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-secondary text-base">
                  {userRole === 'acheteur' ? 'Soumissions Récentes Reçues' : 'Suivi de vos Candidatures'}
                </h3>
                <p className="text-xs text-third mt-0.5">Dernières activités liées à vos dossiers</p>
              </div>
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                Voir tout <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-secondary uppercase tracking-wider">
                    <th className="py-3 px-6">ID / Projet</th>
                    <th className="py-3 px-6">{userRole === 'acheteur' ? 'Candidat' : 'Entité Émettrice'}</th>
                    <th className="py-3 px-6">Budget</th>
                    <th className="py-3 px-6 text-center">Statut</th>
                    <th className='py-3 px-6 '>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {currentTable.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 max-w-[240px]">
                        <span className="font-mono text-[10px] text-slate-400 block mb-0.5">{row.id}</span>
                        <span className="font-bold text-secondary truncate block">{row.title}</span>
                      </td>
                      <td className="py-4 px-6 text-third font-medium">
                        {userRole === 'acheteur' ? row.company : row.buyer}
                        <span className="block text-[10px] text-slate-400 font-normal mt-0.5">{row.date}</span>
                      </td>
                      <td className="py-4 px-6 font-bold text-secondary">{row.budget}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.statusStyle}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold">
                         {/* More icon */}
                         <EllipsisVertical className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pied de tableau (Pagination discrète simulée) */}
          <div className="p-4 bg-slate-50/40 border-t border-slate-100 text-center text-[11px] text-slate-400 font-medium flex justify-between">
            <span>Affichage des 3 derniers enregistrements</span>
            {/* Pagination */}
            <div className='flex gap-3'>
              <button className="px-4 py-2 rounded-md border border-primary/20 bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors text-xs font-bold">
                  <ArrowLeft className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 rounded-md border border-primary/20 bg-primary-hover text-white hover:bg-slate-300 transition-colors text-xs font-bold">
                1
              </button>
              <button className="px-4 py-2 rounded-md border border-primary/20 text-slate-600 hover:bg-slate-300 transition-colors text-xs font-bold">
                2
              </button>
              <button className="px-4 py-2 rounded-md border border-primary/20 bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors text-xs font-bold">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}