import { MarkType } from "../type/markType";
import { Coordinate } from "./coordinate";

/**
 * フィールドを扱うクラスで各マスの情報を保持する
 */
export class Field {
    /**
     * 1マスのサイズ
     */
    public static readonly SIZE = 128;
    /**
     * フィールドの長さ
     */
    public static readonly LENGTH = 3;
    /**
     * フィールドの情報
     */
    private field: number[][] = Array.from(Array(Field.LENGTH), () => new Array(Field.LENGTH).fill(MarkType.None));

    /**
     * フィールドの情報を取得する
     * @returns フィールドの情報
     */
    public getMain() {
        return this.field;
    }

    /**
     * フィールドの座標を指定して
     * @param coordinate フィールドの座標
     * @returns フィールドの座標のマーク
     */
    public getMarkType(coordinate: Coordinate): MarkType {
        const [tx, ty] = coordinate.getValue();
        return this.field[ty][tx];
    }

    /**
     * フィールドが⭕️❌で埋まっているかどうかを取得する
     * @returns フィールドが埋まっている場合はtrue
     */
    public isFull(): boolean {
        return this.field.every((line) => line.every((mark) => mark !== MarkType.None));
    }

    /**
     * フィールドの座標を指定してマークを更新する
     * @param coordinate フィールドの座標
     * @param mark マークの種類
     */
    public update(coordinate: Coordinate, mark: MarkType): void {
        const [tx, ty] = coordinate.getValue();
        this.field[ty][tx] = mark;
    }

    /**
     * 縦横斜めのラインが揃っているかどうかを取得する
     * @returns 揃っているマークの種類
     */
    public getLine(): MarkType {
        // 横
        for (let i=0; i<this.field.length; i++) {
            if (this.checkLine(this.field[i]) !== MarkType.None) {
                return this.field[i][0];
            }
        }
        // 縦
        for (let i=0; i<this.field.length; i++) {
            if (this.checkLine([this.field[0][i], this.field[1][i], this.field[2][i]]) !== MarkType.None) {
                return this.field[0][i];
            }
        }
        // 斜め
        if (this.checkLine([this.field[0][0], this.field[1][1], this.field[2][2]]) !== MarkType.None) {
            return this.field[0][0];
        } else if (this.checkLine([this.field[0][2], this.field[1][1], this.field[2][0]]) !== MarkType.None) {
            return this.field[0][2];
        }
        return MarkType.None;
    }

    private checkLine(line: number[]): number {
        const [a, b, c] = line;
        return a === b && a === c ? a : MarkType.None;
    }
}