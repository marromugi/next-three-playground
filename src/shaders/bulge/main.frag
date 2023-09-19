precision highp float;

uniform sampler2D uTexture;
uniform vec2 uMouse;
varying vec2 vUv;

vec2 bulge(vec2 uv, vec2 center) {
  uv -= center;
  float dist = pow(length(uv) / 0.6, 2.0); // distance from UVs top right corner
  float strength = 0.6 / (1.0 + dist);
  uv *= strength; 
  uv += center;

  return uv;
}

void main() {
  vec2 bulgeUv = bulge(vUv, uMouse);
  vec4 tex = texture2D(uTexture, bulgeUv);
  gl_FragColor.rgb = tex.rgb;
  gl_FragColor.a = 1.0;
}