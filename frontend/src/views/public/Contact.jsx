import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message de contact envoyé :', formData);
    // Logique d'envoi ou notification ici
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* En-tête de la page */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Contactez-nous</h1>
        <p className="text-xs text-slate-400 mt-0.5">Une question ou un besoin d'assistance sur un appel d'offres ? Notre équipe vous répond.</p>
      </div>

      {/* Grille principale : Coordonnées à gauche, Formulaire à droite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLONNE GAUCHE : Informations de contact (4 colonnes) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-50 rounded-[32px] p-8 shadow-sm space-y-8">
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">Nos coordonnées</h3>
              <p className="text-[11px] text-slate-400">N'hésitez pas à nous joindre directement.</p>
            </div>

            <div className="space-y-6">
              {/* Téléphone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Téléphone</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">+257 22 22 00 00</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">support@tenderflow.com</p>
                </div>
              </div>

              {/* Adresse / Localisation */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Adresse</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">Bujumbura, Burundi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : Formulaire de contact (8 colonnes) */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-50 rounded-[32px] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <MessageSquare className="w-5 h-5 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-800">Envoyer un message</h3>
            </div>

            {/* Rangée : Nom complet & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Nom complet</label>
                <input 
                  type="text" 
                  placeholder="Ex: Nelson Blessing"
                  className="w-full bg-[#f8fafc] border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Adresse email</label>
                <input 
                  type="email" 
                  placeholder="Ex: nelson@example.com"
                  className="w-full bg-[#f8fafc] border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Objet du message */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Objet</label>
              <input 
                type="text" 
                placeholder="Ex: Demande de partenariat / Problème technique"
                className="w-full bg-[#f8fafc] border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            {/* Corps du message */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
              <textarea 
                rows="5"
                placeholder="Écrivez votre message ici..."
                className="w-full bg-[#f8fafc] border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none transition-all text-slate-700 placeholder:text-slate-300 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            {/* Bouton de validation */}
            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e293b] hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-colors w-full sm:w-auto justify-center"
              >
                <Send className="w-4 h-4" /> Envoyer le message
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}