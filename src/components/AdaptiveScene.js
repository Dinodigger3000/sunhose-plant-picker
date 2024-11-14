import React, { useEffect } from "react";
import { setTheme } from "./ColorTheme";

const AdaptiveScene = ({ profile, currentPage }) => {
  useEffect(() => {
    if (!profile) return;

    // Temperature page color theming
    if (
      currentPage === 5 &&
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
  }, [profile, currentPage]);

  return null;
};

export default AdaptiveScene;
