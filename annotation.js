AFRAME.registerComponent("annotation-tagging", {

    init: function () {
        //creating a vector
        const vector = new THREE.vector3(250, 250, 250)
        const canvas = renderer.domElement;

        //creating a vector cordinate for the annotations
        vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
        vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

        //creating annotations to select a certain CSS object
        const annotation = document.querySelector('.annotation');
        annotation.style.top = `${vector.y}px`;
        annotation.style.left = `${vector.x}px`;


    },

    draw: function () {
        const canvas = document.getElementById('number');
        const ctx = canvas.getContext('2d');
        const x = 32;
        const y = 32;
        const radius = 30;
        const startAngle = 0;
        const endAngle = Math.PI * 2;

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fill();

        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('1', x, y);

    },

    load: function () {

        //loading the object onto a 3D scene
        const numberTexture = new THREE.CanvasTexture(
            document.querySelector('#number')
        );

        const spriteMaterial = new THREE.SpriteMaterial({
            map: numberTexture,
            alphaTest: 0.5,
            transparent: true,
            depthTest: false,
            depthWrite: false
        });

        //creating sprite material
        sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(250, 250, 250);
        sprite.scale.set(35, 35, 1);

        scene.add(sprite);

        //creating a fading effect
        const meshDistance = camera.position.distanceTo(mesh.position);
        const spriteDistance = camera.position.distanceTo(sprite.position);
        spriteBehindObject = spriteDistance > meshDistance;

        sprite.material.opacity = spriteBehindObject ? 0.25 : 1;
        annotation.style.opacity = spriteBehindObject ? 0.25 : 1;
    }


}
)