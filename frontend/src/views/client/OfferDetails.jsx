import {
  MapPin, Building2, Mail, HelpCircle, ArrowLeft,
  FileText, CheckCircle2, Download, Send, Star, Share2, Clock
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/client';

export default function TenderDetails({ onBack }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await api.getOffer(id);
        if (mounted) setOffer(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (id) load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500">Chargement de l'appel d'offres...</p>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="p-6 text-center bg-white border border-slate-100 rounded-2xl max-w-xl mx-auto shadow-sm">
        <p className="text-sm font-bold text-slate-700">Impossible de charger cet appel d'offres.</p>
        <button onClick={onBack || (() => navigate(-1))} className="mt-4 text-xs font-bold text-orange-600 hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Retour à la liste
        </button>
      </div>
    );
  }

  // Configuration du badge de statut basé sur l'enum de ton modèle Mongoose
  const getStatusConfig = (status) => {
    switch (status) {
      case 'open':
        return { label: 'Ouvert', style: 'bg-green-50 text-green-700 border-green-200 ring-green-500' };
      case 'inProgress':
        return { label: 'En cours', style: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500' };
      case 'accepted':
        return { label: 'Accepté', style: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500' };
      case 'closed':
      default:
        return { label: 'Fermé', style: 'bg-slate-100 text-slate-600 border-slate-200 ring-slate-400' };
    }
  };

  const statusConfig = getStatusConfig(offer.status);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 px-4 sm:px-6">

      {/* Fil d'Ariane / Bouton Retour */}
      <button
        onClick={onBack || (() => navigate(-1))}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Retour aux appels d'offres
      </button>

      {/* GRILLE PRINCIPALE (Ajustée à la maquette) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* COLONNE GAUCHE : Contenu principal de l'appel d'offres */}
        <div className="lg:col-span-2 space-y-6">

          {/* En-tête des informations */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-lg bg-orange-50 border border-orange-100 text-[11px] font-mono font-bold text-orange-700">
                #AO-{offer._id?.substring(0, 8).toUpperCase() || 'REF'}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${statusConfig.style}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusConfig.label}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Publié le {new Date(offer.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {offer.title}
            </h1>

            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Mise à jour complète des infrastructures et déploiement stratégique sur les zones désignées.
            </p>
          </div>

          {/* Section : Description détaillée */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-600" /> Description détaillée
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-line">
              {offer.description || "Aucune description détaillée fournie."}
            </p>
          </div>

          {/* Section : Exigences techniques */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-600" /> Exigences techniques
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-800">Conformité aux Spécifications</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Respect strict du cahier des charges et des normes réseaux requises.</p>
              </div>
              <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-800">Garanties & Support</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Assistance technique et maintenance minimale après livraison de la solution.</p>
              </div>
              <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-800">Certifications</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Agrément et certifications professionnelles en cours de validité exigés.</p>
              </div>
              <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-800">Délai d'exécution</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Livraison complète attendue avant l'échéance fixée par le calendrier.</p>
              </div>
            </div>
          </div>

          {/* Section : Documents joints */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Documents joints</h3>
              <button className="text-xs font-bold text-orange-600 hover:underline inline-flex items-center gap-1">
                Tout télécharger <Download className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {offer.docs && offer.docs.length > 0 ? (
                offer.docs.map((d) => (
                  <div key={d._id || d.id} className="p-3 border border-slate-100 rounded-xl flex items-center gap-3 bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="p-2 bg-slate-100 text-slate-700 rounded-lg font-bold text-[10px]">{(d.originalName || d.filename || '').split('.').pop()?.toUpperCase() || 'DOC'}</div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700 truncate">{d.originalName || d.filename || 'Document'}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{d.uploadedAt ? new Date(d.uploadedAt).toLocaleDateString('fr-FR') : ''}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-3 text-xs text-slate-500">Aucun document joint pour cette offre.</div>
              )}
            </div>
          </div>

        </div>

        {/* COLONNE DROITE : Actions & Informations complémentaires (Sidebar) */}
        <div className="space-y-6 lg:col-span-1">

          {/* Bloc d'actions principal */}
          <div className="space-y-2.5">
            <button
              onClick={() => navigate(`/app/client/new-submission/${offer._id}`, { state: { offerId: offer._id } })}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 group active:scale-[0.98]"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Soumettre une proposition
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors shadow-sm">
                <Star className="w-3.5 h-3.5 text-slate-400" /> Favoris
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors shadow-sm">
                <Share2 className="w-3.5 h-3.5 text-slate-400" /> Partager
              </button>
            </div>
          </div>

          {/* Calendrier */}
          <div className="bg-[#f2f6fe] border border-blue-100 rounded-2xl p-5 space-y-4 shadow-sm">
            <h4 className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Calendrier
            </h4>
            <div className="space-y-4 relative border-l-2 border-blue-200/50 pl-4 ml-1.5">
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-400 ring-4 ring-[#f2f6fe]" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lancement</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{offer.timelineFormatted?.launch || (offer.createdAt ? new Date(offer.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—')}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[22px] top-0.5 w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-[#f2f6fe]" />
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Date Limite</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{offer.timelineFormatted?.deadline || (offer.deadline ? new Date(offer.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Non spécifiée')}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[22px] top-0.5 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-[#f2f6fe]" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attribution</p>
                <p className="text-xs font-bold text-slate-400 mt-0.5">Sous examen après clôture</p>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Budget Estimé</p>
              <h2 className="text-2xl font-black text-slate-800 mt-0.5">
                {offer.budget ? `${offer.budget}` : 'Sur devis'}
              </h2>
              <p className="text-[10px] font-medium text-slate-400">H.T. (Hors Taxes)</p>
            </div>
            <div className="pt-2.5 border-t border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Contrat</p>
              <p className="text-xs font-bold text-slate-700 mt-0.5 flex items-center gap-1.5">
                💼 Marché Public à Prix Global
              </p>
            </div>
          </div>

          {/* Lieu d'exécution & Données Client */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="rounded-xl overflow-hidden h-28 bg-slate-800 relative group">
              <img
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=400&q=80"
                alt="Maquette Ville"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-400" /> {offer.location || 'Burundi'}
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Direction des Achats - TenderFlow</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-500 truncate">support@tenderflow.bi</span>
              </div>
            </div>
          </div>

          {/* Des Questions ? FAQ Widget */}
          <div className="bg-orange-50/40 border border-orange-100 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-600" /> Des questions ?
            </h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              La phase de questions-réponses et clarifications est ouverte jusqu'à la date limite de dépôt.
            </p>
            <button className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-2 px-4 rounded-xl text-xs border border-slate-200 transition-colors shadow-sm text-center">
              Consulter la FAQ
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}