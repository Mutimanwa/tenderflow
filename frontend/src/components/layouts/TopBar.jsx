import { Search, Bell , CircleQuestionMark} from 'lucide-react';

export default function Topbar({ userRole, setUserRole }) {
  
  // Profils fictifs calqués sur tes cas d'usage
  const profileInfo = {
    acheteur: { name: 'Nelson Blessing', role: 'Acheteur / Admin', avatarColor: 'bg-orange-500' },
    fournisseur: { name: 'Daniel Luc', role: 'Fournisseur Certifié', avatarColor: 'bg-blue-500' }
  };

  const currentUser = profileInfo[userRole];
  setUserRole(userRole); // Assure que le rôle est défini pour les tests

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* Barre de recherche intégrée */}
      <div className="relative w-72 hidden sm:block">
        <Search className="w-4 h-4 text-neutralLight absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Rechercher un appel d'offres, un fichier..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary"
        />
      </div>

      {/* Actions à droite : Commutateur de test, Notification, Profil */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Bouton de Notifications */}

        <div className="flex gap-3">
            <Bell className="w-4 h-4 text-secondary" />
            <CircleQuestionMark className="w-4 h-4 text-secondary" />
        </div>

        {/* Séparateur */}
        <div className="h-8 w-[1px] bg-slate-200"></div>

        {/* Bloc Profil Utilisateur */}
        <div className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">
              {currentUser.name}
            </p>
            <p className="text-[11px] font-medium text-third/80">
              {currentUser.role}
            </p>
          </div>
          <div className={`w-10 h-10 ${currentUser.avatarColor} text-white font-bold rounded-full flex items-center justify-center text-sm uppercase shadow-inner`}>
            {currentUser.name.charAt(0)}
          </div>
          
        </div>
      </div>
    </header>
  );
}