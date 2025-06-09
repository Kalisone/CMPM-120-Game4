class LevelTwo extends Phaser.Scene {
    constructor() {
        super("levelTwo");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 1200;
        this.DRAG = 2400;
        this.physics.world.gravity.y = 1200;
        this.JUMP_VELOCITY = -900;
        this.MAX_SPEED = 400;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = SCALE;
        this.physics.world.TILE_BIAS = 36;

        this.DEFAULT_LIVES = 3;
        this.wasInAir = this.inAir = false;
        this.numKeys = 0;
        this.stepCounter = 0;
    }

    preload(){
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {
        this.map2 = this.add.tilemap("level-two", 18, 18, 150, 30);
    }
}