class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenuScene");
        this.audioPlaying = false;
    }

    create() {
        this.add.image(720, 450, "menuBackground").setScale(2.4);

        if(!this.audio_playing) {
            this.audio_playing = true;
            this.sound.play("menu music", {
                loop: true,
                volume: 0.1
        });
        }

        this.menuText = this.add.text(720, 100, "Tralaleo Trip", {
            fontFamily: '"Passion One"',
            fontSize: '60px',
            color: '#0000ff',
            backgroundColor: '#ffffff'
        }).setOrigin(0.5);

        this.playButton = this.add.text(480, 450, "Play", {
            fontFamily: '"Passion One"',
            fontSize: '45px',
            color: '#0000ff',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();
        this.playButton.on("pointerdown", () => {
            this.scene.start("levelSelectorScene");
        });

        this.creditsButton = this.add.text(960, 450, "Credits", {
            fontFamily: '"Passion One"',
            fontSize: '45px',
            color: '#0000ff',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();
        this.creditsButton.on("pointerdown", () => {
            this.scene.start("creditsScene");
        });
    }


}