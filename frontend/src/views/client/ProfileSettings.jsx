import { useState, useEffect } from 'react';
import { 
  MapPin, BadgeCheck, Pencil, Mail, Phone, Building2, 
  Globe, TrendingUp, SlidersHorizontal, FileText, Rocket, Loader2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
export default function ProfileSettings() {
  const { user, token, logout } = useAuth();

  // Initialisation directe de l'état sans passer par un useEffect (Règle ESLint respectée)
  const [form, setForm] = useState(() => ({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    website: user?.website || '',
  }));

  // États pour l'API et les préférences
  const [submissions, setSubmissions] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [prefs, setPrefs] = useState({
    email: true,
    sms: false,
    reports: true
  });

  // Récupération des soumissions réelles pour dynamiser les stats et activités
  useEffect(() => {
    if (!token) return;
    const fetchUserActivity = async () => {
      setLoadingStats(true);
      try {
        const data = await api.getSubmissions(null, token);
        // Accept either an array or an object { submissions: [...] }
        const arr = Array.isArray(data) ? data : (data?.submissions || []);
        setSubmissions(arr);
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'activité:', err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchUserActivity();
  }, [token]);

  // Calcul dynamique des compteurs basés sur les données d'API
  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter(s => s.status === 'pending' || s.status === 'En cours').length;
  const approvedSubmissions = submissions.filter(s => s.status === 'approved' || s.status === 'accepted' || s.status === 'Gagné').length;

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    if (!user) return alert('Utilisateur non connecté');
    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email, phone: form.phone, company: form.company, website: form.website };
      await api.updateUser(user._id || user.id, payload, token);
      alert('Profil mis à jour avec succès.');
    } catch (err) {
      console.error(err);
      alert(err.body?.message || 'Erreur lors de la mise à jour');
    } finally { setLoading(false); }
  };

  const handleChangePassword = async (e) => {
    if (e) e.preventDefault();
    if (!user) return alert('Utilisateur non connecté');
    if (!newPassword) return alert('Indiquez un nouveau mot de passe');
    setPwLoading(true);
    try {
      await api.changePassword(user._id || user.id, newPassword, token);
      alert('Mot de passe changé. Vous serez déconnecté, reconnectez-vous.');
      logout();
    } catch (err) {
      console.error(err);
      alert(err.body?.message || 'Erreur lors du changement de mot de passe');
    } finally { setPwLoading(false); }
  };

  return (
    // L'attribut key force la réinitialisation du formulaire si l'utilisateur change ou finit de charger
    <div key={user?._id || user?.id} className="space-y-6 max-w-6xl mx-auto pb-10">
      
      {/* 1. Bandeau supérieur du profil */}
      <div className="bg-slate-50/80 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" 
                alt={form.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <button type="button" className="absolute bottom-1 right-1 w-8 h-8 bg-[#b45f06] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-[#8c4a05] transition-colors shadow-sm">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Informations personnelles */}
          <div className="text-center sm:text-left mt-2">
            <h1 className="text-3xl font-extrabold text-slate-800">{form.name || user?.name || 'Utilisateur'}</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs font-medium text-slate-500">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
                {form.company ? `Membre chez ${form.company}` : 'Prestataire'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Bujumbura, Burundi
              </span>
              <span className="flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" /> Profil Vérifié
              </span>
            </div>
          </div>
        </div>

        {/* Actionneurs */}
        <div className="flex flex-col gap-3 w-full md:w-auto relative z-10 mt-4 md:mt-2">
          <button 
            type="button"
            onClick={handleSaveProfile} 
            disabled={loading} 
            className="bg-[#b45f06] hover:bg-[#9c5205] text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? 'Enregistrement…' : 'Enregistrer le profil'}
          </button>
          <button 
            type="button"
            onClick={() => window.document.getElementById('pw-new')?.focus()} 
            className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-6 rounded-lg text-sm border border-slate-200 transition-colors shadow-sm"
          >
            Paramètres de sécurité
          </button>
        </div>
      </div>

      {/* 2. Grille centrale (Contact & Stats dynamiques) */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Formulaire des Informations de Contact */}
        <form onSubmit={handleSaveProfile} className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Informations de Contact</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nom complet</label>
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl bg-slate-50/50 px-3 py-2.5 focus-within:border-orange-500 focus-within:bg-white transition-all">
                  <input type="text" value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Adresse Email</label>
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl bg-slate-50/50 px-3 py-2.5 focus-within:border-orange-500 focus-within:bg-white transition-all">
                  <Mail className="w-4 h-4 text-[#b45f06] shrink-0" />
                  <input type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Téléphone</label>
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl bg-slate-50/50 px-3 py-2.5 focus-within:border-orange-500 focus-within:bg-white transition-all">
                  <Phone className="w-4 h-4 text-[#b45f06] shrink-0" />
                  <input type="text" value={form.phone} onChange={(e)=>setForm(f=>({...f,phone:e.target.value}))} className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Entreprise</label>
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl bg-slate-50/50 px-3 py-2.5 focus-within:border-orange-500 focus-within:bg-white transition-all">
                  <Building2 className="w-4 h-4 text-[#b45f06] shrink-0" />
                  <input type="text" value={form.company} onChange={(e)=>setForm(f=>({...f,company:e.target.value}))} className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none" />
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Site Web</label>
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl bg-slate-50/50 px-3 py-2.5 focus-within:border-orange-500 focus-within:bg-white transition-all">
                  <Globe className="w-4 h-4 text-[#b45f06] shrink-0" />
                  <input type="text" value={form.website} onChange={(e)=>setForm(f=>({...f,website:e.target.value}))} className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none" />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="mt-6 sm:self-end px-5 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50">
            {loading ? 'Enregistrement…' : 'Sauvegarder les modifications'}
          </button>
        </form>

        {/* Carte : Activité réelle du compte */}
        <div className="bg-[#a35306] rounded-3xl p-8 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-6">Activité du compte</h2>
          
          {loadingStats ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </div>
          ) : (
            <div className="space-y-6 flex-1">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm font-medium text-white/90">Total soumissions</span>
                <span className="text-3xl font-extrabold">{totalSubmissions}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm font-medium text-white/90">En cours d'examen</span>
                <span className="text-3xl font-extrabold">{pendingSubmissions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white/90">Offres gagnées</span>
                <span className="text-3xl font-extrabold">{approvedSubmissions}</span>
              </div>
            </div>
          )}

          <div className="mt-8 bg-white/10 rounded-xl p-3 flex items-center gap-2 text-xs font-medium backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" /> Mis à jour en temps réel
          </div>
        </div>
      </div>

      {/* 3. Grille inférieure (Préférences & Activité récente basée sur l'API) */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Carte : Préférences */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-800">Préférences</h2>
            <SlidersHorizontal className="w-5 h-5 text-slate-400" />
          </div>

          <div className="space-y-6">
            {Object.keys(prefs).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 capitalize">
                  {key === 'email' ? 'Alertes Emails' : key === 'sms' ? 'SMS Notifications' : 'Rapports Hebdo'}
                </span>
                <button 
                  type="button"
                  onClick={() => togglePref(key)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${prefs[key] ? 'bg-orange-200' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-[#b45f06] transition-transform ${prefs[key] ? 'translate-x-4' : 'translate-x-0 bg-slate-400'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carte : Activité Récente (Dynamique) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-800">Activité Récente</h2>
            <span className="text-xs text-slate-400">Dernières actions</span>
          </div>

          <div className="space-y-6">
            {submissions.length === 0 ? (
              <div className="text-center py-6 text-sm text-slate-400">Aucune activité récente enregistrée.</div>
            ) : (
              submissions.slice(0, 3).map((sub) => (
                <div key={sub._id || sub.id} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    sub.status === 'approved' || sub.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-800">Soumission pour l'offre</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Statut actuel : {sub.status || 'En attente'}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                    {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('fr-FR') : 'Récemment'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 4. Zone de sécurité (Changement de mot de passe) */}
      <form onSubmit={handleChangePassword} className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-2xl p-6 shadow-sm mt-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">Changer le mot de passe</h3>
          <p className="text-[11px] text-slate-400">Pour des raisons de sécurité, vous serez automatiquement déconnecté après modification.</p>
        </div>
        
        <div className="flex items-center gap-2 border border-slate-200 rounded-xl bg-slate-50/50 px-3 py-2.5 focus-within:border-orange-500 focus-within:bg-white transition-all">
          <input 
            id="pw-new" 
            placeholder="Nouveau mot de passe" 
            type="password" 
            required
            value={newPassword} 
            onChange={e => setNewPassword(e.target.value)} 
            className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none" 
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button 
            type="button" 
            onClick={() => setNewPassword('')} 
            className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            disabled={pwLoading} 
            className="px-4 py-2 bg-[#b45f06] text-white font-bold text-xs rounded-xl hover:bg-[#9c5205] transition-colors disabled:opacity-50"
          >
            {pwLoading ? 'Changement…' : 'Modifier le mot de passe'}
          </button>
        </div>
      </form>

    </div>
  );
}