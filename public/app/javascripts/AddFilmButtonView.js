define(['backbone'], function(backbone) {
	var AddFilmButtonView = backbone.View.extend( {
		el: '#add-film-button',
		initialize: function() {
		},
		events: {
			'click' : 'addFilm'
		},
		addFilm: function() {
			this.trigger('addFilmClick');
		},

        show: function() {
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        }
	});

	return AddFilmButtonView;
});