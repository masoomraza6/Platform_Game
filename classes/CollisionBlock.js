class collisionBlocks{
    constructor({position, width = 16, height = 16}) {
        this.position = position;
        this.width = width;
        this.height = height;
    }
    draw(){
        context.fillStyle = 'rgba(255, 0, 0, 0.4)';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        this.draw();
    }
}