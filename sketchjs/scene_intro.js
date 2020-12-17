function Intro()
{
    this.setup = function(){
        
    }
    this.draw = function()
    {
        camera.off();     //fix drift
        drawIntroScreen();      
        informationMessageBox();  
    }

    this.keyPressed = function()
    {
        this.sceneManager.showScene(CubeScene);
    }

    function drawIntroScreen()
    {
        background(200,200,200)
        imageMode(CENTER);

        let imgWidth;
        let imgHeight;
        let c = width / height;
        if(c > 1.77) {
            imgWidth = width;
            imgHeight = width * 0.5625;
        } else {
            imgWidth = height * 1.77;
            imgHeight = height;
        }
        image(intro_layout, width /2, height /2, imgWidth, imgHeight);
    }

    function informationMessageBox(){
        let c = color(255,204,0);

        push();
        fill(c);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, 100,180,100);
        pop();

        push();
        textAlign(CENTER);
        text("intro placeholder \n press any key to continue", width / 2 , 100);
        pop();
    }

}


