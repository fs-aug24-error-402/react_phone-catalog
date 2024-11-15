import React from 'react';
import cn from 'classnames';

interface Props {
  count: number;
}
export const ProductCounter: React.FC<Props> = ({ count }) => {
  return (
    <div
      className={cn(
        'absolute top-16 -right-8 flex items-center justify-center',
        'w-16 h-16 text-white text-center text-[9px] font-bold',
        'bg-accent border border-solid border-white rounded-full',
        'tablet:-top-8',
      )}
    >
      {count}
    </div>
  );
};
