class PauseMenu extends Phaser.Scene {
    constructor() {
        super({key: "PauseMenu"});

    }
    // ignore this comment

    create(){
        // Pause Menu       
        this.add.text(550, 200, 'Paused', { 
            fontFamily: "Passion One",
            fontSize: '120px', 
            fill: '#fff' }).setDepth(999);
            

        // Resume button
        this.add.text(650, 400, 'Resume', { 
            fontFamily: "Passion One",
            fontSize: '40px', 
            fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.resume(this.previousScene);
                this.scene.stop();
            });
        
        // Main Menu button
           this.add.text(650, 350, 'Main Menu', {
    fontFamily: "Passion One",
    fontSize: '40px',
    fill: '#fff'
})
.setInteractive()
.on('pointerdown', () => {
    console.log("Main Menu button clicked");
    this.scene.stop(this.previousScene);
    this.scene.stop();
    this.scene.start('mainMenuScene');
});
       
     
        // restart button
             this.add.text(650, 450, 'Restart', { 
                fontFamily: '"Passion One"',
                fontSize: '40px', 
                fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop(this.previousScene);       // Stop the paused game scene
                this.scene.stop();      
                console.log("Restart button clicked");                   
                this.scene.start(this.previousScene);      // restarting the scene   
    }).setDepth((999));


        // directions text
        this.add.text(600, 500, "Click to navigate menu",{
            fontFamily: "Passion One",
            fontSize: '30px',
            fill: '#fff'
        }).setDepth(999);

    }
    
    init(data){ // data is the scene passed into previousScene which is used to stop/start the current scene
        this.previousScene = data.from;
    }
}