
// canvas information
let canvasWidth = 1000;
let canvasHeight = 600;
// test
let img;
let testSprite;
let state = 1;
let moveSpeed = 0.1;
// mouse interaction
let clickCount = 0,crack1Count = 10,crack2Count = 20,crack3Count = 30, crack4Count = 40;
let draggedSprite;
let offsetX,offsetY;
let isStopping = false,isStopped = false;
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
        animationLabel: "crack1",
        filePath:["assets/cube_front_crack1_00001.png"]
      },{
        animationLabel: "crack2",
        filePath:["assets/cube_front_crack2_00001.png"]
      },{
        animationLabel: "crack3",
        filePath:["assets/cube_front_crack3_00001.png"]
      },{
        animationLabel: "crack4",
        filePath:["assets/cube_front_crack4_00001.png"]
      },{
        animationLabel: "neutral",
        filePath:["assets/cube_front_neutral_00001.png","assets/cube_front_neutral_00004.png"]
      }
    ]
  },
  
]



function preload(){

  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
    // Create cubeSprite
    cubeSprite = new Group();
    // iterate through cubeSpriteData to create sub sprites
    let initX = canvasWidth/2;
    let initY = 20;
    for( let i = 1; i <= 3; i++){
      let c = cubeSpriteData[i-1];
      let s = createSprite(initX ,initY,300,300);  // sub sprite 300*300
      // add animations to sub sprites
      for (let j = 0; j < c.animation.length; j++){
        let anim = c.animation[j];
        let label = anim.animationLabel;
        let files = anim.filePath;
        if(files.length == 1){
          let img = loadImage(files[0]);
          s.addImage( label, img);
        } else {
          s.addAnimation( label, files[0], files[files.length - 1]);
        }
      }
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
          offsetX = mouseX - draggedSprite[0].position.x;
          offsetY = mouseY - draggedSprite[0].position.y;
        }

        if (state == 1){
          cubeSprite[0].animation.goToFrame(0);
          cubeSprite[2].animation.goToFrame(0);
          isStopping = true;
        }

        // if(isStopping){
        //   if(cubeSprite[0].frame == 0) {
        //     isStopping == false;
        //     state == 2;
        //     playNeutral();
        //   }
          
        // };
    }

    cubeSprite[0].onMouseReleased = function(){

        if(draggedSprite == cubeSprite){
          draggedSprite = null;
        }


        clickCount++;
        // if(clickCount == crack1Count){
        //   playCrack1();
        //  state = 2;
        // } else {
        //   // play clack
        // }

        switch (clickCount) {
          case crack1Count:
            playCrack1();
            break;
          case crack2Count:
            playCrack2();
            break;
        
          case crack3Count:
            playCrack3();
          break;
      
          case crack4Count:
            playCrack4();
            break;
        
          default:
            break;
        }
        console.log(clickCount);
    }

}

function setup() {

    createCanvas(canvasWidth,canvasHeight);

}
  
function draw() {
    background(255,255,255); 


    if(draggedSprite != null){
      move(mouseX,mouseY,0.3);
    } else {
      move(canvasWidth/2,canvasHeight/2,0.05)
    }
    
    drawSprites(cubeSprite);
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

// * * events

// function mouseClicked() {
  
// }


function keyPressed() {

  // cubeSprite.forEach(s => s.scale = 1);

  // switch  (state) {
  //   case 1:
  //     playCrack();
  //    state = 2;
  //     break;
  //   case 2:
  //     cubeSprite.forEach(s => s.scale = 0.7);
  //     playTransform();
  //    state = 3;
  //     break;
  //   case 3:
  //     playSpin();
  //    state = 4;
  //     break;

  //   case 4:
  //     playNeutral();
  //    state = 1;
  //     break;
  //   default:
  //     console.log( `state is $ {state} and it is not handled`);
  //     break;
  // }
 

}




// * * * * * * Animation functions

function move(desX,desY,speed) {
  // todo
  cubeSprite.forEach((sprite) => {
    let speedX = (desX - sprite.position.x) * speed;
    let speedY = (desY - sprite.position.y) * speed;
    sprite.position.x += speedX;
    sprite.position.y += speedY;
  });
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



function playCrack1() {
// * Set cubeSprite to crack
// * cubeSprite[0] back  => image "cube_back_spin_000001.png"
// * cubeSprite[1] heart => animation "neutral"
// * cubeSprite[2] front => animation "crack" frame delay 10

cubeSprite[0].animation.stop();
cubeSprite[0].animation.changeFrame(0);
cubeSprite[2].changeAnimation("crack1");
cubeSprite[2].animation.frameDelay = 10
}

function playCrack2() {

  cubeSprite[2].changeAnimation("crack2");
  cubeSprite[2].animation.frameDelay = 10
  }

function playCrack3() {
  cubeSprite[2].changeAnimation("crack3");
  cubeSprite[2].animation.frameDelay = 10
  }

function playCrack4() {
  cubeSprite[2].changeAnimation("crack4");
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



function playExplode(){
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