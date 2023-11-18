import Phaser from 'phaser';

import { TitleScene } from './scene/titleScene';
import { GameScene } from './scene/gameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 384,
  height: 484,
  parent: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [TitleScene, GameScene],
};

new Phaser.Game(config);
