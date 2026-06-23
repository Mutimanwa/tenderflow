import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import useOffers from '../../hooks/useOffers';
import { useAuth } from '../../context/AuthContext';
import { 
  Type, 
  DollarSign, 
  Calendar, 
  Building2, 
  Mail, 
  FileText, 
  Paperclip, 
  Trash2, 
  Link2Off, 
  UploadCloud, 
  ArrowLeft,
  Briefcase
} from 'lucide-react';

export default function EditOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateOffer, loading } = useOffers();
  const { token } = useAuth();
  const fileInputRef = useRef();
  
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    budget: '', 
    deadline: '', 
    contractType: '', 
    entity: '', 
    supportEmail: '', 
    timelineLaunch: '', 
    timelineAttribution: '' 
  });
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.getOffer(id);
        if (!mounted) return;
        
        setFormData({
          title: data.title || '',
          description: data.description || '',
          budget: data.budget || '',
          deadline: data.deadline ? new Date(data.deadline).toISOString().slice(0,10) : (data.timeline?.deadline ? new Date(data.timeline.deadline).toISOString().slice(0,10) : ''),
          contractType: data.contractType || '',
          entity: data.entity || '',
          supportEmail: data.supportEmail || '',
          timelineLaunch: data.timeline?.launch ? new Date(data.timeline.launch).toISOString().slice(0,10) : '',
          timelineAttribution: data.timeline?.attribution ? new Date(data.timeline.attribution).toISOString().slice(0,10) : ''
        });
        setDocs(Array.isArray(data.docs) ? data.docs : (data.docs || []));
      } catch (err) {
        console.error('Cannot load offer', err);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        budget: formData.budget,
        deadline: formData.deadline || undefined,
        contractType: formData.contractType,
        entity: formData.entity,
        supportEmail: formData.supportEmail,
        timeline: {
          launch: formData.timelineLaunch || undefined,
          deadline: formData.deadline || undefined,
          attribution: formData.timelineAttribution || undefined,
        },
        docs: docs.map(d => (d._id || d.id || d))
      };
      await updateOffer(id, payload);
      navigate('/app/admin/offers');
    } catch (err) {
      alert(err?.body?.message || err.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleFilePicked = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      if (!token) {
        alert('Vous devez être connecté pour téléverser des fichiers.');
        navigate('/login');
        return;
      }

      const uploaded = await api.uploadDocument(file, token);
      setDocs((prev) => [uploaded, ...prev]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Upload failed', err);
      const msg = err?.body?.message || err.message || "Échec de l'upload du fichier";
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  const unlinkDoc = (docId) => {
    setDocs((prev) => prev.filter((d) => (d._id || d.id || d) !== docId));
  };

  const deleteDoc = async (docId) => {
    if (!confirm('Supprimer définitivement ce document du serveur ?')) return;
    try {
      await api.deleteDocument(docId, token);
      setDocs((prev) => prev.filter((d) => (d._id || d.id || d) !== docId));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Échec de la suppression du document');
    }
  };

  // Classe utilitaire réutilisable pour injecter le même style d'input partout
  const inputStyle = "w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#f97316] outline-none transition-all";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 px-4 animate-fadeIn">
      {/* Barre de retour et titre */}
      <div className="flex items-center gap-4">
        <button 
          type="button" 
          onClick={() => navigate('/app/admin/offers')}
          className="p-2.5 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-slate-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Espace Administration</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Modifier l'appel d'offre</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-6 items-start">
        {/* SECTION PRINCIPALE (GAUCHE) : Contenu Majeur */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
          
          {/* Champ Titre */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-400" /> Titre de la mission
            </label>
            <div className="relative">
              <input 
                type="text"
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#f97316] outline-none transition-all"
                placeholder="Ex: Construction d'un bâtiment administratif R+2..."
                required
              />
            </div>
          </div>

          {/* Champ Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Description détaillée du cahier des charges
            </label>
            <textarea 
              rows={12} 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#f97316] outline-none transition-all leading-relaxed" 
              placeholder="Décrivez les critères d'éligibilité, les livrables attendus..."
              required
            />
          </div>
        </div>

        {/* PANNEAU LATÉRAL (DROITE) : Métadonnées & Fichiers */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Bloc Paramètres financiers et généraux */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b pb-2">Informations Générales</h2>
            
            {/* Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Budget estimé</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <DollarSign className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  value={formData.budget} 
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })} 
                  className={inputStyle}
                  placeholder="Ex: 45 000 000 BIF"
                />
              </div>
            </div>

            {/* Type de contrat */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Type de contrat</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Briefcase className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  value={formData.contractType} 
                  onChange={(e) => setFormData({ ...formData, contractType: e.target.value })} 
                  className={inputStyle}
                  placeholder="Ex: Marché Public / Offre d'emploi"
                />
              </div>
            </div>

            {/* Entité Émettrice */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Entité organisatrice</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  value={formData.entity} 
                  onChange={(e) => setFormData({ ...formData, entity: e.target.value })} 
                  className={inputStyle}
                  placeholder="Ex: Ministère de l'Éducation"
                />
              </div>
            </div>

            {/* Email Support */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Email de contact / Support</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  value={formData.supportEmail} 
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })} 
                  className={inputStyle}
                  placeholder="support@entite.bi"
                />
              </div>
            </div>
          </div>

          {/* Bloc Calendrier / Timeline */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b pb-2">Dates Clés</h2>
            
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Date de lancement</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </span>
                <input type="date" value={formData.timelineLaunch} onChange={(e) => setFormData({ ...formData, timelineLaunch: e.target.value })} className={inputStyle} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Date limite de dépôt</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-orange-500">
                  <Calendar className="w-4 h-4" />
                </span>
                <input type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} className={`${inputStyle} border-orange-200 focus:ring-orange-500/40`} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Date d'attribution prévue</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </span>
                <input type="date" value={formData.timelineAttribution} onChange={(e) => setFormData({ ...formData, timelineAttribution: e.target.value })} className={inputStyle} />
              </div>
            </div>
          </div>

          {/* GESTION COMPLÈTE DES DOCUMENTS */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-slate-400" /> Documents de l'offre
            </h2>
            
            {/* Zone de Liste des fichiers actuels */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {docs.length === 0 ? (
                <div className="text-xs text-center py-4 bg-slate-50 border border-dashed rounded-xl text-slate-400 font-medium">
                  Aucun document lié à cette offre.
                </div>
              ) : (
                docs.map((d) => {
                  const idVal = d._id || d.id || d;
                  const name = d.originalName || d.filename || ('Fichier ' + idVal);
                  const size = d.size ? ` — ${(d.size / 1024).toFixed(1)} KB` : '';
                  const date = d.uploadedAt ? new Date(d.uploadedAt).toLocaleDateString() : '';

                  return (
                    <div key={idVal} className="group flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 p-2.5 rounded-xl transition-all">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 group-hover:text-orange-500 transition-colors shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-700 truncate" title={name}>{name}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{date}{size}</div>
                        </div>
                      </div>
                      
                      {/* Actions Document différenciées */}
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button 
                          type="button" 
                          onClick={() => unlinkDoc(idVal)} 
                          className="p-1.5 hover:bg-amber-50 text-amber-600 hover:text-amber-700 rounded-lg transition-colors border border-transparent hover:border-amber-200"
                          title="Détacher de cette offre"
                        >
                          <Link2Off className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          type="button" 
                          onClick={() => deleteDoc(idVal)} 
                          className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-200"
                          title="Supprimer définitivement"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Zone Bouton d'upload stylisé */}
            <div className="mt-3">
              <input 
                ref={fileInputRef} 
                type="file" 
                onChange={handleFilePicked} 
                className="hidden" 
                id="edit-file-picker"
              />
              <label 
                htmlFor="edit-file-picker"
                className={`w-full py-3 px-4 border border-dashed border-slate-300 hover:border-orange-500 rounded-xl bg-slate-50 hover:bg-orange-50/20 text-slate-600 hover:text-orange-600 flex items-center justify-center gap-2 cursor-pointer transition-all text-xs font-bold select-none ${uploading ? 'pointer-events-none opacity-50' : ''}`}
              >
                <UploadCloud className="w-4 h-4" /> 
                {uploading ? 'Téléversement en cours...' : 'Ajouter un nouveau document'}
              </label>
            </div>
          </div>

          {/* Boutons Globaux d'Enregistrement du Formulaire */}
          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f97316] disabled:opacity-60 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/app/admin/offers')}
              className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center"
            >
              Annuler les changements
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}