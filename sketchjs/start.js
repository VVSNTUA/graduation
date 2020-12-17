

var intro_layout,droplet_layout,cloud_layout;

let cubeSprite;

function preload()
{
    intro_layout = loadImage("img/intro_layout.png");
    droplet_layout = loadImage("img/droplet_layout.png");
    cloud_layout = loadImage("img/cloud_layout.png");
    cubeSprite = new Cube();

}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    cubeSprite.setPosition(width /2, 20);

    var mgr = new SceneManager();
    mgr.wire();
    mgr.showScene( Intro );
}

function draw() {
    // camera.off();     //fix drift
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
