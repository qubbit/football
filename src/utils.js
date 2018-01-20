function determineCurrentSeason() {
  const d = new Date();
  const year = d.getFullYear();
  const month = 1 + d.getMonth();

  if (month < 6) {
    return {year, season: year - 1, name: `${year - 1}/${year}`};
  }
  return {year, season: year, name: `${year}/${year + 1}`};
}

// Determine text color based on the background color
// using the perceptive luminance algorithm.
// backgroundColor is a 3-tuple {r, g, b}
function determineTextColor(backgroundColor) {
  const [r, g, b] = backgroundColor;
  const a = 1 - ( 0.299 * r + 0.587 * g + 0.114 * b)/255;
  return (a < 0.5) ? [0, 0, 0] : [255, 255, 255];
}


// color is a 3-tuple {r, g, b}
function arrayToColor(color) {
  const [r, g, b] = color;
  return `rgb(${r}, ${g}, ${b})`;
}

export { arrayToColor, determineCurrentSeason, determineTextColor }
