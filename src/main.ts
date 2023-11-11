import Phaser from 'phaser';

import { TitleScene } from './scene/titleScene';
import { GameScene } from './scene/gameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 384,
  height: 384,
  parent: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
  },
  scene: [TitleScene, GameScene],
};

new Phaser.Game(config);
