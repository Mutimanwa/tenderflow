export default function Button({ children, variant = 'primary', className = '', ...props }) {
	const base = 'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200';
	const variants = {
		primary: 'bg-primary text-white hover:bg-primary/90',
		secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
		ghost: 'bg-transparent text-secondary hover:bg-slate-100',
	};

	return (
		<button className={`${base} ${variants[variant] ?? variants.primary} ${className}`} {...props}>
			{children}
		</button>
	);
}
