import * as THREE from "three";

export function createOutlineMaterial(thickness = 0.005) {
  return new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      void main() {
        vec3 newPosition = position + normal * ${thickness};
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      void main() {
        gl_FragColor = vec4(1, 0.0, 0.0, 1.0);
      }
    `,
    side: THREE.BackSide,
  });
}
