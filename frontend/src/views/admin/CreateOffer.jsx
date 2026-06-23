import { useState } from 'react';
import { Type, DollarSign, Share2, MapPin, Building2, Mail, UploadCloud, File, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useOffers from '../../hooks/useOffers';
import api from '../../api/client'; // Importé pour gérer l'upload direct des documents

export default function CreateOffer() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    contractType: 'Marché Public à Prix Global',
    entity: '',
    supportEmail: '',
    timelineLaunch: '',
    deadline: '',
    timelineAttribution: ''
  });

  // État pour stocker les documents uploadés [{ _id: '...', originalName: '...' }]
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const { createOffer, loading } = useOffers();
  const { token } = useAuth();

  // Gestion de l'upload des fichiers joints
const handleFileChange = async (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  if (!token) {
    alert('Vous devez être connecté pour téléverser des fichiers.');
    navigate('/login');
    return;
  }

  setUploading(true);
  try {
    const newDocs = [];
    for (const file of files) {
      const response = await api.uploadDocument(file, token);
      // response should contain normalized doc fields from backend
      if (response && (response._id || response.id)) {
        newDocs.push({
          _id: response._id || response.id,
          originalName: response.originalName || response.filename || file.name,
          filename: response.filename,
          size: response.size,
          createdAt: response.createdAt,
          owner: response.owner,
          ownerName: response.ownerName,
        });
      }
    }

    setUploadedDocs((prev) => [...prev, ...newDocs]);
  } catch (err) {
    console.error("Erreur lors de l'upload du document", err);
    alert(`Une erreur est survenue : ${err?.body?.message || err?.body || err?.message}`);
  } finally {
    setUploading(false);
  }
};
  // Supprimer un document de la liste locale avant soumission
  const removeDoc = (idToRemove) => {
    setUploadedDocs((prev) => prev.filter(doc => doc._id !== idToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        budget: formData.budget,
        contractType: formData.contractType,
        entity: formData.entity,
        supportEmail: formData.supportEmail,
        deadline: formData.deadline || undefined,
        timeline: {
          launch: formData.timelineLaunch || undefined,
          deadline: formData.deadline || undefined,
          attribution: formData.timelineAttribution || undefined,
        },
        // Envoi des IDs des documents liés requis par le schéma
        docs: uploadedDocs.map(doc => doc._id)
      };

      await createOffer(payload);
      navigate('/app/admin/offers');
    } catch (err) {
      console.error('Échec création offre', err);
      alert(err?.body?.message || err.message || 'Erreur lors de la création');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6">
      
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
          Remplissez les détails ci-dessous conformes au modèle de marché de TenderFlow.
        </p>
      </div>

      {/* Formulaire Principal */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* COLONNE GAUCHE : Contenu principal (8 colonnes) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Bloc : Éditorial de l'offre */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
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
                  rows="12"
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

          {/* Bloc : Documents joints (docs) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Documents à joindre au dossier</h3>
            
            {/* Zone de dépôt / Sélection */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-orange-400 bg-slate-50/40 rounded-xl p-6 cursor-pointer group transition-colors">
              <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-orange-500 transition-colors mb-2" />
              <span className="text-xs font-bold text-slate-700">Choisir des fichiers techniques</span>
              <span className="text-[10px] text-slate-400 mt-1">PDF, Excel, Word (Max. 10MB chacun)</span>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>

            {uploading && (
              <p className="text-[11px] text-orange-600 font-semibold animate-pulse">Chargement et liaison des documents...</p>
            )}

            {/* Liste des documents déjà ajoutés au tableau 'docs' */}
            {uploadedDocs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {uploadedDocs.map((doc) => (
                  <div key={doc._id} className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50/50 rounded-xl">
                    <div className="flex items-center gap-2 min-w-0">
                      <File className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-xs font-medium text-slate-700 truncate">{doc.originalName}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeDoc(doc._id)}
                      className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* COLONNE DROITE : Paramètres obligatoires (4 colonnes) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Boîte : Paramètres du marché */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-50 pb-2">
              Configuration du marché
            </h3>

            {/* Budget Estimé */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Budget estimé
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="ex: 45 000 USD ou Sur devis"
                  className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-semibold"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
            </div>

            {/* Lieu d'exécution (location) - Ajouté selon schéma */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Lieu d'exécution</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input 
                  type="text"
                  required
                  placeholder="ex: Bujumbura, Burundi" 
                  value={formData.location} 
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                  className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-700 font-medium" 
                />
              </div>
            </div>

            {/* Type de contrat */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Type de contrat</label>
              <input 
                type="text"
                value={formData.contractType} 
                onChange={(e) => setFormData({ ...formData, contractType: e.target.value })} 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-700 font-medium" 
              />
            </div>

            {/* Entité émettrice */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Entité émettrice</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <input 
                  type="text"
                  placeholder="ex: Ministère des Infrastructures"
                  value={formData.entity} 
                  onChange={(e) => setFormData({ ...formData, entity: e.target.value })} 
                  className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-700 font-medium" 
                />
              </div>
            </div>

            {/* Email de support */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email support / contact</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email"
                  placeholder="achats@domain.bi"
                  value={formData.supportEmail} 
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })} 
                  className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-700 font-medium" 
                />
              </div>
            </div>
          </div>

          {/* Boîte : Calendrier (Timeline) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-50 pb-2">
              Dates importantes
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Date de lancement (optionnel)</label>
              <input 
                type="date" 
                value={formData.timelineLaunch} 
                onChange={(e) => setFormData({ ...formData, timelineLaunch: e.target.value })} 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 text-slate-600" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Date limite de dépôt</label>
              <input 
                type="date" 
                required
                value={formData.deadline} 
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 text-slate-600 font-semibold" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Date d'attribution (optionnel)</label>
              <input 
                type="date" 
                value={formData.timelineAttribution} 
                onChange={(e) => setFormData({ ...formData, timelineAttribution: e.target.value })} 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 text-slate-600" 
              />
            </div>
          </div>

          {/* Boutons d'actions bas de page */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full bg-[#f97316] disabled:opacity-60 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
            >
              <Share2 className="w-4 h-4" /> {loading ? 'Publication...' : "Publier l'offre"}
            </button>
            <button
              type="button"
              onClick={() => navigate('/app/admin/offers')}
              className="w-full bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-bold py-3.5 px-4 rounded-xl text-xs border border-slate-200 transition-colors shadow-sm text-center"
            >
              Annuler
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}