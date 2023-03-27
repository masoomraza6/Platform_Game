function blockDetection({
    player,
    blocks
}){
    return (
        player.position.y + player.height >= blocks.position.y && player.position.y <= blocks.height + blocks.position.y && player.position.x + player.width >= blocks.position.x && player.position.x <= blocks.position.x + blocks.width
    )

}