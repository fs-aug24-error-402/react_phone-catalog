export const getLinkToAnotherModel = (
  prevValue: string,
  newValue: string,
  id: string,
) => {
  const newId = id
    .split('-')
    .map(part =>
      part === prevValue.toLowerCase() ? newValue.toLowerCase() : part,
    )
    .join('-');

  return `../${newId}`;
};
