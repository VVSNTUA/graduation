var canvasWidth = 1000;
var canvasHeight = 600;

let cubeSprite;
let cubeSprites = [];

function preload()
{
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    cubeSprite = new Cube();

}

function setup()
{
    createCanvas(canvasWidth, canvasHeight);

    var mgr = new SceneManager();
    mgr.wire();
    mgr.addScene( CubeScene );
    mgr.addScene( DropletScene );

    mgr.showScene( Intro );
}
