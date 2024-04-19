import Level1 from "./Level1";
import Level2 from "./Level2";
import PortaScene from "./PortaScene";

export default class Intro extends Phaser.Scene {
  private logo: Phaser.GameObjects.Image;
  public static music: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() {
      Intro.music = this.sound.add("introMusic", { loop: true, volume: 0.8 });
      Intro.music.play();
    }

  create() {
 

    this.scene.add("PortaScene", PortaScene);
    let bg = this.add.image(0, 0, "principale").setOrigin(0, 0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on(
      "pointerdown", () => {
        console.log("premi sulla porta per iniziare ");
        if (Level2.music.isPlaying)
          Level2.music.stop();
        if (Level1.music.isPlaying)
          Level1.music.stop();

        Intro.music.stop(); // Ferma la musica intro al clic sulla porta
        this.scene.start("PortaScene");
      });

    this.logo = this.add.image(this.game.canvas.width / 2 - 9, 60, "logo-game").setScale(0.23).setDepth(1).setOrigin(0.5);
  }

  update(time: number, delta: number): void {
    let bg = this.add.image(0, 0, "principale").setOrigin(0, 0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on("pointerdown", () => {
      console.log("premi sulla porta per iniziare ");
      Intro.music.stop(); // Ferma la musica intro al clic sulla porta
      this.scene.start("PortaScene");
    });
  }

}
