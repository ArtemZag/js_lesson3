require.config({
    baseUrl: "/app/javascripts",
    paths: {
        "Film": "Film",
        'FilmDetails': 'FilmDetails',
        'FilmCollection': 'FilmCollection',
        'FilmView': 'FilmView',
        'FilmCollectionView': 'FilmCollectionView',
        'AddFilmButtonView': 'AddFilmButtonView',
        'jquery': '/bower_components/jquery/dist/jquery',
        'underscore': '/bower_components/underscore/underscore',
        'backbone': '/bower_components/backbone/backbone'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {
            exports: '_'
        }
    },
    waitSeconds: 15
});