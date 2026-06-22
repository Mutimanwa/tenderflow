import { FileText, Send, CheckCircle2, XCircle, MoreVertical, Wrench, Laptop, Leaf, Truck } from 'lucide-react';

export default function ProviderDashboard() {
  const submissions = [
    { title: "Rénovation Complexe Sportif", client: "Ville de Lyon", icon: Wrench, iconBg: "bg-blue-50 text-blue-500", ref: "TFR-2023-001", status: "EN COURS", statusStyle: "bg-amber-50 text-amber-700 border-amber-200", date: "24 Oct, 2023" },
    { title: "Fourniture Matériel IT", client: "Région IDF", icon: Laptop, iconBg: "bg-purple-50 text-purple-500", ref: "TFR-2023-084", status: "ACCEPTÉE", statusStyle: "bg-green-50 text-green-700 border-green-200", date: "18 Oct, 2023" },
    { title: "Entretien Espaces Verts", client: "Mairie de Bordeaux", icon: Leaf, iconBg: "bg-amber-50 text-amber-600", ref: "TFR-2023-112", status: "SOUMIS", statusStyle: "bg-slate-100 text-slate-600 border-slate-300", date: "12 Oct, 2023" },
    { title: "Logistique Transport Nord", client: "Global Logistics SA", icon: Truck, iconBg: "bg-red-50 text-red-500", ref: "TFR-2023-045", status: "REFUSÉE", statusStyle: "bg-red-50 text-red-700 border-red-200", date: "05 Oct, 2023" }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Message de Bienvenue */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Bonjour, Daniel luc</h1>
        <p className="text-sm text-slate-500 mt-1">Voici un aperçu de vos activités de soumission pour aujourd'hui.</p>
      </div>

      {/* Grille des KPIs (4 Colonnes) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Offres Disponibles (Carte Pleine en Marron/Orange Brûlé) */}
        <div className="bg-[#964f05] rounded-2xl p-5 text-white shadow-lg flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-md">+12%</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">Offres disponibles</p>
            <h2 className="text-3xl font-black mt-0.5">124</h2>
          </div>
        </div>

        {/* Mes Soumissions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-36">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mes soumissions</p>
            <h2 className="text-3xl font-black text-slate-800 mt-0.5">42</h2>
          </div>
        </div>

        {/* Acceptées */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-36">
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Acceptées</p>
            <h2 className="text-3xl font-black text-slate-800 mt-0.5">18</h2>
          </div>
        </div>

        {/* Refusées */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-36">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <XCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Refusées</p>
            <h2 className="text-3xl font-black text-slate-800 mt-0.5">5</h2>
          </div>
        </div>
      </div>

      {/* Tableau : Dernières soumissions */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-800">Dernières soumissions</h3>
          <button className="text-xs font-bold text-[#b45f06] hover:underline">Voir tout</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Titre de l'offre</th>
                <th className="py-4 px-4">Référence</th>
                <th className="py-4 px-4">Statut</th>
                <th className="py-4 px-4">Date de dépôt</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {submissions.map((sub, idx) => {
                const Icon = sub.icon;
                return (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sub.iconBg}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{sub.title}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{sub.client}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-slate-500">{sub.ref}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border tracking-wider ${sub.statusStyle}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-slate-500">{sub.date}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="p-1 text-slate-400 hover:text-slate-700 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}