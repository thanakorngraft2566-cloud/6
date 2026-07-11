function createBeam(radius, length, color) {

    const geometry = new THREE.CylinderGeometry(
        radius,
        0.2,
        length,
        64,
        64,
        true
    );

    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, 0, length / 2);

    const material = new THREE.ShaderMaterial({

        transparent: true,
        depthWrite: false,
        depthTest: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,

        uniforms:{

            beamColor:{value:new THREE.Color(color)},
            intensity:{value:2.0} // เพิ่มความสว่างเริ่มต้น

        },

        vertexShader:`

            varying vec2 vUv;

            void main(){

                vUv = uv;

                gl_Position =
                    projectionMatrix *
                    modelViewMatrix *
                    vec4(position,1.0);

            }

        `,

        fragmentShader:`

            uniform vec3 beamColor;
            uniform float intensity;

            varying vec2 vUv;

            void main(){

                float center = 1.0 - abs(vUv.x-0.5)*2.0;

                // ขอบนุ่มขึ้น
                center = pow(center,1.4);

                // ปลายค่อยๆจาง
                float fade = 1.0 - vUv.y;
                fade = pow(fade,0.6);

                // เพิ่ม Glow รอบนอก
                float glow = pow(center,0.35);

                float alpha =
                    (center*0.8 + glow*0.6)
                    * fade
                    * intensity;

                gl_FragColor =
                    vec4(beamColor, alpha);

            }

        `

    });

    return new THREE.Mesh(geometry, material);

}