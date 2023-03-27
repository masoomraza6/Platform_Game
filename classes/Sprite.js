class Sprite {
    constructor({
        position,
        imageSrc,
        frameRate = 1,
        scaleImg = 1,
        frameBuffer
    }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * scaleImg;
            this.height = this.image.height * scaleImg;
        }
        this.image.src = imageSrc;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsed = 0;
    }
    draw() {
        this.updateFrame();
        if (!this.image) return
        const cropbox = {
            positon: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        }
        context.drawImage(
            this.image,
            cropbox.positon.x,
            cropbox.positon.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }
    update() {
        this.draw();
        this.updateFrame();
    }
    updateFrame(){
        this.elapsed++;
        if(this.elapsed % this.frameBuffer == 0){
            if(this.currentFrame < this.frameRate - 1){
                this.currentFrame++;
            }else{
                this.currentFrame = 0;
            }
        }
    }
}