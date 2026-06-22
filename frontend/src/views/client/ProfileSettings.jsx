import  { useState } from 'react';
import { 
  MapPin, BadgeCheck, Pencil, Mail, Phone, Building2, 
  Globe, TrendingUp, SlidersHorizontal, FileText, Rocket, Key 
} from 'lucide-react';

export default function Settings() {
  // États pour les toggles de préférences
  const [prefs, setPrefs] = useState({
    email: true,
    sms: false,
    reports: true
  });

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      
      {/* 1. Bandeau supérieur du profil */}
      <div className="bg-slate-50/80 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative overflow-hidden">
        {/* Effet décoratif de fond (optionnel, pour coller au côté bleuté de la maquette) */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar avec bouton d'édition */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" 
                alt="Daniel Luc" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#b45f06] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-[#8c4a05] transition-colors shadow-sm">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Informations personnelles */}
          <div className="text-center sm:text-left mt-2">
            <h1 className="text-3xl font-extrabold text-slate-800">Daniel luc</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs font-medium text-slate-500">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
                Directeur Achats
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Bujumbura, Burundi
              </span>
              <span className="flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5 text-slate-400" /> Profil Vérifié
              </span>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col gap-3 w-full md:w-auto relative z-10 mt-4 md:mt-2">
          <button className="bg-[#b45f06] hover:bg-[#9c5205] text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-md">
            Modifier le profil
          </button>
          <button className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-6 rounded-lg text-sm border border-slate-200 transition-colors shadow-sm">
            Paramètres de sécurité
          </button>
        </div>
      </div>

      {/* 2. Grille centrale (Contact & Stats) */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Carte : Informations de Contact (2 colonnes) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Informations de Contact</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-y-8 gap-x-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Adresse Email</p>
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#b45f06]" /> jeanluc@tenderflow.com
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Téléphone</p>
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#b45f06]" /> +33 6 12 34 56 78
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Entreprise</p>
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#b45f06]" /> Nova Dynamics SAS
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Site Web</p>
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#b45f06]" /> www.novadynamics.fr
              </p>
            </div>
          </div>
        </div>

        {/* Carte : Activité du compte (1 colonne, fond marron/orange foncé) */}
        <div className="bg-[#a35306] rounded-3xl p-8 text-white shadow-lg flex flex-col justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-6">Activité du compte</h2>
          
          <div className="space-y-6 flex-1">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-sm font-medium text-white/90">Appels d'offres</span>
              <span className="text-3xl font-extrabold">24</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-sm font-medium text-white/90">Offres soumises</span>
              <span className="text-3xl font-extrabold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-white/90">Contrats gagnés</span>
              <span className="text-3xl font-extrabold">08</span>
            </div>
          </div>

          <div className="mt-8 bg-white/10 rounded-xl p-3 flex items-center gap-2 text-xs font-medium backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" /> +15% vs mois dernier
          </div>
        </div>
      </div>

      {/* 3. Grille inférieure (Préférences & Activité récente) */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Carte : Préférences (1 colonne) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-800">Préférences</h2>
            <SlidersHorizontal className="w-5 h-5 text-slate-400" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Alertes Emails</span>
              <button 
                onClick={() => togglePref('email')}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${prefs.email ? 'bg-orange-200' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#b45f06] transition-transform ${prefs.email ? 'translate-x-4' : 'translate-x-0 bg-slate-400'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">SMS Notifications</span>
              <button 
                onClick={() => togglePref('sms')}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${prefs.sms ? 'bg-orange-200' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#b45f06] transition-transform ${prefs.sms ? 'translate-x-4' : 'translate-x-0 bg-slate-400'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Rapports Hebdo</span>
              <button 
                onClick={() => togglePref('reports')}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${prefs.reports ? 'bg-orange-200' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#b45f06] transition-transform ${prefs.reports ? 'translate-x-4' : 'translate-x-0 bg-slate-400'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Carte : Activité Récente (2 colonnes) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-800">Activité Récente</h2>
            <button className="text-sm font-bold text-[#b45f06] hover:underline">
              Voir tout
            </button>
          </div>

          <div className="space-y-6">
            {/* Item 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800">Nouveau document ajouté : "Nova_D_Compliance.pdf"</h3>
                <p className="text-xs text-slate-500 mt-0.5">Dossier technique - Tender #4529</p>
              </div>
              <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Il y a 2h</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800">Soumission de l'offre "Projet Eco-Logistics"</h3>
                <p className="text-xs text-slate-500 mt-0.5">Statut : En cours d'examen par Nova Dynamics SAS</p>
              </div>
              <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Hier, 16:45</span>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800">Changement de mot de passe réussi</h3>
                <p className="text-xs text-slate-500 mt-0.5">Action de sécurité confirmée par email</p>
              </div>
              <span className="text-xs font-medium text-slate-400 whitespace-nowrap">2 oct. 2023</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}