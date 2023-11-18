/**
 * タイトル画面
 * 先行（丸マーク）か後攻（バツマーク）かを選択する
 */
export class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
    }

    create() {
        this.createText('先行 [⭕️マーク]', this.sys.canvas.width/2, this.sys.canvas.height/2 - 50, true);
        this.createText('後攻 [❌マーク]', this.sys.canvas.width/2, this.sys.canvas.height/2 + 50, false);
    }

    /**
     * 画面に表示するテキストを作成する
     * 文字をクリックするとゲームプレイ画面に遷移して、プレイヤーが先行かどうかを渡す
     * @param text 文字列
     * @param x x座標
     * @param y y座標
     * @param isSenko 先行かどうか
     */
    private createText(text: string, x: number, y: number, isSenko: boolean): void {
        this.add.text(x, y, text)
            .setOrigin(0.5)
            .setFontSize(32)
            .setInteractive()
            .on('pointerdown', () => {
                this.cameras.main.fadeOut(500, 255, 255, 255);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.scene.start('gameScene', { isSenko: isSenko });
                })
            });
    }
}