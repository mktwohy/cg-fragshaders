#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float width;
uniform float height;
uniform sampler2D image;
uniform float vibrance_threshold;

out vec4 FragColor;

const vec2 CIE_RED      = vec2(0.9, 0.5);
const vec2 CIE_GREEN    = vec2(0.5, 0.95);
const vec2 CIE_BLUE     = vec2(0.2, 0.1);
const vec3 CIE_WHITE    = vec3(0.56, 0.54, 1.0);

const float CIE_MAX_X   = CIE_RED.x;
const float CIE_MIN_X   = CIE_BLUE.y;
const float CIE_MAX_Y   = CIE_GREEN.y;
const float CIE_MIN_Y   = CIE_BLUE.y;

const mat3 CIE_mat = mat3(
    2.768, 1.000, 0.000,
    1.751, 4.590, 0.056,
    1.130, 0.060, 5.594
);

vec3 rgb_to_xyz(vec3 color) {
    return normalize(CIE_mat * color);
}

float cie_score(vec3 color) {
    vec3 cie = rgb_to_xyz(color);

    return distance(CIE_WHITE.xy, cie.xy);
}

vec4 invert(vec4 texel) {
    texel.rgb = 1.0 - texel.rgb;
    return texel;
}

vec4 black_white(vec4 texel) {
    float luminance = 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
    texel.rgb *= 0.0;
    texel.rgb += luminance;
    return texel;
}

void main() {
    vec4 texel = texture(image, texcoord);
    if (cie_score(texel.rgb) > vibrance_threshold) {
        FragColor = texel;
    } else {
//        FragColor = invert(texel);
//        FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        FragColor = black_white(texel);
    }

}
