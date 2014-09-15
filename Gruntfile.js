module.exports = function(grunt) {
    grunt.initConfig({
        stylus: {
            compile: {
                files: {
                    'public/app/styles/style.css': 'public/app/styles/style.styl'
                }
            }
        },
        jade: {
        	options: {
        		pretty: true
        	},
            compile: {
                files: {
                	'public/app/index.html': 'public/app/index.jade',
                	'public/app/film-details.html': 'public/app/film-details.jade'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.registerTask('default', ['stylus', 'jade']);
}