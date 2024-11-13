import React from 'react';

interface Props {
  count: number;
}
export const ProductCounter: React.FC<Props> = ({ count }) => {
  return (
    <div
      className="absolute top-16 right-16 flex items-center justify-center
      w-16 h-16 text-white text-center text-[9px] font-bold bg-accent
      border border-solid border-white rounded-full"
    >
      {count}
    </div>
  );
};
