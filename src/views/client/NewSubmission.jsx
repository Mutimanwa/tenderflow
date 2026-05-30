import { UploadCloud, ShieldCheck, ArrowLeft, Send } from 'lucide-react';

export default function NewSubmission({ onBack }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Bouton retour */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
        Retour
      </button>

      {/* Titre et Badge de l'offre cible */}
      <div className="space-y-2">
        <span className="px-2.5 py-0.5 bg-orange-50 text-[#b45f06] font-bold text-[10px] rounded-md border border-orange-100/60">
          Appel d'offre #2024-082
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Refonte du portail E-commerce B2B
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Soumettez votre proposition financière et technique avant le 15 Octobre 2024.
        </p>
      </div>

      {/* Formulaire Principal */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Champ Montant Proposé */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            Montant proposé (€)
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 flex items-center px-4 py-3 focus-within:border-orange-500 focus-within:bg-white transition-all">
            <span className="text-slate-400 text-sm mr-3">💶</span>
            <input 
              type="number" 
              placeholder="0.00" 
              className="w-full bg-transparent border-none outline-none text-slate-800 font-bold text-sm placeholder:text-slate-300"
            />
            <span className="text-xs font-black text-[#b45f06] tracking-wider ml-2">EUR</span>
          </div>
          <p className="text-[10px] text-slate-400 italic">Indiquez le montant total hors taxes (HT).</p>
        </div>

        {/* Champ Description de la proposition */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            Description de la proposition
          </label>
          <textarea 
            rows={5}
            placeholder="Décrivez brièvement votre approche, votre méthodologie et les points clés de votre offre..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs font-medium text-slate-700 outline-none focus:border-orange-500 focus:bg-white transition-all resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Zone d'Upload Dragon Drop */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            Upload de fichiers (Documents techniques & PDF)
          </label>
          <div className="border-2 border-dashed border-orange-200 rounded-2xl p-8 bg-orange-50/10 hover:bg-orange-50/20 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#b45f06] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Glisser-déposer vos fichiers ici</h4>
            <p className="text-[11px] text-slate-400 mt-1 mb-4">Formats acceptés : PDF, ZIP (max. 25MB par fichier)</p>
            <button className="px-4 py-2 border border-orange-200 rounded-xl text-xs font-bold text-[#b45f06] bg-white hover:bg-orange-50 transition-colors shadow-sm">
              Parcourir les fichiers
            </button>
          </div>
        </div>

      </div>

      {/* Barre d'action basse (Sécurité + Envoyer) */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Transmission sécurisée par chiffrement TLS 1.3</span>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/10 transition-colors self-end sm:self-auto">
          Envoyer la proposition <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}