attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;

uniform vec2 uResolution;
uniform vec2 uTextureResolution;
uniform float uTime;

vec2 aspect(vec2 uv, vec2 size, vec2 resolution) {
    vec2 ratio = vec2(
        min((resolution.x / resolution.y) / (size.x / size.y), 1.0),
        min((resolution.y / resolution.x) / (size.y / size.x), 1.0)
    );

    return vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
}

vec2 wavy(vec2 position, vec2 uv, vec2 offset) {
    float M_PI = 3.1415926535897932384626433832795;
    position.x = position.x + (sin((uv.y + uTime) * M_PI) * offset.x);
    position.y = position.y + (sin((uv.x + uTime) * M_PI) * offset.y);
    return position;
}

void main() {
  vUv = aspect(uv, uTextureResolution, uResolution);
  vec2 wavePos = wavy(position, vUv, vec2(0.05, 0.05));
  gl_Position = vec4(wavePos, 0, 1);
}