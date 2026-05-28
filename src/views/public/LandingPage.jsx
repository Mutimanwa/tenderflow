// import Navbar from '../../components/leading/Navbar';
// import Button from '../../components/ui/Button';

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />
//       <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//         <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
//           <div className="space-y-6">
//             <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Plateforme de gestion des appels d'offres</span>
//             <h1 className="text-5xl font-black tracking-tight text-slate-900">Simplifiez la publication, la gestion et la réponse aux appels d'offres.</h1>
//             <p className="max-w-2xl text-lg leading-8 text-slate-600">
//               TenderFlow centralise les offres, les soumissions et les documents pour les acheteurs et fournisseurs. Gagnez en visibilité et en efficacité grâce à des interfaces claires et des workflows optimisés.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Button className="shadow-xl">Découvrir</Button>
//               <Button variant="secondary">Essayer gratuitement</Button>
//             </div>
//           </div>
//           <div className="rounded-[2rem] bg-white p-10 shadow-2xl shadow-slate-900/5">
//             <div className="grid gap-6">
//               <div className="rounded-3xl border border-slate-200 p-8 bg-slate-50">
//                 <h2 className="text-xl font-semibold text-slate-900">Offres recommandées</h2>
//                 <p className="mt-3 text-sm text-slate-600">Accédez rapidement aux projets ouverts correspondant à votre profil.</p>
//               </div>
//               <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm">
//                 <div className="flex items-center justify-between text-sm text-slate-600">
//                   <span>Offre infrastructure</span>
//                   <span className="font-semibold text-slate-900">20 j</span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-slate-600">
//                   <span>Offre digitalisation</span>
//                   <span className="font-semibold text-slate-900">42 j</span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-slate-600">
//                   <span>Offre construction</span>
//                   <span className="font-semibold text-slate-900">11 j</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
import { useState } from 'react';
import { ArrowRight, CheckCircle2,CheckCircle, Star, Shield, Users, Layers, Zap } from 'lucide-react';
import {heroImage } from '../../assets';
import Navbar from '../../components/leading/Navbar';

