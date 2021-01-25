var path,pathImage;
var boy,boyImage;
var cash, cashImage, cashGroup;
var diamonds, diamondsImage, diamondsGroup;
var jwellery, jwelleryImage, jwelleryGroup;
var sword,swordImg, swordGroup;
var treasureCollection = 0;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImage = loadImage("Road.png");
  boyImage = loadAnimation("Runner-1.png","Runner-2.png");
  cashImage = loadImage("cash.png");
  diamondsImage = loadImage("diamonds.png");
  jwelleryImage = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImage);
  path.velocityY = 5;


  //creating boy running
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImage);
  boy.scale=0.08;
  
  
  cashGroup=new Group();
  diamondsGroup=new Group();
  jwelleryGroup=new Group();
  swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashGroup.isTouching(boy))
    {
      cashGroup.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsGroup.isTouching(boy)) 
    {
      diamondsGroup.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }
    else if(jwelleryGroup.isTouching(boy)) 
    {
      jwelleryGroup.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else
    {
      if(swordGroup.isTouching(boy))
      {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        cashGroup.destroyEach();
        diamondsGroup.destroyEach();
        jwelleryGroup.destroyEach();
        swordGroup.destroyEach();
        
        cashGroup.setVelocityYEach(0);
        diamondsGroup.setVelocityYEach(0);
        jwelleryGroup.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);     
    }
  }
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Treasure: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImage);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashGroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImage);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsGroup.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImage);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryGroup.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}