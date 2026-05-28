export default function Input({ label, className = '', ...props }) {
	return (
		<label className="space-y-2 text-sm font-medium text-slate-700">
			{label && <span>{label}</span>}
			<input
				className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
				{...props}
			/>
		</label>
	);
}
