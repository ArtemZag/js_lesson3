require.config({
    baseUrl: "/app/javascripts",
    paths: {
        Film: "Film",
        FilmDetails: "FilmDetails",
        FilmCollection: "FilmCollection",
        FilmView: "FilmView",
        FilmCollectionView: "FilmCollectionView",
        AddFilmButtonView: "AddFilmButtonView",
        jquery: "/bower_components/jquery/dist/jquery",
        underscore: "/bower_components/underscore/underscore",
        backbone: "/bower_components/backbone/backbone",
        requirejs: "/bower_components/requirejs/require"
    },
    shim: {
        backbone: {
            deps: [
                "underscore",
                "jquery"
            ],
            exports: "Backbone"
        },
        jquery: {
            exports: "jQuery"
        },
        underscore: {
            exports: "_"
        }
    },
    waitSeconds: 15,
    packages: []
});

require(['FilmCollection', 'FilmDetails', 'FilmCollectionView', 'AddFilmButtonView', 'FilmDetailsView', 'backbone'],
    function(FilmCollection, FilmDetails, FilmCollectionView, AddFilmButtonView, FilmDetailsView, backbone) {
        var filmCollection = new FilmCollection();

        var filmCollectionView = new FilmCollectionView({
            collection: filmCollection
        });

        // Никита: Очевидно, что AddFilmButtonView не должно иметь доступа к коллекции фильмов. Можно послать ивент в медиатор, например.
        // От себя: Не люблю медиаторы :) Сделал ивент напрямую.
        var addFilmButtonView = new AddFilmButtonView();
        addFilmButtonView.on('addFilmClick', function() {
            filmCollection.create();
        });

        var filmDetailsView = new FilmDetailsView({
            model: new FilmDetails()
        });

        var Controller = backbone.Router.extend({
            routes: {
                "": 'showIndex',
                "FilmDetails/:filmId": 'showFilmDetails'
            },
            showIndex: function() {
                filmCollection.fetch();

                filmDetailsView.hide();
                filmCollectionView.show();
                addFilmButtonView.show();
            },
            showFilmDetails: function(filmId) {
                filmDetailsView.fetchById(filmId);

                filmDetailsView.show();
                filmCollectionView.hide();
                addFilmButtonView.hide();
            }
        });

        var controller = new Controller();

        backbone.history.start();
    });