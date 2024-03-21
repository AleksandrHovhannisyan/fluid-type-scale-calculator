export const preprocessBoolean = (value: unknown) => {
  // Boolean query params are 'on' if checked and omitted otherwise. App also supports true/false aliases. Anything else is false.
  return typeof value === 'undefined' ? false : ['on', 'true'].includes(String(value));
};
