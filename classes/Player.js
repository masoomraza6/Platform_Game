class Player extends Sprite {
    constructor({
        position,
        velocity,
        width,
        height,
        FloorCollisions,
        platformBlocks,
        imageSrc,
        frameRate,
        scaleImg = 0.5,
        frameBuffer
    }) {
        super({
            imageSrc,
            frameRate,
            scaleImg,
            frameBuffer
        });
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.FloorCollisions = FloorCollisions;
        this.platformBlocks = platformBlocks;
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 20,
            height: 20
        }
    }
    update() {
        this.draw();
        this.updateFrame();
        this.updateHitbox();

        context.fillStyle = 'rgba(0, 255, 0, 0.2)';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        context.fillStyle = 'rgba(255, 0, 0, 0.2)';
        context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.horizontalCollisionDetection();
        this.applyGravity();

        this.updateHitbox();
        this.verticalCollisionDetection();

    }
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 34,
                y: this.position.y + 26
            },
            width: 15,
            height: 27
        }
    }
    applyGravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
    }
    verticalCollisionDetection() {
        for (let key in this.FloorCollisions) {
            const floorBlock = this.FloorCollisions[key];

            if (blockDetection({
                    player: this.hitbox,
                    blocks: floorBlock
                })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = floorBlock.position.y - offset - 0.01;
                }
                if (this.velocity < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = floorBlock.position.y + floorBlock.height - offset + 0.01;
                }
            }
        }
        //Platform detection
        // for(let key in this.platformBlocks){
        //     const platformBlock = this.platformBlocks[key];

        //     if(blockDetection({
        //         player: this,
        //         blocks: platformBlock
        //     })){
        //         if(this.velocity.y > 0){
        //             this.velocity.y = 0;
        //             this.position.y = platformBlock.position.y - this.height - 0.01;
        //         }
        //         if(this.velocity < 0){
        //             this.velocity.y = 0;
        //             this.position.y = platformBlock.position.y + platformBlock.height
        //         }
        //     }
        // }
    }
    horizontalCollisionDetection() {
        for (let key in this.FloorCollisions) {
            const floorBlock = this.FloorCollisions[key];
            if (blockDetection({
                    player: this.hitbox,
                    blocks: floorBlock
                })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.y - this.position.y + this.hitbox.height;
                    this.position.x = floorBlock.position.x - offset - 0.01;
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = floorBlock.position.x + floorBlock.width - offset + 0.01;
                }
            }
        }
        //Platform Detection
        // for(let key in this.platformBlocks){
        //     const platformBlock = this.platformBlocks[key];
        //     if(blockDetection({
        //         player: this,
        //         blocks: platformBlock
        //     })){
        //         if(this.velocity.x > 0){
        //             this.velocity.x = 0
        //             this.position.x = platformBlock.position.x - this.width - 0.01;
        //         }
        //         if(this.velocity.x < 0){
        //             this.velocity.x = 0
        //             this.position.x = platformBlock.position.x + platformBlock.width + 0.01;
        //         }
        //     }
        // }
    }
}