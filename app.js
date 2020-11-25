let img;
let cnv;

let c1_idle;
let c1_click;
let c1_transition;

let c1 = {
    idle: 0,
    click: 0,
    transition: 0
}

let current_gif;

function preload(){
    c1.idle = loadImage("img/c1-idle-placeholder.gif");
    c1.click = loadImage("img/c1-click-placeholder.gif");
    c1.transition = loadImage("img/c1-transition-placeholder.gif");
    console.log(c1);

    current_gif = c1.idle;
}
function setup(){
    cnv = createCanvas(windowWidth,windowHeight);
    cnv.parent('app-container');
    cnv.mousePressed(next);
    background(200,200,200);
    
}
function draw(){
    image(current_gif,
        (cnv.width-current_gif.width)/2,
        (cnv.height-current_gif.height)/2,
        current_gif.width,
        current_gif.height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function next(){
    current_gif = c1.click;
}

