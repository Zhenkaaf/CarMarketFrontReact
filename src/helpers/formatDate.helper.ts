export const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const timePassed = (dateString: string): string => {
  const currentDate = new Date();
  const pastDate = new Date(dateString);
  pastDate.setHours(pastDate.getHours() + 3);
  const differenceMs = currentDate.getTime() - pastDate.getTime();
  const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60));

  if (differenceHours < 1) {
    const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
    return `${differenceMinutes} min`;
  } else if (differenceHours < 24) {
    return `${differenceHours} ${differenceHours === 1 ? "hour" : "hours"}`;
  } else {
    const differenceDays = Math.floor(differenceHours / 24);
    return `${differenceDays} ${differenceDays === 1 ? "day" : "days"}`;
  }
};
