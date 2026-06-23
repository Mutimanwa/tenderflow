import { useState, useEffect, useRef } from 'react';
import { UploadCloud, FileText, ArrowUpDown, Trash2, Loader2, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

export default function MyDocuments() {
  const [activeTab, setActiveTab] = useState('Tout');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null); // Centralisation des retours d'erreur

  const fileRef = useRef();
  const { token } = useAuth();

  const categories = ['Tout', 'Attestations', 'Technique', 'Financier'];

  // --- CHARGEMENT DES DONNÉES ---
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getDocuments(token);
      setDocuments(Array.isArray(data) ? data : (data.documents || []));
    } catch (err) {
      console.error(err);
      setError(err.body?.message || err.message || 'Impossible de charger vos documents.');
      setDocuments([]);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    load(); 
  }, [token]);

  // --- GESTION DES ACTIONS ---
  const handleUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      await api.uploadDocument(file, token);
      await load(); // Rechargement propre de la liste
    } catch (err) {
      console.error(err);
      setError(err.body?.message || err.message || "Échec de l'importation du document.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = ''; // Reset de l'input
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer définitivement ce document ?')) return;
    
    setError(null);
    try {
      await api.deleteDocument(id, token);
      await load();
    } catch (err) {
      console.error(err);
      setError(err.body?.message || err.message || 'Erreur lors de la suppression.');
    }
  };

  // --- TRAITEMENTS ET CALCULS DYNAMIQUES ---
  
  // 1. Filtrage par catégorie
  const filteredDocuments = documents.filter((doc) => {
    if (activeTab === 'Tout') return true;
    
    // Fallback adaptatif selon le champ retourné par votre API (type ou category)
    const docType = (doc.type || doc.category || '').toLowerCase();
    
    // Permet de matcher "Attestations" avec "Attestations Légales" par exemple
    return docType.includes(activeTab.toLowerCase());
  });

  // 2. Formatage des icônes selon l'extension du fichier
  const getFileStyle = (filename) => {
    const ext = filename?.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'text-red-500 bg-red-50 border-red-100';
      case 'doc':
      case 'docx':
        return 'text-blue-500 bg-blue-50 border-blue-100';
      case 'xls':
      case 'xlsx':
        return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      default:
        return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  // 3. Formatage de la taille
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.round(kb)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  // 4. Calcul de l'espace disque (Quota basé sur 5 GB max)
  const MAX_STORAGE_BYTES = 5 * 1024 * 1024 * 1024; // 5 GB en octets
  const totalUsedBytes = documents.reduce((acc, curr) => acc + (curr.size || 0), 0);
  const storagePercentage = Math.min(Math.round((totalUsedBytes / MAX_STORAGE_BYTES) * 100), 100);
  const formattedUsedStorage = totalUsedBytes < 1024 * 1024 * 1024 
    ? `${(totalUsedBytes / (1024 * 1024)).toFixed(1)} MB`
    : `${(totalUsedBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4">
      
      {/* Zone de Feedback d'erreur globale */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-xs font-medium animate-in fade-in duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <div className="flex-1 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="underline hover:text-red-800 font-bold ml-2">Fermer</button>
          </div>
        </div>
      )}

      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Mes Documents
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gérez l'ensemble de vos documents légaux, techniques et financiers pour vos réponses aux appels d'offres.
          </p>
        </div>
        <button 
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold text-xs rounded-xl shadow-sm transition-colors self-start sm:self-auto"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          {uploading ? 'Importation...' : 'Ajouter un document'}
        </button>
      </div>

      {/* Catégories & Tri */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-2">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === cat
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 self-end sm:self-auto transition-colors">
          <ArrowUpDown className="w-3.5 h-3.5" /> Trier par: Récents
        </button>
      </div>

      {/* Grille principale : Zone d'importation + Liste */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Colonne Gauche : Importateur */}
        <div 
          onClick={() => !uploading && fileRef.current?.click()}
          className={`lg:col-span-5 border-2 border-dashed border-orange-200 bg-orange-50/5 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[340px] group transition-colors ${uploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:bg-orange-50/20'}`}
        >
          <div className="w-12 h-12 rounded-full bg-orange-100/60 text-orange-600 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            {uploading ? 'Téléversement de votre fichier...' : 'Importer des fichiers'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            {uploading ? 'Veuillez patienter.' : 'Cliquez n\'importe où sur cette zone pour parcourir vos dossiers'}
          </p>
          
          <input 
            ref={fileRef} 
            type="file" 
            className="hidden" 
            onChange={handleUpload}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
          
          <div className="flex gap-1.5 text-[9px] font-black tracking-wider text-slate-400">
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded">PDF</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded">DOCX</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded">XLSX</span>
          </div>
        </div>

        {/* Colonne Droite : Tableau des Documents */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">Document</th>
                  <th className="py-3 px-5">Mise à jour</th>
                  <th className="py-3 px-5">Taille</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                        <span>Récupération de vos documents...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium">
                      Aucun document trouvé pour la catégorie "{activeTab}".
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map((doc, idx) => {
                    const docId = doc._id || doc.id;
                    const docName = doc.originalName || doc.filename || 'Document sans nom';
                    const docStyleClass = getFileStyle(docName);

                    return (
                      <tr key={docId || idx} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-4 px-5 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${docStyleClass}`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-800 truncate max-w-[200px]" title={docName}>
                              {docName}
                            </h4>
                            <span className="text-[10px] text-slate-400 block font-medium mt-0.5">
                              {doc.type || doc.category || 'Général'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-slate-500 font-medium">
                          {doc.createdAt || doc.updatedAt 
                            ? new Date(doc.createdAt || doc.updatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
                            : '-'
                          }
                        </td>
                        <td className="py-4 px-5 text-slate-400 font-mono text-[11px]">
                          {formatFileSize(doc.size)}
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1 justify-end">
                            {/* Lien ou bouton de téléchargement d'API optionnel */}
                            <button 
                              onClick={() => doc.url && window.open(doc.url, '_blank')}
                              disabled={!doc.url}
                              className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                              title="Télécharger"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(docId)} 
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4"/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination dynamique synchronisée */}
          <div className="border-t border-slate-100 px-5 py-3.5 flex items-center justify-between text-xs text-slate-400 bg-slate-50/20 font-semibold">
            <span>
              Affichage de 1 à {filteredDocuments.length} sur {filteredDocuments.length} document(s)
            </span>
            <div className="flex items-center gap-1 font-bold">
              <button className="w-6 h-6 rounded bg-[#b45f06] text-white flex items-center justify-center text-[11px]">1</button>
            </div>
          </div>
        </div>

      </div>

      {/* Barre basse : Capacité de Stockage dynamique */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 flex-1 max-w-2xl">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span>Capacité de stockage</span>
            <span className="text-slate-400 font-medium">{formattedUsedStorage} / 5 GB utilisé ({storagePercentage}%)</span>
          </div>
          {/* Rail de progression dynamique */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#b45f06] rounded-full transition-all duration-500" style={{ width: `${storagePercentage}%` }} />
          </div>
        </div>
        <button className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl text-xs font-black transition-colors shadow-sm whitespace-nowrap self-end md:self-auto">
          Augmenter la limite
        </button>
      </div>

    </div>
  );
}