class LevelOne extends Phaser.Scene {
    constructor() {
        super("levelOne");
    }
    // example to delete

    init() {
        // variables and settings
        this.ACCELERATION = 800;
        this.DRAG = 2400;
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -500;
        this.MAX_SPEED = 240;
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

    create(){
        // //// //// //// //// //// ////
        //
        // LOGIC
        //
        // //// //// //// //// //// ////

        // BACKGROUND
        /* WIP
        this.backgroundImg = this.add.image(0, 0, "green_background");
        this.background = this.add.tileSprite(0, 600, 1440, 396, "green_background").setScale(6).setScrollFactor(0.4);
        */

        /* **** **** **** **** **** ****
         * CREATE TILES
         **** **** **** **** **** **** */
        this.map = this.add.tilemap("level-one", 18, 18, 150, 30);

        // Tilesets
        this.tileset = this.map.addTilesetImage("abstract_tiles", "tilemap_tiles");

        // Tile Layers
        this.layerEnvrBack_0 = this.map.createLayer("Environs-Background-0", this.tileset, 0, 0);
        this.layerGround_1 = this.map.createLayer("Ground-Platforms-1", this.tileset, 0, 0);
        this.layerEnvrFore_2 = this.map.createLayer("Environs-Foreground-2", this.tileset, 0, 0);

        this.tileLayers = [
            this.layerEnvrBack_0,
            this.layerGround_1,
            this.layerEnvrFore_2
        ];

        this.layerGround_1.setCollisionByProperty({
            collides: true
        });
        
        // Object Layer
        this.keys = this.map.createFromObjects("Objects-3", {
            name: "key",
            key: "tilemap_sheet",
            frame: 101
        });

        this.physics.world.enable(this.keys, Phaser.Physics.Arcade.STATIC_BODY);
        this.keyGroup = this.add.group(this.keys);

        for(let key of this.keys){
            this.numKeys++;
        }

        // Water tiles
        this.waterTiles = this.layerGround_1.filterTiles(tile => {
            return tile.properties.water == true;
        });
        /* END CREATE TILES */

        /* **** **** **** **** **** ****
         * PLAYER SETUP
         **** **** **** **** **** **** */
        this.spawnPt = this.map.findObject("Objects-3", obj => obj.name === "spawn");
        //my.sprite.player = this.physics.add.sprite(this.spawnPt.x, this.spawnPt.y, "platformer_characters", "tile_0002.png");

        my.sprite.player.setCollideWorldBounds(true, 1);
        //my.sprite.player.setScale(0.7);
        my.sprite.player.body.maxVelocity.x = this.MAX_SPEED;

        my.sprite.player.lives = this.DEFAULT_LIVES;

        // Controls
        cursors = this.input.keyboard.createCursorKeys();
        /* END PLAYER SETUP */

        /* **** **** **** **** **** ****
         * COLLISION
         **** **** **** **** **** **** */
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        
        let hazCollider = (obj1, obj2) => {
            if(obj2.properties.hazard){
                if(obj1.lives > 0){
                    this.respawn(obj1);
                }

                return;
            }
        }

        let hazHandler = (obj1, obj2) => {
            if(obj2.properties.hazard){
                return true;
            }else{
                return false;
            }
        }

        this.physics.add.collider(my.sprite.player, this.layerGround_1, hazCollider, hazHandler);

        this.physics.add.collider(my.sprite.player, this.layerGround_1, );

        this.physics.add.overlap(my.sprite.player, this.keyGroup, (obj1, obj2) => {
            this.collectObj(obj1, obj2);
        });
 // Pause Menu
    
         this.input.keyboard.on('keydown-P', () => {
    this.scene.pause();
this.scene.launch('PauseMenu', { from: this.scene.key });

});
        /* END COLLISION */
    }

    update(){
    }
}