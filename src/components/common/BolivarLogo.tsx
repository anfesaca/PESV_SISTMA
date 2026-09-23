import React from 'react';

interface BolivarLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BolivarLogo: React.FC<BolivarLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const sizeMap = {
    sm: { img: 'h-8', title: 'text-xs', sub: 'text-[9px]' },
    md: { img: 'h-10', title: 'text-sm', sub: 'text-[10px]' },
    lg: { img: 'h-12', title: 'text-base', sub: 'text-xs' }
  };

  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Emblema Oficial PESV provisto */}
      <img
        src="/logo_progrescol.jpg"
        alt="Logo Progrescol BIC S.A.S."
        className={`${s.img} w-auto object-contain drop-shadow-xs`}
      />

      <div className="flex flex-col text-left">
        <span className={`font-bold tracking-tight text-[#006837] leading-tight ${s.title}`}>
          Plan Estratégico de Seguridad Vial
        </span>
        {showSubtitle && (
          <span className={`font-medium text-slate-500 tracking-normal ${s.sub}`}>
            Resolución 40595 de 2022 • Circular 0034
          </span>
        )}
      </div>
    </div>
  );
};

