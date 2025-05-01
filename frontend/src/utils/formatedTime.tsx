export const formatTime = (time: string | null): string => {
  if (!time) return "";

  const year = time.slice(0, 4);
  const month = time.slice(5, 7);
  const day = time.slice(8, 10);
  const hour = parseInt(time.slice(11, 13)) + 8;
  const minute = time.slice(14, 16);

  return `${year} оны ${parseInt(month)}-р сарын ${parseInt(
    day
  )} – ${hour}:${minute}`;
};
