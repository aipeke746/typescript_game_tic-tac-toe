import { MarkType } from "../type/markType";

/**
 * ゲームの状態を管理するクラス
 */
export class GameManager {
    /**
     * マウスの座標
     */
    private pointer: Phaser.Input.Pointer;
    /**
     * マウスが押されているかどうか
     */
    private isDown = false;
    /**
     * 先攻かどうか（先行は○）
     */
    private isSenko = true;
    /**
     * 勝者
     */
    private winner = MarkType.None;

    constructor(scene: Phaser.Scene) {
        this.pointer = scene.input.activePointer;
    }

    /**
     * 新たにマウスが押されたかどうかを取得する
     * @returns マウスが押された瞬間 [true]
     */
    public isMouseDown(): boolean {
        return this.pointer.isDown && !this.isDown;
    }

    /**
     * マウスが押さている状態から離されたかどうかを取得する
     * @returns マウスが離された瞬間 [true]
     */
    public isMouseUp(): boolean {
        return !this.pointer.isDown && this.isDown;
    }

    /**
     * マウスの座標を取得する
     * @returns マウスの座標
     */
    public getMousePos(): number[] {
        return [this.pointer.x, this.pointer.y];
    }

    /**
     * センタ校のターンかどうかを取得する
     * @returns 先行のターンの場合はtrue
     */
    public isSenkoTurn(): boolean {
        return this.isSenko;
    }

    /**
     * マウスが押されているかどうかの状態を反転する
     */
    public reverseIsDown(): void {
        this.isDown = !this.isDown;
    }

    /**
     * 次のターンに移行する
     */
    public nextTurn(): void {
        this.isSenko = !this.isSenko;
    }

    /**
     * 勝者を設定する
     * @param winner 勝者を設定する
     */
    public setWinner(winner: MarkType): void {
        this.winner = winner;
    }

    /**
     * 勝者を取得する
     * @returns 勝者を取得する
     */
    public getWinner(): MarkType {
        return this.winner;
    }
}