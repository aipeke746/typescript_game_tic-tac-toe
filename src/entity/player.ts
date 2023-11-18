import { MarkType } from "../type/markType";

/**
 * プレイヤーを扱うクラス
 */
export class Player {
    /**
     * プレイヤーのマーク
     */
    private myMark: MarkType;

    /**
     * 先行かどうかを指定してプレイヤーが使用するマークを設定する
     * @param isSenko プレイヤーが先攻かどうか
     */
    constructor(isSenko: boolean) {
        this.myMark = isSenko ? MarkType.Maru : MarkType.Batsu;
    }

    /**
     * プレイヤーが使用しているマークを返す
     * @returns プレイヤーのマークを返す
     */
    public getMyMark(): MarkType {
        return this.myMark;
    }
}