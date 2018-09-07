
var game=new Phaser.Game(400,450,Phaser.AUTO);//initialization of the game
var characterSpeed=150;
var enemies;
var currentEnemyGroupIndex=10;
var enemyCounter=0;

//button flags so that they are triggered only once
var leftFlag=false;
var rightFlag=false;

var gameState={
    preload:function(){
        //loading the image to ram
        this.load.image('background','testAsset/background.jpg');
        
        this.load.image("hero","testAsset/hero.png");
        this.load.image("villain","testAsset/villain.png");
    },
    
    
    
    create:function(){
       //we use tilesprite here so that we can move the image based on tiles
        this.background=this.game.add.tileSprite(0,0,400,450,'background');
        this.villain=this.game.add.sprite(0,0,'villain');
        this.hero=this.game.add.sprite(0,450,'hero');//use this.game.world.centerX instead of x coordinate for centering the componenet
        this.hero.anchor.setTo(0,1);
        this.villain.scale.setTo(1.5,1.5);
        //to resize the sprite
        //this.hero.scale.setTo(2,2)
        
        
        //create swarn of enemies
        this.enemies=this.game.add.group();
        this.enemies.enableBody=true;
        this.enemies.physicsBodyType=Phaser.Physics.ARCADE;
        this.createEnemies();
    
        
        this.game.physics.enable(this.hero,Phaser.Physics.ARCADE);//enabling the physics for the player
        
        this.cursor=this.game.input.keyboard.createCursorKeys();//enabling and accessing the cursor keys
    },

    
    update:function(){
        this.background.tilePosition.y+=1;//animating the background image
        if(this.cursor.left.isDown)//moving the cursor if down
            this.moveLeft(false);
        else if(this.cursor.right.isDown)//moving the player right
            this.moveRight(false);
            //this.hero.body.velocity.x=+characterSpeed;
        else
            {
            this.hero.body.velocity.x=0;
             if(leftFlag)
                 {this.moveLeft(true);}
                else if(rightFlag)
                    {this.moveRight(true);}
            }
       
        //this.enemies.y+=3;
    },
    
    //move hero ship towards left direction
    moveLeft:function(isKeyUp)
    {
         //for automatic movement two function calls needs to be made
    
    if(leftFlag && isKeyUp)
    {
        leftFlag=false;//key press reset
        if(this.checkMovementCollision(false,true))
        this.hero.position.x=this.hero.position.x-this.game.width/5;//trigger the left key action that is required
    }
    else{
        leftFlag=true;//key pressed once
    }
    
        
    },
    
    
    //move hero ship towards right direction
    moveRight:function(isKeyUp)
    {
        //for automatic movement two function calls need to be made
    if(rightFlag && isKeyUp)
    {rightFlag=false;//reset right key state
     if(this.checkMovementCollision(true,false))
        this.hero.position.x=this.hero.position.x+this.game.width/5;//trigger the right movement
    }
    else{
    rightFlag=true;
    }
    },
    
    //Check if movement in left or right direction is permittable
    checkMovementCollision:function(isRightMovementAvailable=false,isLeftMovementAvailable=false)
    {
        if(isRightMovementAvailable)
        {if(this.hero.position.x+this.game.width/5<this.game.width)return true;
        else return false;}
        
        else if(isLeftMovementAvailable)
        { if(this.hero.position.x>60)return true;
        else return false;}
    },
    
    createEnemies:function(){
        
        for(var y=0;y<4;y++)    
        for(var x=0;x<5;x++)
        if(Math.random()<0.3)    
        //generate the enemies you want within a loop as desired
        {var enemy=this.enemies.create(x*80,y*90,'villain');
         enemy.checkWorldBounds = true;
         enemy.index=y;
         enemy.events.onOutOfBounds.add(this.enemyOutOfScreen, this);
        }
        
        enemyCounter=4
        
        this.enemies.x=0;
        this.enemies.y=100;
        
        
    },
    
    refreshEnemies:function(){
        enemyCounter+=1;
                //generate the enemies you want within a loop as desired
        for(var x=0;x<5;x++)
        if(Math.random()<0.3)    
        {var enemy=this.enemies.create(x*80,0,'villain');
         enemy.checkWorldBounds = true;
         enemy.index=enemyCounter;
         enemy.events.onOutOfBounds.add(this.enemyOutOfScreen, this);
        }
        this.enemies.x=0;
        this.enemies.y=100;
        
        
        
        

    },
    
    enemyOutOfScreen:function(enemy){
        
        enemy.kill();
        console.log("Enemy ship encountered");
        console.log(enemy);
        if(currentEnemyGroupIndex!=enemy.index)
        {
        // this.refreshEnemies();
            currentEnemyGroupIndex=enemy.index;
        }
        //console.log(this.enemies);
        //this.refreshEnemies();
    }
    
    
}; //state of the game from where remaining of the game is controlled





game.state.add("GameState",gameState);//load the particular gamestate
game.state.start("GameState");//fire the gamestate up