import { UploadCloud, CheckCircle, AlertTriangle, FileText, Download } from 'lucide-react';

export default function MyDocuments() {
  const legalDocs = [
    { id: 1, title: "Registre du Commerce (RC)", filename: "RC_TechSolutions_2026.pdf", status: "À jour", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle },
    { id: 2, title: "Attestation Fiscale (OBR)", filename: "OBR_Quitus_Q1_2026.pdf", status: "À jour", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle },
    { id: 3, title: "Bilan Financier Certifié 2025", filename: "Bilan_Financier_Signe.pdf", status: "Expire bientôt", statusColor: "text-amber-600 bg-amber-50 border-amber-100", icon: AlertTriangle },
    { id: 4, title: "Attestation de Non-Redressement", filename: "Aucun document associé", status: "Manquant", statusColor: "text-rose-600 bg-rose-50 border-rose-100", icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-secondary tracking-tight">
          Dossier Économique & Juridique
        </h1>
        <p className="text-xs text-third mt-0.5">
          Centralisez vos pièces de conformité réglementaires requises pour l'attribution des marchés publics.
        </p>
      </div>

      {/* Grille de documents */}
      <div className="grid sm:grid-cols-2 gap-6">
        {legalDocs.map((doc) => {
          const StateIcon = doc.icon;
          return (
            <div key={doc.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:border-slate-200 transition-all">
              <div>
                {/* En-tête du document */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="font-bold text-secondary text-sm">{doc.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${doc.statusColor}`}>
                    <StateIcon className="w-3 h-3" /> {doc.status}
                  </span>
                </div>

                {/* Nom du fichier s'il existe */}
                <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-2 text-xs font-medium text-third mb-6">
                  <FileText className="w-4 h-4 text-neutralLight shrink-0" />
                  <span className="truncate">{doc.filename}</span>
                </div>
              </div>

              {/* Barre d'action basse */}
              <div className="flex gap-2 border-t border-slate-50 pt-4">
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-primary text-secondary group-hover:hover:text-white font-bold py-2.5 rounded-xl text-xs transition-all">
                  <UploadCloud className="w-3.5 h-3.5" /> Remplacer
                </button>
                {doc.status !== 'Manquant' && (
                  <button title="Télécharger le fichier actuel" className="p-2.5 border border-slate-200 text-third hover:text-secondary rounded-xl transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}