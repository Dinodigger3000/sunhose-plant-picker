import * as THREE from "three";
import { getCurrentTheme, defaultTheme } from "../../components/ColorTheme";

export function createOutlineMaterial(thickness = 0.005) {
  const baseColor = getCurrentTheme().base;

  // Parse the RGB values from the string
  const rgb = baseColor.match(/\d+/g).map(Number);
  const [r, g, b] = rgb.map((v) => v / 255); // Convert to 0-1 range for WebGL
  return new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      void main() {
        vec3 newPosition = position + normal * ${thickness};
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      void main() {
        gl_FragColor = vec4(${r}, ${g}, ${b}, 1.0);
      }
    `,
    side: THREE.BackSide,
  });
}
