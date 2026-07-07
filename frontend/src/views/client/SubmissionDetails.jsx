import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit, 
  Trash2,
  Send,
  Loader2,
  ExternalLink,
  Building2,
  Mail,
  Phone,
  FileCheck,
  ShieldCheck,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

export default function SubmissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [comment, setComment] = useState('');
  
  const isAdmin = user?.role === 'admin' || user?.role === 'acheteur';
  const isOwner = submission?.user?._id === user?._id || submission?.user === user?._id;

  useEffect(() => {
    let mounted = true;
    async function loadSubmission() {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getSubmission(id, token);
        if (!mounted) return;
        setSubmission(data);
        setSelectedStatus(data.status || 'pending');
      } catch (err) {
        console.error('Erreur lors du chargement de la soumission:', err);
        if (mounted) {
          setError(err?.body?.message || err?.message || 'Impossible de charger la soumission');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (id && token) {
      loadSubmission();
    }
    return () => { mounted = false; };
  }, [id, token]);

  // Fonction pour récupérer l'API si elle n'existe pas dans client.js
  // Ajouter dans client.js:
  // export async function getSubmission(id, token) {
  //   return request(`/api/submissions/${id}`, { headers: { ...authHeader(token) } });
  // }

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;
    setUpdating(true);
    try {
      const payload = { 
        status: selectedStatus,
        ...(comment && { adminComment: comment })
      };
      await api.updateSubmissionStatus(id, payload, token);
      // Recharger la soumission
      const updated = await api.getSubmission(id, token);
      setSubmission(updated);
      setShowStatusModal(false);
      setComment('');
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      alert(err?.body?.message || err?.message || 'Erreur lors de la mise à jour du statut');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer définitivement cette soumission ?')) return;
    try {
      await api.deleteSubmission(id, token);
      navigate('/app/admin/submissions');
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert(err?.body?.message || err?.message || 'Erreur lors de la suppression');
    }
  };

  const handleDownloadFile = (file) => {
    // Si le fichier a une URL, ouvrir dans un nouvel onglet
    if (file.url) {
      window.open(file.url, '_blank');
    } else {
      // Sinon, construire l'URL depuis le backend
      const fileUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/uploads/${file.filename || file}`;
      window.open(fileUrl, '_blank');
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'En attente',
        icon: Clock,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        ring: 'ring-amber-500/20'
      },
      review: {
        label: 'En révision',
        icon: FileCheck,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        ring: 'ring-blue-500/20'
      },
      accepted: {
        label: 'Acceptée',
        icon: CheckCircle,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        ring: 'ring-emerald-500/20'
      },
      rejected: {
        label: 'Refusée',
        icon: XCircle,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        ring: 'ring-rose-500/20'
      }
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (date) => {
    if (!date) return '—';
    try {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '—';
    }
  };

  const formatAmount = (amount) => {
    if (!amount) return 'Non spécifié';
    const num = parseFloat(String(amount).replace(/[^\d.-]/g, ''));
    if (isNaN(num)) return amount;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(num);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="text-sm font-medium text-slate-500">Chargement de la soumission...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl max-w-md text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-red-700">Erreur de chargement</h3>
          <p className="text-xs text-red-600 mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
          >
            Réessayer
          </button>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Retour
        </button>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-slate-500">Soumission non trouvée</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 text-xs text-orange-600 hover:underline"
        >
          Retour
        </button>
      </div>
    );
  }

  const statusConfig = getStatusConfig(submission.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 px-4">
      
      {/* En-tête avec bouton retour */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800">Détails de la soumission</h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Référence: #{submission._id?.slice(-8).toUpperCase() || 'N/A'} • 
              Soumise le {formatDate(submission.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isAdmin && (
            <>
              <button
                onClick={() => setShowStatusModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                <Edit className="w-3.5 h-3.5" />
                Modifier le statut
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs rounded-xl transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Supprimer
              </button>
            </>
          )}
          {isOwner && !isAdmin && submission.status === 'pending' && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs rounded-xl transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Retirer ma soumission
            </button>
          )}
        </div>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Colonne gauche: Informations du soumissionnaire */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Carte du soumissionnaire */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">
                  {submission.user?.name || 'Utilisateur'}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {submission.user?.role === 'supplier' ? 'Fournisseur' : 
                   submission.user?.role === 'buyer' ? 'Acheteur' : 'Utilisateur'}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium">{submission.user?.email || 'Non renseigné'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium">{submission.user?.company || 'Non renseigné'}</span>
              </div>
              {submission.user?.phone && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{submission.user.phone}</span>
                </div>
              )}
            </div>

            {isAdmin && (
              <button 
                onClick={() => navigate(`/app/admin/users/${submission.user?._id}`)}
                className="w-full mt-4 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Voir le profil complet
              </button>
            )}
          </div>

          {/* Carte de l'offre liée */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Appel d'offre lié</h3>
                <p className="text-[10px] text-slate-400 font-medium">Référence du marché</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-sm leading-snug">
                {submission.offer?.title || 'Offre non disponible'}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                {submission.offer?.description?.slice(0, 120) || 'Aucune description disponible'}
                {submission.offer?.description?.length > 120 && '...'}
              </p>
            </div>

            <button 
              onClick={() => navigate(`/app/client/offer/${submission.offer?._id}`)}
              className="w-full mt-4 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3 h-3" />
              Voir l'appel d'offre
            </button>
          </div>

        </div>

        {/* Colonne droite: Détails de la proposition */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Montant proposé */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Montant proposé</p>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  {formatAmount(submission.amount)}
                </h2>
                <span className="text-[10px] text-slate-400 font-medium">Hors Taxes</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Date de dépôt</p>
                <p className="text-sm font-bold text-slate-800 mt-1">
                  {formatDate(submission.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Statut actuel</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message / Note de présentation */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-orange-600" />
              <h3 className="font-bold text-sm text-slate-800">Note de présentation</h3>
            </div>
            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {submission.message || 'Aucune note de présentation fournie.'}
              </p>
            </div>
          </div>

          {/* Documents joints */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-600" />
                <h3 className="font-bold text-sm text-slate-800">Documents joints</h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {submission.files?.length || 0}
                </span>
              </div>
              {submission.files?.length > 0 && (
                <button 
                  onClick={() => submission.files.forEach(f => handleDownloadFile(f))}
                  className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Tout télécharger
                </button>
              )}
            </div>

            {submission.files?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {submission.files.map((file, index) => {
                  const fileName = typeof file === 'string' ? file : (file.filename || file.originalName || `Document ${index + 1}`);
                  const fileSize = typeof file === 'object' ? file.size : null;
                  
                  return (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 group-hover:text-orange-500 transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate" title={fileName}>
                            {fileName}
                          </p>
                          {fileSize && (
                            <p className="text-[10px] text-slate-400 font-medium">
                              {(fileSize / 1024).toFixed(1)} KB
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(file)}
                        className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Télécharger"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
                <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p>Aucun document joint à cette soumission</p>
              </div>
            )}
          </div>

          {/* Historique / Timeline (si disponible) */}
          {submission.history && submission.history.length > 0 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                Historique des statuts
              </h3>
              <div className="space-y-3">
                {submission.history.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-700">
                        {entry.status || 'Mise à jour'}
                      </p>
                      <p className="text-slate-500">
                        {entry.comment || 'Statut modifié'}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions rapides */}
          <div className="flex flex-wrap gap-3 pt-2">
            {isAdmin && submission.status === 'pending' && (
              <button
                onClick={() => setShowStatusModal(true)}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Traiter cette soumission
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              Imprimer le récapitulatif
            </button>
          </div>

        </div>
      </div>

      {/* Modal de changement de statut */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Modifier le statut</h3>
              <button 
                onClick={() => setShowStatusModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nouveau statut
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-slate-50/50"
                >
                  <option value="pending">En attente</option>
                  <option value="review">En révision</option>
                  <option value="accepted">Accepter la soumission</option>
                  <option value="rejected">Refuser la soumission</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Commentaire (optionnel)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ajouter une note interne ou un commentaire pour le fournisseur..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-slate-50/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleStatusUpdate}
                  disabled={updating}
                  className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Confirmer
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}