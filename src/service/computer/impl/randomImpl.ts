import { Coordinate } from "../../../entity/coordinate";
import { Field } from "../../../entity/field";
import { ComputerService } from "../computerService";
import { CoordinateFactory } from "../../../factory/coordinateFactory";

/**
 * コンピューターがランダムにマークを置く
 */
export class RandomImpl implements ComputerService {

    /**
     * ランダムな座標を取得する
     * @returns ランダムな座標
     */
    public getCoordinate(): Coordinate {
        return CoordinateFactory.createByCoordinate(
            Math.floor(Math.random() * Field.LENGTH),
            Math.floor(Math.random() * Field.LENGTH)
        );
    }
}