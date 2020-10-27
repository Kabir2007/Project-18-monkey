   // game code starts from here

   // declaring empty spaces in computer;s memory
   
   var monkey , monkey_running;
    var banana ,bananaImage, obstacle, obstacleImage;
    var foodGroup, obstacleGroup;
    var score;
    var ground;
    var background1,backimg;
    var You_won,You_wonimg;
    var You_lost,You_lostimg;
    var restart,restartimg;
    var gamestate;
    var PLAY = 1;
    var START = 0;
    var END = 2;

    // pre-loading necessary images

    function preload(){


    monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");

    obstacleImage = loadImage("obstacle.png");

    backimg = loadImage("500_F_122558891_ll4s347joRF4dBa1eQ9ZVkhkL7wi6QYh (1).jpg");

    You_wonimg = loadImage("1.png");

    You_lostimg = loadImage("2.jpg");

    restartimg = loadImage("3.jpg");

    }

    // completing pre-loading of images

    // making the initial setup

    function setup() {

    // crating gamespace    

    createCanvas(500,400);

    // adding a background

    background1 = createSprite(350,200);
    background1.addImage("back",backimg);
    background1.scale = 2;

    // setting score of game

    score = 0;

    // setting the initial gamestate

    gamestate = START;

    // creating monkey

    monkey = createSprite(80,320,10,10);
    monkey.addAnimation("monkey running",monkey_running);
    monkey.scale = 0.1;

    // creating ground for monkey to stand on

    ground = createSprite(150,350,1000,8);

    // declaring food and obstacle groups

    obstacleGroup = new Group();

    foodGroup = new Group();

    // making the ground invisible

    ground.visible = false;

    // adding end images 

    You_won = createSprite(250,200);
    You_won.addImage("won",You_wonimg);
    You_won.visible = false;

    You_lost = createSprite(250,200);
    You_lost.addImage("lost",You_lostimg);
    You_lost.visible = false;
    You_lost.scale = 2;

    restart = createSprite(150,20);
    restart.addImage("restart",restartimg);
    restart.scale = 0.3;
    restart.visible = false;

    }

    // finihing initial setup

    // starting the draw loop

    function draw() {

    // creating a stage    

    background(rgb(184, 206, 245));

    // letting monkey stand on invisible ground

    monkey.collide(ground);

    // adding gravity

    monkey.velocityY = monkey.velocityY + 1;

    // giving instructions

    if(gamestate === START){

        fill(rgb(255,30,30));    
        textSize(30);    
        text("Prees space(laptop)/",80,175);
        text("click(phone)to start",75,225);
        score = 0;    
        monkey.scale = 0.1;    
        You_won.visible = false;
        You_lost.visible = false;
        restart.visible = false;
        monkey.visible = false;
        background1.visible = false;

        if(keyDown("space")||touches.length > 0){

        touches = [];
        gamestate = PLAY;

        }

    }

    // starting the play mode

    if(gamestate === PLAY){
        
        monkey.visible = true;
        background1.visible = true;
        You_won.visible = false;
        You_lost.visible = false;
        restart.visible = false;
    
        background1.velocityX = -(6 + score/100);

        if(background1.x < 0 ){
    
        background1.x = background1.width/2;
        
        }

        score = score + Math.round(getFrameRate()/60);
    
        if(monkey.y >= 270){
     
        if(keyDown("space") ||touches.lenght > 0){
    
        touches = [];    
        monkey.velocityY = -16;
    
        }

        }
    
        spawnObstacles();
    
        spawnFood();
    
        if(monkey.isTouching(foodGroup)){
    
        monkey.scale = monkey.scale + 0.02;
        foodGroup.destroyEach();

        }
        
        if(monkey.isTouching(obstacleGroup)){

        monkey.scale = monkey.scale - 0.02;
        obstacleGroup.destroyEach();

        }
   
        if(monkey.scale >= 0.24||monkey.scale <= 0.04){

        gamestate = END;

        }

        }   

    // making the end of game     

    if(gamestate === END){

        foodGroup.destroyEach();
        obstacleGroup.destroyEach(); 
        monkey.visible = false; 
        background1.visible = false;
        restart.visible = true;
        
        textSize(20);
        text("Press r to restart",200,200);

        if(monkey.scale >= 0.24){

        You_won.visible = true;

        }

        if(monkey.scale <= 0.04){

        You_lost.visible = true;

        }

        if(keyDown("r")||touches.length > 0){

        touches = [];    
        gamestate = START;

        }

    }

    drawSprites();

    // showing survival time

    fill(rgb(77,255,255));
    textSize(16);
    text("Survival Time :  " + score , 320 , 20);

    }

    // ending the draw loop 

    function spawnObstacles(){

    if(frameCount % 100 === 0){

    obstacle = createSprite(510,325);
    obstacle.addImage("image",obstacleImage);
    obstacle.scale = 0.12;
    obstacle.velocityX = -(6 + score/100);
    obstacle.lifetime = 90;

    obstacleGroup.add(obstacle);

    }

    }

    function spawnFood(){

    if(frameCount % 80 === 0){

    bananas = createSprite(510,Math.round(random(140,250)));
    bananas.addImage("banana",bananaImage);
    bananas.scale = 0.1;
    bananas.lifetime = 90;
    bananas.velocityX = -(6 + score/100);

    foodGroup.add(bananas);

    }

}