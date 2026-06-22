import { UserPlus, PackagePlus, BarChart3, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Créer un compte',
      description: 'Inscrivez-vous gratuitement en quelques clics pour configurer votre espace de stockage sécurisé.',
      icon: UserPlus,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      number: '02',
      title: 'Ajouter vos produits',
      description: 'Renseignez vos articles avec leurs quantités, catégories et dates de péremption associées.',
      icon: PackagePlus,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      number: '03',
      title: 'Suivre vos stocks',
      description: 'Visualisez vos indicateurs de performance et recevez des alertes automatiques avant épuisement.',
      icon: BarChart3,
      color: 'text-green-600 bg-green-50'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 pb-12">
      
      {/* En-tête centré de la page */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 font-title tracking-tight">
          Comment ça marche ?
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Découvrez la simplicité de notre plateforme pour prendre le contrôle total de vos flux de marchandises en trois étapes rapides.
        </p>
      </div>

      {/* Grille des étapes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="relative group">
              
              {/* Carte d'étape */}
              <div className="bg-white border border-slate-100/80 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative z-10">
                
                {/* En-tête de la carte : Icône + Numéro d'étape */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${step.color} transition-transform group-hover:scale-110 duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-black text-slate-100 font-title select-none group-hover:text-slate-200 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Contenu textuel */}
                <div className="space-y-2 flex-grow">
                  <h3 className="text-base font-bold text-slate-800 font-title group-hover:text-slate-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Petite flèche de liaison discrète (uniquement sur écran d'ordinateur entre les blocs) */}
              {index < 2 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-slate-300">
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}