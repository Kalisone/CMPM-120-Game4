class GameFail extends Phaser.Scene{
    constructor(){
        super("gameFail");

        this.DEFAULT_TEXT_COUNTER = 75;
        this.textCounter = 120;
    }

    create(){
        this.cameras.main.setBackgroundColor("#241111");

        my.text.endMsg = this.add.text(0, 0, "YOU LOSE    : )", {
            fontFamily: "'Jersey 10'",
            style: "'regular'",
            fontSize: '72px',
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2
        });

        my.text.replay = this.add.text(0, 0, "[ Press any key to play again ]", {
            fontFamily: "'Jersey 10'",
            style: "'regular'",
            fontSize: '24px',
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2
        }).setVisible(false);

        my.text.endMsg.setPosition(game.config.width/2 - my.text.endMsg.displayWidth/2, game.config.height/2 - my.text.endMsg.displayHeight/2);

        my.text.replay.setPosition(game.config.width/2 - my.text.replay.displayWidth/2, game.config.height*4/5 - my.text.replay.displayHeight/2);

        this.cameras.main.shake(360, 0.1);

        this.input.keyboard.on('keydown', () => {
            this.scene.start("bitryside");
        });
    }

    update(){
        if(--this.textCounter <= 0){
            this.textCounter = this.DEFAULT_TEXT_COUNTER;
            my.text.replay.setVisible(!my.text.replay.visible);
        }
    }
}