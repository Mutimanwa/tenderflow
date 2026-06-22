import  { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  // Rôle par défaut de la session de développement
  const [userRole, setUserRole] = useState('fournisseur'); 

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans antialiased">
      
      {/* Sidebar latérale fixe */}
      <Sidebar userRole={userRole} />

      {/* Conteneur principal de droite */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Barre supérieure */}
        <Topbar userRole={userRole} setUserRole={setUserRole} />

        {/* Zone de défilement du contenu dynamique (Les pages d'écrans) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/40">
          <div className="max-w-7xl mx-auto">
            {/* On transmet le rôle actuel aux composants enfants si besoin via le contexte de l'Outlet */}
            <Outlet context={[userRole]} />
          </div>
        </main>

      </div>
    </div>
  );
}