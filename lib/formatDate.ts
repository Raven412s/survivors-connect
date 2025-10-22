
// Hydration-safe date formatter
export const formatDateSafe = (date: Date): string => {
  // Use consistent format that works on both server and client
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
};