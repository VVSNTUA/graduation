
// canvas information
let canvasWidth = 1000;
let canvasHeight = 600;
// test
let img;
let testSprite;
let currentState = 1;
// mouse interaction
let draggedSprite;
// modify into json in the future
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
      },{
        animationLabel: "crack",
        filePath:["assets/cube_front_crack_00001.png","assets/cube_front_crack_00004.png"]
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
    background(220,220,220); 
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
      testSprite.addAnimation("crack","assets/cube_back_transform_00001.png","assets/cube_back_transform_00010.png");
      // testSprite.addImage("bruh",img);
      // testSprite.changeImage("bruh");
      testSprite.animation.frameDelay = 10;

}


function keyPressed() {



  switch (currentState) {
    case 1:
      playCrack();
      currentState = 2;
      break;
    case 2:
      playTransform();
      currentState = 3;
      break;
    case 3:
      playSpin();
      currentState = 1;
      break;
    default:
      console.log(`currentState is ${currentState} and it is not handled`);
      break;
  }
 

}

function playSpin() {
  // * Set cubeSprite to spin
// * cubeSprite[0] back  => animation "spin"
// * cubeSprite[1] heart => animation "nutral"
// * cubeSprite[2] front => animation "spin"

cubeSprite[0].changeAnimation("spin");
cubeSprite[0].animation.play();
cubeSprite[1].changeAnimation("nutral");
cubeSprite[2].changeAnimation ("spin");
}



function playCrack() {
  // * Set cubeSprite to crack
// * cubeSprite[0] back  => image "cube_back_spin_000001.png"
// * cubeSprite[1] heart => animation "nutral"
// * cubeSprite[2] front => animation "crack" frame delay 10

cubeSprite[0].animation.stop();
cubeSprite[0].animation.changeFrame(0);
cubeSprite[2].changeAnimation("crack");
cubeSprite[2].animation.frameDelay = 10
}

function playTransform() {

    // * Set cubeSprite to transform
  // * 
  // * cubeSprite[0] back  => animation "transform" noLoop
  // * cubeSprite[1] heart => animation "transform" noLoop
  // * cubeSprite[2] front => animation "transform" noLoop
  // * 
  cubeSprite.forEach((sprite)=>{
    sprite.changeAnimation("transform");
    sprite.animation.frameDelay = 10;
  });
}

function playNutral(){
  // TODO
}

function playSqueeze(){
  // TODO
}