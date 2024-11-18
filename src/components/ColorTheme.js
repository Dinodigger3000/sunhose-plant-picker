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

// function to set the theme based on temperature, only used when the temperature profile page is active
export const setTempertureTheme = (profile) => {
  if (!profile) return;
  if (
    profile.minTemp !== undefined &&
    profile.maxTemp !== undefined
  ) {
    // Convert temperature ranges to 0-1 scale
    const minNormalized = (profile.minTemp - 30) / 70; // 30-100°F range
    const maxNormalized = (profile.maxTemp - 30) / 70;

    // Calculate average temperature position
    const avgTemp = (minNormalized + maxNormalized) / 2;

    // Calculate temperature range size
    const rangeSize = maxNormalized - minNormalized;

    // Define color stops
    const coldColor = { r: 44, g: 85, b: 144 }; // Blue
    const warmColor = { r: 144, g: 44, b: 44 }; // Red
    const wideRangeColor = { r: 102, g: 44, b: 144 }; // Purple

    let baseColor;

    if (rangeSize > 0.5) {
      // If range is wide (more than 35°F difference)
      // Blend towards purple for wide ranges
      const blendFactor = Math.min((rangeSize - 0.5) * 2, 1);
      baseColor = {
        r: Math.round(
          wideRangeColor.r * blendFactor +
          (coldColor.r * (1 - avgTemp) + warmColor.r * avgTemp) *
          (1 - blendFactor)
        ),
        g: Math.round(
          wideRangeColor.g * blendFactor +
          (coldColor.g * (1 - avgTemp) + warmColor.g * avgTemp) *
          (1 - blendFactor)
        ),
        b: Math.round(
          wideRangeColor.b * blendFactor +
          (coldColor.b * (1 - avgTemp) + warmColor.b * avgTemp) *
          (1 - blendFactor)
        ),
      };
    } else {
      // Linear interpolation between cold and warm colors
      baseColor = {
        r: Math.round(coldColor.r * (1 - avgTemp) + warmColor.r * avgTemp),
        g: Math.round(coldColor.g * (1 - avgTemp) + warmColor.g * avgTemp),
        b: Math.round(coldColor.b * (1 - avgTemp) + warmColor.b * avgTemp),
      };
    }

    setTheme(baseColor);
  }
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

    // create the base color
    const colors = {
      base: `rgb(${base.r}, ${base.g}, ${base.b})`,
    };

    // generate contrasting color1
    const oppositeHue = (h + 180) % 360; // opposite
    const contrastS = Math.min(s + 20, 100); // ++ saturation
    const contrastL = Math.min(l + 10, 90); // + lightness
    const [r1, g1, b1] = hslToRgb(oppositeHue, contrastS, contrastL);
    colors.color1 = `rgb(${r1}, ${g1}, ${b1})`;

    // generate remaining colors
    [2, 3, 4, 5].forEach((i) => {
      const newL = Math.min(l + i * 16, 95); // ++ lightness
      const newS = Math.max(s - i * 7, 10); // -- saturation
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
    "--color2-rgb",
    `${generateTheme(base).color2.match(/\d+/g).join(", ")}`
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
