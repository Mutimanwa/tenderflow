import { Outlet, useLocation } from 'react-router-dom';
import { loginIllustration, logo, signupIllustration } from '../../assets'; 

export default function AuthLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  // 1. Définir si c'est la page Forgot Password pour inverser le layout
  const isForgotPassword = currentPath === '/auth/forgot-password';

  // 2. Définir l'illustration dynamique en fonction de la route actuelle
  let currentIllustration = loginIllustration;
  let illustrationAlt = "Illustration de connexion";

  if (currentPath === '/auth/signup') {
    // Si tu as une image spécifique pour l'inscription, remplace loginIllustration ici :
    currentIllustration = signupIllustration; 
    illustrationAlt = "Illustration d'inscription";
  } else if (currentPath === '/auth/forgot-password') {
    // Si tu as une image spécifique pour le mot de passe oublié, remplace loginIllustration ici :
    currentIllustration = loginIllustration; 
    illustrationAlt = "Illustration mot de passe oublié";
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-white font-sans antialiased">
      
      {/* SECTION FORMULAIRES  */}
      <div className={`lg:col-span-6 flex flex-col justify-between px-6 sm:px-16 lg:px-24 py-10 relative bg-white shadow-lg ${
        isForgotPassword ? 'lg:order-last' : 'lg:order-first'
      }`}>
        
        {/* Logo d'en-tête - Centré horizontalement */}
        <div className="flex items-center justify-center select-none cursor-pointer mb-8 lg:mb-0">
          <img src={logo} alt="TenderFlow Logo" className="h-10 object-contain" />
        </div>

        {/* Zone d'affichage des formulaires enfants (Login, SignUp, ForgotPassword) */}
        <div className="w-full max-w-xl mx-auto my-auto py-4">
          <Outlet />
        </div>

        {/* Footer discret */}
        <div className="text-xs text-third/60 text-center hidden lg:block mt-8">
          © 2026 TenderFlow. Tous processus sécurisés.
        </div>
      </div>

      {/* SECTION VISUELLE : PANNEAU D'ILLUSTRATION DYNAMIQUE */}
      <div className={`hidden lg:flex lg:col-span-6 bg-gray-300 relative overflow-hidden items-center justify-center p-16 ${
        isForgotPassword ? 'lg:order-first' : 'lg:order-last'
      }`}>
        {/* Formes décoratives en arrière-plan */}
        <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/[0.05] filter blur-xl pointer-events-none" />
        
        {/* Rendu de l'image changeant selon la page */}
        <div className="relative z-10 max-w-lg text-white">
          <img 
            src={currentIllustration} 
            alt={illustrationAlt} 
            className="w-full h-auto object-contain max-h-[70vh] rounded-2xl drop-shadow-xl" 
          />
        </div>
      </div>

    </div>
  );
}