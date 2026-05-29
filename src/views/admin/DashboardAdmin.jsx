import { 
  Briefcase, 
  FileCheck, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  MoreVertical 
} from 'lucide-react';

export default function DashboardAdmin() {
  // 1. Données factices calquées sur tes maquettes
  const stats = [
    { id: 1, label: "Total Appels d'Offres", value: "32", change: "+12% ce mois", icon: Briefcase, color: "bg-blue-50 text-secondary" },
    { id: 2, label: "Soumissions Reçues", value: "148", change: "+24 depuis hier", icon: FileCheck, color: "bg-orange-50 text-primary" },
    { id: 3, label: "Offres en Révision", value: "7", change: "3 urgentes", icon: Clock, color: "bg-amber-50 text-amber-600" },
    { id: 4, label: "Prestataires Actifs", value: "1,240", change: "+8% cette semaine", icon: Users, color: "bg-emerald-50 text-emerald-600" },
  ];

  const recentSubmissions = [
    { id: 1, company: "Tech Solutions Ltd", project: "Refonte Magento Enterprise", date: "Aujourd'hui, 14:32", amount: "18 500 €", status: "En attente", statusColor: "bg-amber-50 text-amber-600" },
    { id: 2, company: "Innov'Marketing", project: "Campagne Social Ads", date: "Hier, 18:10", amount: "9 200 €", status: "Validé", statusColor: "bg-emerald-50 text-emerald-600" },
    { id: 3, company: "Global CyberSec", project: "Audit Sécurité Cloud", date: "28 Mai 2026", amount: "7 000 €", status: "En révision", statusColor: "bg-blue-50 text-secondary" },
    { id: 4, company: "Logix Transports", project: "Optimisation Supply Chain", date: "25 Mai 2026", amount: "42 000 €", status: "Refusé", statusColor: "bg-rose-50 text-rose-600" },
  ];

  return (
    <div className="space-y-8">
      
      {/* EN-TÊTE : Titre & Date de session */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight">
            Vue d'ensemble informatique
          </h1>
          <p className="text-xs sm:text-sm text-third mt-0.5">
            Bienvenue, <span className="font-semibold text-secondary">Nelson Blessing</span>. Voici l'état de vos appels d'offres.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm text-xs font-semibold text-third/80 self-start sm:self-auto">
          Vendredi, 29 Mai 2026
        </div>
      </div>

      {/* BLOCS DE STATISTIQUES (4 colonnes) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-third/70 tracking-wide uppercase">{stat.label}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-secondary">{stat.value}</span>
                <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50/50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> {stat.change.split(' ')[0]}
                </span>
              </div>
              <p className="text-[11px] text-third/60 mt-1">{stat.change.substring(stat.change.indexOf(' ') + 1)}</p>
            </div>
          );
        })}
      </div>

      {/* CORE CONTENT : Tableau des soumissions & Activités */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Colonne gauche : Tableau des soumissions récentes (8 colonnes) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-secondary">Dernières candidatures reçues</h3>
                <p className="text-xs text-third">Suivi en temps réel des dépôts de dossiers techniques.</p>
              </div>
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                Voir tout <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-secondary uppercase tracking-wider">
                    <th className="py-3 px-6">Candidat</th>
                    <th className="py-3 px-4">Projet visé</th>
                    <th className="py-3 px-4 text-right">Montant proposé</th>
                    <th className="py-3 px-6 text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {recentSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="py-4 px-6 font-bold text-secondary">
                        <div>{sub.company}</div>
                        <div className="text-[10px] font-medium text-third/60 mt-0.5">{sub.date}</div>
                      </td>
                      <td className="py-4 px-4 text-third font-medium max-w-[200px] truncate">{sub.project}</td>
                      <td className="py-4 px-4 text-right font-extrabold text-secondary">{sub.amount}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${sub.statusColor}`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center text-xs text-third/60 rounded-b-2xl">
            Données synchronisées avec le serveur de fichiers légaux.
          </div>
        </div>

        {/* Colonne droite : Analyse de répartition & Actions rapides (4 colonnes) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Box d'action rapide : Créer un nouvel Appel */}
          <div className="bg-gradient-to-br from-secondary to-slate-900 p-6 rounded-2xl text-white shadow-sm relative overflow-hidden">
            <div className="absolute right-[-10%] bottom-[-10%] w-32 h-32 rounded-full bg-primary/10 pointer-events-none" />
            <h4 className="font-bold text-base mb-2">Besoin d'un nouveau prestataire ?</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Générez un cahier des charges standardisé et publiez-le instantanément auprès de vos fournisseurs agréés.
            </p>
            <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg shadow-primary/20 transition-all">
              Créer un Appel d'Offres
            </button>
          </div>

          {/* Analyse des catégories (Secteurs actifs) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm text-secondary">Répartition des Secteurs</h4>
              <MoreVertical className="w-4 h-4 text-third cursor-pointer" />
            </div>
            <div className="space-y-4">
              {/* Secteur 1 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-third mb-1.5">
                  <span>Développement & Logiciels</span>
                  <span className="text-secondary font-bold">55%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '55%' }} />
                </div>
              </div>
              {/* Secteur 2 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-third mb-1.5">
                  <span>Infrastructures & Matériels</span>
                  <span className="text-secondary font-bold">30%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
              {/* Secteur 3 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-third mb-1.5">
                  <span>Marketing & Communication</span>
                  <span className="text-secondary font-bold">15%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}