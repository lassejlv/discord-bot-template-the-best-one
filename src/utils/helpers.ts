export const isDeveloper = (userId: string) => {
  const developers = process.env.DEVELOPERS.split(",") || [];
  if (!developers.includes(userId)) return false;
  else return true;
};
