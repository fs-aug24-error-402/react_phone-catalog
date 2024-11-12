import { Link } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';
import { getLinkToAnotherModel, getProductColor } from '../../utils';

interface Props {
  label: string;
  id: string;
  color: string;
  colorsAvailable: string[];
}

export const ColorSelector: FC<Props> = ({
  label,
  id,
  color,
  colorsAvailable,
}) => {
  return (
    <div className="pb-24 mb-24 border-b border-elements">
      <p className="text-small text-secondary mb-8">{label}</p>

      <div className="flex gap-8">
        {colorsAvailable.map(curColor => (
          <Link
            key={curColor}
            to={getLinkToAnotherModel(color, curColor, id)}
            className={cn(
              getProductColor(curColor),
              'rounded-lg h-32 aspect-square border-2 border-white outline outline-1 outline-elements hover:outline-icons transition-outline duration-300 ease-in-out',
              {
                'outline-primary pointer-events-none': color === curColor,
              },
            )}
          />
        ))}
      </div>
    </div>
  );
};
