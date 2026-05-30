import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, FileText, ArrowLeft, Download, UploadCloud, CheckCircle2, ChevronRight } from 'lucide-react';

export default function OfferDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [proposal, setProposal] = useState({ price: '', notes: '' });

  // Simulation de récupération de l'offre sélectionnée
  const offer = {
    id: id || 'AO-2026-001',
    title: "Refonte Site E-commerce Magento Enterprise",
    sector: "Informatique & Technologies",
    org: "Ministère du Commerce",
    budget: "25 000 €",
    deadline: "15 Juin 2026",
    desc: "Ce projet vise à moderniser l'infrastructure de vente en ligne nationale afin d'absorber une charge de trafic accrue et d'offrir une expérience d'achat fluide et sécurisée. Le prestataire retenu devra s'assurer de la migration complète des données de l'ancienne architecture vers la nouvelle version entreprise.",
    criteria: [
      "Minimum de 3 ans d'expérience sur la technologie Magento Commerce",
      "Équipe certifiée 'Magento Certified Professional Developer'",
      "Garantie de support technique et maintenance corrective de 12 mois"
    ]
  };

  const handleSendSubmission = (e) => {
    e.preventDefault();
    console.log("Dossier transmis avec succès :", proposal);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-12 shadow-sm max-w-xl mx-auto text-center space-y-6 my-12 animate-fade-in">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-secondary">Candidature transmise !</h2>
          <p className="text-xs text-third mt-2 leading-relaxed">
            Votre proposition financière de <strong className="text-secondary">{proposal.price} €</strong> ainsi que votre mémoire technique ont bien été enregistrés pour le dossier <span className="font-bold text-primary">{offer.id}</span>.
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => navigate('/app/dashboard')}
            className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-lg shadow-primary/10"
          >
            Retourner au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Fil d'Ariane et Retour */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-third font-medium">
          <button onClick={() => navigate('/app/offers')} className="hover:text-primary flex items-center gap-1 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" /> Offres
          </button>
          <ChevronRight className="w-3 h-3 text-neutralLight" />
          <span className="text-secondary font-semibold">Détails de l'offre {offer.id}</span>
        </div>
      </div>

      {/* Titre du Projet */}
      <div>
        <span className="text-[10px] font-extrabold text-primary bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
          {offer.sector}
        </span>
        <h1 className="text-2xl font-extrabold text-secondary tracking-tight mt-2">
          {offer.title}
        </h1>
        <p className="text-xs text-third mt-0.5">Publié par l'entité publique : <span className="font-bold text-secondary">{offer.org}</span></p>
      </div>

      {/* Grille Principale (Layout 2 colonnes) */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* COLONNE GAUCHE : Descriptif technique (8 Colonnes) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Bloc Description */}
          <div>
            <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2.5">Contexte & Objectifs</h3>
            <p className="text-xs text-third leading-relaxed font-medium">
              {offer.desc}
            </p>
          </div>

          {/* Bloc Critères obligatoires */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Critères d'éligibilité requis</h3>
            <ul className="space-y-2.5">
              {offer.criteria.map((criterion, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-third">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  <span className="font-medium">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc Fichiers sources à récupérer */}
          <div className="pt-5 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-slate-200 text-rose-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-secondary">Cahier des Charges Fonctionnel (CDCF)</h4>
                <p className="text-[10px] text-third">Spécifications techniques d'architecture .PDF</p>
              </div>
            </div>
            <button className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:border-primary/30 rounded-xl text-xs font-bold text-secondary hover:text-primary shadow-sm transition-all">
              <Download className="w-3.5 h-3.5" /> Télécharger (4.2 MB)
            </button>
          </div>

        </div>

        {/* COLONNE DROITE : Formulaire de dépôt de candidature (4 Colonnes) */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-extrabold text-sm text-secondary">Soumissionner à cette offre</h3>
            <p className="text-[11px] text-third mt-0.5">Renseignez vos éléments pour soumettre votre candidature.</p>
          </div>

          {/* Rappel des contraintes clés */}
          <div className="space-y-2.5 text-[11px] font-medium text-third bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex justify-between">
              <span>Date limite :</span>
              <span className="font-bold text-secondary flex items-center gap-1"><Calendar className="w-3 h-3" /> {offer.deadline}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimation budget :</span>
              <span className="font-bold text-secondary">{offer.budget}</span>
            </div>
          </div>

          <form onSubmit={handleSendSubmission} className="space-y-4">
            
            {/* Input Prix */}
            <div>
              <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">
                Votre Proposition Financière (€) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutralLight">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  required
                  placeholder="ex: 22500"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary font-bold"
                  value={proposal.price}
                  onChange={(e) => setProposal({ ...proposal, price: e.target.value })}
                />
              </div>
            </div>

            {/* Note complémentaire */}
            <div>
              <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">
                Lettre d'introduction / Remarques
              </label>
              <textarea
                rows="3"
                placeholder="Ajoutez des précisions succinctes sur votre méthodologie de déploiement..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary resize-none leading-relaxed"
                value={proposal.notes}
                onChange={(e) => setProposal({ ...proposal, notes: e.target.value })}
              />
            </div>

            {/* Upload Mémoire Technique */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider">
                Mémoire Technique & Administratif *
              </label>
              <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-primary/50 transition-colors cursor-pointer bg-slate-50/50 group">
                <UploadCloud className="w-6 h-6 text-neutralLight group-hover:text-primary transition-colors mx-auto mb-1" />
                <p className="text-[10px] font-bold text-secondary">Téléverser votre dossier unique</p>
                <p className="text-[9px] text-third/70">Fichier PDF signé requis (Max. 15MB)</p>
              </div>
            </div>

            {/* Boutons d'envoi */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg shadow-primary/10 transition-all mt-2"
            >
              Envoyer ma candidature numérique
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}