class GameEnd extends Phaser.Scene{
    constructor(){
        super("gameEnd");

        this.DEFAULT_TEXT_COUNTER = 75;
        this.textCounter = 120;
    }

    create(){
        this.cameras.main.setBackgroundColor("#4169E1");

        my.text.endMsg = this.add.text(0, 0, "YOU WIN !", {
            fontFamily: "'Jersey 10'",
            style: "'regular'",
            fontSize: '72px',
            color: "#ffffff",
            stroke: "#FFC000",
            strokeThickness: 2
        });

        my.text.replay = this.add.text(0, 0, "[ Press any key to play again ]", {
            fontFamily: "'Jersey 10'",
            style: "'regular'",
            fontSize: '24px',
            color: "#ffffff"
        }).setVisible(false);

        my.text.endMsg.setPosition(game.config.width/2 - my.text.endMsg.displayWidth/2, game.config.height/2 - my.text.endMsg.displayHeight/2);

        my.text.replay.setPosition(game.config.width/2 - my.text.replay.displayWidth/2, game.config.height*4/5 - my.text.replay.displayHeight/2);

        this.input.keyboard.on('keydown', () => {
            this.scene.start("levelSelectorScene"); // change this later
        });
    }

    update(){
        if(--this.textCounter <= 0){
            this.textCounter = this.DEFAULT_TEXT_COUNTER;
            my.text.replay.setVisible(!my.text.replay.visible);
        }
    }
}