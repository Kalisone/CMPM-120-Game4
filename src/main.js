// Ethan Morelos, Devin Alvarez, Angelo Franso
// CMPM 120 - Game Development Experience
// Game 4 - Platformer
// May 7, 2024
//
// Tralaleo Trip
//
// Art assets from Kenny Assets
//
// Audio assets from Kenny Assets
//
// Music
// "My Freedom" by ROIK

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
    scene: [Load, MainMenu, LevelSelector, Credits, Bitryside, LevelOne, LevelTwo, PauseMenu, GameFail, GameEnd]
}

var cursors;
const SCALE = 1.0;
var my = {sprite: {}, text: {}, vfx: {}, sfx: {}};
var levelComplete = [];

const game = new Phaser.Game(config);