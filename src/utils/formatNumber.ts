export const formatNumber = (number: number): string => {
  const formatter = new Intl.NumberFormat('en-US');

  return formatter.format(number);
};
