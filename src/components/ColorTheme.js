let currentTheme = null;

// Store theme change listeners
const themeListeners = new Set();

// subscribe to theme changes
export const subscribeToThemeChanges = (callback) => {
  themeListeners.add(callback);
  return () => themeListeners.delete(callback);
};

// red, green, blue to hue, saturation, lightness
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
};

// hue, saturation, lightness to red, green, blue
const hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// main theme setter function that generates and applies the theme
export const setTheme = (baseColor) => {
  // stopp unnecessary updates if theme hasn't changed
  if (
    currentTheme &&
    currentTheme.base === `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`
  ) {
    return currentTheme;
  }

  // be able tohandle both hex strings and RGB objects
  const base = typeof baseColor === "string" ? hexToRgb(baseColor) : baseColor;

  //  function to convert hex color to rgb object
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const generateTheme = (base) => {
    const [h, s, l] = rgbToHsl(base.r, base.g, base.b);

    // create progression of colors with increasing lightness and decreasing saturation
    const colors = {
      base: `rgb(${base.r}, ${base.g}, ${base.b})`,
    };

    // generate colors
    [1, 2, 3, 4, 5].forEach((i) => {
      const newL = Math.min(l + i * 16, 95); // increase lightness
      const newS = Math.max(s - i * 7, 10); // decrease saturation
      const [r, g, b] = hslToRgb(h, newS, newL);
      colors[`color${i}`] = `rgb(${r}, ${g}, ${b})`;
    });

    return colors;
  };

  // make it so that the theme colors can be used throughout the app with var(--color-name)
  document.documentElement.style.setProperty(
    "--base",
    generateTheme(base).base
  );
  document.documentElement.style.setProperty(
    "--color1",
    generateTheme(base).color1
  );
  document.documentElement.style.setProperty(
    "--color2",
    generateTheme(base).color2
  );
  document.documentElement.style.setProperty(
    "--color3",
    generateTheme(base).color3
  );
  document.documentElement.style.setProperty(
    "--color4",
    generateTheme(base).color4
  );
  document.documentElement.style.setProperty(
    "--color5",
    generateTheme(base).color5
  );

  // update current theme and notify listeners
  currentTheme = generateTheme(base);
  themeListeners.forEach((listener) => listener(currentTheme));
  return currentTheme;
};

// getter function to access current theme
export const getCurrentTheme = () => currentTheme;
