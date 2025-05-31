class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenuScene");
        this.audioPlaying = false;
    }

    create() {
        this.add.image(720, 450, "background").setScale(2.4);
        if(!this.audio_playing) {
            this.audio_playing = true;
            this.sound.play("menu music", {
                volume: 0.1
        });
        }

        this.menuText = this.add.text(720, 100, "Tralaleo Trip", {
            fontFamily: '"Passion One"',
            fontSize: '45px',
            color: '#0000ff',
            backgroundColor: '#ffffff'
        }).setOrigin(0.5);

        this.playButton = this.add.text(720, 200, "Play", {
            fontFamily: '"Passion One"',
            fontSize: '16px',
            color: '#0000ff',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setVisible(true).setInteractive();

        // Will change this scene when level selector is being made
        this.playButton.on("pointerdown", () => {
            this.scene.start("bitryside");
        });
    }


}