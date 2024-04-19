import Phaser from 'phaser';

export default class Bigdoor extends Phaser.Scene {
    constructor() {
        super({ key: 'Bigdoor' });
    }

    preload() {
        this.load.video('Bigdoor', 'assets/images/bigdoor.mp4', 'canPlayType');
    }

    create() {
        console.log("Bigdoor : create");
        const video = this.add.video(500, 300, 'Bigdoor');
        video.play();
 
        this.time.delayedCall(1000, () => {
            this.scene.start('Level3');
        });
    }
}
