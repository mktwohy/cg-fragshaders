#version 300 es


precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

vec4 toonify(vec4 texel) {
    texel = round(texel * 4.0) / 4.0;
    return texel;
}

void main() {
    FragColor = toonify(texture(image, texcoord));
}
