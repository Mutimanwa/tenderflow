import  { useState } from 'react';
import { FileText, Check, X, Download, Search, Building2, Calendar} from 'lucide-react';

export default function ManageSubmissions() {
  const [searchTerm, setSearchTerm] = useState('');

  // Données de tests basées sur ta maquette Soumission.png
  const [submissions, setSubmissions] = useState([
    { id: 'SUB-0981', company: "Tech Solutions Ltd", project: "Refonte Site E-commerce Magento Enterprise", date: "30 Mai 2026", amount: "18 500 €", fileTech: "CDC_Tech_V1.pdf", status: "En attente", statusColor: "bg-amber-50 text-amber-600 border-amber-200" },
    { id: 'SUB-0982', company: "Innov'Marketing", project: "Campagne Social Ads & Growth Hacking", date: "29 Mai 2026", amount: "9 200 €", fileTech: "Prop_Commerciale.pdf", status: "Accepté", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: 'SUB-0983', company: "Global CyberSec", project: "Audit Sécurité Cloud & Infrastructure AWS", date: "28 Mai 2026", amount: "7 000 €", fileTech: "Audit_Specs_Global.pdf", status: "En révision", statusColor: "bg-blue-50 text-secondary border-blue-200" },
    { id: 'SUB-0984', company: "Logix Transports", project: "Optimisation de la Supply Chain Globale v4.0", date: "25 Mai 2026", amount: "42 000 €", fileTech: "Supply_Logix_Signed.pdf", status: "Refusé", statusColor: "bg-rose-50 text-rose-600 border-rose-200" },
  ]);

  // Action pour changer le statut d'une candidature à la volée
  const handleAction = (id, newStatus, colorClasses) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: newStatus, statusColor: colorClasses } : sub
    ));
  };

  const filteredSubmissions = submissions.filter(sub => 
    sub.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* En-tête de la page */}
      <div>
        <h1 className="text-2xl font-extrabold text-secondary tracking-tight">
          Suivi des Candidatures
        </h1>
        <p className="text-xs text-third mt-0.5">
          Analysez les dossiers techniques, comparez les propositions financières et attribuez les marchés.
        </p>
      </div>

      {/* Barre de recherche rapide */}
      <div className="bg-white p-4 border border-slate-100 rounded-2xl shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutralLight absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une entreprise, un projet..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grille / Tableau des candidatures */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-secondary uppercase tracking-wider">
                <th className="py-4 px-6">ID & Candidat</th>
                <th className="py-4 px-4">Appel d'Offres Visé</th>
                <th className="py-4 px-4 text-right">Offre Financière</th>
                <th className="py-4 px-4">Dossier Technique</th>
                <th className="py-4 px-4 text-center">Statut</th>
                <th className="py-4 px-6 text-center">Décision Générale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/40 transition-colors group">
                  
                  {/* Candidat */}
                  <td className="py-4 px-6 font-bold text-secondary">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-100 text-secondary rounded-lg flex items-center justify-center">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div>{sub.company}</div>
                        <div className="text-[10px] font-medium text-third/60 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {sub.date}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Projet Visé */}
                  <td className="py-4 px-4 text-third font-medium max-w-xs truncate">
                    {sub.project}
                  </td>

                  {/* Montant financier */}
                  <td className="py-4 px-4 text-right font-extrabold text-secondary text-sm">
                    {sub.amount}
                  </td>

                  {/* Fichier joint */}
                  <td className="py-4 px-4 font-medium text-primary">
                    <div className="inline-flex items-center gap-1.5 cursor-pointer bg-orange-50 hover:bg-orange-100 px-2.5 py-1.5 rounded-lg transition-colors">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[120px] text-[11px] font-bold">{sub.fileTech}</span>
                      <Download className="w-3 h-3 text-primary ml-1" />
                    </div>
                  </td>

                  {/* Statut Badge */}
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold border ${sub.statusColor}`}>
                      {sub.status}
                    </span>
                  </td>

                  {/* Actions d'approbation */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleAction(sub.id, 'Accepté', 'bg-emerald-50 text-emerald-600 border-emerald-200')}
                        disabled={sub.status === 'Accepté'}
                        title="Valider la candidature"
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors disabled:opacity-30"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(sub.id, 'Refusé', 'bg-rose-50 text-rose-600 border-rose-200')}
                        disabled={sub.status === 'Refusé'}
                        title="Rejeter le dossier"
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-30"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}