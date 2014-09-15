var Film = Backbone.Model.extend({
	url: function() {
		return '/api/films/' + this.id;
	},
	defaults:{
		year: 2014,
		name: '',
		id: undefined
	}
});