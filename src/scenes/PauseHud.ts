import Level1 from "./Level1";
import Level2 from "./Level2";


export default class PauseHud extends Phaser.Scene{
    private continua :Phaser.GameObjects.Image;
    private esci: Phaser.GameObjects.Image;
    private base: Phaser.GameObjects.Image;
    private currentLevl : String;
    private static level:integer;
    constructor(level:integer) {
        super({
        key: "PauseHud",
        });

    }

    static setLevel(x:integer){
        PauseHud.level=x;
    };

    create(){
        this.scene.bringToTop();
        this.base=this.add.image(1024/2,300+15,"base").setOrigin(0.5,0.5).setDepth(12).setAlpha(1);

        this.continua=this.add.image(1024/2,300-20,"continua").setInteractive().on("pointerdown",()=>{
            if(PauseHud.level==1){
                Level1.music.play();}
                else if(PauseHud.level==2)
                    Level2.music.play();
            this.scene.resume("Level" + PauseHud.level);
            this.base.setAlpha(0);
            this.continua.setAlpha(0);
            this.esci.setAlpha(0);

            }
        ).setOrigin(0.5,0.5).setDepth(14).setScale(0.3).setAlpha(1);

        this.esci=this.add.image(1024/2,300+70,"esci").setInteractive().on("pointerdown",()=>{
            this.base.setAlpha(0);
            this.continua.setAlpha(0);
            this.esci.setAlpha(0);
            this.scene.setVisible(false,"Overlay");
            this.scene.remove("Level"+PauseHud.level.toString());
            this.scene.remove("Keypad");
            this.scene.remove("Legenda")
            this.scene.remove("PortaScene");
            this.scene.start("Intro");
            if(PauseHud.level==1){
                Level1.music.play();}
                else if(PauseHud.level==2)
                    Level2.music.play();
            }
        ).setOrigin(0.5,0.5).setDepth(14).setScale(0.3).setAlpha(1);
    };
} 