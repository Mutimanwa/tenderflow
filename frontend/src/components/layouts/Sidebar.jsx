import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gavel, 
  FolderHeart, 
  FolderOpen, 
  Settings, 
  LogOut, 
  FileCheck, 
  Users, 
  Plus 
} from 'lucide-react';
import { logo } from '../../assets';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ userRole: userRoleProp = 'fournisseur' }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Configuration des menus selon tes maquettes (Admin/Acheteur vs Fournisseur)
  const menus = {
    acheteur: [
      { name: 'Dashboard', path: 'admin/dashboard', icon: LayoutDashboard },
      { name: "Appels d'offres", path: 'admin/offers', icon: Gavel },
      { name: 'Soumissions', path: 'admin/submissions', icon: FileCheck },
      { name: 'Utilisateurs', path: 'admin/users', icon: Users },
      { name: 'Paramètres', path: 'profile', icon: Settings },
    ],
    fournisseur: [
      { name: 'Dashboard', path: 'client/dashboard', icon: LayoutDashboard },
      { name: "Appels d'offres actifs", path: 'client/offers', icon: Gavel },
      { name: 'Mes offres', path: 'client/submissions', icon: FolderHeart },
      { name: 'Documents', path: 'client/documents', icon: FolderOpen },
      { name: 'Paramètre', path: 'profile', icon: Settings } // Sans "s" pour coller à la maquette
    ]
  };

  // Determine effective role key used by menus. Support english/internal roles too.
  const mapRoleToKey = (r) => {
    if (!r) return null;
    const lr = String(r).toLowerCase();
    if (['admin', 'acheteur', 'buyer'].includes(lr)) return 'acheteur';
    return 'fournisseur';
  };

  const effectiveRole = mapRoleToKey(user?.role) || mapRoleToKey(userRoleProp) || 'fournisseur';
  const currentMenu = menus[effectiveRole] || menus.fournisseur;

  // Gestion des actions du gros bouton en bas selon le rôle
  const handleActionClick = () => {
    if (effectiveRole === 'acheteur') {
      navigate('/app/admin/new-offer'); // Redirection vers la création d'offre
    } else {
      navigate('/app/client/new-submission'); // Redirection vers la nouvelle soumission
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      <div>
        {/* Logo de l'application */}
        <div className="h-20 flex items-center px-6">
          <img src={logo} alt="TenderFlow" className="h-8 object-contain" />
        </div>

        {/* Liens de Navigation Principaux */}
        <nav className="p-4 space-y-1 mt-2">
          {currentMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={`/app/${item.path}`}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150
                  ${isActive 
                    ? 'bg-orange-50/60 text-orange-600 border-l-4 border-orange-500 rounded-l-none' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-r-4 border-transparent'
                  }
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Zone Actions Basses (Bouton d'action + Déconnexion) */}
      <div className="p-4 space-y-2 border-t border-slate-50">

        {/* Affichage court de l'utilisateur connecté */}
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">{(user?.name || 'U').charAt(0)}</div>
          <div className="flex-1">
            <div className="text-sm font-bold text-slate-800">{user?.name || 'Utilisateur'}</div>
            <div className="text-xs text-slate-400">{effectiveRole === 'acheteur' ? 'Acheteur / Admin' : 'Fournisseur'}</div>
          </div>
        </div>

        {/* Gros bouton d'action principale adapté au rôle */}
        {effectiveRole === 'acheteur' ? (
          <button 
            onClick={handleActionClick}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-[#964f05] hover:bg-amber-900 text-white font-black py-3 px-4 rounded-xl text-xs transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Nouveau Dossier
          </button>
        ) : (
          <button 
            onClick={handleActionClick}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 px-4 rounded-xl text-xs transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Nouvelle soumission d'offre
          </button>
        )}
        

        {/* Bouton de Déconnexion */}
        <button 
          onClick={() => { logout(); navigate('/login'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-400 hover:text-red-600 rounded-xl transition-colors text-left"
        >
          <LogOut className="w-4 h-4 text-slate-300" />
          <span>Déconnexion</span>
        </button>

      </div>
    </aside>
  );
}