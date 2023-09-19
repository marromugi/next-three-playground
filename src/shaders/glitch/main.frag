precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  float texR = texture2D(uTexture, vUv * (sin(uTime) * 0.1 + 0.9)).r;
  float texG = texture2D(uTexture, vUv * (sin(uTime + 0.1) * 0.1 + 0.9)).g;
  float texB = texture2D(uTexture, vUv * (sin(uTime + 0.2) * 0.1 + 0.9)).b;
  gl_FragColor.rgb = vec3(texR, texG, texB);
  gl_FragColor.a = 1.0;
}