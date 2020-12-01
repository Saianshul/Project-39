var gameState = "play";

var monkey, monkeyAnimation;

var ground, groundImg;

var banana, bananaImage, bananaGroup;

var obstacle, obstacleImage, obstacleGroup;

var survivalTime = 0;

var score = 0;

function preload() {
  monkeyAnimation = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");

  groundImg = loadImage("ground.png");
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight - 30);
  
  textSize(20);
  stroke("black");
  fill("black");
  
  monkey = createSprite(150, 550, 20, 70);
  monkey.addAnimation("monkey_running", monkeyAnimation);
  monkey.scale = 0.1;
  
  ground = createSprite(900, 600, 500, 10);
  ground.addImage("ground", groundImg);
  ground.scale = 0.3;
  ground.velocityX = -5;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("lightblue");

  if(gameState === "play") {
    text("Survival Time: " + survivalTime, 466, 50);
    survivalTime = Math.ceil(frameCount/frameRate());
    
    text("Score: " + score, 500, 80);
    if(monkey.isTouching(bananaGroup)) {
      score ++;
      banana.destroy();
    }

    if(keyDown("UP_ARROW") && monkey.y >= 360) {
      monkey.velocityY = -17;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);
  
    if(ground.x < 30) {
      ground.x = 900;
    }

    if(monkey.isTouching(obstacleGroup)) {
      gameState = "end";
    }
    
    food();
    
    obstacles();
    
    drawSprites();
  }
  
  if(gameState === "end") {
    textSize(30);
    text("Game Over", 425, 300);
  }
}

function food() {
  if(frameCount % 80 === 0) {
    banana = createSprite(1500, Math.round(random(120, 200)), 20, 20);
    banana.scale = 0.07;
    banana.addImage("banana_image", bananaImage);
    banana.velocityX = -8;
    banana.lifetime = 500;
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(1500, 400, 50, 70);
    obstacle.addImage("rock", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.collide(ground);
    obstacle.lifetime = 500;
    obstacleGroup.add(obstacle);
  }
}