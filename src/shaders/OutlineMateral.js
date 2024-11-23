import * as THREE from "three";
import { getCurrentTheme } from "../components/ColorTheme";

export function createOutlineMaterial(thickness = 0.005) {
  const baseColor = getCurrentTheme().base;

  const [r, g, b] = [baseColor.r/255, baseColor.g/255, baseColor.b/255]; // Convert to 0-1 range for WebGL

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
