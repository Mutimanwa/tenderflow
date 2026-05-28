const styleMap = {
	open: 'bg-emerald-100 text-emerald-700',
	inProgress: 'bg-amber-100 text-amber-800',
	accepted: 'bg-sky-100 text-sky-700',
	rejected: 'bg-rose-100 text-rose-700',
	default: 'bg-slate-100 text-slate-700',
};

export default function Badge({ label, variant = 'default', className = '' }) {
	return (
		<span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styleMap[variant] ?? styleMap.default} ${className}`}>
			{label}
		</span>
	);
}
