export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-[#D4AF37] text-white  hover:bg-[#B8860B] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
