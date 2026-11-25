import React from 'react';
import vintageLogo from '../../Assets/Chapter & Chai Vintage Bookstore Logo.png';

export const Logo = ({ size = 'normal', className = '' }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const heightClass = isLarge
    ? 'h-24 sm:h-28 md:h-32'
    : isSmall
    ? 'h-9 sm:h-10'
    : 'h-12 sm:h-14 md:h-[54px]';

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={vintageLogo}
        alt="Chapter & Chai Vintage Bookstore"
        className={`${heightClass} w-auto object-contain block mix-blend-multiply transition-transform duration-200 hover:scale-[1.02]`}
      />
    </div>
  );
};
