function updateGame(scene) {
    /* Movimentacao do player */
    if(teclado.left.isDown) {
        player.setVelocityX(-200);
        player.anims.play("left", true);
    }else if(teclado.right.isDown){
        player.setVelocityX(200);
        player.anims.play("right", true);
    }else{
        player.setVelocityX(0);
        player.anims.play("parado", true);
    }
}