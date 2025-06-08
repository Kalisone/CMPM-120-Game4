class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        this.returnButton = this.add.text(90, 60, "Return", {
            fontFamily: '"Passion One"',
            fontSize: '40px',
            color: '#0000ff',
            backgroundColor: '#ffffff'
        }).setOrigin(0.5).setInteractive();
        this.returnButton.on("pointerdown", () => {
            this.scene.start("mainMenuScene");
        });
    }
}