export const getLinkToAnotherModel = (
  prevValue: string,
  newValue: string,
  id: string,
) => {
  const normalizedPrevValue = prevValue.toLowerCase().replaceAll(' ', '-');
  const normalizedNewValue = newValue.toLowerCase().replaceAll(' ', '-');

  const newId = id.replace(normalizedPrevValue, normalizedNewValue);

  return `../${newId}`;
};
