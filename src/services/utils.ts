export const prepareFullName = (name: string): string => {
  return name.replace(/[\u2013\u2014]/g, '-');
}
