export const isInArray = (array: any[], item: any) => {
  const value = array.find(value => value === item);
  return value ? true : false;
};
