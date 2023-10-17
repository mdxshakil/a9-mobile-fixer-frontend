export const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
