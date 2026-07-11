// cone.js

function createBeamCone() {

    const geometry = new THREE.CylinderGeometry(
        10,     // ปลายลำแสง
        0.2,    // โคน
        120,    // ความยาว
        32,
        20,
        true
    );

    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, 0, 60);

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
    });

    const beam = new THREE.Mesh(geometry, material);

    return beam;
}