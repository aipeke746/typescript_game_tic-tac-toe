import { Tilemap } from "../map/tilemap";

/**
 * タイルマップ（フィールド）の座標を扱うクラス
 */
export class Coordinate {
    /**
     * タイルマップの座標
     */
    private tx: number;
    private ty: number;

    /**
     * マウスの座標からタイルマップの座標を作成する
     * @param field タイルマップの情報
     * @param mousePos マウスの座標
     */
    constructor(tilemap: Tilemap, mousePos: number[]) {
        const length = tilemap.field.getLength();
        const size = tilemap.field.getSize();

        [this.tx, this.ty] = this.calculate(mousePos, size);

        if (this.tx < 0 || this.tx >= length) this.tx = -1;
        if (this.ty < 0 || this.ty >= length) this.ty = -1;
    }

    /**
     * タイルマップの座標を取得する
     * @returns タイルマップの座標
     */
    public getValue(): number[] {
        return [this.tx, this.ty];
    }

    /**
     * タイルマップの座標が不正かどうかを取得する
     * @returns x,y座標に-1が入っている場合は不正 [true]
     */
    public isInvalid(): boolean {
        return this.tx === -1 || this.ty === -1;
    }

    /**
     * マウスの座標からタイルマップの座標を計算する
     * @param mousePos マウスの座標
     * @returns タイルマップの座標
     */
    private calculate(mousePos: number[], size: number): number[] {
        const tx = Math.floor(mousePos[0] / size);
        const ty = Math.floor(mousePos[1] / size);
        return [tx, ty];
    }
}