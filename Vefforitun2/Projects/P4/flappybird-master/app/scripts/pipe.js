window.Pipe = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 10;
	var GAP_HEIGHT = 15;
	var PIPE_CAP_HEIGHT = 9.6;
	var BORDER_HEIGHT = 2.5;
	var INITIAL_POSITION_Y = 25;

	var Pipe = function(el, game, pos) {
		this.el = el;
		this.upper = this.el.find('.Pipe_upper');
		this.gap = this.el.find('.Pipe_gap');
		this.lower = this.el.find('.Pipe_lower');
		this.game = game;
		this.point = true;
		if(pos === 1) {
			this.INITIAL_POSITION_X = this.game.WORLD_WIDTH;
		} else {
			this.INITIAL_POSITION_X = this.game.WORLD_WIDTH + this.game.WORLD_WIDTH / 2;
		}
		this.pos = { x: this.INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
	};

	Pipe.prototype.randomGap = function() {
		var min = BORDER_HEIGHT + PIPE_CAP_HEIGHT;
		var max = this.game.WORLD_HEIGHT - BORDER_HEIGHT - PIPE_CAP_HEIGHT - GAP_HEIGHT;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipe.prototype.reset = function(boundryReset) {
		if(boundryReset){
			this.pos.x = this.game.WORLD_WIDTH;
		} else {
			this.pos.x = this.INITIAL_POSITION_X;
		}
		this.pos.y = this.randomGap();
		this.upper.css('height', this.pos.y + 'em');
		this.lower.css('height', this.game.WORLD_HEIGHT - this.pos.y - GAP_HEIGHT + 'em');
		this.point = true;
	};

	Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		this.checkCollisionWithBounds();
		this.checkPlayerCollision();
		this.checkPlayerPoint();

		// Update UI
		//this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + 0 + 'em)');
	};

	Pipe.prototype.checkPlayerPoint = function() {
		if (this.point){
			if (this.game.player.pos.x + this.game.player.width >= this.pos.x + WIDTH/2 &&
			this.game.player.pos.x <= this.pos.x + WIDTH &&
			(this.game.player.pos.y + this.game.player.height < this.pos.y + GAP_HEIGHT ||
			this.game.player.pos.y > this.pos.y)){
				this.point = false;
				this.game.score++;
				$('.audio_point')[0].play();
				$('.score').text(this.game.score);
			}
		}
	};

	Pipe.prototype.checkPlayerCollision = function() {
		if (this.game.player.pos.x + this.game.player.width >= this.pos.x &&
		this.game.player.pos.x <= this.pos.x + WIDTH &&
		(this.game.player.pos.y + this.game.player.height > this.pos.y + GAP_HEIGHT ||
		this.game.player.pos.y < this.pos.y)){
			return this.game.gameover();
		}
	};

	Pipe.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x + WIDTH < 0) {
			this.reset(true);
		}
	};

	return Pipe;

})();
