import * as THREE from "three";
import { getCurrentTheme, defaultTheme } from "../components/ColorTheme";

// load the toon gradient texture once at site startup
 const gradientMap = new THREE.TextureLoader().load(
    "/textures/fourTone.jpg",
    function (texture) {
      texture.minFilter = texture.magFilter = THREE.NearestFilter;
    }
  );
  
  //create toon material (with default theme if current theme is null)
  export function createToonMaterial(color) {
    const currentTheme = getCurrentTheme() || defaultTheme;
    return new THREE.MeshToonMaterial({
      color: color || currentTheme.base,
      gradientMap: gradientMap,
    });
  };