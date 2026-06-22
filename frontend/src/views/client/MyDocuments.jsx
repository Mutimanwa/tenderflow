import { useState, useEffect, useRef } from 'react';
import { UploadCloud, FileText, ArrowUpDown, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

export default function MyDocuments() {
  const [activeTab, setActiveTab] = useState('Tout');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const { token } = useAuth();

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getDocuments();
      setDocuments(Array.isArray(data) ? data : (data.documents || []));
    } catch (err) {
      console.error(err);
      setDocuments([]);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const categories = ['Tout', 'Attestations', 'Technique', 'Financier'];

  // Données fidèles à la maquette Documents.png
  const documentList = [
    {
      name: "Kbis_2023.pdf",
      type: "Attestations Légales",
      date: "12 Oct 2023",
      size: "1.2 MB",
      status: "Vérifié",
      statusClass: "bg-green-50 text-green-700 border-green-100",
      iconColor: "text-red-500 bg-red-50"
    },
    {
      name: "Offre_Technique_V2.docx",
      type: "Technique",
      date: "05 Nov 2023",
      size: "4.5 MB",
      status: "Expire bientôt",
      statusClass: "bg-amber-50 text-amber-700 border-amber-100",
      iconColor: "text-blue-500 bg-blue-50"
    },
    {
      name: "Bilan_Comptable_2022.xlsx",
      type: "Financier",
      date: "20 Sep 2023",
      size: "890 KB",
      status: "En cours",
      statusClass: "bg-blue-50 text-blue-600 border-blue-100",
      iconColor: "text-green-500 bg-green-50"
    },
    {
      name: "Attestation_Assurance_RC.pdf",
      type: "Attestations Légales",
      date: "28 Oct 2023",
      size: "2.1 MB",
      status: "Vérifié",
      statusClass: "bg-green-50 text-green-700 border-green-100",
      iconColor: "text-red-500 bg-red-50"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
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
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors self-start sm:self-auto">
          <UploadCloud className="w-4 h-4" /> Ajouter un document
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
        
        {/* Colonne Gauche : Importateur (5 colonnes) */}
        <div className="lg:col-span-5 border-2 border-dashed border-orange-200 bg-orange-50/5 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[340px] group hover:bg-orange-50/20 transition-colors">
          <div className="w-12 h-12 rounded-full bg-orange-100/60 text-orange-600 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
            <UploadCloud className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Importer des fichiers</h3>
          <p className="text-xs text-slate-400 mt-1 mb-5">Glissez-déposez vos fichiers ici ou <span className="text-[#b45f06] font-bold underline">parcourez vos dossiers</span></p>
          <input ref={fileRef} type="file" className="hidden" onChange={async (e)=>{
            const f = e.target.files && e.target.files[0];
            if(!f) return;
            setUploading(true);
            try{
              await api.uploadDocument(f, token);
              await load();
            }catch(err){ console.error(err); alert('Échec upload'); }
            finally{ setUploading(false); fileRef.current.value = ''; }
          }} />
          <div className="flex gap-1.5 text-[9px] font-black tracking-wider text-slate-400">
            <button onClick={()=>fileRef.current.click()} className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded">Parcourir</button>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded">PDF</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded">DOCX</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded">XLSX</span>
          </div>
        </div>

        {/* Colonne Droite : Tableau des Documents (7 colonnes) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">Document</th>
                  <th className="py-3 px-5">Mise à jour</th>
                  <th className="py-3 px-5">Taille</th>
                  <th className="py-3 px-5">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {loading && (
                  <tr><td colSpan={4} className="py-6 text-center text-slate-500">Chargement…</td></tr>
                )}
                {!loading && documents.length === 0 && (
                  <tr><td colSpan={4} className="py-6 text-center text-slate-500">Aucun document</td></tr>
                )}
                {documents.map((doc, idx) => (
                  <tr key={doc._id || idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-5 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-slate-700 bg-slate-100`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-800 truncate">{doc.originalName || doc.filename}</h4>
                        <span className="text-[10px] text-slate-400 block font-medium mt-0.5">{doc.ownerName || ''}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-500 font-medium">{new Date(doc.createdAt || doc.updatedAt || undefined).toLocaleDateString()}</td>
                    <td className="py-4 px-5 text-slate-400 font-mono text-[11px]">{Math.round((doc.size || 0)/1024) + ' KB'}</td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={async ()=>{ if(window.confirm('Supprimer ce document ?')){ try{ await api.deleteDocument(doc._id || doc.id, token); await load(); }catch(e){ console.error(e); alert('Erreur'); } } }} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4"/></button>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold tracking-wide bg-green-50 text-green-700`}>Télécharger</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination mini basse */}
          <div className="border-t border-slate-100 px-5 py-3.5 flex items-center justify-between text-xs text-slate-400 bg-slate-50/20 font-semibold">
            <span>Affichage de 1–4 sur 12 documents</span>
            <div className="flex items-center gap-1 font-bold">
              <button className="w-6 h-6 rounded bg-amber-900 text-white flex items-center justify-center text-[11px]">1</button>
              <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center text-[11px] transition-colors">2</button>
              <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center text-[11px] transition-colors">3</button>
              <button className="w-6 h-6 text-slate-300 flex items-center justify-center text-[11px] transition-all">❯</button>
            </div>
          </div>
        </div>

      </div>

      {/* Barre basse : Capacité de Stockage */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 flex-1 max-w-2xl">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span>Capacité de stockage</span>
            <span className="text-slate-400 font-medium">1.2 GB / 5 GB utilisé (24%)</span>
          </div>
          {/* Rail de progression */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-800 rounded-full" style={{ width: '24%' }} />
          </div>
        </div>
        <button className="px-4 py-2 border border-amber-800 text-amber-800 hover:bg-amber-50 rounded-xl text-xs font-black transition-colors shadow-sm whitespace-nowrap self-end md:self-auto">
          Augmenter la limite
        </button>
      </div>

    </div>
  );
}