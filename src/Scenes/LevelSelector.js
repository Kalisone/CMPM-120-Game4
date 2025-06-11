class LevelSelector extends Phaser.Scene {
    constructor() {
        super("levelSelectorScene");
    }

    create() {
        this.add.image(720, 450, "levelSelectorBackground");

        this.selectorTitle = this.add.text(720, 100, "Level Selector", {
            fontFamily: '"Passion One"',
            fontSize: '60px',
            color: '#000000',
            backgroundColor: '#ff0000'
        }).setOrigin(0.5);

        this.level1 = this.add.text(240, 360, "Level 1", {
            fontFamily: '"Passion One"',
            fontSize: '45px',
            color: '#000000',
            backgroundColor: '#ff0000'
        }).setOrigin(0.5).setInteractive();
        this.level1.on("pointerdown", () => {
            this.scene.start("levelOne");
        });

        this.level2 = this.add.text(720, 360, "Level 2", {
            fontFamily: '"Passion One"',
            fontSize: '45px',
            color: '#000000',
            backgroundColor: '#ff0000'
        }).setOrigin(0.5).setInteractive();
        this.level2.on("pointerdown", () => {
            this.scene.start("levelTwo");
        });

        this.level3 = this.add.text(1200, 360, "Level 3", {
            fontFamily: '"Passion One"',
            fontSize: '45px',
            color: '#000000',
            backgroundColor: '#ff0000'
        }).setOrigin(0.5).setInteractive();
        this.level3.on("pointerdown", () => {
            this.scene.start("levelThree");
        });

        this.returnButton = this.add.text(90, 60, "Return", {
            fontFamily: '"Passion One"',
            fontSize: '40px',
            color: '#000000',
            backgroundColor: '#ff0000'
        }).setOrigin(0.5).setInteractive();
        this.returnButton.on("pointerdown", () => {
            this.scene.start("mainMenuScene");
        });

        if(levelComplete[0] === 1) {
            this.level1.setStyle({ backgroundColor: '#00ff00' });
        }
        if(levelComplete[1] === 1) {
            this.level2.setStyle({ backgroundColor: '#00ff00' });
        }
        if(levelComplete[2] === 1) {
            this.level3.setStyle({ backgroundColor: '#00ff00' });
        }
    }
}