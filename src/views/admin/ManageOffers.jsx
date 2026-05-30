import { 
  FileText, CheckCircle2, Clock, Archive, SlidersHorizontal, 
  Plus, Calendar, Pencil, Trash2, ChevronLeft, ChevronRight, Lightbulb 
} from 'lucide-react';

export default function ManageOffers() {
  // Simulation de la liste présente sur la maquette
  const offersList = [
    { id: 'AO-2023-0892', title: 'Rénovation du Complexe Sportif Municipal', category: 'Infrastructures', deadline: '15 Octobre 2023', status: 'Ouvert', budget: '1,250,000 €', statusStyle: 'bg-green-50 text-green-700 border-green-200' },
    { id: 'AO-2023-0901', title: 'Maintenance du Parc Informatique Régional', category: 'Services IT', deadline: '02 Octobre 2023', status: 'En révision', budget: '450,000 €', statusStyle: 'bg-orange-50 text-orange-700 border-orange-200', isUrgent: true },
    { id: 'AO-2023-0850', title: 'Fourniture de Mobilier Scolaire', category: 'Fournitures', deadline: '25 Septembre 2023', status: 'Fermé', budget: '120,000 €', statusStyle: 'bg-slate-100 text-slate-600 border-slate-200' },
    { id: 'AO-2023-1022', title: 'Extension du Réseau Fibre Optique', category: 'Télécommunications', deadline: '30 Novembre 2023', status: 'Ouvert', budget: '3,800,000 €', statusStyle: 'bg-green-50 text-green-700 border-green-200' },
  ];

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
        <button className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors self-start sm:self-auto">
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
              {offersList.map((offer, index) => (
                <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                  {/* Titre + Sous-titre dynamique */}
                  <td className="py-4 px-6 max-w-md">
                    <h4 className="font-bold text-slate-800 text-sm leading-snug">{offer.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Réf: <span className="font-semibold">{offer.id}</span> • {offer.category}
                    </p>
                  </td>
                  
                  {/* Date Limite */}
                  <td className="py-4 px-4 font-medium text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className={`w-4 h-4 ${offer.isUrgent ? 'text-red-500' : 'text-slate-400'}`} />
                      <span className={offer.isUrgent ? 'text-red-600 font-bold' : ''}>{offer.deadline}</span>
                    </span>
                  </td>
                  
                  {/* Badge Statut */}
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${offer.statusStyle}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${offer.status === 'Ouvert' ? 'bg-green-500' : offer.status === 'En révision' ? 'bg-orange-500' : 'bg-slate-400'}`} />
                      {offer.status}
                    </span>
                  </td>
                  
                  {/* Budget */}
                  <td className="py-4 px-4 text-right font-bold text-slate-700">
                    {offer.budget}
                  </td>
                  
                  {/* Actions (Editer / Supprimer) */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors" title="Modifier">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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