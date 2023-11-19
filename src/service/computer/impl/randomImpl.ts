import { Coordinate } from "../../../entity/coordinate";
import { ComputerService } from "../computerService";
import { Tilemap } from "../../../map/tilemap";

/**
 * コンピューターがマークが未セットの座標に対してランダムにマークをセットする
 */
export class RandomImpl implements ComputerService {

    /**
     * マークが未セットの座標の中からランダムな座標を返す
     * @returns マークが未セットのランダムな座標
     */
    public getCoordinate(tilemap: Tilemap): Coordinate {
        const emptyCoordinates: Coordinate[] = tilemap.field.getEmptyCoordinates();
        const randomIndex: number = Math.floor(Math.random() * emptyCoordinates.length);
        return emptyCoordinates[randomIndex];
    }
}