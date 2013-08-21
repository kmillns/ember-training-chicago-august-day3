// app.js
(function() {
	'use strict';

	window.App = Ember.Application.create();
})();

// router.js
(function (App) {
	'use strict';

	App.Router.map(function () {
		this.resource('album', {
			path: '/album/:album_id'
		});
	});
})(window.App);

// routes/Index.js
(function (App) {
	'use strict';

	App.IndexRoute = Ember.Route.extend({
		model: function () {
			return App.ALBUM_FIXTURES;
		}
	});
})(window.App);

// routes/Album.js
(function (App) {
	'use strict';

	App.AlbumRoute = Ember.Route.extend({
		model: function (params) {
			return App.ALBUM_FIXTURES.findProperty('id', params.album_id);
		},
		events: {
			play: function (song) {
				this.controllerFor('nowPlaying').set('model', song);
			}
		}
	});
})(window.App);

// models/Album.js
(function (App) {
	'use strict';

	App.Album = Ember.Object.extend({
		totalDuration: function () {
			return this.songs.reduce(function (totalDuration, song) {
				return totalDuration + song.duration;
			}, 0);
		}.property('songs.@each.duration')
	});
})(window.App);

// models/Song.js
(function (App) {
	'use strict';

	App.Song = Ember.Object.extend({
		
	});
})(window.App);

// controllers/NowPlaying.js
(function (App) {
	'use strict';

	App.NowPlayingController = Ember.ObjectController.extend({

	});
})(window.App);

// helpers/format-duration.js
(function () {
	'use strict';

	Ember.Handlebars.helper('format-duration', function(value, options) {
		var seconds = parseInt(value, 10);
		var minutes = Math.floor(seconds/60);

		seconds = seconds - (minutes * 60);

		var prettyTime = minutes + ':';

		if (seconds < 10) {
			prettyTime = prettyTime + '0';
		}

		prettyTime = prettyTime + seconds;

		return prettyTime;
	});
})();

// components/AudioPlayer.js
(function (App) {
	App.AudioPlayerComponent = Ember.Component.extend({
		classNames: ['audio-control'],
		currentTime: 0,
		duration: null,
		isLoaded: false,
		isPlaying: false,
		play: function () {
			this.$('audio')[0].play();
		},
		pause: function () {
			this.$('audio')[0].pause();
		},
		didInsertElement: function () {
			var component = this;

			component.$('audio')
				.on('timeupdate', function () {
					component.set('currentTime', Math.floor(this.currentTime));
				})
				.on('loadeddata', function () {
					component.set('duration', Math.floor(this.duration));
					component.set('isLoaded', true);
				})
				.on('play', function () {
					component.set('isPlaying', true);
				})
				.on('pause', function () {
					component.set('isPlaying', false);
				});
		}
	});
})(window.App);

// components/ToggleTime.js
(function (App) {
	App.ToggleTimeComponent = Ember.Component.extend({
		showingCurrent: true,
		toggleTime: function () {
			this.set('showingCurrent', !this.get('showingCurrent'));
		},
		remainingTime: function () {
			var currentTime = this.get('currentTime');
			var totalTime = this.get('duration');

			return totalTime - currentTime;
		}.property('currentTime', 'duration')
	});
})(window.App);
