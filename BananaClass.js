class BananaClass {
	constructor(src, x, y) {
		this.src = src;										// File path of the image
		this.img = loadImage(this.src);		// Load image into the this.img variable
		this.x = x;												// x postion of the image
		this.y = y;												// y postion of the image
		this.moveSpeed = random(1,10);		// Set movement speed of the fallen bananas
		this.w = this.img.width;					// Set width of the banana
		this.h = this.img.height;					// Set height of the banana
		
		// To hide and show bounding box of the fallen items
		// For debugging purposes
		this.debug = false;
	}
	
	display() {
		push();																				// Good practice to use push() & pop() while drawing something to avoid unexpected fill and strokes
		
			imageMode(CENTER);													// Set anchor point to the center
			translate(this.x, this.y);									// translate the screen coordinate to the banana image's center pos
			rotate(frameCount * this.moveSpeed * 0.05);	// Set the rotation speed according to this.moveSpeed
			image(this.img, 0, 0, this.w, this.h);			// Display the banana image
			this.y += this.moveSpeed;										// Increase the y coordinate by this.moveSpeed

			// View debug or hide debug box
			if(this.debug == true) {
				rectMode(CENTER);
				noFill();
				stroke(255,0,0);
				rect(0, 0, this.w, this.h);
			}
		
		pop();																			// End of push() command at line --> 18
	}
	
	// Set size of the banana
	setSize(w, h) {
		this.w = w;
		this.h = h;
	}
}