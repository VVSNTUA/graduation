function Intro()
{
    this.draw = function()
    {
        drawIntroScreen();        
    }

    this.keyPressed = function()
    {
        this.sceneManager.showScene(CubeScene);
    }

    function drawIntroScreen()
    {
        background(200,200,200)
        let c = color(255,204,0)

        push();
        fill(c);
        noStroke();
        rectMode(CENTER);
        rect(canvasWidth / 2, canvasHeight / 2,180,100);
        pop();

        push();
        textAlign(CENTER);
        text("intro placeholder \n press any key to continue", width / 2 , height / 2);
        pop();

        // textSize(24);
        // textAlign(CENTER);
        // fill("yellow");
        // text("Intro Scene.", width /2, height / 2, 60,60);

    }

}
