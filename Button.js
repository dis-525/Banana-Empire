class Button {
	constructor(src, x, y) {
		this.src = src;												// File path of the image
		this.img = loadImage(this.src);				// assign image to this.img variable
		this.x = x;														// x position of the button
		this.y = y;														// y position of the button
		this.sclFac = 1;											// current scale of the button. 1 represents the actual size

		// Bind the mousePressed function to the current instance
		this.mousePress = this.mousePress.bind(this);	// Vanilla Javascript binding to listen mouse down event
		this.mouseUp = this.mouseUp.bind(this);				// Vanilla Javascript binding to listen mouse up event

		this.enable();																// Enable interaction
		
		this.name = "NAN";														// Default name property for the button
	}
	
	display() {
		// Draw Background Image
		push();
			imageMode(CENTER);							// Set anchor point of the image to center of its size
			translate(this.x, this.y);			// Translate coordinate space to the button position
			scale(this.sclFac);							// Set scale factor for the image by default 1, we will change it when the user clicks on the button give visual feedback
			image(this.img, 0, 0);					// Display the loaded image
		pop();													// End of push() method, started at line --> 20
	}
	
	enable() {
		// Register the mousePressed event
		window.addEventListener("mousedown", this.mousePress);
		window.addEventListener("mouseup", this.mouseUp);

	}

	disable() {
		// Register the mousePressed event
		window.removeEventListener("mousedown", this.mousePress);
		window.removeEventListener("mouseup", this.mouseUp);

	}
	
	// Set name property of the button
	setName(val) {
		this.name = val;
	}
	
	// mousePress function will be called whenever the user pushes the left mouse button
	mousePress(e) {
		
		// Check if we hit the button or not according to the loaded image dimensions.
		if (e.offsetX > this.x - this.img.width * 0.5 &&
			e.offsetX < this.x + this.img.width * 0.5 &&
			e.offsetY > this.y - this.img.height * 0.5 &&
			e.offsetY < this.y + this.img.height * 0.5
		) {
			// When mouse is down on the button scale down the image size
			this.sclFac = 0.9;
		}
	}

	mouseUp(e) {
		// EVENT DISPATCHER
		// Send messsage to the mySketch Class
		// If this.sclFac is smaller than 1, it means that the user pressed onto button
		if(this.sclFac < 1) {
				const event = new CustomEvent("BUTTON_PRESSED");
				event.name = this.name;
    		dispatchEvent(event);
		}
		
		// When mouse is released, return back to its original size.
		this.sclFac = 1;
	}

}