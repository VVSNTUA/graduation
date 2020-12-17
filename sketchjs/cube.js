class Cube {
    constructor(){
        this._data = [
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
            
          ];
        this.sprites = (function(d){let newSpriteGroup = new Group();

            let initX = 0;
            let initY = 0;
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
        
            return newSpriteGroup;})(this._data);
        
        this.state = {
            isAnimating: false,
            isMoving: false,
            isStoping: false,
            isDragged: false,
            isCracked: false,
            isHealed: false,
        };
    }

    // settings
    // set collider
    setCollider() {

        if(!arguments) {
            this.sprites[0].setDefaultCollider();
        } else {
            this.sprites[0].setCollider(...arguments);
        }

    }





    // methods

    display(){
        drawSprites(this.sprites);
    }

    setPosition(x,y) {
      this.sprites.forEach( sprite => {
        sprite.position.x = x;
        sprite.position.y = y;
    });
    }
    moveTo(desX,desY,speed){
        this.sprites.forEach( sprite => {
            let speedX = (desX - sprite.position.x) * speed;
            let speedY = (desY - sprite.position.y) * speed;
            sprite.position.x += speedX;
            sprite.position.y += speedY;
        });
    }

    playAnimation(label){

      switch (label) {
        case "spin":
          this.sprites.forEach(sprite => {
            sprite.animation.rewind();
            sprite.animation.play();
            sprite.changeAnimation("spin");

          });
          break;
        case "stopping":
          this.sprites.forEach(sprite => {
            if(sprite.getAnimationLabel() == "spin"){
              sprite.animation.goToFrame(0);
            }
          });
          break;

        case "halt":
          this.sprites.forEach(sprite => {
            sprite.changeAnimation("neutral");
          });
          break;
        case "crack1":
          this.sprites[0].animation.stop();
          this.sprites[0].animation.changeFrame(0);
          this.sprites[2].changeAnimation("crack1");
          break;
        case "crack2":
          this.sprites[2].changeAnimation("crack2");
          break;
        case "crack3":
          this.sprites[2].changeAnimation("crack3");
          break;
        case "crack4":
          this.sprites[2].changeAnimation("crack4");
          break;
        case "transform" :
          this.sprites.forEach((sprite)=>{
            sprite.changeAnimation("transform");
            sprite.animation.rewind();
            sprite.animation.play();
            sprite.animation.frameDelay = 8;
          });
          break;
        default:
          console.log(label);
          break;
      }
    }

}