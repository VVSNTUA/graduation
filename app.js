
// canvas information
let canvasWidth = 1000;
let canvasHeight = 600;
// test
let img;
let testSprite;
// mouse interaction
let draggedSprite;
// modify into json in future
let cubeSprite;
const cubeSpriteData = [
  {
    layer:1,
    name:"back",
    animation:[
      {
        animationLabel: "spin",
        filePath:["assets/cube_back_spin_00001.png","assets/cube_back_spin_00012.png"]
      },{
        animationLabel: "transform",
        filePath:["assets/cube_back_transform_00001.png","assets/cube_back_transform_00010.png"]
      }
    ]
    
  },
  {
    layer:2,
    name:"heart",
    animation:[
      {
        animationLabel: "nutral",
        filePath:["assets/cube_heart_nutral_00001.png","assets/cube_heart_nutral_00004.png"]
      },
      {
        animationLabel: "transform",
        filePath:["assets/cube_heart_transform_00001.png","assets/cube_heart_transform_00010.png"]
      }

    ]
    
  },
  {
    layer:3,
    name:"front",
    animation:[
      {
        animationLabel: "spin",
        filePath:["assets/cube_front_spin_00001.png","assets/cube_front_spin_00012.png"]
      },{
        animationLabel: "transform",
        filePath:["assets/cube_front_transform_00001.png","assets/cube_front_transform_00010.png"]
      }
    ]
  },
  
]



function preload(){

    
  // createTestSprite();




    // Create cubeSprite
    cubeSprite = new Group();
    // iterate through cubeSpriteData to create sub sprites
    for( let i = 1; i <= 3; i++){
      let c = cubeSpriteData[i-1];
      
      let s = createSprite(canvasWidth/2 ,canvasHeight/2,300,300);  // sub sprite

      // add animations
      for (let j = 0; j < c.animation.length; j++){
        let anim = c.animation[j];
        let label = anim.animationLabel;
        let files = anim.filePath;
        s.addAnimation( label, files[0], files[files.length - 1]);
      }
      // rescale
      s.scale = 1;
      s.addToGroup(cubeSprite);
    }



    // add collider to front layer
    // should detect pixel instead
    cubeSprite[0].setDefaultCollider();
    // assign functions responding to mouse events
    // when mouse is clicked, front and back sprite (cubeSprite[0], cubeSprite[2])
    // will stop playing

    cubeSprite[0].onMousePressed = function(){
        if(draggedSprite == null){
          draggedSprite = cubeSprite;
        }
    }

    cubeSprite[0].onMouseReleased = function(){

        if(draggedSprite == cubeSprite){
          draggedSprite = null;
        }
    }

}

function setup() {
    createCanvas(canvasWidth,canvasHeight);

}
  
function draw() {
    background(245,245,245); 
    // image(img,530,530);


    if(draggedSprite != null){
      draggedSprite.forEach((sprite) => {
        sprite.position.x = mouseX;
        sprite.position.y = mouseY;
      }
      )
    }
    cubeSprite[0].debug = mouseIsPressed;
    
    drawSprites(cubeSprite);

    if(testSprite){
      testSprite.degug = mouseIsPressed;
      drawSprite(testSprite);
    }

}

 





//        function for test purposes


function createTestSprite(){
      // img = loadImage("assets/cube_crack_front_00004.png");
      testSprite = createSprite(canvasWidth/2 ,canvasHeight/2,300,300);
      testSprite.addAnimation("transform","assets/cube_back_transform_00001.png","assets/cube_back_transform_00010.png");
      // testSprite.addImage("bruh",img);
      // testSprite.changeImage("bruh");
      testSprite.animation.frameDelay = 10;

}


function keyPressed() {

  // console.log(cubeSprite);

  cubeSprite.forEach((sprite)=>{
    console.log(sprite);
    sprite.changeAnimation("transform");
    sprite.animation.frameDelay = 10;
  });

}