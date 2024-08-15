/* Cria e mostra os elementos do jogo na tela */
function createAssets(scene) {
  scene.add.image(500, 210, "fundo");
  scene.add.image(500, 479, "plat");
  //scene.add.image(500, 250, "player");
  plataforma = scene.physics.add.staticGroup();//staticgroup ele sofre fisica mas não sofre gravidade
  plataforma.create(500, 479, "plat");

  /* Player */
  player = scene.physics.add.sprite(500, 250, "player");
  player.setCollideWorldBounds(true);//serve para limitar o movimento do objeto dentro da tela, nao sai da tela
  player.setBounce(0.2);
  criarAnimations(scene);
  player.anims.play("parado", true);

  /* star: coletavel */
  var pos = Phaser.Math.FloatBetween(100, 900);
  star = scene.physics.add.sprite(pos, 0, "star");
  star.setBounce(0.2);

  /* bombs */
  bombs = scene.physics.add. group();

  /* Colliders */
  scene.physics.add.collider(player, plataforma);
  scene.physics.add.collider(star, plataforma);
  scene.physics.add.overlap(star, player, coletarStar);
  scene.physics.add.collider(bombs, plataforma);
  scene.physics.add.overlap(bombs, player, gameOver);

  /* Entradas do teclado */
  teclado = scene.input.keyboard.createCursorKeys();//pega as teclas que são apertadas e passa pra var teclado

  /* HUD - Head Ups Display */
  var configTxt= {
    fontSize: "30px",
    fontFamily: "Arial Black",
  };
  pontosTxt = scene.add.text(20, 20, "Pontos: 0",configTxt);
}

function coletarStar(star, player) {
  let pos = Phaser.Math.FloatBetween(100, 900);
  star.setX(pos);
  star.setY(0);
  star.setVelocityY(0);
  pontos = pontos + 10;
  pontosTxt.setText("Pontos: "+ pontos);

  /*criar uma bomba */
  let bomb = bombs.create(pos, 0, "bombs");
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(250)
}

function gameOver( player, bombs) {
  player.setVisible(false);
  isGameOver = true;
  var configTxt= {
    fontSize: "90px",
    fontFamily: "Arial Black",
    color: "red",
  };
  player.scene.add.text(200, 180, "GAME OVER",configTxt);

  // player.scene.input.once("pointerdown", (player)=>{
  //   player.scene.start("Game");
  // });
}

function criarAnimations(scene) {
  var parado = {
    key: "parado",
    frames: [{key: "player", frame: 4}],
  };
  scene.anims.create(parado);
  var left = {
    key: "left",
    frames:scene.anims.generateFrameNumbers("player", {start: 0, end: 3}),
    frameRate: 10,//taxa de velocidade
    repeat:-1,//para ficar repetindo
  };
  scene.anims.create(left);
  var right = {
    key: "right",
    frames:scene.anims.generateFrameNumbers("player", {start: 5, end: 8}),
    frameRate: 10,//taxa de velocidade
    repeat:-1,//para ficar repetindo
  };
  scene.anims.create(right);
}