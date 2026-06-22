import { 
  FileText, CheckCircle2, Download, Star, Share2, 
  MapPin, Building2, Mail, HelpCircle, ArrowLeft, ShieldCheck 
} from 'lucide-react';

export default function TenderDetails({ onBack }) {
  // Données extraites fidèlement de ta maquette Details d'ofres.jpg
  const tender = {
    ref: "#AO-2024-089",
    status: "Ouvert",
    publishDate: "Publié le 12 Octobre 2023",
    title: "Modernisation de l'Infrastructure Réseau",
    description: "Mise à jour complète des équipements backbone et déploiement de la fibre optique sur 12 sites stratégiques de la métropole. Le projet vise à transformer l'infrastructure de communication existante en une architecture moderne, résiliente et sécurisée. Face à la croissance des besoins en bande passante et à l'obsolescence de certains équipements actifs, la métropole engage un plan de modernisation triennal. Le prestataire retenu devra assurer l'audit, la conception, la fourniture du matériel et la migration des services sans interruption majeure. Une attention particulière sera portée à l'intégration de protocoles de sécurité de nouvelle génération et à la supervision centralisée.",
    budget: "1 450 000 €",
    contractType: "Marché Public à Prix Global",
    entity: "Mairie de Paris - DSI",
    location: "Paris & Métropole",
    supportEmail: "support@tendeflow.fr",
    timeline: {
      launch: "12 Octobre 2023",
      deadline: "15 Novembre 2023 à 12:00 (GMT+1)",
      attribution: "01 Décembre 2023"
    },
    docs: [
      { name: "Cahier_Des_Charges.pdf", size: "2.4 MB", type: "pdf", color: "border-red-100 bg-red-50 text-red-600" },
      { name: "Bordereau_Prix.xlsx", size: "850 KB", type: "excel", color: "border-green-100 bg-green-50 text-green-600" },
      { name: "Annexe_Technique.pdf", size: "4.1 MB", type: "pdf", color: "border-blue-100 bg-blue-50 text-blue-600" }
    ]
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Fil d'Ariane / Bouton Retour */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
        Retour aux appels d'offres
      </button>

      {/* En-tête : Badges & Titre Principal */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-orange-50 text-[#b45f06] font-bold text-[10px] rounded-md border border-orange-100/60">
              {tender.ref}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-50 text-green-700 font-bold text-[10px] rounded-md border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {tender.status}
            </span>
            <span className="text-xs text-slate-400 font-medium">{tender.publishDate}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            {tender.title}
          </h1>
        </div>

        {/* Boutons d'actions principaux supérieurs */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Star className="w-3.5 h-3.5" /> Favoris
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Share2 className="w-3.5 h-3.5" /> Partager
          </button>
        </div>
      </div>

      {/* Layout principal : Asymétrique (Gauche: Contenu / Droite: Widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLONNE GAUCHE : Cœur du dossier (8 colonnes) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Description Détaillée */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" /> Description détaillée
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed whitespace-pre-line">
              {tender.description}
            </p>
          </div>

          {/* 2. Exigences Techniques */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-400" /> Exigences techniques
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#b45f06] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Backbone 100Gbps</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Support natif IPv6 et segmentation MPLS.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#b45f06] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Redondance Physique</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Cheminements fibre distincts pour haute disponibilité.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#b45f06] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Certifications</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">ISO 27001 et agréments de sécurité requis.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#b45f06] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Délai d'exécution</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Livraison phase 1 sous 6 mois maximum.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Documents joints */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" /> Documents joints
              </h3>
              <button className="text-xs font-bold text-[#b45f06] hover:underline flex items-center gap-1">
                Tout télécharger <Download className="w-3 h-3" />
              </button>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-3">
              {tender.docs.map((doc, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl p-3 flex items-center justify-between gap-2 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-700 truncate">{doc.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{doc.size} • PDF</p>
                  </div>
                  <button className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-700 border border-transparent hover:border-slate-100 shadow-sm shrink-0 transition-all">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* COLONNE DROITE : Widgets contextuels (4 colonnes) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* CTA Principal Soumission */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/10">
            Soumettre une proposition
          </button>

          {/* Calendrier */}
          <div className="bg-[#f0f4fd] border border-blue-100/50 rounded-2xl p-5 space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calendrier</h4>
            <div className="space-y-4 relative border-l border-blue-200/60 pl-4 ml-1.5">
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-400 ring-4 ring-[#f0f4fd]" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Lancement</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{tender.timeline.launch}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-[#f0f4fd]" />
                <p className="text-[10px] font-bold text-orange-500 uppercase">Date Limite</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{tender.timeline.deadline}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-[#f0f4fd]" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Attribution</p>
                <p className="text-xs font-bold text-slate-400 mt-0.5">{tender.timeline.attribution}</p>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Budget Estimé</p>
            <h2 className="text-2xl font-black text-slate-800">{tender.budget}</h2>
            <p className="text-[10px] font-semibold text-slate-400 pt-1 border-t border-slate-50 mt-2 flex items-center gap-1.5">
              💼 {tender.contractType}
            </p>
          </div>

          {/* Lieu d'exécution & Données Client */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
            {/* Simulation de la carte / Mini 3D maquette */}
            <div className="rounded-xl overflow-hidden h-28 bg-slate-800 relative group">
              <img 
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=400&q=80" 
                alt="Maquette Ville" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-400" /> {tender.location}
              </div>
            </div>
            
            <div className="space-y-2.5 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{tender.entity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500">{tender.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Des Questions ? FAQ Widget */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-600" /> Des questions ?
            </h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              La phase de questions-réponses est ouverte jusqu'au 30 Octobre.
            </p>
            <button className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-2 px-4 rounded-xl text-xs border border-slate-100 transition-colors shadow-sm text-center">
              Consulter la FAQ
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}