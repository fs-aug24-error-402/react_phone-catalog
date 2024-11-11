import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { addSpaceBetweenNumAndText, getLinkToAnotherModel } from '../../utils';

interface Props {
  id: string;
  capacity: string;
  capacityAvailable: string[];
}

export const CapacitySelector: FC<Props> = ({
  id,
  capacity,
  capacityAvailable,
}) => {
  return (
    <div className="pb-24 mb-24 border-b border-elements">
      <p className="text-small text-secondary mb-8">Select capacity</p>

      <div className="flex gap-8">
        {capacityAvailable.map(curCapacity => {
          const isActive = curCapacity.replace(' ', '') === capacity;

          return (
            <Link
              key={curCapacity}
              to={getLinkToAnotherModel(capacity, curCapacity, id)}
              className={cn(
                'rounded h-32 px-8 flex items-center leading border hover:border-primary',
                'transition-bg duration-300 ease-in-out',
                {
                  'bg-white border-icons text-primary': !isActive,
                  'bg-primary border-primary text-white pointer-events-none':
                    isActive,
                },
              )}
            >
              {addSpaceBetweenNumAndText(curCapacity)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
