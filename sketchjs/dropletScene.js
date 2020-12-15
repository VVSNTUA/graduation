function DropletScene(){
    this.setup = function () {

    }

    this.draw = function () {
        background(200,200,200);
        let c = color(255,204,0);

        push();
        fill(c);
        noStroke();
        rectMode(CENTER);
        rect(canvasWidth / 2, canvasHeight / 2,100,100);
        pop();

        push();
        textAlign(CENTER);
        text("test screen", canvasWidth / 2, canvasHeight / 2);
        pop();
    }
}