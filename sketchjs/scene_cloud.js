function CloudScene(){
    this.setup = function () {

    }

    this.draw = function () {
        camera.off();     //fix drift

   

        drawCloudSceneScreen();
        informationMessageBox();
    }

    // this.keyPressed = function()
    // {
    //     this.sceneManager.showScene( Intro );
    // }

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
        text("cloud_scene placeholder \n refresh page to restart", width / 2 , 100);
        pop();
    }

    function drawCloudSceneScreen(){
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
        image(cloud_layout, width /2, height /2, imgWidth, imgHeight);
    }
}