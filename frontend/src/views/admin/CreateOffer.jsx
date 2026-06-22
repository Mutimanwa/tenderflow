import  { useState } from 'react';
import { Type, DollarSign, Calendar, ChevronDown, Share2 } from 'lucide-react';

export default function CreateOffer() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    sector: 'Construction & BTP'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvel appel d'offre publié :", formData);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Fil d'Ariane & Titre */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
          <span>Appels d'offres</span>
          <span className="text-slate-300">/</span>
          <span className="text-orange-600 font-semibold">Nouveau Dossier</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Ajouter un appel d'offre
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Remplissez les détails ci-dessous pour publier une nouvelle opportunité de marché.
        </p>
      </div>

      {/* Formulaire Principal */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* COLONNE GAUCHE : Contenu éditorial (8 colonnes) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Champ : Titre de l'offre */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Titre de l'offre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 bg-slate-50 border-r border-slate-200 rounded-l-xl px-3">
                <Type className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                placeholder="ex: Rénovation du centre sportif municipal"
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-16 pr-4 py-3.5 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-medium placeholder:text-slate-400"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          {/* Champ : Description détaillée */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Description détaillée
            </label>
            <div className="relative rounded-xl border border-slate-200 bg-slate-50/60 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <textarea
                rows="14"
                required
                placeholder="Détaillez les exigences techniques, les livrables attendus et les critères de sélection..."
                className="w-full bg-transparent border-0 rounded-xl px-4 py-4 text-sm focus:outline-none text-slate-700 placeholder:text-slate-400 resize-none leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="text-[10px] font-medium text-slate-400 text-right p-3 bg-white rounded-b-xl border-t border-slate-100">
                Formatage Markdown supporté
              </div>
            </div>
          </div>

        </div>

        {/* COLONNE DROITE : Paramètres & Actions (4 colonnes) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Boîte : Paramètres du marché */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-50 pb-2">
              Paramètres du marché
            </h3>

            {/* Budget Estimé */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Budget estimé (€)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-10 pr-14 py-3 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-bold"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-bold text-slate-700">
                  EUR
                </div>
              </div>
            </div>

            {/* Date Limite */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Date limite de dépôt
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-600 font-medium"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>

            {/* Secteur d'activité */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Secteur d'activité
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-700 font-medium appearance-none cursor-pointer"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                >
                  <option>Construction & BTP</option>
                  <option>Informatique & Télécoms</option>
                  <option>Logistique & Transport</option>
                  <option>Services Généraux</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          {/* Encart promotionnel / préventif avec l'image de fond bois/tablette */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm h-44 group">
            <img 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80" 
              alt="Documents préparatifs" 
              className="w-full h-full object-cover brightness-[0.45] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <p className="text-xs font-bold text-white leading-relaxed">
                Assurez-vous que tous les documents techniques sont prêts avant la publication.
              </p>
            </div>
          </div>

          {/* Boutons d'actions bas de page */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Share2 className="w-4 h-4" /> Publier l'offre
            </button>
            <button
              type="button"
              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-4 rounded-xl text-xs border border-slate-200 transition-colors shadow-sm text-center"
            >
              Annuler
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}