import Level1 from "./Level1";
import Level2 from "./Level2";
import PortaScene from "./PortaScene";

export default class Intro extends Phaser.Scene {
  private logo: Phaser.GameObjects.Image;
  public static music: Phaser.Sound.BaseSound;
  private howToPlayText:Phaser.GameObjects.Text;
  private creditsText:Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() {
      Intro.music = this.sound.add("introMusic", { loop: true, volume: 1 });
      Intro.music.play();
    }

  create() {
 

    this.scene.add("PortaScene", PortaScene);
    let bg = this.add.image(0, 0, "principale").setOrigin(0, 0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on(
      "pointerdown", () => {
        console.log("premi sulla porta per iniziare ");
        Intro.music.stop();
        this.scene.start("PortaScene");
      });

    this.logo = this.add.image(this.game.canvas.width / 2 - 9, 60, "logo-game").setScale(0.23).setDepth(1).setOrigin(0.5);
  
    this.howToPlayText=this.add.text(100,550,"How to play",{fontSize:"26px"})
    .setColor("White")
    .setOrigin(0.5,0.5)
    .setFontStyle("bold")
    .setDepth(1)
    .setInteractive()
    .on("pointerdown",()=>{
      console.log("come giocare");
      this.createHow();
    });

    this.howToPlayText=this.add.text(950,550,"Credits",{fontSize:"26px"})
    .setColor("White")
    .setOrigin(0.5,0.5)
    .setFontStyle("bold")
    .setDepth(1)
    .setInteractive()
    .on("pointerdown",()=>{
      console.log("credits");
      this.createHow();
    });
  }

  createHow(){
    this.howToPlayText.setInteractive(false);
    let base:Phaser.GameObjects.Image=this.add.image(this.game.canvas.width/2,300,"howtoplay").setOrigin(0.5,0.5).setDepth(12).setInteractive().on("pointerdown",()=>{
      base.destroy();
      this.howToPlayText.setInteractive(true);
    });       
  }

  credits(){
    this.creditsText.setInteractive(false);
    let base:Phaser.GameObjects.Image=this.add.image(this.game.canvas.width/2,300,"howtoplay").setOrigin(0.5,0.5).setDepth(12).setInteractive().on("pointerdown",()=>{
      base.destroy();
      this.creditsText.setInteractive(true);
    });       
  }
  
  update(time: number, delta: number): void {
   
  }

}
