
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe1 = new window.Pipe(this.el.find('#pipe1'), this, 1);
		this.pipe2 = new window.Pipe(this.el.find('#pipe2'), this, 2);
		this.isPlaying = false;
		this.score = 0;
		this.topScore = 0;

		/*var fontSize = Math.min(
			window.innerWidth / 102.4,
			window.innerHeight / 57.6
		);
		el.css('fontSize', fontSize + 'px');
*/

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.

		if (!this.isPlaying) {
			return;
		}



		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe1.onFrame(delta);
		this.pipe2.onFrame(delta);
		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		$('.Background')[0].style.webkitAnimationPlayState = 'running';
		$('.Ground')[0].style.webkitAnimationPlayState = 'running';
		$('.Ceiling')[0].style.webkitAnimationPlayState = 'running';
		$('.Player')[0].style.webkitAnimationPlayState = 'running';
		$('.audio_music')[0].play();
		$('.score').text(0);
		this.score = 0;
		this.player.reset();
		this.pipe1.reset();
		this.pipe2.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		$('.audio_music')[0].pause();
		$('.audio_game-over')[0].play();
		this.isPlaying = false;
		if (this.score > this.topScore){
			this.topScore = this.score;
		}
		$('.Scoreboard-score').text(this.score);
		$('.Scoreboard-top-score').text(this.topScore);

		// Should be refactored into a Scoreboard class.
		var that = this;
		$('.Background')[0].style.webkitAnimationPlayState = 'paused';
		$('.Ground')[0].style.webkitAnimationPlayState = 'paused';
		$('.Ceiling')[0].style.webkitAnimationPlayState = 'paused';
		$('.Player')[0].style.webkitAnimationPlayState = 'paused';
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	$('#muteMusic').click(function() {
		$('.audio_music').prop('muted', !$('.audio_music').prop('muted'));
	});

	$('#muteSFX').click(function() {
		$('.audio_game-over').prop('muted', !$('.audio_game-over').prop('muted'));
	});

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();
