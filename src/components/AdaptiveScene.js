import React, { useEffect } from "react";
import { setTheme } from "./ColorTheme";

const AdaptiveScene = ({ profile, currentPage }) => {
  useEffect(() => {
    if (!profile) return;

    // on care level page, if profile changes, update the theme
    if (currentPage === 2 && profile.careLevel !== undefined) {
      let baseColor;
      switch (parseInt(profile.careLevel)) {
        case 0: // low care
          baseColor = { r: 144, g: 44, b: 44 }; // dark red
          break;
        case 1: // medium care
          baseColor = { r: 184, g: 44, b: 44 }; // red
          break;
        case 2: // high care
          baseColor = { r: 224, g: 44, b: 44 }; // pink
          break;
        default:
          baseColor = { r: 144, g: 44, b: 44 };
      }
      setTheme(baseColor);
    }
  }, [profile, currentPage]);

  return null;
};

export default AdaptiveScene;
