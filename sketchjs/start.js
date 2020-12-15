var bkImage;
var canvasWidth = 1000;
var canvasHeight = 600;

let cubeSprite;
let a;
let cubeSprites = [];
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

function preload()
{
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;

    // 方法一
    cubeSprite = createCustomSprite(cubeSpriteData);
    for (let i = 0; i < 3; i++){
        cubeSprites.push(createCustomSprite(cubeSpriteData));
    }

    // 方法二 
    a = new Cube();


}

function setup()
{
    createCanvas(canvasWidth, canvasHeight);

    var mgr = new SceneManager();
    mgr.wire();
    mgr.showScene( CubeScene );
}


// d = cubeSpriteData
function createCustomSprite(d) {
    let newSpriteGroup = new Group();

    let initX = canvasWidth/2;
    let initY = 20;
    for( let i = 1; i <= d.length; i++){
      let c = d[i-1];
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
      s.addToGroup(newSpriteGroup);
    }

    return newSpriteGroup;
}