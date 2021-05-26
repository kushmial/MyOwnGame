
var background_img;
var objects,object_img1,object_img2;
var enemy , enemy_img;
var object_group , enemy_group;
var wall;
var scope , scope_img;
var gameState = 0 ;
var score = 0;
var gameOver , gameOver_img;
var score_Sound , GameEndSound;
var counter = 0;
var restart,restart_img;

 
function setup() { 
  createCanvas(500,500);
  object_group = new Group();
  enemy_group = new Group();
  wall=createSprite(250,100,500,10);
  scope = createSprite(200 , 200 , 100 ,100);
  gameOver = createSprite(250,250, 50,50);
  gameOver.addImage(gameOver_img);
  gameOver.visible = false;
  restart = createSprite(250,350,20,20);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;
  scope.addImage(scope_img);
scope.scale = 0.3;
//scope.debug = true;
scope.setCollider("circle",0,0,45);

}

function preload() {
  background_img = loadImage("imgs/jj.jfif");
  object_img1 = loadImage("imgs/img1.png")
  object_img2 = loadImage("imgs/img2.png") 
  enemy_img = loadImage("imgs/enemy.png");
  scope_img = loadImage("imgs/scope.png")
  gameOver_img = loadImage("imgs/gameOver.png")
  score_Sound = loadSound("sounds/scoreSound.wav");
  GameEndSound = loadSound("sounds/GameEnd.wav");
  restart_img= loadImage("imgs/restart.png");
}

function draw() {
  background(background_img);
  textSize(20);
  text("Score : " + score , 400,30);
  

object_group.bounceOff(wall);
enemy_group.bounceOff(wall);
wall.visible = false;
scope.x = mouseX;
scope.y = mouseY;

/*if(scope.isTouching(object_group) && keyDown("space")){
  object_group.destroyEach();
}
if(scope.isTouching(enemy_group) && keyDown("space")){
  object_group.velocityY = 0;
  enemy_group.velocityX = 0; 
}*/

// Adding group destroy code
for (var i=0;i<object_group.size();i++){
  if(object_group.get(i).isTouching(scope) && keyDown("space")){
    //eggGroup.get(i).destroy();
   // enemy_group.get(i).setAnimation("egg_2");
    object_group.get(i).destroy();
    score = score + 10 ;
    counter--;
  }
  }
  console.log(counter);
  for (var i=0;i<enemy_group.size();i++){
    if(enemy_group.get(i).isTouching(scope) && keyDown("space")){
      gameState = 1;
      
    }
    }
    if(counter === 5){
      gameState =1;
    }
    if(gameState=== 0  ){
      
      gameOver.visible = false;
      restart.visible = false;
    
spawnEnemy();
spawnObjects();
    }
    if(gameState === 1){
      gameOver.visible = true;
      restart.visible = true;
      GameEndSound.play();
      score =0;
        counter = 0;
      if(mousePressedOver(restart)){
        
        gameState =0;
        
      }
      
    }
    text("Lifes Remaning = " + (5 - counter),20,30);
    
    
 drawSprites();
}
function spawnObjects() {
  if(frameCount % 40 === 0){
     objects = createSprite(Math.round(random(50,450)),500 ,50,50);
     objects.shapeColor = "red";
     objects.velocityY = random(-10 , -15);
     object_group.add(objects);
     
     
     var randomNo = round(random(1,2))
     counter++;
     
       if(randomNo === 1){
         objects.addImage(object_img1);
       }
       else{
        objects.addImage(object_img2);
       }
       objects.scale = 0.2;
       if(score % 100 ===0){
         objects.velocityY = objects.velocityY - 2;
         score_Sound.play();
         
       }
     
  }  
}
function spawnEnemy(){
  if(frameCount % 100 === 0){
    enemy = createSprite(500 , Math.round(random(50,450)) , 20,20);
    enemy.velocityX = random(-8,-16);
    enemy_group.add(enemy);
    enemy.addImage(enemy_img);
    enemy.scale = 0.2;
  }
} 
/*var playingSound = loadSound("....")

playingSound.play()

playingSound.loop()

playingSound.stop()*/