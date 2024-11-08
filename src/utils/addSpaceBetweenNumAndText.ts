export const addSpaceBetweenNumAndText = (value: string) =>
  value.replace(/(\d)([A-Za-z]+)/, '$1 $2');
