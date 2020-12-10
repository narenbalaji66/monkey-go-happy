
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,ground,survivalTime;
var gameState;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 450);
  background("white");
  
  monkey = createSprite(50,320,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1; 
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  console.log(ground.x);
  
  obstacleGroup=new Group();
  FoodGroup=new Group();
  
  score=0;
  survivalTime=0;
  
  gameState="play";
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
}


function draw() {
  
  background("white")
  
  if (gameState==="play"){
     if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;
        
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
    
  survivalTime=Math.ceil(frameCount/frameRate())
     
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach()
    score=score+3
  }
    
    
    
    obstacles();
    banana();
  if(monkey.isTouching(obstacleGroup)){
    gameState="end"
  }
  }
  if (gameState==="end"){
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    
    
  }
  
  ground.x=ground.width/2;
  
  monkey.collide(ground); 
     
  stroke("black")
  textSize(20)
  stroke("black")
  text("score :"+score,500,50)
  
  stroke("black")
  textSize(20)
  stroke("black")
  text("survivalTime:"+survivalTime,50,50)
  
 drawSprites(); 
}


function obstacles(){
  
   if (frameCount %  300=== 0){
     
        var obstacle = createSprite(600,330,10,30);
        obstacle.velocityX = -(8) //+ score/100);
        obstacle.addImage("obstacleImage",obstacleImage) 
        obstacle.scale = 0.1;
        obstacle.lifetime = 300;
   
        obstacleGroup.add(obstacle);}
}

function banana(){
  
  if (frameCount %  100=== 0){
    
        var banana = createSprite(600,220,10,40);
        banana.velocityX=-(8) //+ score/100); 
        banana.addImage("bananaImage",bananaImage) 
        banana.scale = 0.1;
        banana.lifetime = 300;
   
        FoodGroup.add(banana);}
}