export default function LandingPage() {
  // État pour le formulaire de simulation rapide
  const [formData, setFormData] = useState({
    title: '',
    sector: 'Informatique & Tech',
    description: '',
    budget: '',
    deadline: ''
  });

  // Mock des offres récentes pour la grille
  const recentOffers = [
    { id: 1, tag: 'Informatique', title: 'Refonte Site E-commerce Magento', budget: '15 000€ - 25 000€', duration: 'Expire dans 3 jours', color: 'bg-orange-50 text-primary' },
    { id: 2, tag: 'Marketing', title: 'Campagne Social Ads Internationale', budget: '8 000€ - 12 000€', duration: 'Expire dans 10 jours', color: 'bg-blue-50 text-secondary' },
    { id: 3, tag: 'Informatique', title: 'Audit Sécurité Cloud & Infrastructure', budget: '5 000€ - 10 000€', duration: 'Expire dans 2 jours', color: 'bg-orange-50 text-primary' },
    { id: 4, tag: 'Logistique', title: 'Optimisation Supply Chain v4.0', budget: '35 000€ - 50 000€', duration: 'Expire dans 5 jours', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-white text-third font-sans selection:bg-primary/20">
      
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <section className=" relative pt-16 pb-20 lg:pt-24 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" /><span> Livrer vos dossiers devient moderne</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-secondary tracking-tight leading-[1.1] mb-6">
              Simplifiez vos <span className="text-primary-hover">Appels d'Offres</span> en quelques clics.
            </h1>
            <p className="text-lg text-third/80 leading-relaxed mb-8 max-w-xl">
              TenderFlow accompagne les entreprises dans la création, la diffusion et la gestion de leurs projets de procurement. Trouvez les meilleurs prestataires grâce à notre réseau qualifié.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary-hover shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-all">
                Publier un Appel d'Offres <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-neutralLight text-secondary font-semibold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all">
                Découvrir la solution
              </button>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80" alt="User" />
              </div>
              <p className="text-sm text-third font-medium"><span className="text-secondary font-bold">+1.2k entreprises</span> nous font déjà confiance</p>
            </div>
          </div>
          <div className="relative flex justify-center">
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl filter blur-2xl transform scale-95 -z-10"></div> */}
            <div className="">
              <img 
                src={heroImage} 
                alt="Mockup Ordinateur" 
                className="rounded-1xl shadow-inner w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEPS SECTION */}
      <section className="bg-slate-50/60 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4">Lancez votre projet en 3 étapes</h2>
          <p className="text-third max-w-xl mx-auto mb-16">Notre plateforme automatise les tâches complexes pour vous permettre de vous concentrer sur l'élection de la meilleure offre.</p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary mb-6"><Layers className="w-6 h-6" /></div>
              <h3 className="text-lg font-bold text-secondary mb-2">1. Rédigez votre besoin</h3>
              <p className="text-sm text-third leading-relaxed">Utilisez notre éditeur intelligent pour générer rapidement votre cahier des charges et vos critères de sélection.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-secondary mb-6"><Zap className="w-6 h-6" /></div>
              <h3 className="text-lg font-bold text-secondary mb-2">2. Diffusez massivement</h3>
              <p className="text-sm text-third leading-relaxed">Votre appel d'offres est envoyé instantanément à notre réseau de prestataires qualifiés et vérifiés.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary mb-6"><Shield className="w-6 h-6" /></div>
              <h3 className="text-lg font-bold text-secondary mb-2">3. Comparez et Signez</h3>
              <p className="text-sm text-third leading-relaxed">Analysez les réponses via notre tableau comparatif automatisé et choisissez votre partenaire idéal en toute confiance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECENT OFFERS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-4">Appels d'Offres Récents</h2>
          <p className="text-third">Découvrez les dernières opportunités publiées sur TenderFlow.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentOffers.map((offer) => (
            <div key={offer.id} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-md mb-4 ${offer.color}`}>{offer.tag}</span>
                <h3 className="font-bold text-secondary text-base leading-snug mb-2 line-clamp-2">{offer.title}</h3>
                <p className="text-primary font-bold text-sm mb-1">{offer.budget}</p>
                <p className="text-xs text-rose-500 font-medium mb-6">{offer.duration}</p>
              </div>
              <button className="w-full py-2.5 text-center text-sm font-semibold border border-neutralLight text-secondary rounded-xl hover:border-primary hover:text-primary transition-colors">Voir l'offre</button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. QUICK FORM & CTA SECTION */}
      <section className="bg-slate-50/60 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary leading-tight mb-6">Prêt à publier votre premier appel d'offres ?</h2>
            <p className="text-third mb-8">Remplissez ces quelques informations pour commencer. Notre outil intelligent vous aidera à affiner votre demande une fois inscrit.</p>
            <ul className="space-y-4">
              {['Accès à +50,000 prestataires qualifiés', 'Tableau comparatif des offres automatique', 'Signature électronique sécurisée incluse'].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-third">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Titre du Projet</label>
                  <input type="text" placeholder="ex: Refonte Site E-commerce" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Secteur d'Activité</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-third">
                    <option>Informatique & Tech</option>
                    <option>Construction & BTP</option>
                    <option>Marketing & Comm</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Description sommaire</label>
                <textarea rows="3" placeholder="Décrivez les objectifs principaux de votre appel d'offres..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"></textarea>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Budget Estimé (€)</label>
                  <input type="text" placeholder="10 000 - 50 000" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Date Limite de Réponse</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-third" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all mt-2">Publier mon Appel d'Offres</button>
              <p className="text-[11px] text-center text-third/60">En publiant, vous acceptez nos conditions générales d'utilisation.</p>
            </form>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS & STATS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold text-secondary mb-6">Ce que nos clients disent de TenderFlow</h2>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
              <span className="text-6xl text-primary/20 absolute top-2 left-4 font-serif">“</span>
              <p className="text-sm text-third leading-relaxed font-semibold relative z-10 mb-6 italic">
                "Grâce à TenderFlow, nous avons réduit notre cycle de décision de 6 semaines à seulement 12 jours. La qualité des prestataires sur la plateforme est exceptionnelle et l'outil de comparaison nous a fait gagner un temps précieux."
              </p>
              <div className="flex items-center gap-3">
                <img className="w-11 h-11 rounded-full object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Marie" />
                <div>
                  <h4 className="font-bold text-secondary text-sm">Marie Lefebvre</h4>
                  <p className="text-xs text-third/70">Directrice Achats, Groupe Nexa</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {[{v:'98%', t:'Satisfaction Client'}, {v:'+12k', t:'Offres Publiées'}, {v:'24h', t:'Temps de Réponse Moyen'}, {v:'-30%', t:'Coûts de Gestion'}].map((stat, i) => (
              <div key={i} className="bg-blue-50/50 p-8 rounded-2xl border border-blue-50 text-center">
                <span className="block text-3xl sm:text-4xl text-secondary mb-1">{stat.v}</span>
                <span className="text-xs sm:text-sm font-medium text-third">{stat.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-secondary text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <span className="text-2xl font-bold text-white tracking-tight block mb-4">Tender<span className="text-primary">Flow</span></span>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">Plateforme SaaS de gestion d'appels d'offres en Europe et Afrique de l'Est. Optimisez vos processus de sourcing dès aujourd'hui.</p>
          </div>
          {['Produit', 'Compagnie', 'Légal'].map((cat, i) => (
            <div key={i}>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{cat}</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Appels d'Offres Publics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center md:flex md:justify-between text-xs text-slate-500">
          <p>© 2026 TenderFlow SAS. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">Fait avec passion pour les Systèmes Opérationnels ✨</p>
        </div>
      </footer>
    </div>
  );
}