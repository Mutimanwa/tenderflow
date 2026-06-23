import { UploadCloud, ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

export default function NewSubmission({ onBack }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const fileRef = useRef();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const location = useLocation();
  const offerIdFromState = location?.state?.offerId;
  const [offerMeta, setOfferMeta] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadOffer() {
      if (!offerIdFromState) return;
      try {
        const o = await api.getOffer(offerIdFromState);
        if (mounted) setOfferMeta({ ref: o.ref || (`#${offerIdFromState}`), title: o.title || o.name });
      } catch (e) {
        console.error('Failed to fetch offer meta', e);
      }
    }
    loadOffer();
    return () => { mounted = false; };
  }, [offerIdFromState]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); 
    if (!amount || !description) {
      alert('Veuillez remplir le montant et la description.');
      return;
    }
    setSubmitting(true);
    
    try {
      const payload = {
        offerId: offerIdFromState || null,
        amount: Number(amount),
        description,
        ownerId: user?._id || user?.id || undefined,
        documentIds: uploadedDocs.map(d => d._id || d.id),
      };
      
      await api.createSubmission(payload, token);
      alert('Soumission envoyée avec succès.');
      navigate('/app/client/submissions');
    } catch (err) {
      console.error(err);
      alert(err.body?.message || 'Échec de l\'envoi de la soumission');
    } finally { 
      setSubmitting(false); 
    }
  };

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    
    try {
      for (const f of Array.from(files)) {
        const doc = await api.uploadDocument(f, token);
        setUploadedDocs(prev => [...prev, doc]);
      }
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'upload des fichiers');
    } finally { 
      setUploading(false); 
      if (fileRef.current) {
        fileRef.current.value = ''; 
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Bouton retour */}
      <button 
        type="button"
        onClick={onBack || (() => navigate(-1))}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
        Retour
      </button>

      {/* Titre et Badge */}
      <div className="space-y-2">
        <span className="px-2.5 py-0.5 bg-orange-50 text-[#b45f06] font-bold text-[10px] rounded-md border border-orange-100/60">
          {offerMeta?.ref || (offerIdFromState ? `Appel d'offre #${offerIdFromState}` : "Appel d'offre")}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          {offerMeta?.title || 'Nouvelle proposition'}
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Soumettez votre proposition financière et technique.
        </p>
      </div>

      {/* Changement en vraie balise <form> pour gérer le "Entrée" du clavier et la sémantique HTML */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Champ Montant Proposé */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            Montant proposé (€)
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 flex items-center px-4 py-3 focus-within:border-orange-500 focus-within:bg-white transition-all">
            <span className="text-slate-400 text-sm mr-3">💶</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00" 
              required
              className="w-full bg-transparent border-none outline-none text-slate-800 font-bold text-sm placeholder:text-slate-300 focus:ring-0"
            />
            <span className="text-xs font-black text-[#b45f06] tracking-wider ml-2">EUR</span>
          </div>
          <p className="text-[10px] text-slate-400 italic">Indiquez le montant total hors taxes (HT).</p>
        </div>

        {/* Champ Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            Description de la proposition
          </label>
          <textarea 
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez brièvement votre approche, votre méthodologie et les points clés de votre offre..."
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs font-medium text-slate-700 outline-none focus:border-orange-500 focus:bg-white transition-all resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Zone d'Upload */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            Upload de fichiers (Documents techniques & PDF)
          </label>
          <div className="border-2 border-dashed border-orange-200 rounded-2xl p-8 bg-orange-50/10 hover:bg-orange-50/20 transition-colors flex flex-col items-center justify-center text-center group">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#b45f06] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Glisser-déposer vos fichiers ici</h4>
            <p className="text-[11px] text-slate-400 mt-1 mb-4">Formats acceptés : PDF, ZIP (max. 25MB par fichier)</p>
            
            {/* Input caché */}
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
                className="px-4 py-2 border border-orange-200 rounded-xl text-xs font-bold text-[#b45f06] bg-white hover:bg-orange-50 transition-colors shadow-sm"
              >
                Parcourir les fichiers
              </button>
              <button 
                type="button"
                disabled={uploading || uploadedDocs.length === 0} 
                onClick={() => setUploadedDocs([])} 
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
              >
                Réinitialiser
              </button>
            </div>

            {uploading && <p className="text-xs text-slate-500 mt-3 animate-pulse">Upload en cours…</p>}
            
            {uploadedDocs.length > 0 && (
              <div className="mt-4 text-left w-full max-w-xl">
                <h5 className="text-xs font-bold text-slate-700 mb-2">Fichiers attachés</h5>
                <ul className="space-y-2 text-xs text-slate-600">
                  {uploadedDocs.map((d, i) => (
                    <li key={d._id || d.id || i} className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="truncate pr-4">{d.originalName || d.filename || d.name || 'document'}</span>
                      <button 
                        type="button"
                        className="text-[11px] text-red-600 font-bold hover:underline flex-shrink-0" 
                        onClick={async () => { 
                          if (!confirm('Retirer ce fichier ?')) return; 
                          try { 
                            await api.deleteDocument(d._id || d.id, token); 
                            setUploadedDocs(prev => prev.filter(x => (x._id || x.id) !== (d._id || d.id))); 
                          } catch (e) { 
                            console.error(e); 
                            alert('Impossible de supprimer'); 
                          } 
                        }}
                      >
                        Retirer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Barre d'action basse incluse dans le formulaire */}
        <div className="pt-4 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Transmission sécurisée par chiffrement TLS 1.3</span>
          </div>
          <button 
            type="submit" 
            disabled={submitting || uploading} 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/10 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Envoi…' : 'Envoyer la proposition'} <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </form>
    </div>
  );
}