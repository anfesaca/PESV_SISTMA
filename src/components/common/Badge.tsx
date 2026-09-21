import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    success: 'bg-[#e8f5e9] text-[#006837] border-[#c8e6c9]',
    warning: 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]',
    gold: 'bg-[#fec828]/25 text-[#004d28] border-[#fec828]',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-0.5 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
