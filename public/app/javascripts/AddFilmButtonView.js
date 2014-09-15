define('AddFilmButtonView', ['backbone'], function(backbone) {
	// Не знаю, как это правильно оформить, сделал пока так, но очень похоже на костыль
	var AddFilmButtonView = backbone.View.extend( {
		el: '#add-film-button',
		initialize: function(args) {
			this.films = args.films;		
		},
		events: {
			'click' : 'addFilm'
		},
		addFilm: function() {
			this.films.create();
		}
	});

	return AddFilmButtonView;
})