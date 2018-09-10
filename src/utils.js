// Various utility functions used by the app are placed here in no particular order

// All the colors used in the app are in intermediate format of [r, g, b]
import tinycolor from 'tinycolor2';

function determineCurrentSeason() {
  const d = new Date();
  const year = d.getFullYear();
  const month = 1 + d.getMonth();

  if (month < 6) {
    return { year, season: year - 1, name: `${year - 1}/${year}` };
  }
  return { year, season: year, name: `${year}/${year + 1}` };
}

// Determine text color based on the background color
// using perceptive luminance algorithm
function determineTextColor(backgroundColor) {
  const [r, g, b] = backgroundColor;
  const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return a < 0.5 ? [0, 0, 0] : [255, 255, 255];
}

function arrayToColor(color) {
  const [r, g, b] = color;
  return `rgb(${r}, ${g}, ${b})`;
}

// Imagine we have a color C and we want to
// derived another color based on that which
// we want to set as our theme color, think sidebar
// theme color akin to slack, the passed in color needs
// to be appropriately darkened based on it's luminance value
function themeColor(color) {
  const hsl = tinycolor(arrayToColor(color)).toHsl();
  const { h, s, l } = hsl;
  const theme = { ...hsl, h: h + 0.1, s: s - 0.1, l: 0.21 };
  if (l >= 0.5) {
    theme.l = 0.17;
  } else if (l < 0.21) {
    theme.l = 0.11;
  }
  return tinycolor(theme).toHslString();
}

function normalColor(colorString = '0,0,0,0') {
  return colorString
    .split(',')
    .map(c => parseInt(c.trim(), 10))
    .slice(1, 4);
}

export {
  arrayToColor,
  determineCurrentSeason,
  determineTextColor,
  themeColor,
  normalColor
};
