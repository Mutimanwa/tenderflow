import { Search, SlidersHorizontal, Download, Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MySubmissions() {
  // Données extraites fidèlement de ta maquette Mes offres.png
  const submissions = [
    {
      id: "TND-8829-XP",
      title: "Réhabilitation Éco-Campus 2024",
      date: "12 Oct. 2023",
      budget: "450 000 €",
      status: "EN ATTENTE",
      statusClass: "bg-orange-50 text-orange-700 border-orange-100"
    },
    {
      id: "TND-4412-SM",
      title: "Fournitures Mobilier Smart Office",
      date: "05 Oct. 2023",
      budget: "82 500 €",
      status: "ACCEPTÉE",
      statusClass: "bg-green-50 text-green-700 border-green-100"
    },
    {
      id: "TND-2900-LP",
      title: "Rénovation Éclairage Public Ville de Lyon",
      date: "28 Sept. 2023",
      budget: "1 240 000 €",
      status: "REFUSÉE",
      statusClass: "bg-red-50 text-red-700 border-red-100"
    },
    {
      id: "TND-7761-AT",
      title: "Développement App Mobile Transport",
      date: "15 Sept. 2023",
      budget: "55 000 €",
      status: "ACCEPTÉE",
      statusClass: "bg-green-50 text-green-700 border-green-100"
    },
    {
      id: "TND-9011-SP",
      title: "Installation Panneaux Solaires Parking",
      date: "10 Sept. 2023",
      budget: "215 000 €",
      status: "EN ATTENTE",
      statusClass: "bg-orange-50 text-orange-700 border-orange-100"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Mes Soumissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Suivez l'état et l'historique de vos propositions déposées.
          </p>
        </div>
        
        {/* Actions d'en-tête */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-blue-100 bg-blue-50/50 hover:bg-blue-50 rounded-xl text-xs font-bold text-blue-700 transition-colors shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filtres avancés
          </button>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Exporter CSV
          </button>
        </div>
      </div>

      {/* Barre de Recherche & Filtres Rapides */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Recherche par mot clé */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recherche</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-orange-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="ID, Titre, ou Mots-clés..." 
              className="w-full bg-transparent border-none outline-none text-xs text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Filtre de Statut */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Statut</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <span className="w-full text-xs font-semibold text-slate-700">Tous les statuts</span>
            <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
          </div>
        </div>

        {/* Filtre Temporel */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Période</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <Calendar className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <span className="w-full text-xs font-semibold text-slate-700">Derniers 30 jours</span>
          </div>
        </div>
      </div>

      {/* Tableau des Soumissions */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Offre</th>
                <th className="py-4 px-6">Date de dépôt</th>
                <th className="py-4 px-6">Budget proposé</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {submissions.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40 transition-colors group">
                  {/* Titre et ID */}
                  <td className="py-4 px-6 max-w-xs sm:max-w-md">
                    <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-[#b45f06] transition-colors">
                      {row.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{row.id}</span>
                  </td>
                  {/* Date */}
                  <td className="py-4 px-6 text-slate-500 font-semibold">{row.date}</td>
                  {/* Budget */}
                  <td className="py-4 px-6 font-bold text-slate-900">{row.budget}</td>
                  {/* Statut avec Badge */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[9px] font-bold tracking-wider ${row.statusClass}`}>
                      {row.status}
                    </span>
                  </td>
                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <button className="text-xs font-bold text-[#b45f06] hover:underline">
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Barre de Pagination */}
        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-xs text-slate-400 font-semibold bg-slate-50/20">
          <span>Affichage de 1-5 sur 24 soumissions</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-100 bg-white text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-amber-900 text-white font-bold flex items-center justify-center text-xs">1</button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs transition-colors">2</button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs transition-colors">3</button>
            <span className="px-1 text-slate-300">...</span>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs transition-colors">12</button>
            <button className="p-1.5 rounded-lg border border-slate-100 bg-white text-slate-400 hover:text-slate-700 transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}