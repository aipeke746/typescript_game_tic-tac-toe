import { Field } from "../entity/field";
import { Coordinate } from "../entity/coordinate";

export class CoordinateFactory {
    /**
     * タイルマップの座標からCoordinateを生成する
     * @param tx タイルマップのx座標
     * @param ty タイルマップのy座標
     * @returns タイルマップの座標を持つCoordinate
     */
    public static createByCoordinate(tx: number, ty: number): Coordinate {
        return new Coordinate(tx, ty);
    }

    /**
     * マウスの座標からCoordinateを生成する
     * @param mousePos マウスの座標
     * @returns タイルマプの座標を持つCoordinate
     */
    public static createByMousePos(mousePos: number[]): Coordinate {
        let [tx, ty] = this.calculate(mousePos);
        return new Coordinate(tx, ty);
    }

    /**
     * マウスの座標からタイルマップの座標を計算する
     * @param mousePos マウスの座標
     * @returns タイルマップの座標
     */
    private static calculate(mousePos: number[]): number[] {
        const tx = Math.floor(mousePos[0] / Field.SIZE);
        const ty = Math.floor(mousePos[1] / Field.SIZE);
        return [tx, ty];
    }
}