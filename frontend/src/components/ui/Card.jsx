export default function Card({ title, children, footer, className = '' }) {
	return (
		<div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>
			{title && <div className="px-6 py-5 border-b border-slate-100 text-lg font-semibold text-slate-900">{title}</div>}
			<div className="p-6">{children}</div>
			{footer && <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">{footer}</div>}
		</div>
	);
}
