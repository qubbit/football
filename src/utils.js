export function determineCurrentSeason() {
  const d = new Date();
  const year = d.getFullYear();
  const month = 1 + d.getMonth();

  if (month < 6) {
    return { year: year, season: year - 1, name: `${year - 1}/${year}` };
  }
  return { year: year, season: year, name: `${year}/${year + 1}` };
}
