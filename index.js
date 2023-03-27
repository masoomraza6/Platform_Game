const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 567;

const context = canvas.getContext('2d');
const gravity = 0.5;
const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}
const scaledBg = {
    width: canvas.width / 4,
    height: canvas.height / 4
};
const floorCollisions2d = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisions2d.push(floorCollisions.slice(i, i + 36));
}
const FloorCollisions = [];
floorCollisions2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            FloorCollisions.push(
                new collisionBlocks({
                    position: {
                        x: x * 16,
                        y: y * 16
                    }
                })
            )
        }
    })
});
const platformBlock2d = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformBlock2d.push(platformCollisions.slice(i, i + 36));
}
const platformBlocks = [];
platformBlock2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            platformBlocks.push(
                new collisionBlocks({
                    position: {
                        x: x * 16,
                        y: y * 16
                    },
                    height: 8
                })
            )
        }
    })
})
//new class stuff
const player = new Player({
    position: {
        x: 50,
        y: 0
    },
    velocity: {
        x: 0,
        y: 1
    },
    width: 25,
    height: 25,
    FloorCollisions,
    platformBlocks,
    imageSrc: './img/warrior/Idle.png',
    frameRate: 8,
    frameBuffer: 4
});
const sprite = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.scale(4, 4);
    context.translate(0, -sprite.image.height + scaledBg.height)
    sprite.update();
    FloorCollisions.forEach((blocks) => {
        blocks.update();
    });
    platformBlocks.forEach((blocks)=>{
        blocks.update();
    })
    player.update();
    player.velocity.x = 0;

    if (keys.ArrowRight.pressed) {
        player.velocity.x = 3;
    } else if (keys.ArrowLeft.pressed) {
        player.velocity.x = -3;
    }
    context.restore();
}
animate();
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.velocity.y = -8;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;

    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

    }
});