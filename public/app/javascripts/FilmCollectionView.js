define(['backbone', 'FilmView'], function(backbone, FilmView) {
    var FilmCollectionView = backbone.View.extend({
        el: '#films-container',
        initialize: function() {
            this.collection.on('add', this.renderNewFilm, this);
        },

        renderNewFilm: function(model) {
            var view = new FilmView({
                model: model
            });
            this.$el.append(view.$el);
        },

        show: function() {
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        }
    });

    return FilmCollectionView;
});