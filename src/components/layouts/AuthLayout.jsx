import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
			<div className="grid max-w-6xl w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
				<section className="rounded-[2rem] bg-gradient-to-br from-primary to-secondary p-10 text-white shadow-2xl shadow-slate-900/10">
					<div className="max-w-xl space-y-6">
						<div className="space-y-3">
							<span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">TenderFlow</span>
							<h1 className="text-4xl font-black">Gestion intelligente des appels d'offres</h1>
						</div>
						<p className="text-slate-100/90 leading-7">
							Accédez à votre espace sécurisé, suivez les offres, publiez facilement vos candidatures et gérez tous vos documents au même endroit.
						</p>
						<div className="grid gap-4 text-sm text-slate-200">
							<div className="rounded-3xl bg-white/10 p-5">Tableau de bord clair pour les fournisseurs et acheteurs.</div>
							<div className="rounded-3xl bg-white/10 p-5">Formulaires simples pour créer et répondre aux appels d'offres.</div>
							<div className="rounded-3xl bg-white/10 p-5">Espace documents centralisé et historique des soumissions.</div>
						</div>
					</div>
				</section>
				<section className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-900/5">
					<Outlet />
				</section>
			</div>
		</div>
	);
}
