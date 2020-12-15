function Game() {
    this.draw = function (){
        ellipseMode(RADIUS);
        fill(255);
        ellipse(width /2, height / 2, 30,30);
    }
}