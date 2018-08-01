/*{
  "server": 3000,
  "IMPORTED": {
    "font": { "PATH": "./images/font.png" },
  }
}*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D font;

float chara(in vec2 uv, in float code, in float delay) {
    float t = time - (delay / 4.);

    uv = clamp(uv, 0., 1.);
    uv.x /= abs(sin(t + cos(uv.y * 100. + t))) * abs(cos(t * .5 + uv.x * uv.y));

    float x = mod(code, 16.) / 16.;
    float y = 1. - ((floor(code / 16.) + 1.) / 16.);
    return texture2D(font, vec2(x, y) + uv / 16.).r;
}

float r(in float code, in float delay) {
    float t = time - (delay / 4.);

    t = mod(t, 3.141592654);

    if (t < 1.4) {
        code += cos(time * 4.) * 20.;
    }

    return floor(code);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;

    uv.x *= 4.;
    uv.y *= 4.;
    uv.y += .5;
    uv.x += 1.;

    vec4 text = vec4(
        chara(uv - vec2(1, 2), r(71., 1.), 1.) +
        chara(uv - vec2(2, 2), r(76., 2.), 2.) +
        chara(uv - vec2(3, 2), r(83., 3.), 3.) +
        chara(uv - vec2(4, 2), r(76., 4.), 4.) +
        chara(uv - vec2(5, 2), r(31., 5.), 5.) +
        chara(uv - vec2(6, 2), r(34., 6.), 6.)
    );

    // text.g = (.7 - text.r);
    // text.b = (1. - text.r) / text.r;

    gl_FragColor = text;
}
