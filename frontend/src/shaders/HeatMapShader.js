import * as THREE from "three";

export const HeatMapMaterial = new THREE.ShaderMaterial({
  transparent: true,

  uniforms: {
    time: { value: 0 }
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {

      vUv = uv;

      gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(position,1.0);

    }
  `,

  fragmentShader: `
    varying vec2 vUv;

    uniform float time;

    void main() {

      float intensity =
        sin(vUv.x * 20.0 + time) *
        cos(vUv.y * 20.0 + time);

      intensity = abs(intensity);

      vec3 color = mix(
        vec3(0.0,1.0,0.5),
        vec3(1.0,0.0,0.0),
        intensity
      );

      gl_FragColor =
        vec4(color,intensity * 0.5);
    }
  `
});