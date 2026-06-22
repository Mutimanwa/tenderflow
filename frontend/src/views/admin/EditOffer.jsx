import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Type, DollarSign, Calendar, ChevronDown, Share2 } from 'lucide-react';
import api from '../../api/client';
import useOffers from '../../hooks/useOffers';

export default function EditOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateOffer, loading } = useOffers();
  const [formData, setFormData] = useState({ title: '', description: '', budget: '', deadline: '' });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.getOffer(id);
        if (!mounted) return;
        setFormData({
          title: data.title || '',
          description: data.description || '',
          budget: data.budget || '',
          deadline: data.deadline ? new Date(data.deadline).toISOString().slice(0,10) : ''
        });
      } catch (err) {
        console.error('Cannot load offer', err);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOffer(id, formData);
      navigate('/app/admin/offers');
    } catch (err) {
      alert(err?.body?.message || err.message || 'Erreur');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold">Modifier l'appel d'offre</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-white border rounded-2xl p-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Titre</label>
            <input value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} className="w-full p-3 border rounded-xl" />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-bold mb-2">Description</label>
            <textarea rows={10} value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})} className="w-full p-3 border rounded-xl" />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border rounded-2xl p-4">
            <label className="block text-xs font-bold mb-2">Budget estimé</label>
            <input value={formData.budget} onChange={(e)=>setFormData({...formData,budget:e.target.value})} className="w-full p-3 border rounded-xl" />
          </div>
          <div className="bg-white border rounded-2xl p-4">
            <label className="block text-xs font-bold mb-2">Date limite</label>
            <input type="date" value={formData.deadline} onChange={(e)=>setFormData({...formData,deadline:e.target.value})} className="w-full p-3 border rounded-xl" />
          </div>
          <div className="space-y-2">
            <button type="submit" disabled={loading} className="w-full bg-[#f97316] text-white p-3 rounded-xl">{loading? 'Enregistrement...' : 'Enregistrer les modifications'}</button>
            <button type="button" onClick={()=>navigate('/app/admin/offers')} className="w-full bg-white border p-3 rounded-xl">Annuler</button>
          </div>
        </div>
      </form>
    </div>
  );
}
