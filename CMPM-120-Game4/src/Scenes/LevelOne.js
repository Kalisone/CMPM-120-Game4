class LevelOne extends Phaser.Scene {
    constructor() {
        super("levelOne");
    }
    // example to delete

    init() {
        // variables and settings
        this.ACCELERATION = 1200;
        this.DRAG = 2400;
        this.physics.world.gravity.y = 1200;
        this.JUMP_VELOCITY = -600;
        this.MAX_SPEED = 300;
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
        // DESIGN
        //
        // //// //// //// //// //// ////

        this.map = this.add.tilemap("level-one", 18, 18, 150, 30);

        // BACKGROUND
        this.backgroundImg = this.add.image(-1000, -1000, "star_background");
        this.background = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, "star_background").setScale(1).setScrollFactor(0.2);

        /* **** **** **** **** **** ****
         * CREATE TILES
         **** **** **** **** **** **** */
        // Tilesets
        this.tileset = this.map.addTilesetImage("platformAbstract_tiles", "tilemap_tiles");

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
        my.sprite.player = this.physics.add.sprite(this.spawnPt.x, this.spawnPt.y, "platformer_characters", "tile_0002.png");

        my.sprite.player.setCollideWorldBounds(true, 1);
        //my.sprite.player.setScale(1);
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
        /* END COLLISION */

        /* **** **** **** **** **** ****
         * CREATE LEVEL EXIT
         **** **** **** **** **** **** */
        this.exitPt = this.map.findObject("Objects-3", obj => obj.name === "exit");

        /* END LEVEL EXIT */

        // //// //// //// //// //// ////
        //
        // FX
        //
        // //// //// //// //// //// ////

        /* **** **** **** **** **** ****
         * CREATE TEXT
         **** **** **** **** **** **** */
        my.text.lives = this.add.text(40, 20, "Lives Remaining: " + my.sprite.player.lives, {
            fontFamily: "'Passion One'",
            fontSize: '16px',
            color: "#ffffff",
            stroke: "#0086ff",
            strokeThickness: 2
        });

        my.text.keys = this.add.text(40, 60, "Keys Remaining: " + this.numKeys, {
            fontFamily: "'Passion One'",
            fontSize: '16px',
            color: "#ffffff",
            stroke: "#0086ff",
            strokeThickness: 2
        });
        /* END CREATE TEXT */
        
        /* **** **** **** **** **** ****
         * CREATE VFX
         **** **** **** **** **** **** */
        this.load.setPath("../assets/particles/");
        
        /* Particles */
        my.vfx.particleKey = this.add.particles(0, 0, "kenny-particles", {
            anim: "keyAnim",
            scale: {start: 0.03, end: 0.2},
            frequency: my.vfx.keyAnim.msPerFrame,
            lifespan: my.vfx.keyAnim.duration,
            alpha: {start: 0.4, end: 0.1},
            blendMode: "ADD"
        }).stop();

        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ["smoke_03.png", "smoke_09.png"],
            random: true,
            scale: {start: 0.02, end: 0.04},
            maxAliveParticles: 8,
            lifespan: 150,
            gravityY: -400,
            alpha: {start: 0.8, end: 0.2}
        }).stop();

        my.vfx.landing = this.add.particles(0, 0, "kenny-particles", {
            anim: "landingAnim",
            scale: {start: 0.04, end: 0.1},
            frequency: my.vfx.landingAnim.msPerFrame,
            lifespan: my.vfx.landingAnim.duration,
            gravityY: -200
        }).stop();

        if(!this.anims.get("waterAnim")){
            my.vfx.waterAnim = this.anims.create({
                key: "waterAnim",
                frames: [
                    {key: "kenny-particles", frame: "smoke_04.png"},
                    {key: "kenny-particles", frame: "circle_01.png"},
                    {key: "kenny-particles", frame: "smoke_07.png"},
                    {key: "kenny-particles", frame: "circle_04.png"},
                    {key: "kenny-particles", frame: "smoke_08.png"}
                ],
                duration: 300,
                frameRate: 10
            });
        }

        this.waterTiles.animParticles = [];
        for(let water of this.waterTiles){
            this.waterTiles.animParticles.push(this.add.particles(water.pixelX + water.width/2, water.pixelY, "kenny-particles", {
                anim: ["waterAnim"],
                frequency: my.vfx.waterAnim.msPerFrame,
                lifespan: my.vfx.waterAnim.duration,
                scale: () => 0.04 * (1 + (Math.random() ** 2)),
                alpha: {start: 0.1, end: 0.02, ease: "sine.out"},
                speed: {min: 0, max: 100},
                gravityY: -200,
                radial: true,
                advance: 10,
                blendMode: "ADD"
            }));
        }

        /* END CREATE VFX */

        /* **** **** **** **** **** ****
         * CAMERAS SETUP
         **** **** **** **** **** **** */
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(20, 20);
        //this.cameras.main.setZoom(SCALE);
        this.cameras.main.setBackgroundColor("#7ff0a5");

        for(let k in my.text){
            this.cameras.main.ignore(my.text[k]);
        }

        this.cameraUI = this.cameras.add();
        this.cameraUI.ignore([
            this.background,
            this.backgroundImg,
            this.keys,
            this.waterTiles.animParticles
        ]);
        
        for(let k in my.sprite){
            this.cameraUI.ignore(my.sprite[k]);
        }

        for(let k in my.vfx){
            this.cameraUI.ignore(my.vfx[k]);
        }

        for(let layer of this.tileLayers){
            this.cameraUI.ignore(layer);
        }
        /* END CAMERAS SETUP */

        // ANIMATED TILES PLUGIN
        this.animatedTiles.init(this.map);

        // PAUSE MENU
        this.input.keyboard.on('keydown-P', () => {
            this.scene.pause();
            this.scene.launch('PauseMenu', { from: this.scene.key });
        });
        
        /* **** **** **** **** **** ****
         * DEBUG
         **** **** **** **** **** **** */
        this.physics.world.drawDebug = false;

        // Decrement Life
        this.input.keyboard.on('keydown-MINUS', () => {
            this.respawn(my.sprite.player, true);
        });

        // Increment Life
        this.input.keyboard.on('keydown-PLUS', () => {
            my.text.lives.setText("Lives Remaining: " + ++my.sprite.player.lives);
        });

        // Decrement Keys Remaining
        this.input.keyboard.on('keydown-NINE', () => {
            my.text.keys.setText("Keys Remaining: " + --this.numKeys);
        });

        // Increment Keys Remaining
        this.input.keyboard.on('keydown-ZERO', () => {
            my.text.keys.setText("Keys Remaining: " + ++this.numKeys);
        });

        /*
        this.input.keyboard.on('keydown-SPACE', () => {
            for(let sound of my.sfx.unlock){
                sound.play();
            }
        });
        */
        /* END DEBUG */
    }

    update(){
    this.stepCounter++;
        /* **** **** **** **** **** ****
         * PLAYER MOVEMENT
         **** **** **** **** **** **** */

        // [<-] LEFT
         if(cursors.left.isDown && !cursors.right.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/4, my.sprite.player.displayHeight/2, false);
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground
            if (my.sprite.player.body.blocked.down) {
                this.fxPlayerWalk();
            }
        }

        // [->] RIGHT
        if(cursors.right.isDown && !cursors.left.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, -my.sprite.player.displayWidth/4, my.sprite.player.displayHeight/2, false);
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground
            if (my.sprite.player.body.blocked.down) {
                this.fxPlayerWalk();
            }

        }

        // UNMOVING ON HORIZONTAL AXIS
        if((cursors.left.isDown && cursors.right.isDown) || !(cursors.left.isDown || cursors.right.isDown)){
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            // TODO: have the vfx stop playing
            my.vfx.walking.stop();
        }

        // [^] IN AIR
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
            my.vfx.walking.stop();

            this.wasInAir = this.inAir;
            this.inAir = true;
        }else{
            this.wasInAir = this.inAir;
            this.inAir = false;
        }

        // [^] JUMPING
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);

            my.vfx.landing.emitParticleAt(my.sprite.player.x, my.sprite.player.y + (my.sprite.player.displayHeight / 2));

            for(let sound of my.sfx.jump){
                sound.play();
            }
        }

        // [^] LANDING
        if(this.inAir === false && this.wasInAir === true){
            my.vfx.landing.emitParticleAt(my.sprite.player.x, my.sprite.player.y + (my.sprite.player.displayHeight));

            for(let sound of my.sfx.landing){
                sound.play();
            }
        }
        /* END PLAYER MOVEMENT */

        /* **** **** **** **** **** ****
         * END CONDITIONS
         **** **** **** **** **** **** */

        // LEVEL END CONDITION
        if(this.numKeys <= 0){
            if(this.numKeys === 0 && !my.text.keys.setText("Door Unlocked!")){
                for(let sound of my.sfx.unlock){
                    sound.play();
                }
                my.text.keys.setText("Door Unlocked!");
            }
        }

        if(this.numKeys === 0){
            let a = my.sprite.player, b = this.exitPt;

            let beforePt = b.x < a.x + (a.displayWidth/2);
            let afterPt = b.x > a.x - (a.displayWidth/2);
            let abovePt = b.y < a.y + (a.displayHeight/2);
            let belowPt = b.y > a.y - (a.displayHeight/2);

            if (beforePt && afterPt && abovePt && belowPt){
                this.scene.start("gameEnd");
            }
        }

        // GAME FAIL CONDITION
        if(my.sprite.player.lives <= 0){
            this.scene.start("gameFail");
        }
        /* END of END CONDITIONS */
    }

    fxPlayerWalk(){
        my.vfx.walking.start();

        if(this.stepCounter >= 15){
            my.sfx.steps[Math.round(Math.random() * (my.sfx.steps.length-1))].play();
            this.stepCounter = 0;
        }

        return;
    }

    collectObj(player, key, debug){
        if(!debug){
            my.vfx.particleKey.emitParticleAt(key.x, key.y);
            key.destroy();

            for(let sound of my.sfx.key){
                sound.play();
            }
        }

        my.text.keys.setText("Keys Remaining: " + --this.numKeys);

        if(this.numKeys === 0){
            for(let sound of my.sfx.unlock){
                sound.play();
            }
        }
        
        return;
    }

    respawn(player, debug){
        player.lives--;
        
        if(player === my.sprite.player){
            my.text.lives.setText("Lives Remaining: " + my.sprite.player.lives);
        }

        if(!debug){
            player.x = this.spawnPt.x;
            player.y = this.spawnPt.y;

            for(let sound of my.sfx.death){
                sound.play();
            }
        }
        
        this.cameras.main.shake(270, 0.02);
    }
}