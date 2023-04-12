export function hasNonEmptyProperty<T extends Record<string, any>>(
  obj: T,
  predicate: (value: any) => boolean
): boolean {
  return Object.values(obj).some((value) => {
    if (Array.isArray(value)) {
      return value.some((item) => !predicate(item)); // check if any item in the array is not empty
    }
    return !predicate(value); // check if the property value is not empty
  });
}
export const capitalizeFirstLetter = (string: string | undefined) => {
  let nameCap;
  return (nameCap = string
    ? string.charAt(0).toUpperCase() + string?.slice(1)
    : null);
};
