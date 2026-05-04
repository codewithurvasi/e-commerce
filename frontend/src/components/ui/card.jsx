// src/components/ui/card.jsx
export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border bg-[var(--card-bg)] shadow ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}