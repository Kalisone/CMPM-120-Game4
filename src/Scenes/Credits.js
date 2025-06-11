class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        this.add.image(720, 450, "creditsBackground").setScale(2.1);

        this.returnButton = this.add.text(90, 60, "Return", {
            fontFamily: '"Passion One"',
            fontSize: '40px',
            color: '#800080',
            backgroundColor: '#A9A9A9'
        }).setOrigin(0.5).setInteractive();
        this.returnButton.on("pointerdown", () => {
            this.scene.start("mainMenuScene");
        });

        this.title = this.add.text(720, 100, "Devs", {
            fontFamily: '"Passion One"',
            fontSize: '66px',
            color: '#800080',
            backgroundColor: '#A9A9A9'
        }).setOrigin(0.5);

        this.nameOne = this.add.text(720, 200, "Ethan Morelos", {
            fontFamily: '"Passion One"',
            fontSize: '40px',
            color: '#800080',
            backgroundColor: '#A9A9A9'
        }).setOrigin(0.5);

        this.nameTwo = this.add.text(720, 300, "Devin Alvarez", {
            fontFamily: '"Passion One"',
            fontSize: '40px',
            color: '#800080',
            backgroundColor: '#A9A9A9'
        }).setOrigin(0.5);

        this.nameThree = this.add.text(720, 400, "Angelo Franso", {
            fontFamily: '"Passion One"',
            fontSize: '40px',
            color: '#800080',
            backgroundColor: '#A9A9A9'
        }).setOrigin(0.5);

        this.thanks = this.add.text(720, 600, "Thanks for Playing!", {
            fontFamily: '"Passion One"',
            fontSize: '50px',
            color: '#800080',
            backgroundColor: '#A9A9A9'
        }).setOrigin(0.5);
    }

    
}