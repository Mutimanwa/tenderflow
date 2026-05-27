import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar (On codera son design juste après) */}
      <aside className="w-64 bg-secondary text-white hidden md:block shrink-0">
        <div className="p-6 font-bold text-xl border-b border-slate-700">TenderFlow App</div>
        <nav className="p-4 space-y-2 text-sm text-slate-300">
          <div className="p-2.5 rounded-xl bg-primary text-white font-medium">Dashboard</div>
          <div className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer">Appels d'offres</div>
          <div className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer">Mes Documents</div>
        </nav>
      </aside>

      {/* Contenu de droite */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="text-sm font-medium text-third">Recherche...</div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-secondary">Daniel Luc</p>
              <p className="text-xs text-third">Fournisseur</p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
          </div>
        </header>

        {/* Zone d'injection des pages enfants */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}