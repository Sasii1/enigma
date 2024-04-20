import Phaser from 'phaser';

export default class End extends Phaser.Scene {
    constructor() {
        super({ key: 'End' });
    }

    preload() {
        this.load.video('End', 'assets/images/end.mp4', 'canPlayType');
    }

    create() {
        console.log("End : create");
        const video = this.add.video(500, 300, 'End');
        video.play();
        video.setVolume(0.5);
        this.time.delayedCall(75000, () => {
            window.location.reload();
        });
    }
}
