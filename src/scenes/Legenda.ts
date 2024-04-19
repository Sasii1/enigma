export default class Legenda extends Phaser.Scene{
    private sfondo: Phaser.GameObjects.Image;

    private static level:integer;
    constructor(level:integer) {
        super({
        key: "Legenda",
        });
 
    }

    create(){
        this.scene.bringToTop();
        this.sfondo=this.add.image(125,150,"legenda").setDepth(12);

        
    };
}