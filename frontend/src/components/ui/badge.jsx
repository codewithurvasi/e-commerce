export function Badge({ children, className = "" }) {
  return (
    <span
      className={`px-2 py-1 text-sm rounded bg-black text-white ${className}`}
    >
      {children}
    </span>
  );
}
