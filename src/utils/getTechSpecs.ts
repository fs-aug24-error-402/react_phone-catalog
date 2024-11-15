import { Accessory, MobileDevice } from '../types';
import { addSpaceBetweenNumAndText } from './addSpaceBetweenNumAndText';

export const getTechSpecs = (prod: MobileDevice | Accessory) => {
  const entries = Object.entries(prod);
  const startIndex = entries.findIndex(([key]) => key === 'description') + 1;
  const techEntries = entries.slice(startIndex);

  const ramIndex = techEntries.findIndex(([key]) => key === 'ram');
  const ram = techEntries[ramIndex];

  const capacityIndex = entries.findIndex(([key]) => key === 'capacity');
  const capacity = entries[capacityIndex];

  techEntries.splice(
    ramIndex,
    1,
    [ram[0], addSpaceBetweenNumAndText(ram[1])],
    ['built in memory', addSpaceBetweenNumAndText(capacity[1])],
  );

  const screen = techEntries[0][1];

  if (typeof screen === 'string' && techEntries[0][0] === 'screen') {
    techEntries[0][1] = screen.replace("'", '”');
  }

  return techEntries.map(([key, value]) =>
    Array.isArray(value) ? [key, value.join(', ')] : [key, value],
  );
};
