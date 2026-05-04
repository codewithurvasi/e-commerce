export function Dialog({ open, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-[var(--card-bg)] p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
}
