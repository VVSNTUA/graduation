
// canvas information
let canvasWidth = 1000;
let canvasHeight = 600;
// test
let img;
// mouse interaction
let draggedSprite;
// modify into json in future
let cubeSprite;
let cubeSprite_2;
const cubeSpriteData = [
  {
    layer:1,
    name:"back",
    animation:[
      {
        animationLabel: "spin",
        filePath:["assets/cube_spin_back_00001.png","assets/cube_spin_back_00012.png"]
      },{
        animationLabel: "transform",
        filePath:["assets/cube_transform_front_00001.png","assets/cube_transform_front_00010.png"]
      }
    ],
    
  },
  {
    layer:2,
    name:"heart",
    animation:[
      {
        animationLabel: "nutral",
        filePath:["assets/cube_heart_nutral_00001.png","assets/cube_heart_nutral_00004.png"]
      }
    ]
    
  },
  {
    layer:3,
    name:"front",
    animation:[
      {
        animationLabel: "spin",
        filePath:["assets/cube_spin_front_00001.png","assets/cube_spin_front_00012.png"]
      }
    ]
    
  },
  
]



function preload(){

    img = loadImage("assets/cube_transform_front_00001.png");
    cubeSprite_2 = createSprite(canvasWidth/2 ,canvasHeight/2,300,300);
    cubeSprite_2.addAnimation("transform","assets/cube_transform_front_00001.png","assets/cube_transform_front_00010.png");
    // cubeSprite_2.addImage("bruh",img);
    // cubeSprite_2.changeImage("bruh");
    cubeSprite_2.animation.frameDelay = 60;






    // Create cubeSprite
    cubeSprite = new Group();
    // create sub sprites
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
    // cubeSprite_2.degug = mouseIsPressed;
    drawSprites(cubeSprite);
    // drawSprite(cubeSprite_2);
}

 
