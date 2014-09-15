require(['FilmCollection', 'FilmCollectionView', 'AddFilmButtonView'], function(FilmCollection, FilmCollectionView, AddFilmButtonView) {
    var filmCollection = new FilmCollection();
    var filmCollectionView = new FilmCollectionView({
        collection: filmCollection
    })
    var addFilmButtonView = new AddFilmButtonView({ films: filmCollection });
});