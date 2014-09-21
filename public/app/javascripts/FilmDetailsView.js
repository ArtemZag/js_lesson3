define(['backbone', 'underscore', 'jquery'], function(backbone, underscore, jquery) {
	var FilmDetailsView = Backbone.View.extend({
		el: '#film-details-container',

		template: _.template($('#film-details-template').html()),

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},

		fetchById: function(filmId) {			
            this.model.id = filmId;
            this.model.fetch();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
		},

        show: function() {
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        }
	});

	return FilmDetailsView;
});