class Scene2 {
	constructor(hero_img, banana_img, bg_img) {
		// Create Background Image
		this.gameBg = loadImage(bg_img);
		
		// Assign the banana image file name to the variable "this.banana_img"
		this.banana_img = banana_img;
		
		// initialize HeroClass to view hero
		// Pass the parameters to the HeroClass(imageFileName, x, y)
		this.hero = new HeroClass(hero_img, width / 2, height);
		this.hero.setSize(100, 100);	// Set the width and height of the Hero Image
		this.disable();								// Disable Scene Interaction
		
		// Initialize Scene2 objects
		this.initSceneProps();
	}
	
	initSceneProps() {
		// reset the score
		totalScore = 0;
	
		// init fallen items array
		this.fallenItems = [];
		
		// Reset Time
		this.cTime = millis();
	}
	
	display() {
		push();	// Good practice to use push() and pop() for evertying we display for the current Class. It is not a must.
		
		image(this.gameBg, 0, 0, width, height); 		// Display Game Background
		
		// Every 100th frame add new banana
		if (frameCount % 100 == 0) {
			// Get numbers of items inside the array
			var currentIndex = this.fallenItems.length;

			// Add the item to end of the array
			// Pass the parameters to the BananaClass(filename, x, y)
			this.fallenItems[currentIndex] = new BananaClass(this.banana_img, random(width), -100);
			this.fallenItems[currentIndex].setSize(30, 30);
		}

		// Display Hero
		this.hero.display();

		// Banana item falls down
		for (let i = 0; i < this.fallenItems.length; i++) {
			this.fallenItems[i].display();

			// Check for collision if the banana hits the monkey then remove it from scene
			var bx = this.fallenItems[i].x; // get x position of current banana
			var by = this.fallenItems[i].y;	// get y position of current banana
			var bh = this.fallenItems[i].h;	// get height of current banana
			var hx = this.hero.x;						// get x position of the hero
			var hy = this.hero.y;						// get y position of the hero
			var hw = this.hero.w;						// get width of the hero	
			var hh = this.hero.h;						// get height of the hero
			
			// Check if the current banana hits to the hero according to the position of hero and its size
			if (bx > hx && 
					bx < hx + hw && 
					by + bh > hy) {
				// Remove the current item from array
				this.fallenItems.splice(i, 1);
				// Increase the score by +1
				// we don't use this. because the variable comes from mySketch file.
				totalScore++;
				break;
				//print("collision detected");
			}

			// Check the position of banana, if it exceeds the height of the window remove it from the array
			if (this.fallenItems[i].y > height) {
				// Remove the current item from array
				this.fallenItems.splice(i, 1);
				// Decrease the score -1 because we missed a banana
				totalScore--;
			}
		}


		// DISPLAY GAME TIME
		// Measure the current time
		var cTime = floor((millis() - this.cTime ) / 1000);
		
		// Set the text to show remaining time
		this.tTxt = s2_GameTime - cTime;

		// If the "totalScore" gets lower than 0, finish the game
		// or if the this.tTxt time reaches 0, finish the game
		if (this.tTxt <= 0 || totalScore < 0) {
			// Print a message to the console for debugging purposes
			// print("Game finished, Your Score is : " + totalScore);
			
			// EVENT DISPATCHER 
			// It sends a message to the "mySketch" file to finish the game
			// We can listen the message in "mySketch" file by adding a event listener as follows
			// Check line 37 in "mySketch" --> addEventListener("GAME_END", gameEnd);
			const event = new CustomEvent("GAME_END");	// Define the event
    	dispatchEvent(event);												// Trigger the event
		}

		// Score text background rectangle
		noStroke();																		// Don't add strokes to the Score and Remaining time text
		fill(30);																			// Fill color of the bg rectangle
		rect(0, 0, width, 45);												// Draw the rectangle
		
		// display time txt		
		fill(255);																		// Fill color of the time text
		text("TIME: " + this.tTxt, width - 70, 32);		// Display the remaning time
		
		// DISPLAY SCORE
		// Set Text and Color
		fill(255);																	 	// Fill color of the Score text
		text("SCORE: " + totalScore, 20, 30);					// Display the current score of the player.

		
		pop(); // End of push()
	}

	// A function to DISABLE scene interaction so it cannot interfere with other scenes
	disable() {
		this.hero.disable();			// Disable interaction for hero
	}

	// A function to ENABLE scene interaction
	enable() {
		this.hero.enable();				// Enable HeroClass interaction	
		this.initSceneProps();		// Call the function to reset the Banana array and resetting the remaining time.
	}
}