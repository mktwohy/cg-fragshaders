#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

vec4 black_white(vec4 texel) {
    float luminance = 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
    texel.rgb *= 0.0;
    texel.rgb += luminance;
    return texel;
}

vec4 monochrome(vec4 texel, vec3 color) {
    float luminance = 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
    texel.rgb = luminance * color;
    return texel;
}

void main() {
    vec4 texel = texture(image, texcoord);
    FragColor = black_white(texel);
}
