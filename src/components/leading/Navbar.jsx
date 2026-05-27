import 'react';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo de TenderFlow */}
        <div className="flex items-center gap-2 select-none cursor-pointer">
          <div className="flex gap-1 h-7 items-end">
            <span className="w-1.5 h-5 bg-secondary rounded-full"></span>
            <span className="w-1.5 h-7 bg-primary rounded-full"></span>
            <span className="w-1.5 h-4 bg-secondary rounded-full"></span>
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          </div>
          <span className="text-xl font-bold text-secondary tracking-tight">
            Tender<span className="text-primary">Flow</span>
          </span>
        </div>

        {/* Liens Centraux */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-third">
          <a href="#" className="text-primary font-semibold">Accueil</a>
          <a href="#" className="hover:text-secondary transition-colors">Comment ça marche</a>
          <a href="#" className="hover:text-secondary transition-colors">Tarifs</a>
          <a href="#" className="hover:text-secondary transition-colors">Contactez-nous</a>
        </div>

        {/* Boutons Actions */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-secondary hover:text-primary transition-colors">
            Se connecter
          </button>
          <button className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            S'inscrire
          </button>
          <button className="hidden lg:block text-sm font-semibold border border-secondary text-secondary px-5 py-2.5 rounded-xl hover:bg-secondary hover:text-white transition-all">
            Publier un Appel d'Offres
          </button>
        </div>
      </div>
    </nav>
  );
}