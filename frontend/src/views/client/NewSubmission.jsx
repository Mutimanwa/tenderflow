import { useState, useRef, useEffect } from 'react'; 
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import { 
  UploadCloud, 
  ShieldCheck, 
  ArrowLeft, 
  Send, 

  Euro, 
  FileText, 
  Trash2, 
  MessageSquare
} from 'lucide-react';
export default function NewSubmission({ onBack }) {
  // Récupération de l'ID depuis l'URL (ex: /submit-proposal/:offerId)
  const { offerId: offerIdFromParams } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  // Pivot résilient : prend l'ID de l'URL en priorité, sinon celui du state
  const targetOfferId = offerIdFromParams || location?.state?.offerId;

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [offerMeta, setOfferMeta] = useState(null);
  const fileRef = useRef();

  // Chargement des métadonnées de l'offre associée
  useEffect(() => {
    let mounted = true;
    async function loadOffer() {
      if (!targetOfferId) return;
      try {
        const o = await api.getOffer(targetOfferId);
        if (mounted) {
          setOfferMeta({ 
            ref: o.ref || `#${targetOfferId.slice(-6).toUpperCase()}`, 
            title: o.title || o.name 
          });
        }
      } catch (e) {
        console.error('Failed to fetch offer meta', e);
      }
    }
    loadOffer();
    return () => { mounted = false; };
  }, [targetOfferId]);

  // Gestion du Drag & Drop visuel
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  // Traitement et envoi séquentiel des fichiers vers le serveur
  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const f of Array.from(files)) {
        const doc = await api.uploadDocument(f, token);
        // doc doit renvoyer l'objet créé en BDD avec son _id, originalName, etc.
        setUploadedDocs(prev => [...prev, doc]);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors du téléversement de certains fichiers.");
    } finally { 
      setUploading(false); 
      if (fileRef.current) fileRef.current.value = ''; 
    }
  };

  // Suppression définitive du document sur le serveur
  const removeFile = async (docId) => {
    if (!confirm('Supprimer définitivement ce document du serveur ?')) return;
    try {
      await api.deleteDocument(docId, token);
      setUploadedDocs(prev => prev.filter(x => (x._id || x.id) !== docId));
    } catch (e) {
      console.error(e);
      alert('Impossible de supprimer le document.');
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); 
    if (!amount || !description) {
      alert('Veuillez remplir le montant et la description de votre offre.');
      return;
    }
    if (!targetOfferId) {
      alert("Erreur : Aucun appel d'offre n'est associé à cette soumission.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        offer: targetOfferId, // Format aligné avec le schéma Mongoose (ObjectId)
        amount: String(amount),
        message: description, // Aligné sur le champ 'message' attendu par ton SubmissionSchema
        files: uploadedDocs.map(d => d.filename || d._id || d.id), // Stocke les chemins/noms ou IDs selon votre logique
      };
      
      await api.createSubmission(payload, token);
      alert('Votre proposition a été transmise avec succès.');
      navigate('/app/client/submissions');
    } catch (err) {
      console.error(err);
      alert(err.body?.message || "Échec de l'envoi de la proposition");
    } finally { 
      setSubmitting(false); 
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 px-4 animate-fadeIn">
      
      {/* Bouton retour épuré */}
      <div>
        <button 
          type="button"
          onClick={onBack || (() => navigate(-1))}
          className="inline-flex items-center gap-2 p-2 px-3 border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 rounded-xl transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
          Retour à l'offre
        </button>
      </div>

      {/* En-tête de la page */}
      <div className="space-y-2">
        <div className="inline-block px-2.5 py-1 bg-orange-50 text-[#b45f06] font-bold text-[10px] uppercase tracking-wider rounded-lg border border-orange-100/60">
          {offerMeta?.ref || "Code Réf En cours"}
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
          {offerMeta?.title || 'Chargement de la mission...'}
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Formulez votre proposition technique et commerciale pour soumissionner à ce marché.
        </p>
      </div>

      {/* Petite carte résumée de l'offre (affordance visuelle) */}
      {targetOfferId && (
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <div className="text-xs font-bold text-slate-700">Vous soumettez pour</div>
            <div className="text-sm font-extrabold text-slate-900 truncate max-w-lg">{offerMeta?.title || `#${String(targetOfferId).slice(-8).toUpperCase()}`}</div>
            <div className="text-[11px] text-slate-400">Référence: {offerMeta?.ref || targetOfferId}</div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => navigate(`/app/client/offer/${targetOfferId}`)} className="text-xs font-bold text-orange-600 hover:underline">Voir l'appel</button>
            <button type="button" onClick={() => onBack ? onBack() : navigate(-1)} className="text-xs text-slate-500 border px-3 py-1 rounded">Retour</button>
          </div>
        </div>
      )}

      {/* Formulaire Principal Sémantique */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Champ Montant Proposé */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
            Montant global proposé (HT)
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-[#f97316] flex items-center px-4 py-3.5 transition-all">
            <Euro className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ex: 25000" 
              required
              className="w-full bg-transparent border-none outline-none text-slate-800 font-bold text-sm placeholder:text-slate-300 focus:ring-0 p-0"
            />
            <span className="text-xs font-black text-[#f97316] tracking-wider ml-2 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
              EUR
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Indiquez votre cotation budgétaire totale ferme pour l'ensemble des livrables.</p>
        </div>

        {/* Champ Description */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
            Note de présentation & Méthodologie
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-[#f97316] flex items-start p-4 transition-all">
            <MessageSquare className="w-4 h-4 text-slate-400 mr-3 mt-0.5 shrink-0" />
            <textarea 
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Présentez brièvement vos compétences, délais d'exécution prévus et la méthodologie retenue pour cette mission..."
              required
              className="w-full bg-transparent border-none outline-none text-slate-700 font-medium text-xs placeholder:text-slate-400 focus:ring-0 p-0 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Zone de Drag & Drop Avancée pour l'Upload */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
            Dossier technique & Annexes requises
          </label>
          
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 transition-all text-center flex flex-col items-center justify-center ${
              isDragging 
                ? 'border-[#f97316] bg-orange-50/40 scale-[0.99]' 
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform ${isDragging ? 'scale-110 bg-[#f97316] text-white' : 'bg-white border border-slate-100 text-[#f97316] shadow-sm'}`}>
              <UploadCloud className="w-5 h-5" />
            </div>
            
            <h4 className="text-xs font-bold text-slate-800">
              {isDragging ? "Déposez vos fichiers maintenant !" : "Glissez-déposez vos pièces jointes ici"}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 mb-4">Formats acceptés : PDF, ZIP, DOCX (Max. 25 Mo)</p>
            
            <input 
              ref={fileRef} 
              type="file" 
              className="hidden" 
              multiple 
              onChange={(e) => handleFiles(e.target.files)} 
            />
            
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => fileRef.current.click()} 
                className="px-4 py-2 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-sm"
              >
                Parcourir les documents
              </button>
              {uploadedDocs.length > 0 && (
                <button 
                  type="button"
                  onClick={() => setUploadedDocs([])} 
                  className="px-4 py-2 border border-red-100 rounded-xl text-[11px] font-bold text-red-600 bg-white hover:bg-red-50 transition-all shadow-sm"
                >
                  Tout retirer
                </button>
              )}
            </div>

            {uploading && (
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 animate-pulse">
                <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                Téléversement des fichiers sur le serveur...
              </div>
            )}
          </div>

          {/* Liste interactive des fichiers importés */}
          {uploadedDocs.length > 0 && (
            <div className="pt-2 space-y-2">
              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Fichiers rattachés ({uploadedDocs.length})</h5>
              <div className="grid gap-2 sm:grid-cols-2">
                {uploadedDocs.map((d, i) => {
                  const idVal = d._id || d.id || i;
                  const name = d.originalName || d.filename || 'Document joint';
                  return (
                    <div key={idVal} className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl group hover:bg-slate-100/50 transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1.5 bg-white border rounded-lg text-slate-400 group-hover:text-[#f97316] transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-700 truncate pr-2" title={name}>
                          {name}
                        </span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeFile(idVal)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100 shrink-0"
                        title="Retirer le document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pied du formulaire : Sécurité & Actions */}
        <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/40">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Soumission chiffrée & vérifiée par l'infrastructure</span>
          </div>
          
          <button 
            type="submit" 
            disabled={submitting || uploading} 
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f97316] hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/10 transition-all active:scale-[0.99] select-none"
          >
            {submitting ? 'Transmission en cours...' : 'Confirmer et envoyer la proposition'} 
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </form>
    </div>
  );
}