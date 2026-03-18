interface SectionHeaderProps {
  label: string;
  title: string;
  id?: string;
}

/**
 * Reusable section header with consistent styling
 * Reduces code duplication across sections
 */
export function SectionHeader({ label, title, id }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
        {label}
      </span>
      <h2 
        id={id}
        className="mt-3 text-4xl sm:text-5xl font-bold text-white font-serif"
      >
        {title}
      </h2>
      <div 
        className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" 
        aria-hidden="true"
      />
    </div>
  );
}
