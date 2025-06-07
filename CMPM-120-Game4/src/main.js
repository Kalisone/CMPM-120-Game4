// Ethan Morelos
// CMPM 120 - Game Development Experience
// Game 3 - Platformer
// May X, 2024
//
// Gearbit
//
// Art assets from Kenny Assets
//
// Audio assets from Kenny Assets
//
// Music
// "X" by X: 

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 1440,
    height: 720,
    scene: [Load, MainMenu,Bitryside,LevelOne,PauseMenu, GameFail, GameEnd]
     //  scene: [PauseMenu]

}

var cursors;
const SCALE = 3.0;
var my = {sprite: {}, text: {}, vfx: {}, sfx: {}};

const game = new Phaser.Game(config);