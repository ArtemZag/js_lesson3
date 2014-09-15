define('FilmDetailsView', ['backbone', 'underscore', 'jquery'], function(backbone, underscore, jquery) {
	var FilmDetailsView = Backbone.View.extend({
		el: '#film-details-container',

		template: _.template($('#film-details-template').html()),

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
		}
	});

	return FilmDetailsView;
});