import 'react';
import Button from '../ui/Button';

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
          <Button variant='primary' >S'inscrire</Button>
          <Button variant='ghost' className="hidden lg:block border border-primary">
            Publier un Appel d'Offres
          </Button>
        </div>
      </div>
    </nav>
  );
}