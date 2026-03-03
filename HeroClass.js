class HeroClass {
	constructor(src, x, y) {
		this.src = src;													// File path of the image
		this.img = createImg(this.src,'');			// Create image to display
		this.x = x;															// x position of the image	
		this.y = y;															// y position of the image
		this.w = this.img.width;								// width of the image
		this.h = this.img.height;								// height of the image
		this.moveSpeed = 5;											// movement speed of the image
		
		this.disable();													// disable interaction
		
		// To hide and show bounding box of the fallen items
		// For debugging purposes
		this.debug = false;
	}

	display() {
		push();
		if (keyIsDown(LEFT_ARROW)) {
			// When user hits left arrow button on the keyboard move left by the amount of this.moveSpeed
			this.x -= this.moveSpeed;
			
			// Limit movement otherwise it will go out left side of the window
			if(this.x < 0) {
				this.x = 0;
			}
		} 
		
		// When user hits right arrow button on the keyboard move right by the amount of this.moveSpeed
		else if (keyIsDown(RIGHT_ARROW)) {
			this.x += this.moveSpeed;
			
			// Limit movement otherwise it will go out right side of the window
			if(this.x > width - this.w) {
				this.x = width - this.w;
			}
		}
		  
		var x = (windowWidth - width) / 2;			// center position of the canvas x
  	var y = (windowHeight - height) / 2;		// center position of the canvas y
		
		// Set the image position
		this.img.position(x+this.x,y+this.y - this.img.height);
		
		// View debug or hide debug box
		if(this.debug == true) {
			noFill();
			stroke(255,0,0);
			rect(this.x, this.y - this.img.height, this.w, this.h);
		}
		pop();
	}
	
	// Set size of the image
	setSize(w,h) {
		this.w = w;
		this.h = h;
		this.img.size(w, h);
	}

	// DISABLE scene interaction
	disable() {
		this.img.hide();
	}

	// ENABLE scene interaction
	enable() {
		this.img.show();
	}
}