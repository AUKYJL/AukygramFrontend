export const timeToHHMM = (date: string | Date) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const minutesText = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutesText}`;
};
