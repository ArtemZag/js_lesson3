define('Film',['backbone'], function(backbone) {
    var Film = backbone.Model.extend({
        url: function() {
            if (this.id === undefined)
                return '/api/films';
            else
                return '/api/films/' + this.id;
        },
        defaults: {
            year: 2014,
            name: '',
            id: undefined
        }
    });

    return Film;
});
define('FilmCollection',['backbone', 'Film'], function(backbone, Film) {
    var FilmCollection = backbone.Collection.extend({
        url: '/api/films',
        model: Film
    });

    return FilmCollection;
});
define('FilmDetails',['backbone'], function(backbone) {
    var FilmDetails = backbone.Model.extend({
        url: function() {
            if (this.id === undefined)
                return '/api/filmdetails';
            else
                return '/api/filmdetails/' + this.id;
        },
        defaults: {
            poster: '',
            year: 2014,
            name: '',
            id: undefined,
            details1: "",
            details2: "",
            details3: "",
            details4: "",
            details5: "",
            details6: "",
            details7: "",
            details8: "",
        }
    });

    return FilmDetails;
});
define('FilmView',['backbone', 'underscore'], function(backbone, _) {
    var FilmView = backbone.View.extend({
        className: 'film-container',
        template: _.template($('#film-template').html()),
        templateEditMode: _.template($('#film-template-edit').html()),

        events: {
            'click input.film-delete-button': 'delete',
            'click input.film-edit-button': 'edit',
            'click input.film-editcancel-button': 'editCancel',
            'click input.film-editapprove-button': 'editApprove'
        },

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change:id', this.render);
            this.render();
        },

        edit: function() {
            this.isEditMode = true;
            this.render();
        },

        editCancel: function() {
            this.isEditMode = false;
            if (this.model.id > 0) {
                this.render();
            } else {
                this.remove();
            }
        },

        editApprove: function() {
            this.model.set('name', this.$el.find('input.film-name-input').val());
            this.model.set('year', this.$el.find('input.film-year-input').val());
            var view = this;
            this.model.save(null, {
                success: function(model, response) {
                    view.render();
                }
            });
            this.isEditMode = false;
            this.render();
        },

        delete: function() {
            this.model.destroy();
        },

        render: function() {
            if (this.isEditMode) {
                this.$el.html(this.templateEditMode(this.model.toJSON()));
            } else {
                this.$el.html(this.template(this.model.toJSON()));
            }
            return this;
        }
    });

    return FilmView;
});
define('FilmCollectionView',['backbone', 'FilmView'], function(backbone, FilmView) {
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
define('AddFilmButtonView',['backbone'], function(backbone) {
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
define('FilmDetailsView',['backbone', 'underscore', 'jquery'], function(backbone, underscore, jquery) {
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
define("index", function(){});

