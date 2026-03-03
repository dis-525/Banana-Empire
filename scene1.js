class Scene1 {
	constructor(startBtn, gameBackground) {
		// Create Background Image
		this.gameBg = loadImage(gameBackground);
		
		
		// Create A button to start the game
		this.startBtn = new Button(startBtn);
		this.startBtn.name = "START";
		this.startBtn.x = width*0.5;	// x position of the button
		this.startBtn.y = height*0.5;	// y position of the button
		
		// Disable scene interaction by default
		this.disable();
	}
	
	display() {
		// Draw Background Image
		image(this.gameBg, 0, 0, width, height);
		
		// Display the start game button
		this.startBtn.display();
	}
	
	// A function to DISABLE scene interaction so it cannot interfere with other scenes
	disable() {
		this.startBtn.disable();
	}
	
	// ENABLE scene interaction
	enable() {
		this.startBtn.enable();
	}
}