import { Field } from "./field";

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
     * タイルマップの座標を指定してCoordinateを生成する
     * @param tx タイルマップのx座標
     * @param ty タイルマップのy座標
     */
    constructor(tx: number, ty: number) {
        this.tx = tx;
        this.ty = ty;

        if (this.tx < 0 || Field.LENGTH <= this.tx) this.tx = -1;
        if (this.ty < 0 || Field.LENGTH <= this.ty) this.ty = -1;
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
}