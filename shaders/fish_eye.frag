#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {
    vec2 new_texcoord = texcoord * 2.0 - 1.0;
    float theta = atan(new_texcoord.y, new_texcoord.x);
    float radius = pow(length(new_texcoord), 1.5);

    vec2 fish_eye_coord = vec2(radius * cos(theta), radius * sin(theta));
    FragColor = texture(image, 0.5 * (fish_eye_coord + 1.0));
}
