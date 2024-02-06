/**
 * Helper function to join class names
 * @param classes
 */
export const cn = (...classes: string[]) => { // TODO: verify and remove
  return classes.filter(Boolean).join(" ");
};
