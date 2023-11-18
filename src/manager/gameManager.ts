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
     * 先行のターンかどうかを取得する
     * @returns 先行のターンの場合はtrue
     */
    public isSenkoTurn(): boolean {
        return this.isSenko;
    }

    /**
     * 現在のターンのマークを返す
     */
    public getMarkByCurrentTurn(): MarkType {
        return this.isSenkoTurn() ? MarkType.Maru : MarkType.Batsu;
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
}