class GameEnd extends Phaser.Scene{
    constructor(){
        super("gameEnd");

        this.replayCounter = 120;
    }

    create(){
        this.cameras.main.setBackgroundColor("#4169E1");

        my.text.endMsg = this.add.text(0, 0, "YOU WIN !", {
            fontFamily: "'Passion One'",
            fontSize: '72px',
            color: "#ffffff",
            stroke: "#FFC000",
            strokeThickness: 2
        });

        my.text.replay = this.add.text(0, 0, "[ Press any key to return ]", {
            fontFamily: "'Passion One'",
            fontSize: '24px',
            color: "#ffffff"
        }).setVisible(false);

        my.text.endMsg.setPosition(game.config.width/2 - my.text.endMsg.displayWidth/2, game.config.height/2 - my.text.endMsg.displayHeight/2);

        my.text.replay.setPosition(game.config.width/2 - my.text.replay.displayWidth/2, game.config.height*4/5 - my.text.replay.displayHeight/2);

        this.input.keyboard.on('keydown', () => {
            if(this.replayCounter < 0){
                this.scene.start("levelSelectorScene");
            }
        });
        
        this.time.addEvent({
            delay: 720,
            callback: () => {
                my.text.replay.setVisible(!my.text.replay.visible);
            },
            loop: true
        });
    }

    update(){
        this.replayCounter--;
    }
}