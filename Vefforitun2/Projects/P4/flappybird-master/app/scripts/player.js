window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 50;
	var INITIAL_POSITION_Y = 30;
	var ROTATION = 0;

	var DROPSPEED = 2;
	var DRIFTSPEED = 150;

	var DROPCOUNT = 0 ;
	var DRIFTCOUNT = 0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.width = WIDTH;
		this.height = HEIGHT;
		this.animate = true;
		this.pos = {
			x: 0,
			y: 0
		};
	};

	/**
	* Resets the state of the player for a new game.
	*/
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.keys.space || Controls.keys.mouse) {
			this.el.addClass('Player-animation');
			this.animate = true;
			if (DRIFTCOUNT === 10) {
				DRIFTCOUNT = 1;
				DROPCOUNT = 1;
				Controls.keys.mouse = false;
			} else {
				this.pos.y -= delta * (DRIFTSPEED / DRIFTCOUNT);
				DRIFTCOUNT++;
			}
			ROTATION = -20;
		} else {
			if (this.animate && ROTATION >= -10){
				this.el.removeClass('Player-animation');
				this.animate = false;
			}
			if (DROPCOUNT === 20) {
				this.pos.y += delta * (DROPSPEED * DROPCOUNT);
			} else {
				this.pos.y += delta * (DROPSPEED * DROPCOUNT);
				DROPCOUNT++;
			}

			if(ROTATION < 80)
			{
				ROTATION += 2;
			}
		}


		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + ROTATION + 'deg');
	};


	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
		this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
		this.pos.y < 0 + 2.5||
		this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - 2.5) {
			return this.game.gameover();
		}
	};

	return Player;

})();
