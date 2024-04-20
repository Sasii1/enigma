export default class Legenda extends Phaser.Scene{
    private sfondo: Phaser.GameObjects.Image;

    private static level:integer;
    constructor(level:integer) {
        super({
        key: "Legenda",
        });
 
    }

    create(){
        console.log("Legenda : creata");
        this.scene.bringToTop();
        this.sfondo=this.add.image(110,200,"legenda").setDepth(20);

        
    };
}