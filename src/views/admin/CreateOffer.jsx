import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, UploadCloud, ChevronRight,  Upload } from 'lucide-react';
import Input from '../../components/ui/Input';

export default function CreateOffer() {
  const navigate = useNavigate();
  
  // États locaux pour gérer les champs du formulaire
  const [formData, setFormData] = useState({
    title: '',
    sector: 'Informatique & Technologies',
    budget: '',
    deadline: '',
    description: '',
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvel appel d'offre créé :", formData);
    // Une fois créé, on redirige l'admin vers la liste globale des offres
    navigate('/app/offers');
  };

  return (
    <div className="space-y-6 mx-auto">
      
      {/* Fil d'Ariane / En-tête de page */}
      <div className="flex items-center gap-2 text-xs text-third font-medium">
        <span>Administration</span>
        <ChevronRight className="w-3 h-3 text-neutralLight" />
        <span className="text-primary-hover font-semibold">Créer un appel d'offres</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight">
            Publier un nouvel Appel d'Offres
          </h1>
          <p className="text-xs text-third mt-0.5">
            Remplissez les critères et importez les documents nécessaires pour lancer la consultation.
          </p>
        </div>
      </div>

      {/* Formulaire Principal */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* Colonne Principale : Informations du projet (8 colonnes) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 border border-slate-100 rounded-2xl shadow-sm space-y-6">
          
          {/* Titre du projet */}
          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Intitulé de l'Appel d'Offres *
            </label>
            <Input placeholder="ex: Modernisation de l'infrastructure réseau et sécurité cloud"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>


          {/* Description complète */}
          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Description détaillée des besoins *
            </label>
            <textarea
              required
              rows="10"
              placeholder="Décrivez précisément les spécifications techniques attendues, les livrables requis ainsi que le contexte du projet..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary resize-none leading-relaxed"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

        </div>

        {/* Colonne Droite : Date limite & Dépôt CDC (4 colonnes) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Box Date Limite */}
          <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                Secteur d'activité
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary font-medium"
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              >
                <option>Informatique & Technologies</option>
                <option>Bâtiment & Travaux Publics (BTP)</option>
                <option>Marketing & Communication</option>
                <option>Logistique & Transports</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                Date limite de dépôt *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutralLight">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>
                        <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                Budget Estimé (€ / Fbu)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutralLight">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="ex: 45 000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Box Pièces Jointes / Cahier des charges */}
          <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm space-y-4">
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider">
              Cahier des charges (Fichiers)
            </label>
            
            {/* Zone d'importation simplifiée */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer group bg-slate-50/50">
              <UploadCloud className="w-8 h-8 text-neutralLight group-hover:text-primary transition-colors mx-auto mb-2" />
              <p className="text-xs font-bold text-secondary mb-0.5">Glissez-déposez le document</p>
              <p className="text-[10px] text-third">Format PDF, DOCX (Max. 10MB)</p>
            </div>
          </div>

          {/* Actions de validation */}
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-4 rounded-xl text-sm shadow-xl shadow-primary/10 flex items-center justify-center gap-2 transition-all"
            >
              <Upload className="w-4 h-4" /> Lancer l'appel d'offres
            </button>
            <button
              type="button"
              onClick={() => navigate('/app/dashboard')}
              className="w-full bg-slate-100 border border-primary-hover hover:bg-slate-200 text-primary-hover font-bold py-3 px-4 rounded-xl text-xs transition-all"
            >
              Annuler et retourner
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}