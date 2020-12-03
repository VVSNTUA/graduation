
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
      },{
        animationLabel: "neutral",
        filePath:["assets/cube_back_neutral_00001.png","assets/cube_back_neutral_00004.png"]
      }
    ]
    
  },
  {
    layer:2,
    name:"heart",
    animation:[
      {
        animationLabel: "neutral",
        filePath:["assets/cube_heart_neutral_00001.png","assets/cube_heart_neutral_00004.png"]
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
      },{
        animationLabel: "neutral",
        filePath:["assets/cube_front_neutral_00001.png","assets/cube_front_neutral_00004.png"]
      }
    ]
  },
  
]



function preload(){


    // Create cubeSprite
    cubeSprite = new Group();
    // iterate through cubeSpriteData to create sub sprites
    for( let i = 1; i <= 3; i++){
      let c = cubeSpriteData[i-1];
      
      let s = createSprite(canvasWidth/2 ,canvasHeight/2,300,300);  // sub sprite 300*300

      // add animations to sub sprites
      for (let j = 0; j < c.animation.length; j++){
        let anim = c.animation[j];
        let label = anim.animationLabel;
        let files = anim.filePath;
        s.addAnimation( label, files[0], files[files.length - 1]);
      }
      // rescale
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

 
// * *  不同階段要處理的事
// * *  (1) 方塊正在spin : 唯一可做的事情就是按方塊停止spin
// * *
// * *                  => 方塊播至最後最後一個畫格後  =>撥放 (2)方塊neutral
// * *                  
// * *  (2) 方塊neutral : 有三件事情可以做，拖拉、點擊和滾輪
// * *                  
// * *             拖拉 => 檢查滑鼠有拖行，若有，根據方塊裂痕的狀態決定跟隨的距離。滑鼠放開時回歸原位
// * *             點擊 => 滑鼠沒有拖行時
// * *                      -> 每次點擊，方塊反光一次
// * *                      -> 數次點擊，方塊產生裂痕 
// * * 
// * * 
// * * 
// * * 
// * * 
// * * 
// * * 
// * * 





function keyPressed() {

  cubeSprite.forEach(s => s.scale = 1);

  switch (currentState) {
    case 1:
      playCrack();
      currentState = 2;
      break;
    case 2:
      cubeSprite.forEach(s => s.scale = 0.7);
      playTransform();
      currentState = 3;
      break;
    case 3:
      playSpin();
      currentState = 4;
      break;

    case 4:
      playNeutral();
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
// * cubeSprite[1] heart => animation "neutral"
// * cubeSprite[2] front => animation "spin"

cubeSprite[0].changeAnimation("spin");
cubeSprite[0].animation.play();
cubeSprite[1].changeAnimation("neutral");
cubeSprite[2].changeAnimation ("spin");
}



function playCrack() {
// * Set cubeSprite to crack
// * cubeSprite[0] back  => image "cube_back_spin_000001.png"
// * cubeSprite[1] heart => animation "neutral"
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
    sprite.animation.frameDelay = 8;
  });
}

function playNeutral(){

  // * Set cubeSprite to transform
  // * 
  // * cubeSprite[0] back  => animation "neutral" loop
  // * cubeSprite[1] heart => animation "neutral" loop
  // * cubeSprite[2] front => animation "neutral" loop
  // * 
  cubeSprite.forEach((sprite)=>{
    sprite.changeAnimation("neutral");
    sprite.animation.frameDelay = 4;
  });
}

function playSqueeze(){
  // TODO
}

// * function for test purposes


function createTestSprite(){
  // img = loadImage("assets/cube_crack_front_00004.png");
  testSprite = createSprite(canvasWidth/2 ,canvasHeight/2,300,300);
  testSprite.addAnimation("crack","assets/cube_back_transform_00001.png","assets/cube_back_transform_00010.png");
  // testSprite.addImage("bruh",img);
  // testSprite.changeImage("bruh");
  testSprite.animation.frameDelay = 10;
  

}