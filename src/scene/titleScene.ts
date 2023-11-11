export class TitleScene extends Phaser.Scene {
    private text?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'titleScene' });
    }

    create() {
        this.text = this.add.text(this.sys.canvas.width/2, this.sys.canvas.height/2, 'START');
        this.text.setOrigin(0.5);
        this.text.setFontSize(32);
        this.text.setInteractive();
        this.text.on('pointerdown', () => {
            this.cameras.main.fadeOut(500, 255, 255, 255);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('gameScene');
            })
        });
    }

}