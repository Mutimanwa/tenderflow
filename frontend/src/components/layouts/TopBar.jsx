import { Search, Bell , CircleQuestionMark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
  const { user, logout } = useAuth() || {};

  const defaultProfile = { name: 'Invité', role: 'Visiteur', avatarColor: 'bg-slate-400' };
  const currentUser = user || defaultProfile;

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="relative w-72 hidden sm:block">
        <Search className="w-4 h-4 text-neutralLight absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input type="text" placeholder="Rechercher un appel d'offres, un fichier..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all text-secondary" />
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <div className="flex gap-3">
            <Bell className="w-4 h-4 text-secondary" />
            <CircleQuestionMark className="w-4 h-4 text-secondary" />
        </div>

        <div className="h-8 w-[1px] bg-slate-200"></div>

        <div className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{currentUser.name}</p>
            <p className="text-[11px] font-medium text-third/80">{currentUser.role}</p>
          </div>
          <div className={`${currentUser.avatarColor || 'bg-slate-400'} w-10 h-10 text-white font-bold rounded-full flex items-center justify-center text-sm uppercase shadow-inner`}>{(currentUser.name || 'I').charAt(0)}</div>
          {user ? (
            <button onClick={logout} className="text-xs text-rose-600 hover:underline">Se déconnecter</button>
          ) : null}
        </div>
      </div>
    </header>
  );
}