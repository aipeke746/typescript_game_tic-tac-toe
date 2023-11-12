export class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
    }

    create() {
        this.add.text(this.sys.canvas.width/2, this.sys.canvas.height/2, 'START')
            .setOrigin(0.5)
            .setFontSize(32)
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fadeOut(500, 255, 255, 255);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.scene.start('gameScene');
                })
            });
    }
}