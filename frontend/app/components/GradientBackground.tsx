import React from 'react';

type GradientBackgroundProps = {
  children: React.ReactNode;
};

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full bg-gradient-dark bg-gradient-size animate-gradient overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 r px-4">
        {children}
      </div>
    </div>
  );
}