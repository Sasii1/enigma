
export default class Boot extends Phaser.Scene {
 
  constructor() {
    super({
      key: "Boot",
    });
  }

  preload() {
    this.load.image("phaser", "assets/images/nefertiti.png" );
    this.load.bitmapFont(
      "arcade",
      "assets/fonts/arcade.png",
      "assets/fonts/arcade.xml"
    );
  }

  create() {
    console.log("create:boot");
    this.scene.start("Preloader");
  }

  update(){
    console.log("boot:updade")
  }
}
