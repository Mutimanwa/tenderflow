import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderPlus, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Briefcase 
} from 'lucide-react';
import { logo } from '../../assets';

export default function Sidebar({ userRole = 'fournisseur' }) {
  
  // Configuration des menus selon le rôle
  const menus = {
    acheteur: [
      { name: 'Vue d\'ensemble', path: 'admin/dashboard', icon: LayoutDashboard },
      { name: 'Gérer les offres', path: 'admin/offers', icon: Briefcase },
      { name: 'Publier une offre', path: 'admin/new-offer', icon: FolderPlus },
      { name: 'Candidatures', path: 'admin/submissions', icon: FileText },
      { name: 'Utilisateurs', path: 'admin/users', icon: Users },
    ],
    fournisseur: [
      { name: 'Tableau de bord', path: 'client/dashboard', icon: LayoutDashboard },
      { name: 'Offres disponibles', path: 'client/offers', icon: Briefcase },
      { name: 'Mes soumissions', path: 'client/submissions', icon: FileText },
      { name: 'Mes documents', path: 'client/documents', icon: FolderPlus },
    ]
  };

  const currentMenu = menus[userRole] || menus.fournisseur;

  return (
    <aside className="w-64 bg-slate-50/10 text-white flex flex-col justify-between h-screen sticky top-0 shrink-0 border-r border-x-slate-200">
      <div>
        {/* Logo de l'application */}
        <div className="h-20 flex items-center px-6 ">
          <img src={logo} alt="TenderFlow" className="h-8 object-contain " />
        </div>

        {/* Liens de Navigation */}
        <nav className="p-4 space-y-1.5 mt-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Navigation principale
          </p>
          
          {currentMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={`/app/${item.path}`}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold tracking-wide transition-all duration-150
                  ${isActive 
                    ? 'bg-primary/20 text-primary-hover shadow-lg shadow-primary/10 border-l-4  border-primary' 
                    : 'text-secondary hover:bg-primary/20 hover:text-primary-hover border-l-4 border-transparent hover:border-primary'
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

      {/* Zone Paramètres & Déconnexion en bas */}
      <div className="p-4 border-none space-y-1">
        <NavLink
          to="/app/client/profile"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
            ${isActive ? 'bg-primary text-white' : 'text-secondary hover:bg-slate-800/60 hover:text-white'}
          `}
        >
          <Settings className="w-4 h-4" />
          <span>Paramètres</span>
        </NavLink>

        <button 
          onClick={() => window.location.href = '/login'}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-all text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}