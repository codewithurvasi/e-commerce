import React, { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";

const letters = "WEBIX-ECOMMERCE".split("");

export default function LoadingScreen() {
  const { isLoaded, finishLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090f] overflow-hidden">
      <h1 className="flex text-white font-semibold tracking-[0.35em] text-3xl sm:text-4xl md:text-5xl">
        {letters.map((char, index) => (
          <span
            key={index}
            className="inline-block animate-assemble"
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Styles */}
      <style>{`
        @keyframes assemble {
          0% {
            opacity: 0;
            transform: translateY(24px) translateX(${Math.random() * 40 - 20}px);
          }
          60% {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }

        .animate-assemble {
          animation: assemble 0.9s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
      `}</style>
    </div>
  );
}
