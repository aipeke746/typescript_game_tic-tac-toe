import { Coordinate } from "../../../entity/coordinate";
import { ComputerService } from "../computerService";
import { Tilemap } from "../../../map/tilemap";
import { RandomImpl } from "./randomImpl";
import { MarkType } from "../../../type/markType";
import { Player } from "../../../entity/player";

/**
 * 単純なアルゴリズムでマークをセットする
 * 
 * 1. コンピューターが勝てる場所があればそこにマークをセットする
 * 2. プレイヤーが勝てる場所があればそこにマークをセットする
 * 3. ランダムにマークをセットする
 */
export class SimpleImpl implements ComputerService {

    /**
     * マークをセットする座標を返す
     * @returns マークをセットする座標
     */
    public getCoordinate(tilemap: Tilemap, player: Player): Coordinate {
        const playerMark: MarkType = player.getMyMark();
        const computerMark: MarkType = player.getOpponentMark();

        // 1. コンピューターが勝てる場所があればそこにマークをセットする
        const coordinateToWin = this.getCoordinateToWin(tilemap, computerMark);
        if (coordinateToWin != null) {
            return coordinateToWin;
        }

        // 2. プレイヤーが勝てる場所があればそこにマークをセットする
        const coordinateToLose = this.getCoordinateToWin(tilemap, playerMark);
        if (coordinateToLose != null) {
            return coordinateToLose;
        }

        // 3. ランダムにマークをセットする
        return this.getRandomCoordinate(tilemap);
    }

    /**
     * 指定したマークをセットすることで勝利できる座標を返す
     * 勝利できる座標がない場合はnullを返す
     * @param tilemap タイルマップ
     * @param targetMark 勝利条件となるマーク
     * @returns 勝利できる座標
     */
    private getCoordinateToWin(tilemap: Tilemap, targetMark: MarkType): Coordinate | null {
        const emptyCoordinates: Coordinate[] = tilemap.field.getEmptyCoordinates();

        for (const coordinate of emptyCoordinates) {
            const currentField = tilemap.field.clone();
            const [x, y] = coordinate.getValue();
            currentField.getMain()[y][x] = targetMark;

            if (currentField.getLine() === targetMark) {
                return coordinate;
            }
        }
        return null;
    }

    /**
     * ランダムな座標を返す
     * @param tilemap タイルマップ
     * @returns ランダムな座標
     */
    private getRandomCoordinate(tilemap: Tilemap): Coordinate {
        const randomImpl: RandomImpl = new RandomImpl();
        return randomImpl.getCoordinate(tilemap);
    }
}