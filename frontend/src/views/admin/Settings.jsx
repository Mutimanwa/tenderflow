import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

export default function Settings() {
  const { user, token, logout } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saving, setSaving] = useState(false);
  const [pass, setPass] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateUser(user.id || user._id, { name: form.name, email: form.email }, token);
      alert('Profil mis à jour');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    } finally { setSaving(false); }
  };

  const handlePassword = async () => {
    if (!pass) return alert('Mot de passe requis');
    try {
      await api.changePassword(user.id || user._id, pass, token);
      alert('Mot de passe mis à jour. Veuillez vous reconnecter.');
      logout();
    } catch (err) { console.error(err); alert('Erreur'); }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold">Paramètres du compte</h1>
        <p className="text-sm text-slate-500">Gérez votre profil et vos informations de connexion.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold mb-1">Nom</label>
          <input className="w-full p-3 border rounded-xl" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Email</label>
          <input className="w-full p-3 border rounded-xl" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        </div>
        <div className="flex gap-2">
          <button disabled={saving} className="bg-[#f97316] text-white px-4 py-2 rounded-xl">{saving? 'Sauvegarde...' : 'Sauvegarder'}</button>
        </div>
      </form>

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold mb-2">Changer le mot de passe</h3>
        <div className="flex gap-2 items-center">
          <input type="password" className="p-3 border rounded-xl flex-1" placeholder="Nouveau mot de passe" value={pass} onChange={(e)=>setPass(e.target.value)} />
          <button onClick={handlePassword} className="bg-slate-800 text-white px-4 py-2 rounded-xl">Modifier</button>
        </div>
      </div>
    </div>
  );
}
