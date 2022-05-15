#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float time;
uniform sampler2D image;

out vec4 FragColor;

void main() {
    vec2 new_texcoord = 2.0 * texcoord - 1.0;
    float radius = length(new_texcoord);
    vec2 texcoord_offset = new_texcoord * (sin(radius * 30.0 - time * 5.0) + 0.5) / 60.0;
    new_texcoord = texcoord + texcoord_offset;

    FragColor = texture(image, new_texcoord);
}
