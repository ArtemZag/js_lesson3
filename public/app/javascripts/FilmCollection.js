define('FilmCollection', ['backbone', 'Film'], function(backbone, Film) {
    var FilmCollection = backbone.Collection.extend({
        url: '/api/films',
        model: Film,
        initialize: function() {
            this.fetch();
        }
    });

    return FilmCollection;
});