/**
 * Helper function to join class names
 * @param classes
 */
export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
